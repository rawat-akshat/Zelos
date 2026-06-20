from datetime import datetime, timezone
from typing import Any, Optional

from app.core.database import db


def _utcnow() -> datetime:
    return datetime.now(timezone.utc)


class SessionActivityStore:
    @property
    def _admin(self):
        return db.admin_client

    def create_open_log(
        self, *, user_id: str, session_id: str, opened_at: datetime
    ) -> dict[str, Any]:
        payload = {
            "user_id": user_id,
            "session_id": session_id,
            "opened_at": opened_at.isoformat(),
        }
        result = self._admin.table("session_activity_logs").insert(payload).execute()
        if not result.data:
            raise RuntimeError("Failed to create activity log")
        return result.data[0]

    def find_open_log(
        self, user_id: str, session_id: str
    ) -> Optional[dict[str, Any]]:
        result = (
            self._admin.table("session_activity_logs")
            .select("*")
            .eq("user_id", user_id)
            .eq("session_id", session_id)
            .is_("closed_at", "null")
            .order("opened_at", desc=True)
            .limit(1)
            .execute()
        )
        return result.data[0] if result.data else None

    def close_log(
        self,
        log_id: str,
        *,
        closed_at: datetime,
        duration_seconds: int,
    ) -> dict[str, Any]:
        result = (
            self._admin.table("session_activity_logs")
            .update(
                {
                    "closed_at": closed_at.isoformat(),
                    "duration_seconds": duration_seconds,
                }
            )
            .eq("id", log_id)
            .execute()
        )
        if not result.data:
            raise RuntimeError("Failed to close activity log")
        return result.data[0]


session_activity = SessionActivityStore()
