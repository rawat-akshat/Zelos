from typing import List
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, status

from app.api.v1.endpoints.auth import get_current_user
from app.models.phase1_schemas import (
    ChatTurnResponse,
    MessageResponseV3,
    SendMessageRequest,
)
from app.services.chat_service import chat_service

router = APIRouter(tags=["Messages"])


@router.post(
    "/{session_id}/messages",
    response_model=ChatTurnResponse,
    status_code=status.HTTP_201_CREATED,
)
async def send_message(
    session_id: UUID,
    body: SendMessageRequest,
    user_id: UUID = Depends(get_current_user),
):
    try:
        result = chat_service.send_message(
            str(user_id),
            str(session_id),
            content=body.content,
            mode=body.mode.value if body.mode else None,
        )
        return ChatTurnResponse(**result)
    except LookupError as exc:
        raise HTTPException(status_code=404, detail=str(exc)) from exc
    except ValueError as exc:
        raise HTTPException(status_code=503, detail=str(exc)) from exc
    except Exception as exc:
        raise HTTPException(
            status_code=500,
            detail=f"Chat failed: {str(exc)}",
        ) from exc


@router.get("/{session_id}/messages", response_model=List[MessageResponseV3])
async def list_messages(
    session_id: UUID,
    user_id: UUID = Depends(get_current_user),
    limit: int = 100,
    offset: int = 0,
):
    try:
        return chat_service.list_messages(
            str(user_id),
            str(session_id),
            limit=limit,
            offset=offset,
        )
    except LookupError as exc:
        raise HTTPException(status_code=404, detail=str(exc)) from exc
