from typing import Any, Optional

from app.core.database import db


class ProfileStore:
    @property
    def _admin(self):
        return db.admin_client

    def get_by_user_id(self, user_id: str) -> Optional[dict[str, Any]]:
        result = (
            self._admin.table("user_profiles")
            .select("*")
            .eq("user_id", user_id)
            .limit(1)
            .execute()
        )
        return result.data[0] if result.data else None

    def create_empty(self, user_id: str) -> dict[str, Any]:
        payload = {
            "user_id": user_id,
            "facts": [],
            "summary": None,
            "preferred_tone": None,
        }
        result = self._admin.table("user_profiles").insert(payload).execute()
        if not result.data:
            raise RuntimeError("Failed to create user profile")
        return result.data[0]

    def update(self, user_id: str, updates: dict[str, Any]) -> dict[str, Any]:
        result = (
            self._admin.table("user_profiles")
            .update(updates)
            .eq("user_id", user_id)
            .execute()
        )
        if not result.data:
            raise LookupError("User profile not found")
        return result.data[0]


profiles = ProfileStore()
