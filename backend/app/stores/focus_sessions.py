from datetime import datetime, timezone
from typing import Any, Optional

from app.core.database import db


class FocusSessionStore:
    @property
    def _admin(self):
        return db.admin_client

    def create(
        self,
        *,
        user_id: str,
        session_id: str,
        task: str,
        steps: list[str],
        started_at: datetime,
    ) -> dict[str, Any]:
        payload = {
            "user_id": user_id,
            "session_id": session_id,
            "task": task,
            "steps": steps,
            "status": "started",
            "started_at": started_at.isoformat(),
        }
        result = self._admin.table("focus_sessions").insert(payload).execute()
        if not result.data:
            raise RuntimeError("Failed to create focus session")
        return result.data[0]

    def get_by_id(self, focus_id: str, user_id: str) -> Optional[dict[str, Any]]:
        result = (
            self._admin.table("focus_sessions")
            .select("*")
            .eq("id", focus_id)
            .eq("user_id", user_id)
            .limit(1)
            .execute()
        )
        return result.data[0] if result.data else None

    def complete(
        self,
        focus_id: str,
        user_id: str,
        *,
        status: str,
        completed_at: datetime,
        duration_seconds: int,
    ) -> dict[str, Any]:
        result = (
            self._admin.table("focus_sessions")
            .update(
                {
                    "status": status,
                    "completed_at": completed_at.isoformat(),
                    "duration_seconds": duration_seconds,
                }
            )
            .eq("id", focus_id)
            .eq("user_id", user_id)
            .execute()
        )
        if not result.data:
            raise LookupError("Focus session not found")
        return result.data[0]


focus_sessions = FocusSessionStore()
