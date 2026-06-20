from datetime import datetime, timezone
from typing import Any, Optional

from app.core.database import db


def _utcnow_iso() -> str:
    return datetime.now(timezone.utc).isoformat()


class PatternStore:
    @property
    def _admin(self):
        return db.admin_client

    def list_definitions(self) -> list[dict[str, Any]]:
        result = (
            self._admin.table("pattern_definitions")
            .select("*")
            .eq("is_active", True)
            .order("pattern_id")
            .execute()
        )
        return result.data

    def create_occurrence(
        self,
        *,
        user_id: str,
        session_id: str,
        message_id: str,
        pattern_id: str,
        note: Optional[str],
        evidence: Optional[str],
        confidence: float,
    ) -> dict[str, Any]:
        payload = {
            "user_id": user_id,
            "session_id": session_id,
            "message_id": message_id,
            "pattern_id": pattern_id,
            "note": note,
            "evidence": evidence,
            "confidence": confidence,
        }
        result = self._admin.table("pattern_occurrences").insert(payload).execute()
        if not result.data:
            raise RuntimeError("Failed to create pattern occurrence")
        return result.data[0]

    def list_occurrences_for_session(
        self, user_id: str, session_id: str, limit: int = 10
    ) -> list[dict[str, Any]]:
        result = (
            self._admin.table("pattern_occurrences")
            .select("*")
            .eq("user_id", user_id)
            .eq("session_id", session_id)
            .order("created_at", desc=True)
            .limit(limit)
            .execute()
        )
        return result.data

    def get_user_behavior_pattern(
        self, user_id: str, pattern_id: str
    ) -> Optional[dict[str, Any]]:
        result = (
            self._admin.table("user_behavior_patterns")
            .select("*")
            .eq("user_id", user_id)
            .eq("pattern_id", pattern_id)
            .limit(1)
            .execute()
        )
        return result.data[0] if result.data else None

    def create_user_behavior_pattern(
        self,
        *,
        user_id: str,
        pattern_id: str,
        summary: Optional[str],
        confidence: float,
    ) -> dict[str, Any]:
        now = _utcnow_iso()
        payload = {
            "user_id": user_id,
            "pattern_id": pattern_id,
            "summary": summary,
            "frequency": 1,
            "confidence_avg": confidence,
            "severity": "low",
            "first_seen_at": now,
            "last_seen_at": now,
        }
        result = self._admin.table("user_behavior_patterns").insert(payload).execute()
        if not result.data:
            raise RuntimeError("Failed to create user behavior pattern")
        return result.data[0]

    def update_user_behavior_pattern(
        self, pattern_row_id: str, updates: dict[str, Any]
    ) -> dict[str, Any]:
        result = (
            self._admin.table("user_behavior_patterns")
            .update(updates)
            .eq("id", pattern_row_id)
            .execute()
        )
        if not result.data:
            raise LookupError("User behavior pattern not found")
        return result.data[0]

    def list_top_user_patterns(
        self, user_id: str, limit: int = 5
    ) -> list[dict[str, Any]]:
        result = (
            self._admin.table("user_behavior_patterns")
            .select("*")
            .eq("user_id", user_id)
            .order("frequency", desc=True)
            .order("last_seen_at", desc=True)
            .limit(limit)
            .execute()
        )
        return result.data

    def update_user_pattern_summary(
        self, user_id: str, pattern_id: str, summary: str
    ) -> dict[str, Any]:
        existing = self.get_user_behavior_pattern(user_id, pattern_id)
        if not existing:
            raise LookupError("User behavior pattern not found")
        return self.update_user_behavior_pattern(
            existing["id"], {"summary": summary}
        )


patterns = PatternStore()
