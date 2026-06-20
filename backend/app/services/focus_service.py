from datetime import datetime, timezone
from typing import Any

from app.stores.focus_sessions import focus_sessions
from app.stores.sessions import sessions


def _utcnow() -> datetime:
    return datetime.now(timezone.utc)


class FocusService:
    def start(
        self,
        user_id: str,
        *,
        session_id: str,
        task: str,
        steps: list[str],
    ) -> dict[str, Any]:
        if not sessions.get_by_id(session_id, user_id):
            raise LookupError("Session not found")
        return focus_sessions.create(
            user_id=user_id,
            session_id=session_id,
            task=task,
            steps=steps,
            started_at=_utcnow(),
        )

    def complete(
        self,
        user_id: str,
        focus_id: str,
        *,
        status: str,
    ) -> dict[str, Any]:
        focus = focus_sessions.get_by_id(focus_id, user_id)
        if not focus:
            raise LookupError("Focus session not found")

        now = _utcnow()
        started_at = datetime.fromisoformat(
            focus["started_at"].replace("Z", "+00:00")
        )
        duration = max(0, int((now - started_at).total_seconds()))

        return focus_sessions.complete(
            focus_id,
            user_id,
            status=status,
            completed_at=now,
            duration_seconds=duration,
        )


focus_service = FocusService()
