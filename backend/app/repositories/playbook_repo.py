from typing import Any, Optional

from app.core.database import db


class UserPlaybookRepository:
    @property
    def _admin(self):
        return db.admin_client

    def get_by_user_id(self, user_id: str) -> Optional[dict[str, Any]]:
        result = (
            self._admin.table("user_playbooks")
            .select("*")
            .eq("user_id", user_id)
            .limit(1)
            .execute()
        )
        return result.data[0] if result.data else None

    def create_empty(self, user_id: str) -> dict[str, Any]:
        payload = {
            "user_id": user_id,
            "works_well": [],
            "does_not_work": [],
            "suggested_experiments": [],
        }
        result = self._admin.table("user_playbooks").insert(payload).execute()
        if not result.data:
            raise RuntimeError("Failed to create user playbook")
        return result.data[0]


playbook_repo = UserPlaybookRepository()
