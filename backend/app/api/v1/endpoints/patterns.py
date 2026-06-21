from typing import List, Optional
from datetime import datetime
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel

from app.api.v1.endpoints.auth import get_current_user
from app.models.phase1_schemas import (
    PatternDefinitionResponse,
    PatternOccurrenceCreate,
    PatternOccurrenceResponse,
    UserBehaviorPatternResponse,
    UserBehaviorPatternUpdate,
)
from app.services.pattern_service import pattern_service

router = APIRouter(tags=["Patterns"])


class SessionPatternSummary(BaseModel):
    pattern_id: str
    name: str
    description: str = ""
    confidence: float
    evidence_count: int
    last_detected_at: Optional[datetime] = None


@router.get("/definitions", response_model=List[PatternDefinitionResponse])
async def list_pattern_definitions(
    user_id: UUID = Depends(get_current_user),
):
    _ = user_id
    return pattern_service.list_definitions()


@router.get(
    "/session/{session_id}",
    response_model=List[SessionPatternSummary],
)
async def list_session_patterns(
    session_id: UUID,
    user_id: UUID = Depends(get_current_user),
):
    return pattern_service.list_session_patterns(str(user_id), str(session_id))


@router.post(
    "/occurrences",
    response_model=PatternOccurrenceResponse,
    status_code=201,
)
async def create_pattern_occurrence(
    body: PatternOccurrenceCreate,
    user_id: UUID = Depends(get_current_user),
):
    try:
        return pattern_service.save_occurrence(
            str(user_id),
            session_id=str(body.session_id),
            message_id=str(body.message_id),
            pattern_id=body.pattern_id,
            note=body.note,
            evidence=body.evidence,
            confidence=body.confidence,
        )
    except Exception as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc


@router.patch(
    "/users/{pattern_id}",
    response_model=UserBehaviorPatternResponse,
)
async def update_user_pattern_summary(
    pattern_id: str,
    body: UserBehaviorPatternUpdate,
    user_id: UUID = Depends(get_current_user),
):
    try:
        return pattern_service.update_user_pattern_summary(
            str(user_id), pattern_id, body.summary
        )
    except LookupError as exc:
        raise HTTPException(status_code=404, detail=str(exc)) from exc
