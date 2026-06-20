from datetime import datetime, timezone
from typing import Any, Optional

from app.core.database import db


def _utcnow_iso() -> str:
    return datetime.now(timezone.utc).isoformat()


class SessionStore:
    @property
    def _admin(self):
        return db.admin_client

    def create(
        self,
        *,
        user_id: str,
        title: str,
        goal: str,
        first_message: Optional[str] = None,
    ) -> dict[str, Any]:
        payload = {
            "user_id": user_id,
            "title": title,
            "goal": goal,
            "first_message": first_message or goal,
            "goal_history": [],
            "status": "active",
            "task_status": "not_started",
            "total_time_spent_seconds": 0,
        }
        result = self._admin.table("sessions").insert(payload).execute()
        if not result.data:
            raise RuntimeError("Failed to create session")
        return result.data[0]

    def get_by_id(self, session_id: str, user_id: str) -> Optional[dict[str, Any]]:
        result = (
            self._admin.table("sessions")
            .select("*")
            .eq("id", session_id)
            .eq("user_id", user_id)
            .limit(1)
            .execute()
        )
        return result.data[0] if result.data else None

    def list_for_user(
        self,
        user_id: str,
        *,
        page: int = 1,
        page_size: int = 20,
        include_archived: bool = False,
    ) -> tuple[list[dict[str, Any]], int]:
        offset = (page - 1) * page_size
        query = (
            self._admin.table("sessions")
            .select("*", count="exact")
            .eq("user_id", user_id)
        )
        if not include_archived:
            query = query.neq("status", "archived")
        result = (
            query.order("last_message_at", desc=True)
            .order("updated_at", desc=True)
            .range(offset, offset + page_size - 1)
            .execute()
        )
        total = result.count if result.count is not None else len(result.data)
        return result.data, total

    def update_goal(
        self,
        session_id: str,
        user_id: str,
        *,
        new_goal: str,
        goal_history: list[dict[str, Any]],
        task_status: str = "changed",
    ) -> dict[str, Any]:
        result = (
            self._admin.table("sessions")
            .update(
                {
                    "goal": new_goal,
                    "goal_history": goal_history,
                    "task_status": task_status,
                }
            )
            .eq("id", session_id)
            .eq("user_id", user_id)
            .execute()
        )
        if not result.data:
            raise LookupError("Session not found")
        return result.data[0]

    def update_status(
        self, session_id: str, user_id: str, status: str
    ) -> dict[str, Any]:
        result = (
            self._admin.table("sessions")
            .update({"status": status})
            .eq("id", session_id)
            .eq("user_id", user_id)
            .execute()
        )
        if not result.data:
            raise LookupError("Session not found")
        return result.data[0]

    def update_title(
        self, session_id: str, user_id: str, title: str
    ) -> dict[str, Any]:
        result = (
            self._admin.table("sessions")
            .update({"title": title})
            .eq("id", session_id)
            .eq("user_id", user_id)
            .execute()
        )
        if not result.data:
            raise LookupError("Session not found")
        return result.data[0]

    def archive(self, session_id: str, user_id: str) -> dict[str, Any]:
        return self.update_status(session_id, user_id, "archived")

    def set_opened_at(self, session_id: str, user_id: str, opened_at: str) -> None:
        self._admin.table("sessions").update({"opened_at": opened_at}).eq(
            "id", session_id
        ).eq("user_id", user_id).execute()

    def close_session_time(
        self,
        session_id: str,
        user_id: str,
        *,
        closed_at: str,
        duration_seconds: int,
    ) -> dict[str, Any]:
        session = self.get_by_id(session_id, user_id)
        if not session:
            raise LookupError("Session not found")
        total = int(session.get("total_time_spent_seconds") or 0) + duration_seconds
        result = (
            self._admin.table("sessions")
            .update(
                {
                    "closed_at": closed_at,
                    "total_time_spent_seconds": total,
                }
            )
            .eq("id", session_id)
            .eq("user_id", user_id)
            .execute()
        )
        if not result.data:
            raise LookupError("Session not found")
        return result.data[0]

    def touch_last_message_at(self, session_id: str, ts: str) -> None:
        self._admin.table("sessions").update({"last_message_at": ts}).eq(
            "id", session_id
        ).execute()


sessions = SessionStore()
