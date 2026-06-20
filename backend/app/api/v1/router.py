"""
API V1 Router — V3 behavioral coach backend.
"""

from fastapi import APIRouter

from app.api.v1.endpoints import (
    auth,
    context,
    focus_sessions,
    interventions,
    messages,
    patterns,
    playbook,
    profile,
    sessions,
)

router = APIRouter()

router.include_router(auth.router, prefix="/auth", tags=["Authentication"])
router.include_router(sessions.router, prefix="/sessions", tags=["Sessions"])
router.include_router(messages.router, prefix="/sessions", tags=["Messages"])
router.include_router(patterns.router, prefix="/patterns", tags=["Patterns"])
router.include_router(
    interventions.router, prefix="/interventions", tags=["Interventions"]
)
router.include_router(
    focus_sessions.router, prefix="/focus-sessions", tags=["Focus Sessions"]
)
router.include_router(profile.router, prefix="/profile", tags=["Profile"])
router.include_router(playbook.router, prefix="/playbook", tags=["Playbook"])
router.include_router(context.router, prefix="/context", tags=["Context"])
