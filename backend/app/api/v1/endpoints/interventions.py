from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException

from app.api.v1.endpoints.auth import get_current_user
from app.models.phase1_schemas import (
    InterventionLogCreate,
    InterventionLogResponse,
    InterventionLogUpdate,
)
from app.services.intervention_service import intervention_service

router = APIRouter(tags=["Interventions"])


@router.post("/", response_model=InterventionLogResponse, status_code=201)
async def create_intervention(
    body: InterventionLogCreate,
    user_id: UUID = Depends(get_current_user),
):
    try:
        return intervention_service.create(
            str(user_id),
            session_id=str(body.session_id),
            message_id=str(body.message_id) if body.message_id else None,
            intervention_type=body.intervention_type.value,
            reason=body.reason,
        )
    except LookupError as exc:
        raise HTTPException(status_code=404, detail=str(exc)) from exc


@router.patch("/{intervention_id}", response_model=InterventionLogResponse)
async def update_intervention(
    intervention_id: UUID,
    body: InterventionLogUpdate,
    user_id: UUID = Depends(get_current_user),
):
    try:
        return intervention_service.update_acceptance(
            str(user_id), str(intervention_id), body.accepted_by_user
        )
    except LookupError as exc:
        raise HTTPException(status_code=404, detail=str(exc)) from exc
