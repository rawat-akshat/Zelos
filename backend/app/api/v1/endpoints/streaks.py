from fastapi import APIRouter, Depends, HTTPException, status
from typing import List
from uuid import UUID
from datetime import datetime, timedelta

from app.core.database import Database
from app.models.schemas import (
    UserStats,
    SuccessResponse
)
from app.api.v1.endpoints.auth import get_current_user

router = APIRouter()
db = Database()


@router.post("/check-in", response_model=SuccessResponse)
async def daily_check_in(
    user_id: UUID = Depends(get_current_user)
):
    """
    Record a daily check-in to maintain/increase streak.
    
    Called automatically when user completes their first action of the day.
    Awards 10 XP for checking in.
    """
    try:
        # Get user's current streak data
        user_result = db.client.table("users")\
            .select("current_streak, total_xp")\
            .eq("id", str(user_id))\
            .execute()
        
        if not user_result.data:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found"
            )
        
        user = user_result.data[0]
        
        # Get most recent streak record
        streak_result = db.client.table("streaks")\
            .select("*")\
            .eq("user_id", str(user_id))\
            .order("check_in_date", desc=True)\
            .limit(1)\
            .execute()
        
        today = datetime.utcnow().date()
        current_streak = user["current_streak"]
        
        # Check if already checked in today
        if streak_result.data:
            last_check_in = datetime.fromisoformat(
                streak_result.data[0]["check_in_date"].replace('Z', '+00:00')
            ).date()
            
            if last_check_in == today:
                return SuccessResponse(
                    message=f"Already checked in today! Current streak: {current_streak} days 🔥"
                )
            
            # Check if streak continues (yesterday) or breaks
            yesterday = today - timedelta(days=1)
            
            if last_check_in == yesterday:
                # Streak continues!
                current_streak += 1
            elif last_check_in < yesterday:
                # Streak broken 😢
                current_streak = 1
        else:
            # First ever check-in
            current_streak = 1
        
        # Insert new streak record
        db.client.table("streaks").insert({
            "user_id": str(user_id),
            "check_in_date": today.isoformat(),
            "streak_count": current_streak
        }).execute()
        
        # Update user's current_streak and award XP
        db.client.table("users")\
            .update({
                "current_streak": current_streak,
                "total_xp": user["total_xp"] + 10
            })\
            .eq("id", str(user_id))\
            .execute()
        
        return SuccessResponse(
            message=f"Check-in successful! Current streak: {current_streak} days 🔥 (+10 XP)"
        )
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error during check-in: {str(e)}"
        )


@router.get("/history")
async def get_streak_history(
    user_id: UUID = Depends(get_current_user),
    limit: int = 30
):
    """
    Get user's streak history (last 30 days by default).
    
    Returns a list of check-in dates and streak counts.
    Useful for visualizing streak calendar.
    """
    try:
        result = db.client.table("streaks")\
            .select("*")\
            .eq("user_id", str(user_id))\
            .order("check_in_date", desc=True)\
            .limit(limit)\
            .execute()
        
        return {
            "history": result.data,
            "total_days": len(result.data)
        }
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error fetching streak history: {str(e)}"
        )


@router.get("/stats", response_model=UserStats)
async def get_user_stats(
    user_id: UUID = Depends(get_current_user)
):
    """
    Get user's complete statistics.
    
    Returns:
    - Current streak
    - Longest streak
    - Total XP
    - Total actions completed
    - Total sessions
    """
    try:
        # Get user data
        user_result = db.client.table("users")\
            .select("current_streak, total_xp")\
            .eq("id", str(user_id))\
            .execute()
        
        if not user_result.data:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found"
            )
        
        user = user_result.data[0]
        
        # Calculate longest streak from history
        streak_history = db.client.table("streaks")\
            .select("streak_count")\
            .eq("user_id", str(user_id))\
            .order("streak_count", desc=True)\
            .limit(1)\
            .execute()
        
        longest_streak = streak_history.data[0]["streak_count"] if streak_history.data else 0
        
        # Count total completed actions
        actions_result = db.client.table("actions")\
            .select("id", count="exact")\
            .eq("status", "completed")\
            .in_("session_id", 
                db.client.table("sessions")
                .select("id")
                .eq("user_id", str(user_id))
                .execute()
                .data
            )\
            .execute()
        
        total_actions = actions_result.count if actions_result.count else 0
        
        # Count total sessions
        sessions_result = db.client.table("sessions")\
            .select("id", count="exact")\
            .eq("user_id", str(user_id))\
            .execute()
        
        total_sessions = sessions_result.count if sessions_result.count else 0
        
        return UserStats(
            current_streak=user["current_streak"],
            longest_streak=longest_streak,
            total_xp=user["total_xp"],
            total_actions_completed=total_actions,
            total_sessions=total_sessions
        )
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error fetching user stats: {str(e)}"
        )


@router.get("/leaderboard")
async def get_leaderboard(
    limit: int = 10,
    user_id: UUID = Depends(get_current_user)
):
    """
    Get top users by streak or XP.
    
    Returns top 10 users by default (anonymous for V1).
    Shows current user's rank too.
    """
    try:
        # Get top users by current streak
        top_by_streak = db.client.table("users")\
            .select("id, name, current_streak, total_xp")\
            .order("current_streak", desc=True)\
            .limit(limit)\
            .execute()
        
        # Get top users by XP
        top_by_xp = db.client.table("users")\
            .select("id, name, current_streak, total_xp")\
            .order("total_xp", desc=True)\
            .limit(limit)\
            .execute()
        
        # Get current user's rank
        user_result = db.client.table("users")\
            .select("current_streak, total_xp")\
            .eq("id", str(user_id))\
            .execute()
        
        user_data = user_result.data[0] if user_result.data else None
        
        # Calculate user's rank by streak
        streak_rank = None
        if user_data:
            higher_streaks = db.client.table("users")\
                .select("id", count="exact")\
                .gt("current_streak", user_data["current_streak"])\
                .execute()
            streak_rank = (higher_streaks.count or 0) + 1
        
        return {
            "top_by_streak": top_by_streak.data,
            "top_by_xp": top_by_xp.data,
            "your_rank": {
                "streak": streak_rank,
                "current_streak": user_data["current_streak"] if user_data else 0,
                "total_xp": user_data["total_xp"] if user_data else 0
            }
        }
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error fetching leaderboard: {str(e)}"
        )