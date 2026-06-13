from fastapi import APIRouter, Depends, HTTPException, status
from typing import List, Optional
from uuid import UUID

from app.core.database import Database
from app.models.schemas import (
    FeedbackCreate,
    OutcomeCreate,
    SuccessResponse
)
from app.api.v1.endpoints.auth import get_current_user

router = APIRouter()
db = Database()


@router.post("/breakdown", response_model=SuccessResponse, status_code=status.HTTP_201_CREATED)
async def submit_breakdown_feedback(
    feedback_data: FeedbackCreate,
    user_id: UUID = Depends(get_current_user)
):
    """
    Submit feedback on a breakdown (helpful/not helpful).
    
    - **session_id**: The session to give feedback on
    - **helpful**: true (helpful), false (not helpful), null (partially helpful)
    - **feedback_reasons**: Optional list of reason tags
    - **custom_feedback**: Optional free-text feedback
    
    This feedback trains the AI to improve future breakdowns.
    """
    try:
        # Verify session belongs to user
        session_check = db.client.table("sessions")\
            .select("id")\
            .eq("id", str(feedback_data.session_id))\
            .eq("user_id", str(user_id))\
            .execute()
        
        if not session_check.data:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Session not found or does not belong to user"
            )
        
        # Insert feedback
        result = db.client.table("breakdown_feedback").insert({
            "session_id": str(feedback_data.session_id),
            "user_id": str(user_id),
            "helpful": feedback_data.helpful,
            "feedback_reasons": feedback_data.feedback_reasons,
            "custom_feedback": feedback_data.custom_feedback
        }).execute()
        
        if not result.data:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Failed to submit feedback"
            )
        
        return SuccessResponse(
            message="Thank you for your feedback! This helps us improve."
        )
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error submitting feedback: {str(e)}"
        )


@router.post("/outcome", response_model=SuccessResponse, status_code=status.HTTP_201_CREATED)
async def submit_outcome_tracking(
    outcome_data: OutcomeCreate,
    user_id: UUID = Depends(get_current_user)
):
    """
    Track outcome - did the user actually get unstuck?
    
    - **session_id**: The session to track outcome for
    - **outcome**: started | worked_briefly | worked_long | finished | not_started
    - **blocker_reason**: Optional - why they didn't start (if not_started)
    
    This is the most important metric - did Zelos actually help?
    """
    try:
        # Verify session belongs to user
        session_check = db.client.table("sessions")\
            .select("id")\
            .eq("id", str(outcome_data.session_id))\
            .eq("user_id", str(user_id))\
            .execute()
        
        if not session_check.data:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Session not found or does not belong to user"
            )
        
        # Insert outcome tracking
        result = db.client.table("outcome_tracking").insert({
            "session_id": str(outcome_data.session_id),
            "user_id": str(user_id),
            "outcome": outcome_data.outcome,
            "blocker_reason": outcome_data.blocker_reason
        }).execute()
        
        if not result.data:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Failed to submit outcome"
            )
        
        # Award bonus XP for positive outcomes
        xp_bonus = {
            "started": 10,
            "worked_briefly": 15,
            "worked_long": 25,
            "finished": 50,
            "not_started": 0
        }
        
        bonus = xp_bonus.get(outcome_data.outcome, 0)
        
        if bonus > 0:
            user_result = db.client.table("users")\
                .select("total_xp")\
                .eq("id", str(user_id))\
                .execute()
            
            if user_result.data:
                current_xp = user_result.data[0]["total_xp"]
                db.client.table("users")\
                    .update({"total_xp": current_xp + bonus})\
                    .eq("id", str(user_id))\
                    .execute()
        
        return SuccessResponse(
            message=f"Outcome tracked! {f'Earned {bonus} XP!' if bonus > 0 else ''}"
        )
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error submitting outcome: {str(e)}"
        )


@router.post("/blocker-confirmation", response_model=SuccessResponse, status_code=status.HTTP_201_CREATED)
async def submit_blocker_confirmation(
    session_id: UUID,
    was_accurate: bool,
    actual_blocker: Optional[str] = None,
    user_id: UUID = Depends(get_current_user)
):
    """
    Confirm if the AI correctly identified the blocker type.
    
    - **session_id**: The session to confirm blocker for
    - **was_accurate**: Did AI guess the right blocker?
    - **actual_blocker**: If not accurate, what was the real blocker?
    
    This helps improve blocker detection accuracy.
    """
    try:
        # Verify session belongs to user
        session_check = db.client.table("sessions")\
            .select("id, blocker_type")\
            .eq("id", str(session_id))\
            .eq("user_id", str(user_id))\
            .execute()
        
        if not session_check.data:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Session not found or does not belong to user"
            )
        
        session = session_check.data[0]
        
        # Insert blocker confirmation
        result = db.client.table("blocker_confirmation").insert({
            "session_id": str(session_id),
            "user_id": str(user_id),
            "detected_blocker": session["blocker_type"],
            "was_accurate": was_accurate,
            "actual_blocker": actual_blocker
        }).execute()
        
        if not result.data:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Failed to submit blocker confirmation"
            )
        
        return SuccessResponse(
            message="Thanks! This helps us understand you better."
        )
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error submitting blocker confirmation: {str(e)}"
        )


@router.get("/session/{session_id}/feedback")
async def get_session_feedback(
    session_id: UUID,
    user_id: UUID = Depends(get_current_user)
):
    """
    Get all feedback submitted for a session.
    
    Returns breakdown feedback, outcome, and blocker confirmation if available.
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
        
        # Get breakdown feedback
        breakdown_feedback = db.client.table("breakdown_feedback")\
            .select("*")\
            .eq("session_id", str(session_id))\
            .execute()
        
        # Get outcome tracking
        outcome = db.client.table("outcome_tracking")\
            .select("*")\
            .eq("session_id", str(session_id))\
            .execute()
        
        # Get blocker confirmation
        blocker = db.client.table("blocker_confirmation")\
            .select("*")\
            .eq("session_id", str(session_id))\
            .execute()
        
        return {
            "breakdown_feedback": breakdown_feedback.data[0] if breakdown_feedback.data else None,
            "outcome": outcome.data[0] if outcome.data else None,
            "blocker_confirmation": blocker.data[0] if blocker.data else None
        }
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error fetching feedback: {str(e)}"
        )