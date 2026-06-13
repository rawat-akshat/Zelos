"""
Authentication Endpoints

Handles:
- User signup (magic link or OAuth)
- User login (return JWT token)
- Token verification

Since we're using Supabase Auth, we'll integrate with their system.
"""

from fastapi import APIRouter, HTTPException, Depends, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from app.models.schemas import UserCreate, UserResponse, SuccessResponse
from app.core.database import db
from app.utils.auth import create_access_token, decode_access_token
from typing import Optional
from uuid import UUID


router = APIRouter(prefix="/auth", tags=["Authentication"])
security = HTTPBearer()


# ============================================
# DEPENDENCY: Get Current User
# ============================================

async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security)
) -> UUID:
    """
    Dependency that extracts user ID from JWT token
    
    Use this in any endpoint that requires authentication:
    
    @router.get("/protected")
    async def protected(user_id: UUID = Depends(get_current_user)):
        # user_id is automatically extracted from token
        
    How it works:
    1. Client sends: Authorization: Bearer <token>
    2. FastAPI extracts token
    3. We decode token to get user_id
    4. Return user_id (or raise error if invalid)
    """
    token = credentials.credentials
    
    user_id = decode_access_token(token)
    
    if user_id is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    return UUID(user_id)


# ============================================
# SIGNUP ENDPOINT
# ============================================

@router.post("/signup", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
async def signup(user_data: UserCreate):
    """
    Sign up a new user
    
    Since we're using Supabase Auth:
    1. User signs up via Supabase Auth (magic link/OAuth)
    2. Supabase creates entry in auth.users
    3. Our trigger auto-creates entry in public.users
    4. This endpoint is for getting user data after signup
    
    For now, this is a placeholder that shows the pattern.
    Real signup happens via Supabase Auth directly from frontend.
    """
    # In production, Supabase handles signup
    # This endpoint is mostly for documentation
    
    # Check if user already exists
    response = db.admin_client.table('users').select('*').eq('email', user_data.email).execute()
    
    if response.data:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User with this email already exists"
        )
    
    # In real implementation, Supabase Auth creates the user
    # and our trigger creates the profile
    
    raise HTTPException(
        status_code=status.HTTP_501_NOT_IMPLEMENTED,
        detail="Signup handled by Supabase Auth directly. Use Supabase client in frontend."
    )


# ============================================
# LOGIN ENDPOINT
# ============================================

@router.post("/login")
async def login(email: str, password: str):
    """
    Login user and return JWT token
    
    For V1, we're using Supabase Auth for login.
    This endpoint is a placeholder showing the pattern.
    
    Real flow:
    1. Frontend calls Supabase Auth directly
    2. Supabase returns session token
    3. Frontend uses that token for API calls
    """
    raise HTTPException(
        status_code=status.HTTP_501_NOT_IMPLEMENTED,
        detail="Login handled by Supabase Auth directly. Use Supabase client in frontend."
    )


# ============================================
# GET CURRENT USER
# ============================================

@router.get("/me", response_model=UserResponse)
async def get_me(user_id: UUID = Depends(get_current_user)):
    """
    Get current user's profile
    
    Requires authentication (JWT token in Authorization header)
    
    Example:
        GET /api/v1/auth/me
        Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
    """
    # Fetch user from database
    response = db.client.table('users').select('*').eq('id', str(user_id)).execute()
    
    if not response.data:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    return response.data[0]


# ============================================
# EXCHANGE SUPABASE TOKEN
# ============================================

@router.post("/exchange-token")
async def exchange_supabase_token(supabase_token: str):
    """
    Exchange Supabase auth token for our JWT token
    
    Flow:
    1. User logs in via Supabase Auth (frontend)
    2. Supabase returns access_token
    3. Frontend sends that token here
    4. We verify it with Supabase
    5. We return our own JWT token
    
    Why? So we can add custom claims and control expiration.
    """
    try:
        # Verify token with Supabase
        response = db.client.auth.get_user(supabase_token)
        
        if not response.user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid Supabase token"
            )
        
        user_id = response.user.id
        
        # Create our own JWT token
        access_token = create_access_token(data={"sub": str(user_id)})
        
        return {
            "access_token": access_token,
            "token_type": "bearer",
            "user_id": user_id
        }
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"Token exchange failed: {str(e)}"
        )


# ============================================
# LOGOUT (Token Invalidation)
# ============================================

@router.post("/logout", response_model=SuccessResponse)
async def logout(user_id: UUID = Depends(get_current_user)):
    """
    Logout user
    
    Since we're using stateless JWT tokens, we can't truly "invalidate" them.
    They expire automatically after 30 minutes.
    
    In production, you might:
    1. Maintain a blacklist of tokens in Redis
    2. Use shorter expiration times
    3. Implement refresh tokens
    
    For V1, logout just tells the frontend to delete the token.
    """
    return {
        "success": True,
        "message": "Logged out successfully. Token will expire in 30 minutes."
    }