from uuid import UUID

from fastapi import APIRouter, Depends, File, HTTPException, UploadFile, status

from app.api.v1.endpoints.auth import get_current_user
from app.models.phase1_schemas import (
    CoachingPreferencesResponse,
    CoachingPreferencesUpdate,
    ProfileFactUpsert,
    UserProfileResponse,
    UserProfileUpdate,
    UserResponseV3,
)
from app.services.avatar_service import avatar_service
from app.services.auth_service import auth_service
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


@router.get("/preferences", response_model=CoachingPreferencesResponse)
async def get_coaching_preferences(user_id: UUID = Depends(get_current_user)):
    return profile_service.get_coaching_preferences(str(user_id))


@router.patch("/preferences", response_model=CoachingPreferencesResponse)
async def update_coaching_preferences(
    body: CoachingPreferencesUpdate,
    user_id: UUID = Depends(get_current_user),
):
    return profile_service.update_coaching_preferences(
        str(user_id),
        coaching_style=body.coaching_style,
        goal_checkins=body.goal_checkins,
        weekly_reflection=body.weekly_reflection,
        pattern_alerts=body.pattern_alerts,
    )


@router.post("/avatar", response_model=UserResponseV3)
async def upload_avatar(
    file: UploadFile = File(...),
    user_id: UUID = Depends(get_current_user),
):
    """Upload profile photo to object storage; replaces any previous avatar for this user."""
    try:
        user = auth_service.get_me(str(user_id))
        content_type = file.content_type or "application/octet-stream"
        data = await file.read()
        return avatar_service.upload_avatar(
            str(user_id),
            data=data,
            content_type=content_type,
            old_avatar_url=user.get("avatar_url"),
        )
    except ValueError as exc:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(exc)) from exc
    except LookupError as exc:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(exc)) from exc
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail=f"Avatar upload failed: {exc}",
        ) from exc
