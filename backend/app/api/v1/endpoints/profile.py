from uuid import UUID

from fastapi import APIRouter, Depends

from app.api.v1.endpoints.auth import get_current_user
from app.models.phase1_schemas import (
    ProfileFactUpsert,
    UserProfileResponse,
    UserProfileUpdate,
)
from app.services.profile_service import profile_service

router = APIRouter(tags=["Profile"])


@router.get("/", response_model=UserProfileResponse)
async def get_profile(user_id: UUID = Depends(get_current_user)):
    return profile_service.get_profile(str(user_id))


@router.patch("/", response_model=UserProfileResponse)
async def update_profile(
    body: UserProfileUpdate,
    user_id: UUID = Depends(get_current_user),
):
    return profile_service.update_profile(
        str(user_id),
        summary=body.summary,
        preferred_tone=body.preferred_tone,
    )


@router.patch("/facts", response_model=UserProfileResponse)
async def upsert_profile_fact(
    body: ProfileFactUpsert,
    user_id: UUID = Depends(get_current_user),
):
    return profile_service.upsert_fact(
        str(user_id),
        key=body.key,
        value=body.value,
        confidence=body.confidence,
        source_session_id=str(body.source_session_id)
        if body.source_session_id
        else None,
    )
