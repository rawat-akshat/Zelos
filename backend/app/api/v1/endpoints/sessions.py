from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, status

from app.api.v1.endpoints.auth import get_current_user
from app.models.phase1_schemas import (
    SessionActivityLogResponse,
    SessionCloseResponse,
    SessionCreateV3,
    SessionListV3,
    SessionResponseV3,
    SessionTitleUpdate,
    SessionUpdateGoal,
    SessionUpdateStatus,
)
from app.models.schemas import SuccessResponse
from app.services.session_service import session_service

router = APIRouter(tags=["Sessions"])


@router.post("/", response_model=SessionResponseV3, status_code=status.HTTP_201_CREATED)
async def create_session(
    body: SessionCreateV3,
    user_id: UUID = Depends(get_current_user),
):
    return session_service.create_session(
        str(user_id),
        title=body.title,
        goal=body.goal,
        first_message=body.first_message,
    )


@router.get("/", response_model=SessionListV3)
async def list_sessions(
    user_id: UUID = Depends(get_current_user),
    page: int = 1,
    page_size: int = 20,
    include_archived: bool = False,
):
    sessions, total = session_service.list_sessions(
        str(user_id),
        page=page,
        page_size=page_size,
        include_archived=include_archived,
    )
    return SessionListV3(
        sessions=sessions,
        total=total,
        page=page,
        page_size=page_size,
    )


@router.get("/{session_id}", response_model=SessionResponseV3)
async def get_session(
    session_id: UUID,
    user_id: UUID = Depends(get_current_user),
):
    try:
        return session_service.get_session(str(user_id), str(session_id))
    except LookupError as exc:
        raise HTTPException(status_code=404, detail=str(exc)) from exc


@router.patch("/{session_id}/goal", response_model=SessionResponseV3)
async def update_session_goal(
    session_id: UUID,
    body: SessionUpdateGoal,
    user_id: UUID = Depends(get_current_user),
):
    try:
        return session_service.update_goal(
            str(user_id),
            str(session_id),
            new_goal=body.new_goal,
            reason=body.reason,
        )
    except LookupError as exc:
        raise HTTPException(status_code=404, detail=str(exc)) from exc


@router.patch("/{session_id}/status", response_model=SessionResponseV3)
async def update_session_status(
    session_id: UUID,
    body: SessionUpdateStatus,
    user_id: UUID = Depends(get_current_user),
):
    try:
        return session_service.update_status(
            str(user_id), str(session_id), body.status.value
        )
    except LookupError as exc:
        raise HTTPException(status_code=404, detail=str(exc)) from exc


@router.patch("/{session_id}/title", response_model=SessionResponseV3)
async def update_session_title(
    session_id: UUID,
    body: SessionTitleUpdate,
    user_id: UUID = Depends(get_current_user),
):
    try:
        return session_service.update_title(
            str(user_id), str(session_id), body.title
        )
    except LookupError as exc:
        raise HTTPException(status_code=404, detail=str(exc)) from exc


@router.delete("/{session_id}", response_model=SuccessResponse)
async def archive_session(
    session_id: UUID,
    user_id: UUID = Depends(get_current_user),
):
    try:
        session_service.archive_session(str(user_id), str(session_id))
        return SuccessResponse(message="Session archived successfully")
    except LookupError as exc:
        raise HTTPException(status_code=404, detail=str(exc)) from exc


@router.post("/{session_id}/open", response_model=SessionActivityLogResponse)
async def open_session(
    session_id: UUID,
    user_id: UUID = Depends(get_current_user),
):
    try:
        return session_service.open_session(str(user_id), str(session_id))
    except LookupError as exc:
        raise HTTPException(status_code=404, detail=str(exc)) from exc


@router.post("/{session_id}/close", response_model=SessionCloseResponse)
async def close_session(
    session_id: UUID,
    user_id: UUID = Depends(get_current_user),
):
    try:
        return session_service.close_session(str(user_id), str(session_id))
    except LookupError as exc:
        raise HTTPException(status_code=404, detail=str(exc)) from exc
