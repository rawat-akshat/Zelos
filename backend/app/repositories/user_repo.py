from typing import Any, Optional

from app.core.database import db


class UserRepository:
    @property
    def _admin(self):
        return db.admin_client

    def get_by_id(self, user_id: str) -> Optional[dict[str, Any]]:
        result = (
            self._admin.table("users")
            .select("*")
            .eq("id", user_id)
            .limit(1)
            .execute()
        )
        return result.data[0] if result.data else None

    def get_by_email(self, email: str) -> Optional[dict[str, Any]]:
        result = (
            self._admin.table("users")
            .select("*")
            .eq("email", email)
            .limit(1)
            .execute()
        )
        return result.data[0] if result.data else None

    def create(
        self,
        *,
        user_id: str,
        email: str,
        name: Optional[str] = None,
        avatar_url: Optional[str] = None,
        auth_provider: Optional[str] = None,
        auth_provider_id: Optional[str] = None,
    ) -> dict[str, Any]:
        payload = {
            "id": user_id,
            "email": email,
            "name": name,
            "avatar_url": avatar_url,
            "auth_provider": auth_provider,
            "auth_provider_id": auth_provider_id,
            "subscription_plan": "free",
            "onboarding_completed": False,
        }
        result = self._admin.table("users").insert(payload).execute()
        if not result.data:
            raise RuntimeError("Failed to create user")
        return result.data[0]


user_repo = UserRepository()
