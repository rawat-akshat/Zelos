"""
Authentication Endpoints

Supabase Auth handles signup/login on the frontend.
FastAPI verifies tokens and provisions app user rows on first exchange.
"""

from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer

from app.models.phase1_schemas import ExchangeTokenRequest, ExchangeTokenResponse, UserResponseV3, UserUpdate
from app.models.schemas import SuccessResponse
from app.services.auth_service import auth_service
from app.utils.auth import decode_access_token

router = APIRouter(tags=["Authentication"])
security = HTTPBearer()


async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
) -> UUID:
    """
    Extract user ID from backend JWT.

    Client sends: Authorization: Bearer <token>
    """
    user_id = decode_access_token(credentials.credentials)

    if user_id is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token",
            headers={"WWW-Authenticate": "Bearer"},
        )

    return UUID(user_id)


@router.post("/exchange-token", response_model=ExchangeTokenResponse)
async def exchange_supabase_token(body: ExchangeTokenRequest):
    """
    Exchange a Supabase access token for a backend JWT.

    Also creates users / user_profiles / user_playbooks on first login.
    """
    try:
        return auth_service.exchange_token(body.supabase_token)
    except ValueError as exc:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=str(exc),
        ) from exc
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"Token exchange failed: {str(exc)}",
        ) from exc


@router.get("/me", response_model=UserResponseV3)
async def get_me(user_id: UUID = Depends(get_current_user)):
    """Get the authenticated user's account record."""
    try:
        return auth_service.get_me(str(user_id))
    except LookupError as exc:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found",
        ) from exc


@router.patch("/me", response_model=UserResponseV3)
async def update_me(
    body: UserUpdate,
    user_id: UUID = Depends(get_current_user),
):
    try:
        return auth_service.update_me(
            str(user_id),
            name=body.name,
            avatar_url=body.avatar_url,
            onboarding_completed=body.onboarding_completed,
        )
    except LookupError as exc:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found",
        ) from exc


@router.post("/logout", response_model=SuccessResponse)
async def logout(user_id: UUID = Depends(get_current_user)):
    """
    Logout is client-side for stateless JWTs.

    The token expires automatically after ACCESS_TOKEN_EXPIRE_MINUTES.
    """
    _ = user_id
    return {
        "success": True,
        "message": "Logged out successfully. Delete the token on the client.",
    }
