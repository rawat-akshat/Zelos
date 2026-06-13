from fastapi import APIRouter, Depends, HTTPException, status
from typing import List, Optional
from uuid import UUID
from datetime import datetime

from app.core.database import Database
from app.models.schemas import (
    SessionCreate,
    SessionResponse,
    SessionList,
    SuccessResponse
)
from app.api.v1.endpoints.auth import get_current_user

router = APIRouter()
db = Database()


@router.post("/", response_model=SessionResponse, status_code=status.HTTP_201_CREATED)
async def create_session(
    session_data: SessionCreate,
    user_id: UUID = Depends(get_current_user)
):
    """
    Create a new chat session with the user's first message.
    
    - **first_message**: The initial message that starts the conversation
    
    The session will be analyzed to detect blocker type and generate AI response.
    """
    try:
        # Insert new session into database
        result = db.client.table("sessions").insert({
            "user_id": str(user_id),
            "first_message": session_data.first_message,
            "status": "active",
            "total_actions": 0,
            "completed_actions": 0
        }).execute()
        
        if not result.data:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Failed to create session"
            )
        
        session = result.data[0]
        
        return SessionResponse(
            id=session["id"],
            user_id=session["user_id"],
            title=session.get("title"),
            first_message=session["first_message"],
            blocker_type=session.get("blocker_type"),
            status=session["status"],
            total_actions=session["total_actions"],
            completed_actions=session["completed_actions"],
            created_at=session["created_at"]
        )
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error creating session: {str(e)}"
        )


@router.get("/", response_model=SessionList)
async def get_user_sessions(
    user_id: UUID = Depends(get_current_user),
    page: int = 1,
    page_size: int = 20
):
    """
    Get all sessions for the authenticated user with pagination.
    
    - **page**: Page number (starts at 1)
    - **page_size**: Number of sessions per page (default: 20)
    """
    try:
        # Calculate offset
        offset = (page - 1) * page_size
        
        # Query sessions for this user
        result = db.client.table("sessions")\
            .select("*")\
            .eq("user_id", str(user_id))\
            .order("created_at", desc=True)\
            .range(offset, offset + page_size - 1)\
            .execute()
        
        # Get total count
        count_result = db.client.table("sessions")\
            .select("id", count="exact")\
            .eq("user_id", str(user_id))\
            .execute()
        
        total = count_result.count if count_result.count else len(result.data)
        
        sessions = [
            SessionResponse(
                id=s["id"],
                user_id=s["user_id"],
                title=s.get("title"),
                first_message=s["first_message"],
                blocker_type=s.get("blocker_type"),
                status=s["status"],
                total_actions=s["total_actions"],
                completed_actions=s["completed_actions"],
                created_at=s["created_at"]
            )
            for s in result.data
        ]
        
        return SessionList(
            sessions=sessions,
            total=total,
            page=page,
            page_size=page_size
        )
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error fetching sessions: {str(e)}"
        )


@router.get("/{session_id}", response_model=SessionResponse)
async def get_session(
    session_id: UUID,
    user_id: UUID = Depends(get_current_user)
):
    """
    Get a specific session by ID.
    
    Only returns the session if it belongs to the authenticated user.
    """
    try:
        result = db.client.table("sessions")\
            .select("*")\
            .eq("id", str(session_id))\
            .eq("user_id", str(user_id))\
            .execute()
        
        if not result.data:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Session not found"
            )
        
        session = result.data[0]
        
        return SessionResponse(
            id=session["id"],
            user_id=session["user_id"],
            title=session.get("title"),
            first_message=session["first_message"],
            blocker_type=session.get("blocker_type"),
            status=session["status"],
            total_actions=session["total_actions"],
            completed_actions=session["completed_actions"],
            created_at=session["created_at"]
        )
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error fetching session: {str(e)}"
        )


@router.patch("/{session_id}/title")
async def update_session_title(
    session_id: UUID,
    title: str,
    user_id: UUID = Depends(get_current_user)
):
    """
    Update a session's title.
    
    Only updates the session if it belongs to the authenticated user.
    """
    try:
        # First check if session exists and belongs to user
        check = db.client.table("sessions")\
            .select("id")\
            .eq("id", str(session_id))\
            .eq("user_id", str(user_id))\
            .execute()
        
        if not check.data:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Session not found"
            )
        
        # Update the session
        result = db.client.table("sessions")\
            .update({"title": title})\
            .eq("id", str(session_id))\
            .execute()
        
        if not result.data:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Failed to update session"
            )
        
        return SuccessResponse(message="Session title updated successfully")
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error updating session: {str(e)}"
        )


@router.patch("/{session_id}/status")
async def update_session_status(
    session_id: UUID,
    status: str,
    user_id: UUID = Depends(get_current_user)
):
    """
    Update a session's status (active/completed/archived).
    
    Only updates the session if it belongs to the authenticated user.
    """
    try:
        # Validate status
        valid_statuses = ["active", "completed", "archived"]
        if status not in valid_statuses:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Invalid status. Must be one of: {', '.join(valid_statuses)}"
            )
        
        # Check if session exists and belongs to user
        check = db.client.table("sessions")\
            .select("id")\
            .eq("id", str(session_id))\
            .eq("user_id", str(user_id))\
            .execute()
        
        if not check.data:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Session not found"
            )
        
        # Update the session
        result = db.client.table("sessions")\
            .update({"status": status})\
            .eq("id", str(session_id))\
            .execute()
        
        if not result.data:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Failed to update session status"
            )
        
        return SuccessResponse(message=f"Session status updated to {status}")
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error updating session status: {str(e)}"
        )


@router.delete("/{session_id}", response_model=SuccessResponse)
async def delete_session(
    session_id: UUID,
    user_id: UUID = Depends(get_current_user)
):
    """
    Delete a session (archives it by setting status to 'archived').
    
    Only deletes the session if it belongs to the authenticated user.
    """
    try:
        # Check if session exists and belongs to user
        check = db.client.table("sessions")\
            .select("id")\
            .eq("id", str(session_id))\
            .eq("user_id", str(user_id))\
            .execute()
        
        if not check.data:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Session not found"
            )
        
        # Soft delete (set status to archived)
        result = db.client.table("sessions")\
            .update({"status": "archived"})\
            .eq("id", str(session_id))\
            .execute()
        
        if not result.data:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Failed to delete session"
            )
        
        return SuccessResponse(message="Session deleted successfully")
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error deleting session: {str(e)}"
        )