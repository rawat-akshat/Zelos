from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException

from app.api.v1.endpoints.auth import get_current_user
from app.models.phase1_schemas import (
    FocusSessionComplete,
    FocusSessionCreate,
    FocusSessionResponse,
)
from app.services.focus_service import focus_service

router = APIRouter(tags=["Focus Sessions"])


@router.post("/", response_model=FocusSessionResponse, status_code=201)
async def start_focus_session(
    body: FocusSessionCreate,
    user_id: UUID = Depends(get_current_user),
):
    try:
        return focus_service.start(
            str(user_id),
            session_id=str(body.session_id),
            task=body.task,
            steps=body.steps,
        )
    except LookupError as exc:
        raise HTTPException(status_code=404, detail=str(exc)) from exc


@router.patch("/{focus_id}/complete", response_model=FocusSessionResponse)
async def complete_focus_session(
    focus_id: UUID,
    body: FocusSessionComplete,
    user_id: UUID = Depends(get_current_user),
):
    try:
        return focus_service.complete(
            str(user_id), str(focus_id), status=body.status
        )
    except LookupError as exc:
        raise HTTPException(status_code=404, detail=str(exc)) from exc
