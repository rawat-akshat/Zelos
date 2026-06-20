from typing import Any, Optional

from app.core.database import db
from app.repositories.playbook_repo import playbook_repo
from app.repositories.profile_repo import profile_repo
from app.repositories.user_repo import user_repo
from app.utils.auth import create_access_token


def _extract_name(supabase_user: Any) -> Optional[str]:
    metadata = getattr(supabase_user, "user_metadata", None) or {}
    if isinstance(metadata, dict):
        return metadata.get("full_name") or metadata.get("name")
    return None


def _extract_avatar(supabase_user: Any) -> Optional[str]:
    metadata = getattr(supabase_user, "user_metadata", None) or {}
    if isinstance(metadata, dict):
        return metadata.get("avatar_url")
    return None


def _extract_provider(supabase_user: Any) -> tuple[Optional[str], Optional[str]]:
    app_metadata = getattr(supabase_user, "app_metadata", None) or {}
    provider = None
    if isinstance(app_metadata, dict):
        provider = app_metadata.get("provider")
    return provider, str(supabase_user.id)


class AuthService:
    def verify_supabase_token(self, supabase_token: str):
        response = db.client.auth.get_user(supabase_token)
        if not response or not response.user:
            raise ValueError("Invalid Supabase token")
        return response.user

    def provision_user(self, supabase_user: Any) -> dict[str, Any]:
        user_id = str(supabase_user.id)
        email = supabase_user.email

        if not email:
            raise ValueError("Supabase user has no email")

        existing = user_repo.get_by_id(user_id)

        if existing:
            user = existing
        else:
            provider, provider_id = _extract_provider(supabase_user)
            user = user_repo.create(
                user_id=user_id,
                email=email,
                name=_extract_name(supabase_user),
                avatar_url=_extract_avatar(supabase_user),
                auth_provider=provider,
                auth_provider_id=provider_id,
            )

        if not profile_repo.get_by_user_id(user_id):
            profile_repo.create_empty(user_id)

        if not playbook_repo.get_by_user_id(user_id):
            playbook_repo.create_empty(user_id)

        return user

    def exchange_token(self, supabase_token: str) -> dict[str, Any]:
        supabase_user = self.verify_supabase_token(supabase_token)
        user = self.provision_user(supabase_user)
        access_token = create_access_token(data={"sub": str(supabase_user.id)})

        return {
            "access_token": access_token,
            "token_type": "bearer",
            "user_id": str(supabase_user.id),
            "user": user,
        }

    def get_me(self, user_id: str) -> dict[str, Any]:
        user = user_repo.get_by_id(user_id)
        if not user:
            raise LookupError("User not found")
        return user


auth_service = AuthService()
