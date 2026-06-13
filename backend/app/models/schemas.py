"""
Pydantic Models (Schemas)

These define the structure of data:
- What clients send TO the API (request models)
- What API sends BACK to clients (response models)

Think of them as contracts:
"If you want to create a session, you MUST send these fields"
"When you get a user, you'll receive these fields"

Why Pydantic?
- Automatic validation (rejects invalid data)
- Auto-generated docs (appears in /docs)
- Type hints for IDE autocomplete
"""

from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List
from datetime import datetime
from uuid import UUID


# ============================================
# USER MODELS
# ============================================

class UserBase(BaseModel):
    """Base user fields (shared by create/update)"""
    email: EmailStr
    name: Optional[str] = None


class UserCreate(UserBase):
    """Schema for creating a new user"""
    password: Optional[str] = None  # Optional for OAuth


class UserResponse(UserBase):
    """Schema for returning user data (what client receives)"""
    id: UUID
    avatar_url: Optional[str] = None
    current_streak: int = 0
    total_xp: int = 0
    created_at: datetime
    
    class Config:
        from_attributes = True  # Allows conversion from ORM models


class UserStats(BaseModel):
    """User statistics for dashboard"""
    current_streak: int
    longest_streak: int
    total_xp: int
    total_actions_completed: int
    total_sessions: int


# ============================================
# SESSION MODELS (Chat conversations)
# ============================================

class SessionCreate(BaseModel):
    """Schema for creating a new chat session"""
    first_message: str = Field(..., min_length=1, max_length=1000)
    
    class Config:
        json_schema_extra = {
            "example": {
                "first_message": "I need to write my resume but don't know where to start"
            }
        }


class SessionResponse(BaseModel):
    """Schema for returning session data"""
    id: UUID
    user_id: UUID
    title: Optional[str] = None
    first_message: str
    blocker_type: Optional[str] = None
    status: str = "active"
    total_actions: int = 0
    completed_actions: int = 0
    created_at: datetime
    
    class Config:
        from_attributes = True


class SessionList(BaseModel):
    """List of sessions with pagination"""
    sessions: List[SessionResponse]
    total: int
    page: int
    page_size: int


# ============================================
# MESSAGE MODELS
# ============================================

class MessageCreate(BaseModel):
    """Schema for creating a message"""
    session_id: UUID
    content: str = Field(..., min_length=1, max_length=5000)
    role: str = Field(..., pattern="^(user|assistant)$")
    mode: Optional[str] = Field(None, pattern="^(task|learn|mixed)$")


class MessageResponse(BaseModel):
    """Schema for returning message data"""
    id: UUID
    session_id: UUID
    role: str
    content: str
    mode: Optional[str] = None
    created_at: datetime
    
    class Config:
        from_attributes = True


# ============================================
# ACTION MODELS
# ============================================

class ActionCreate(BaseModel):
    """Schema for creating an action"""
    session_id: UUID
    description: str = Field(..., min_length=1, max_length=500)
    estimated_minutes: int = Field(..., ge=1, le=120)  # 1-120 minutes
    order_index: int = Field(..., ge=1)


class ActionResponse(BaseModel):
    """Schema for returning action data"""
    id: UUID
    session_id: UUID
    description: str
    estimated_minutes: int
    order_index: int
    status: str = "pending"
    completed_at: Optional[datetime] = None
    created_at: datetime
    
    class Config:
        from_attributes = True


class ActionComplete(BaseModel):
    """Schema for marking action as complete"""
    actual_duration_seconds: Optional[int] = None
    timer_used: bool = False


# ============================================
# AI BREAKDOWN MODELS
# ============================================

class BreakdownRequest(BaseModel):
    """Schema for requesting AI task breakdown"""
    task: str = Field(..., min_length=5, max_length=1000)
    mode: Optional[str] = Field(None, pattern="^(task|learn|mixed)$")
    
    class Config:
        json_schema_extra = {
            "example": {
                "task": "I need to write my resume but I don't know where to start",
                "mode": "task"
            }
        }


class BreakdownResponse(BaseModel):
    """Schema for AI breakdown response"""
    session_id: UUID
    blocker_type: str
    validation_message: str
    actions: List[ActionResponse]
    suggested_questions: Optional[List[str]] = None  # For Learn Mode
    
    class Config:
        json_schema_extra = {
            "example": {
                "session_id": "123e4567-e89b-12d3-a456-426614174000",
                "blocker_type": "ambiguity",
                "validation_message": "It sounds like you're stuck because 'write resume' feels huge...",
                "actions": [
                    {
                        "description": "Open a blank doc and type your name + contact info",
                        "estimated_minutes": 2,
                        "order_index": 1
                    }
                ]
            }
        }


# ============================================
# FEEDBACK MODELS
# ============================================

class FeedbackCreate(BaseModel):
    """Schema for submitting feedback"""
    session_id: UUID
    helpful: Optional[bool] = None  # true/false/null (partially)
    feedback_reasons: Optional[List[str]] = None
    custom_feedback: Optional[str] = None


class OutcomeCreate(BaseModel):
    """Schema for outcome tracking (did user get unstuck?)"""
    session_id: UUID
    outcome: str = Field(..., pattern="^(started|worked_briefly|worked_long|finished|not_started)$")
    blocker_reason: Optional[str] = None


# ============================================
# GENERIC RESPONSES
# ============================================

class SuccessResponse(BaseModel):
    """Generic success response"""
    success: bool = True
    message: str


class ErrorResponse(BaseModel):
    """Generic error response"""
    success: bool = False
    error: str
    detail: Optional[str] = None