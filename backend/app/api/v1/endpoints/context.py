from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException

from app.api.v1.endpoints.auth import get_current_user
from app.models.phase1_schemas import LLMContextResponse
from app.services.llm_context_service import llm_context_service

router = APIRouter(tags=["Context"])


@router.get("/llm/{session_id}", response_model=LLMContextResponse)
async def get_llm_context(
    session_id: UUID,
    user_id: UUID = Depends(get_current_user),
):
    try:
        return llm_context_service.get_llm_context(str(user_id), str(session_id))
    except LookupError as exc:
        raise HTTPException(status_code=404, detail=str(exc)) from exc


@router.get("/user")
async def get_user_global_context(user_id: UUID = Depends(get_current_user)):
    return llm_context_service.get_user_global_context(str(user_id))


@router.get("/session/{session_id}")
async def get_session_context(
    session_id: UUID,
    user_id: UUID = Depends(get_current_user),
):
    try:
        return llm_context_service.get_session_context(
            str(user_id), str(session_id)
        )
    except LookupError as exc:
        raise HTTPException(status_code=404, detail=str(exc)) from exc
