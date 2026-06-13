"""
API V1 Router

Collects all v1 endpoints and registers them.
"""

from fastapi import APIRouter
from app.api.v1.endpoints import auth

# Create main API router
router = APIRouter()

# Include all endpoint routers
router.include_router(auth.router)

# TODO: Add more routers
# router.include_router(sessions.router)
# router.include_router(actions.router)
# router.include_router(ai.router)