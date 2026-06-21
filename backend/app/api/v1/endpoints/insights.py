from uuid import UUID

from fastapi import APIRouter, Depends

from app.api.v1.endpoints.auth import get_current_user
from app.models.phase1_schemas import InsightsPageResponse
from app.services.insights_service import insights_service

router = APIRouter(tags=["Insights"])


@router.get("/", response_model=InsightsPageResponse)
async def get_insights(user_id: UUID = Depends(get_current_user)):
    return insights_service.get_insights(str(user_id))
