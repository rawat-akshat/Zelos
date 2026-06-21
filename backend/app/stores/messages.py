from typing import Any, Optional

from app.core.database import db


class MessageStore:
    @property
    def _admin(self):
        return db.admin_client

    def create(
        self,
        *,
        user_id: str,
        session_id: str,
        role: str,
        content: str,
        mode: Optional[str] = None,
        metadata: Optional[dict[str, Any]] = None,
    ) -> dict[str, Any]:
        payload = {
            "user_id": user_id,
            "session_id": session_id,
            "role": role,
            "content": content,
            "mode": mode,
            "metadata": metadata or {},
        }
        result = self._admin.table("messages").insert(payload).execute()
        if not result.data:
            raise RuntimeError("Failed to create message")
        return result.data[0]

    def get_by_id(self, message_id: str) -> Optional[dict[str, Any]]:
        result = (
            self._admin.table("messages")
            .select("content, role, session_id")
            .eq("id", message_id)
            .limit(1)
            .execute()
        )
        return result.data[0] if result.data else None

    def list_for_session(
        self,
        session_id: str,
        *,
        limit: int = 100,
        offset: int = 0,
    ) -> list[dict[str, Any]]:
        result = (
            self._admin.table("messages")
            .select("*")
            .eq("session_id", session_id)
            .order("created_at", desc=False)
            .range(offset, offset + limit - 1)
            .execute()
        )
        return result.data

    def get_recent_for_session(
        self, session_id: str, limit: int = 20
    ) -> list[dict[str, Any]]:
        result = (
            self._admin.table("messages")
            .select("*")
            .eq("session_id", session_id)
            .order("created_at", desc=True)
            .limit(limit)
            .execute()
        )
        return list(reversed(result.data))

    def update_metadata(
        self, message_id: str, metadata: dict[str, Any]
    ) -> dict[str, Any]:
        result = (
            self._admin.table("messages")
            .update({"metadata": metadata})
            .eq("id", message_id)
            .execute()
        )
        if not result.data:
            raise LookupError("Message not found")
        return result.data[0]

    def append_detected_pattern(
        self, message_id: str, pattern_id: str
    ) -> dict[str, Any]:
        row = (
            self._admin.table("messages")
            .select("metadata")
            .eq("id", message_id)
            .limit(1)
            .execute()
        )
        if not row.data:
            raise LookupError("Message not found")
        metadata = row.data[0].get("metadata") or {}
        patterns = set(metadata.get("detected_patterns") or [])
        patterns.add(pattern_id)
        metadata["detected_patterns"] = sorted(patterns)
        return self.update_metadata(message_id, metadata)


messages = MessageStore()
