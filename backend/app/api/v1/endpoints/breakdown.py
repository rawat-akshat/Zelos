from fastapi import APIRouter, Depends, HTTPException, status
from uuid import UUID
import json

from app.core.database import Database
from app.llm.client import llm_client
from app.models.schemas import (
    BreakdownRequest,
    BreakdownResponse,
    ActionResponse
)
from app.api.v1.endpoints.auth import get_current_user

router = APIRouter()
db = Database()


BREAKDOWN_SYSTEM_PROMPT = """You are Zelos, an AI assistant that helps people overcome psychological blockers when starting tasks.

Your job is to:
1. Identify the BLOCKER TYPE (ambiguity, overwhelm, perfectionism, fear, or procrastination)
2. Write a SHORT validation message (1-2 sentences) that shows you understand their struggle
3. Break the task into 3-5 TINY micro-actions (2-15 minutes each)

RULES:
- Actions must be RIDICULOUSLY small (opening a doc, typing one line, etc.)
- Start with the absolute smallest possible step
- Each action should feel trivial to complete
- Use second-person ("Open...", "Type...", "Click...")
- Be warm and encouraging, not robotic

Return JSON:
{
  "blocker_type": "ambiguity|overwhelm|perfectionism|fear|procrastination",
  "validation_message": "I hear you - [blocker] is tough...",
  "actions": [
    {"description": "Open a blank doc", "estimated_minutes": 2, "order_index": 1},
    {"description": "Type your name at the top", "estimated_minutes": 1, "order_index": 2}
  ]
}"""


def _generate_breakdown(task: str) -> dict:
    ai_content = llm_client.complete(
        system_prompt=BREAKDOWN_SYSTEM_PROMPT,
        user_message=task,
        temperature=0.7,
        max_tokens=800,
        json_mode=True,
    )
    ai_data = json.loads(ai_content)
    if not all(k in ai_data for k in ["blocker_type", "validation_message", "actions"]):
        raise ValueError("AI response missing required fields")
    return ai_data


@router.post("/", response_model=BreakdownResponse)
async def create_breakdown(
    breakdown_data: BreakdownRequest,
    user_id: UUID = Depends(get_current_user)
):
    """
    Analyze a task and generate AI breakdown with micro-actions.

    - **task**: The user's task description
    - **mode**: Optional mode hint (task/learn/mixed)

    This endpoint:
    1. Calls the configured LLM to analyze the task
    2. Creates a new session
    3. Creates actions from AI response
    4. Returns the full breakdown
    """
    try:
        ai_data = _generate_breakdown(breakdown_data.task)

        session_result = db.client.table("sessions").insert({
            "user_id": str(user_id),
            "first_message": breakdown_data.task,
            "blocker_type": ai_data["blocker_type"],
            "validation_message": ai_data["validation_message"],
            "ai_model": llm_client.model,
            "status": "active",
            "total_actions": len(ai_data["actions"]),
            "completed_actions": 0
        }).execute()

        if not session_result.data:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Failed to create session"
            )

        session = session_result.data[0]
        session_id = session["id"]

        actions_to_insert = [
            {
                "session_id": session_id,
                "description": action["description"],
                "estimated_minutes": action["estimated_minutes"],
                "order_index": action["order_index"],
                "status": "pending"
            }
            for action in ai_data["actions"]
        ]

        actions_result = db.client.table("actions").insert(actions_to_insert).execute()

        if not actions_result.data:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Failed to create actions"
            )

        action_responses = [
            ActionResponse(
                id=a["id"],
                session_id=a["session_id"],
                description=a["description"],
                estimated_minutes=a["estimated_minutes"],
                order_index=a["order_index"],
                status=a["status"],
                completed_at=a.get("completed_at"),
                created_at=a["created_at"]
            )
            for a in actions_result.data
        ]

        return BreakdownResponse(
            session_id=session_id,
            blocker_type=ai_data["blocker_type"],
            validation_message=ai_data["validation_message"],
            actions=action_responses,
            suggested_questions=ai_data.get("suggested_questions")
        )

    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail=str(e),
        )
    except json.JSONDecodeError:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to parse AI response"
        )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error creating breakdown: {str(e)}"
        )


@router.get("/{session_id}/regenerate", response_model=BreakdownResponse)
async def regenerate_breakdown(
    session_id: UUID,
    user_id: UUID = Depends(get_current_user)
):
    """
    Regenerate the AI breakdown for an existing session.

    Deletes old actions and creates new ones based on fresh AI analysis.
    """
    try:
        session_result = db.client.table("sessions")\
            .select("*")\
            .eq("id", str(session_id))\
            .eq("user_id", str(user_id))\
            .execute()

        if not session_result.data:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Session not found"
            )

        session = session_result.data[0]
        ai_data = _generate_breakdown(session["first_message"])

        db.client.table("actions")\
            .delete()\
            .eq("session_id", str(session_id))\
            .execute()

        db.client.table("sessions")\
            .update({
                "blocker_type": ai_data["blocker_type"],
                "validation_message": ai_data["validation_message"],
                "total_actions": len(ai_data["actions"]),
                "completed_actions": 0
            })\
            .eq("id", str(session_id))\
            .execute()

        actions_to_insert = [
            {
                "session_id": str(session_id),
                "description": action["description"],
                "estimated_minutes": action["estimated_minutes"],
                "order_index": action["order_index"],
                "status": "pending"
            }
            for action in ai_data["actions"]
        ]

        actions_result = db.client.table("actions").insert(actions_to_insert).execute()

        action_responses = [
            ActionResponse(
                id=a["id"],
                session_id=a["session_id"],
                description=a["description"],
                estimated_minutes=a["estimated_minutes"],
                order_index=a["order_index"],
                status=a["status"],
                completed_at=a.get("completed_at"),
                created_at=a["created_at"]
            )
            for a in actions_result.data
        ]

        return BreakdownResponse(
            session_id=str(session_id),
            blocker_type=ai_data["blocker_type"],
            validation_message=ai_data["validation_message"],
            actions=action_responses,
            suggested_questions=ai_data.get("suggested_questions")
        )

    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail=str(e),
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error regenerating breakdown: {str(e)}"
        )
