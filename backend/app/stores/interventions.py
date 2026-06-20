from typing import Any, Optional

from app.core.database import db


class InterventionStore:
    @property
    def _admin(self):
        return db.admin_client

    def create(
        self,
        *,
        user_id: str,
        session_id: str,
        message_id: Optional[str],
        intervention_type: str,
        reason: Optional[str],
    ) -> dict[str, Any]:
        payload = {
            "user_id": user_id,
            "session_id": session_id,
            "message_id": message_id,
            "intervention_type": intervention_type,
            "reason": reason,
            "accepted_by_user": None,
        }
        result = self._admin.table("intervention_logs").insert(payload).execute()
        if not result.data:
            raise RuntimeError("Failed to create intervention log")
        return result.data[0]

    def update_acceptance(
        self, intervention_id: str, user_id: str, accepted: bool
    ) -> dict[str, Any]:
        result = (
            self._admin.table("intervention_logs")
            .update({"accepted_by_user": accepted})
            .eq("id", intervention_id)
            .eq("user_id", user_id)
            .execute()
        )
        if not result.data:
            raise LookupError("Intervention not found")
        return result.data[0]


interventions = InterventionStore()
