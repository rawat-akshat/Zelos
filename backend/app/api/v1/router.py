"""
API V1 Router

Collects all v1 endpoints and registers them.
"""

from fastapi import APIRouter
from app.api.v1.endpoints import auth, sessions, messages, actions, breakdown, feedback, streaks

# Create main API router
router = APIRouter()

# Include all endpoint routers
router.include_router(
    auth.router,
    prefix="/auth",
    tags=["Authentication"]
)
router.include_router(
    sessions.router,
    prefix="/sessions",
    tags=["Sessions"]
)
router.include_router(
    messages.router,
    prefix="/messages",
    tags=["Messages"]
)
router.include_router(
    actions.router,
    prefix="/actions",
    tags=["Actions"]
)
router.include_router(
    breakdown.router,
    prefix="/breakdown",
    tags=["AI Breakdown"]
)
router.include_router(
    feedback.router,
    prefix="/feedback",
    tags=["Feedback"]
)
router.include_router(
    streaks.router,
    prefix="/streaks",
    tags=["Streaks & Stats"]
)