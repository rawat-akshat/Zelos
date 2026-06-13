from fastapi import APIRouter, Depends, HTTPException, status
from typing import List
from uuid import UUID
from datetime import datetime

from app.core.database import Database
from app.models.schemas import (
    ActionCreate,
    ActionResponse,
    ActionComplete,
    SuccessResponse
)
from app.api.v1.endpoints.auth import get_current_user

router = APIRouter()
db = Database()


@router.post("/", response_model=ActionResponse, status_code=status.HTTP_201_CREATED)
async def create_action(
    action_data: ActionCreate,
    user_id: UUID = Depends(get_current_user)
):
    """
    Create a new action for a session.
    
    - **session_id**: The session this action belongs to
    - **description**: What the user needs to do
    - **estimated_minutes**: How long it should take (1-120 minutes)
    - **order_index**: Position in the action list (starts at 1)
    
    Verifies that the session belongs to the authenticated user.
    """
    try:
        # Verify session belongs to user
        session_check = db.client.table("sessions")\
            .select("id")\
            .eq("id", str(action_data.session_id))\
            .eq("user_id", str(user_id))\
            .execute()
        
        if not session_check.data:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Session not found or does not belong to user"
            )
        
        # Insert action
        result = db.client.table("actions").insert({
            "session_id": str(action_data.session_id),
            "description": action_data.description,
            "estimated_minutes": action_data.estimated_minutes,
            "order_index": action_data.order_index,
            "status": "pending"
        }).execute()
        
        if not result.data:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Failed to create action"
            )
        
        action = result.data[0]
        
        # Update session's total_actions count
        db.client.table("sessions")\
            .update({"total_actions": db.client.table("sessions").select("total_actions").eq("id", str(action_data.session_id)).execute().data[0]["total_actions"] + 1})\
            .eq("id", str(action_data.session_id))\
            .execute()
        
        return ActionResponse(
            id=action["id"],
            session_id=action["session_id"],
            description=action["description"],
            estimated_minutes=action["estimated_minutes"],
            order_index=action["order_index"],
            status=action["status"],
            completed_at=action.get("completed_at"),
            created_at=action["created_at"]
        )
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error creating action: {str(e)}"
        )


@router.get("/session/{session_id}", response_model=List[ActionResponse])
async def get_session_actions(
    session_id: UUID,
    user_id: UUID = Depends(get_current_user)
):
    """
    Get all actions for a specific session.
    
    Returns actions in order (by order_index).
    """
    try:
        # Verify session belongs to user
        session_check = db.client.table("sessions")\
            .select("id")\
            .eq("id", str(session_id))\
            .eq("user_id", str(user_id))\
            .execute()
        
        if not session_check.data:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Session not found or does not belong to user"
            )
        
        # Get actions
        result = db.client.table("actions")\
            .select("*")\
            .eq("session_id", str(session_id))\
            .order("order_index", desc=False)\
            .execute()
        
        actions = [
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
            for a in result.data
        ]
        
        return actions
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error fetching actions: {str(e)}"
        )


@router.get("/{action_id}", response_model=ActionResponse)
async def get_action(
    action_id: UUID,
    user_id: UUID = Depends(get_current_user)
):
    """
    Get a specific action by ID.
    
    Verifies that the action's session belongs to the authenticated user.
    """
    try:
        # Get action
        result = db.client.table("actions")\
            .select("*")\
            .eq("id", str(action_id))\
            .execute()
        
        if not result.data:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Action not found"
            )
        
        action = result.data[0]
        
        # Verify session belongs to user
        session_check = db.client.table("sessions")\
            .select("id")\
            .eq("id", action["session_id"])\
            .eq("user_id", str(user_id))\
            .execute()
        
        if not session_check.data:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="You do not have access to this action"
            )
        
        return ActionResponse(
            id=action["id"],
            session_id=action["session_id"],
            description=action["description"],
            estimated_minutes=action["estimated_minutes"],
            order_index=action["order_index"],
            status=action["status"],
            completed_at=action.get("completed_at"),
            created_at=action["created_at"]
        )
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error fetching action: {str(e)}"
        )


