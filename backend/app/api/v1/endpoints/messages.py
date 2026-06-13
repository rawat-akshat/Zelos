from fastapi import APIRouter, Depends, HTTPException, status
from typing import List
from uuid import UUID

from app.core.database import Database
from app.models.schemas import (
    MessageCreate,
    MessageResponse,
    SuccessResponse
)
from app.api.v1.endpoints.auth import get_current_user

router = APIRouter()
db = Database()


@router.post("/", response_model=MessageResponse, status_code=status.HTTP_201_CREATED)
async def create_message(
    message_data: MessageCreate,
    user_id: UUID = Depends(get_current_user)
):
    """
    Create a new message in a session.
    
    - **session_id**: The session this message belongs to
    - **content**: The message text
    - **role**: Either 'user' or 'assistant'
    - **mode**: Optional mode (task/learn/mixed)
    
    Verifies that the session belongs to the authenticated user.
    """
    try:
        # Verify session belongs to user
        session_check = db.client.table("sessions")\
            .select("id")\
            .eq("id", str(message_data.session_id))\
            .eq("user_id", str(user_id))\
            .execute()
        
        if not session_check.data:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Session not found or does not belong to user"
            )
        
        # Insert message
        result = db.client.table("messages").insert({
            "session_id": str(message_data.session_id),
            "role": message_data.role,
            "content": message_data.content,
            "mode": message_data.mode
        }).execute()
        
        if not result.data:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Failed to create message"
            )
        
        message = result.data[0]
        
        return MessageResponse(
            id=message["id"],
            session_id=message["session_id"],
            role=message["role"],
            content=message["content"],
            mode=message.get("mode"),
            created_at=message["created_at"]
        )
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error creating message: {str(e)}"
        )


@router.get("/session/{session_id}", response_model=List[MessageResponse])
async def get_session_messages(
    session_id: UUID,
    user_id: UUID = Depends(get_current_user),
    limit: int = 100,
    offset: int = 0
):
    """
    Get all messages for a specific session.
    
    - **session_id**: The session to get messages from
    - **limit**: Maximum number of messages to return (default: 100)
    - **offset**: Number of messages to skip (default: 0)
    
    Returns messages in chronological order (oldest first).
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
        
        # Get messages
        result = db.client.table("messages")\
            .select("*")\
            .eq("session_id", str(session_id))\
            .order("created_at", desc=False)\
            .range(offset, offset + limit - 1)\
            .execute()
        
        messages = [
            MessageResponse(
                id=m["id"],
                session_id=m["session_id"],
                role=m["role"],
                content=m["content"],
                mode=m.get("mode"),
                created_at=m["created_at"]
            )
            for m in result.data
        ]
        
        return messages
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error fetching messages: {str(e)}"
        )


@router.get("/{message_id}", response_model=MessageResponse)
async def get_message(
    message_id: UUID,
    user_id: UUID = Depends(get_current_user)
):
    """
    Get a specific message by ID.
    
    Verifies that the message's session belongs to the authenticated user.
    """
    try:
        # Get message
        result = db.client.table("messages")\
            .select("*")\
            .eq("id", str(message_id))\
            .execute()
        
        if not result.data:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Message not found"
            )
        
        message = result.data[0]
        
        # Verify session belongs to user
        session_check = db.client.table("sessions")\
            .select("id")\
            .eq("id", message["session_id"])\
            .eq("user_id", str(user_id))\
            .execute()
        
        if not session_check.data:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="You do not have access to this message"
            )
        
        return MessageResponse(
            id=message["id"],
            session_id=message["session_id"],
            role=message["role"],
            content=message["content"],
            mode=message.get("mode"),
            created_at=message["created_at"]
        )
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error fetching message: {str(e)}"
        )


@router.delete("/{message_id}", response_model=SuccessResponse)
async def delete_message(
    message_id: UUID,
    user_id: UUID = Depends(get_current_user)
):
    """
    Delete a message.
    
    Only allows deletion if the message's session belongs to the authenticated user.
    """
    try:
        # Get message to verify ownership
        message_result = db.client.table("messages")\
            .select("session_id")\
            .eq("id", str(message_id))\
            .execute()
        
        if not message_result.data:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Message not found"
            )
        
        session_id = message_result.data[0]["session_id"]
        
        # Verify session belongs to user
        session_check = db.client.table("sessions")\
            .select("id")\
            .eq("id", session_id)\
            .eq("user_id", str(user_id))\
            .execute()
        
        if not session_check.data:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="You do not have access to this message"
            )
        
        # Delete message
        result = db.client.table("messages")\
            .delete()\
            .eq("id", str(message_id))\
            .execute()
        
        return SuccessResponse(message="Message deleted successfully")
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error deleting message: {str(e)}"
        )