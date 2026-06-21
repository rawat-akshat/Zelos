from datetime import datetime, timezone
from typing import Any, Optional

from app.stores.session_activity import session_activity
from app.stores.sessions import sessions
from app.stores.messages import messages as message_store


def _utcnow() -> datetime:
    return datetime.now(timezone.utc)


def _normalize_session(row: dict[str, Any]) -> dict[str, Any]:
    goal = row.get("goal") or row.get("first_message") or ""
    row = dict(row)
    row["goal"] = goal
    if row.get("goal_history") is None:
        row["goal_history"] = []
    return row


class SessionService:
    def create_session(
        self,
        user_id: str,
        *,
        title: str,
        goal: str,
        first_message: Optional[str] = None,
    ) -> dict[str, Any]:
        row = sessions.create(
            user_id=user_id,
            title=title,
            goal=goal,
            first_message=first_message,
        )
        return _normalize_session(row)

    def get_session(self, user_id: str, session_id: str) -> dict[str, Any]:
        row = sessions.get_by_id(session_id, user_id)
        if not row:
            raise LookupError("Session not found")
        return _normalize_session(row)

    def list_sessions(
        self,
        user_id: str,
        *,
        page: int = 1,
        page_size: int = 20,
        include_archived: bool = False,
    ) -> tuple[list[dict[str, Any]], int]:
        rows, total = sessions.list_for_user(
            user_id,
            page=page,
            page_size=page_size,
            include_archived=include_archived,
        )
        return [_normalize_session(r) for r in rows], total

    def update_goal(
        self,
        user_id: str,
        session_id: str,
        *,
        new_goal: str,
        reason: Optional[str] = None,
    ) -> dict[str, Any]:
        session = self.get_session(user_id, session_id)
        history = list(session.get("goal_history") or [])
        history.append(
            {
                "old_goal": session["goal"],
                "new_goal": new_goal,
                "changed_at": _utcnow().isoformat(),
                "reason": reason,
            }
        )
        row = sessions.update_goal(
            session_id,
            user_id,
            new_goal=new_goal,
            goal_history=history,
            task_status="changed",
        )
        return _normalize_session(row)

    def update_status(
        self, user_id: str, session_id: str, status: str
    ) -> dict[str, Any]:
        row = sessions.update_status(session_id, user_id, status)
        return _normalize_session(row)

    def update_title(
        self, user_id: str, session_id: str, title: str
    ) -> dict[str, Any]:
        row = sessions.update_title(session_id, user_id, title)
        return _normalize_session(row)

    def archive_session(self, user_id: str, session_id: str) -> dict[str, Any]:
        row = sessions.archive(session_id, user_id)
        return _normalize_session(row)

    def open_session(self, user_id: str, session_id: str) -> dict[str, Any]:
        if not sessions.get_by_id(session_id, user_id):
            raise LookupError("Session not found")
        now = _utcnow()
        sessions.set_opened_at(session_id, user_id, now.isoformat())
        log = session_activity.create_open_log(
            user_id=user_id,
            session_id=session_id,
            opened_at=now,
        )
        return log

    def close_session(self, user_id: str, session_id: str) -> dict[str, Any]:
        open_log = session_activity.find_open_log(user_id, session_id)
        if not open_log:
            raise LookupError("No open activity log found for this session")

        now = _utcnow()
        opened_at = datetime.fromisoformat(
            open_log["opened_at"].replace("Z", "+00:00")
        )
        duration = max(0, int((now - opened_at).total_seconds()))

        session_activity.close_log(
            open_log["id"],
            closed_at=now,
            duration_seconds=duration,
        )
        session = sessions.close_session_time(
            session_id,
            user_id,
            closed_at=now.isoformat(),
            duration_seconds=duration,
        )
        return {
            "duration_seconds": duration,
            "total_time_spent_seconds": session["total_time_spent_seconds"],
        }

    def import_guest_session(
        self,
        user_id: str,
        *,
        title: str,
        goal: str,
        messages: list[dict[str, str]],
    ) -> dict[str, Any]:
        if not messages:
            raise ValueError("At least one message is required")

        first_user = next(
            (m["content"] for m in messages if m.get("role") == "user"),
            goal,
        )
        row = sessions.create(
            user_id=user_id,
            title=title[:200],
            goal=goal[:2000],
            first_message=first_user[:2000],
        )
        session_id = row["id"]
        last_ts: Optional[str] = None

        for msg in messages:
            role = msg.get("role")
            content = (msg.get("content") or "").strip()
            if role not in ("user", "assistant") or not content:
                continue
            created = message_store.create(
                user_id=user_id,
                session_id=session_id,
                role=role,
                content=content,
                metadata={"imported_from_guest": True},
            )
            last_ts = created.get("created_at")

        if last_ts:
            sessions.touch_last_message_at(session_id, last_ts)
            sessions.update_task_status(session_id, user_id, "in_progress")

        return _normalize_session(sessions.get_by_id(session_id, user_id) or row)


session_service = SessionService()