@router.patch("/{action_id}/complete", response_model=ActionResponse)
async def complete_action(
    action_id: UUID,
    completion_data: ActionComplete,
    user_id: UUID = Depends(get_current_user)
):
    """
    Mark an action as completed.
    
    - **actual_duration_seconds**: Optional - how long it actually took
    - **timer_used**: Whether the user used the focus timer
    
    Updates the session's completed_actions count and user's streak/XP.
    """
    try:
        # Get action
        action_result = db.client.table("actions")\
            .select("*")\
            .eq("id", str(action_id))\
            .execute()
        
        if not action_result.data:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Action not found"
            )
        
        action = action_result.data[0]
        
        # Verify session belongs to user
        session_check = db.client.table("sessions")\
            .select("id, completed_actions")\
            .eq("id", action["session_id"])\
            .eq("user_id", str(user_id))\
            .execute()
        
        if not session_check.data:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="You do not have access to this action"
            )
        
        # Update action status
        update_data = {
            "status": "completed",
            "completed_at": datetime.utcnow().isoformat()
        }
        
        result = db.client.table("actions")\
            .update(update_data)\
            .eq("id", str(action_id))\
            .execute()
        
        if not result.data:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Failed to complete action"
            )
        
        # Update session's completed_actions count
        session = session_check.data[0]
        db.client.table("sessions")\
            .update({"completed_actions": session["completed_actions"] + 1})\
            .eq("id", action["session_id"])\
            .execute()
        
        # Award XP to user (5 XP per action)
        user_result = db.client.table("users")\
            .select("total_xp")\
            .eq("id", str(user_id))\
            .execute()
        
        if user_result.data:
            current_xp = user_result.data[0]["total_xp"]
            db.client.table("users")\
                .update({"total_xp": current_xp + 5})\
                .eq("id", str(user_id))\
                .execute()
        
        completed_action = result.data[0]
        
        return ActionResponse(
            id=completed_action["id"],
            session_id=completed_action["session_id"],
            description=completed_action["description"],
            estimated_minutes=completed_action["estimated_minutes"],
            order_index=completed_action["order_index"],
            status=completed_action["status"],
            completed_at=completed_action.get("completed_at"),
            created_at=completed_action["created_at"]
        )
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error completing action: {str(e)}"
        )


@router.delete("/{action_id}", response_model=SuccessResponse)
async def delete_action(
    action_id: UUID,
    user_id: UUID = Depends(get_current_user)
):
    """
    Delete an action.
    
    Only allows deletion if the action's session belongs to the authenticated user.
    Updates the session's total_actions count.
    """
    try:
        # Get action to verify ownership
        action_result = db.client.table("actions")\
            .select("session_id, status")\
            .eq("id", str(action_id))\
            .execute()
        
        if not action_result.data:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Action not found"
            )
        
        action = action_result.data[0]
        session_id = action["session_id"]
        
        # Verify session belongs to user
        session_check = db.client.table("sessions")\
            .select("id, total_actions, completed_actions")\
            .eq("id", session_id)\
            .eq("user_id", str(user_id))\
            .execute()
        
        if not session_check.data:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="You do not have access to this action"
            )
        
        # Delete action
        db.client.table("actions")\
            .delete()\
            .eq("id", str(action_id))\
            .execute()
        
        # Update session counts
        session = session_check.data[0]
        new_total = max(0, session["total_actions"] - 1)
        new_completed = session["completed_actions"]
        
        # If the deleted action was completed, decrease completed count too
        if action["status"] == "completed":
            new_completed = max(0, new_completed - 1)
        
        db.client.table("sessions")\
            .update({
                "total_actions": new_total,
                "completed_actions": new_completed
            })\
            .eq("id", session_id)\
            .execute()
        
        return SuccessResponse(message="Action deleted successfully")
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error deleting action: {str(e)}"
        )