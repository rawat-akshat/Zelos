from uuid import UUID

from fastapi import APIRouter, Depends

from app.api.v1.endpoints.auth import get_current_user
from app.models.phase1_schemas import UserPlaybookResponse, UserPlaybookUpdate
from app.services.playbook_service import playbook_service

router = APIRouter(tags=["Playbook"])


@router.get("/", response_model=UserPlaybookResponse)
async def get_playbook(user_id: UUID = Depends(get_current_user)):
    return playbook_service.get_playbook(str(user_id))


@router.patch("/", response_model=UserPlaybookResponse)
async def update_playbook(
    body: UserPlaybookUpdate,
    user_id: UUID = Depends(get_current_user),
):
    experiments = None
    if body.suggested_experiments is not None:
        experiments = [e.model_dump() for e in body.suggested_experiments]
    return playbook_service.update_playbook(
        str(user_id),
        works_well=body.works_well,
        does_not_work=body.does_not_work,
        suggested_experiments=experiments,
    )
