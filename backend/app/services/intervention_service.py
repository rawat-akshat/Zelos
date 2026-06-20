from typing import Any, Optional

from app.stores.interventions import interventions
from app.stores.sessions import sessions


class InterventionService:
    def create(
        self,
        user_id: str,
        *,
        session_id: str,
        message_id: Optional[str],
        intervention_type: str,
        reason: Optional[str] = None,
    ) -> dict[str, Any]:
        if not sessions.get_by_id(session_id, user_id):
            raise LookupError("Session not found")
        return interventions.create(
            user_id=user_id,
            session_id=session_id,
            message_id=message_id,
            intervention_type=intervention_type,
            reason=reason,
        )

    def update_acceptance(
        self, user_id: str, intervention_id: str, accepted: bool
    ) -> dict[str, Any]:
        return interventions.update_acceptance(
            intervention_id, user_id, accepted
        )


intervention_service = InterventionService()
