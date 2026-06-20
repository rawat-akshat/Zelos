"""
Pydantic schemas for Phase 1 V3 entities.

Maps to Supabase Postgres tables created in:
  supabase/migrations/20260317120000_phase1_v3_schema.sql
"""

from pydantic import BaseModel, ConfigDict, Field
from typing import Optional, List, Literal
from datetime import datetime
from uuid import UUID

from app.models.enums import (
    SubscriptionPlan,
    SessionStatus,
    TaskStatus,
    MessageRole,
    CoachMode,
    PatternSeverity,
    InterventionType,
    FocusSessionStatus,
    CandidatePatternStatus,
)


# ---------------------------------------------------------------------------
# Shared JSON shapes
# ---------------------------------------------------------------------------

class UserFact(BaseModel):
    key: str
    value: str
    confidence: float = Field(default=0.7, ge=0, le=1)
    source_session_id: Optional[UUID] = None
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None


class GoalHistoryEntry(BaseModel):
    old_goal: str
    new_goal: str
    changed_at: datetime
    reason: Optional[str] = None


class MessageMetadata(BaseModel):
    detected_patterns: Optional[List[str]] = None
    intervention_used: Optional[str] = None
    task_status_after_message: Optional[TaskStatus] = None


class SuggestedExperiment(BaseModel):
    title: str
    description: Optional[str] = None
    status: Optional[str] = "proposed"


# ---------------------------------------------------------------------------
# User
# ---------------------------------------------------------------------------

class UserResponseV3(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: UUID
    email: str
    name: Optional[str] = None
    avatar_url: Optional[str] = None
    subscription_plan: SubscriptionPlan = SubscriptionPlan.FREE
    onboarding_completed: bool = False
    auth_provider: Optional[str] = None
    created_at: datetime
    updated_at: Optional[datetime] = None


class ExchangeTokenRequest(BaseModel):
    supabase_token: str = Field(..., min_length=10)


class ExchangeTokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user_id: UUID
    user: UserResponseV3


# ---------------------------------------------------------------------------
# UserProfile
# ---------------------------------------------------------------------------

class UserProfileResponse(BaseModel):
    id: UUID
    user_id: UUID
    facts: List[UserFact] = Field(default_factory=list)
    summary: Optional[str] = None
    preferred_tone: Optional[str] = None
    updated_at: datetime


class UserProfileUpdate(BaseModel):
    summary: Optional[str] = None
    preferred_tone: Optional[str] = None
    facts: Optional[List[UserFact]] = None


# ---------------------------------------------------------------------------
# Session
# ---------------------------------------------------------------------------

class SessionCreateV3(BaseModel):
    title: str = Field(..., min_length=1, max_length=200)
    goal: str = Field(..., min_length=1, max_length=2000)
    first_message: Optional[str] = Field(None, max_length=2000)


class SessionUpdateGoal(BaseModel):
    new_goal: str = Field(..., min_length=1, max_length=2000)
    reason: Optional[str] = Field(None, max_length=500)


class SessionUpdateStatus(BaseModel):
    status: SessionStatus


class SessionResponseV3(BaseModel):
    id: UUID
    user_id: UUID
    title: Optional[str] = None
    goal: str
    goal_history: List[GoalHistoryEntry] = Field(default_factory=list)
    first_message: Optional[str] = None
    blocker_type: Optional[str] = None
    status: SessionStatus = SessionStatus.ACTIVE
    task_status: TaskStatus = TaskStatus.NOT_STARTED
    total_time_spent_seconds: int = 0
    opened_at: Optional[datetime] = None
    closed_at: Optional[datetime] = None
    last_message_at: Optional[datetime] = None
    created_at: datetime
    updated_at: Optional[datetime] = None


class SessionListV3(BaseModel):
    sessions: List[SessionResponseV3]
    total: int
    page: int
    page_size: int


# ---------------------------------------------------------------------------
# SessionActivityLog
# ---------------------------------------------------------------------------

class SessionActivityLogResponse(BaseModel):
    id: UUID
    user_id: UUID
    session_id: UUID
    opened_at: datetime
    closed_at: Optional[datetime] = None
    duration_seconds: Optional[int] = None
    created_at: datetime


class SessionCloseResponse(BaseModel):
    duration_seconds: int
    total_time_spent_seconds: int


# ---------------------------------------------------------------------------
# Message
# ---------------------------------------------------------------------------

class MessageCreateV3(BaseModel):
    content: str = Field(..., min_length=1, max_length=10000)
    role: MessageRole = MessageRole.USER
    mode: Optional[CoachMode] = None
    metadata: Optional[MessageMetadata] = None


class MessageResponseV3(BaseModel):
    id: UUID
    session_id: UUID
    user_id: UUID
    role: MessageRole
    content: str
    mode: Optional[str] = None
    metadata: Optional[MessageMetadata] = None
    created_at: datetime


# ---------------------------------------------------------------------------
# Patterns
# ---------------------------------------------------------------------------

class PatternDefinitionResponse(BaseModel):
    id: UUID
    pattern_id: str
    name: str
    description: str
    examples: List[str] = Field(default_factory=list)
    is_active: bool = True
    created_at: datetime


class PatternOccurrenceCreate(BaseModel):
    session_id: UUID
    message_id: UUID
    pattern_id: str
    note: Optional[str] = None
    evidence: Optional[str] = None
    confidence: float = Field(..., ge=0, le=1)


class PatternOccurrenceResponse(BaseModel):
    id: UUID
    user_id: UUID
    session_id: UUID
    message_id: UUID
    pattern_id: str
    note: Optional[str] = None
    evidence: Optional[str] = None
    confidence: float
    created_at: datetime


class UserBehaviorPatternResponse(BaseModel):
    id: UUID
    user_id: UUID
    pattern_id: str
    summary: Optional[str] = None
    frequency: int
    confidence_avg: float
    severity: PatternSeverity
    first_seen_at: datetime
    last_seen_at: datetime
    updated_at: datetime


class UserBehaviorPatternUpdate(BaseModel):
    summary: str = Field(..., min_length=1, max_length=2000)


# ---------------------------------------------------------------------------
# Intervention
# ---------------------------------------------------------------------------

class InterventionLogCreate(BaseModel):
    session_id: UUID
    message_id: Optional[UUID] = None
    intervention_type: InterventionType
    reason: Optional[str] = None


class InterventionLogUpdate(BaseModel):
    accepted_by_user: bool


class InterventionLogResponse(BaseModel):
    id: UUID
    user_id: UUID
    session_id: UUID
    message_id: Optional[UUID] = None
    intervention_type: InterventionType
    reason: Optional[str] = None
    accepted_by_user: Optional[bool] = None
    created_at: datetime


# ---------------------------------------------------------------------------
# FocusSession
# ---------------------------------------------------------------------------

class FocusSessionCreate(BaseModel):
    session_id: UUID
    task: str = Field(..., min_length=1, max_length=1000)
    steps: List[str] = Field(default_factory=list)


class FocusSessionComplete(BaseModel):
    status: Literal["completed", "cancelled"]


class FocusSessionResponse(BaseModel):
    id: UUID
    user_id: UUID
    session_id: UUID
    task: str
    steps: List[str] = Field(default_factory=list)
    status: FocusSessionStatus
    started_at: datetime
    completed_at: Optional[datetime] = None
    duration_seconds: Optional[int] = None
    created_at: datetime


# ---------------------------------------------------------------------------
# UserPlaybook
# ---------------------------------------------------------------------------

class UserPlaybookResponse(BaseModel):
    id: UUID
    user_id: UUID
    works_well: List[str] = Field(default_factory=list)
    does_not_work: List[str] = Field(default_factory=list)
    suggested_experiments: List[SuggestedExperiment] = Field(default_factory=list)
    updated_at: datetime


class UserPlaybookUpdate(BaseModel):
    works_well: Optional[List[str]] = None
    does_not_work: Optional[List[str]] = None
    suggested_experiments: Optional[List[SuggestedExperiment]] = None


# ---------------------------------------------------------------------------
# CandidatePattern (admin)
# ---------------------------------------------------------------------------

class CandidatePatternResponse(BaseModel):
    id: UUID
    normalized_label: str
    raw_labels: List[str] = Field(default_factory=list)
    short_definition: Optional[str] = None
    examples: List[str] = Field(default_factory=list)
    embedding_id: Optional[str] = None
    occurrence_count: int
    unique_user_count: int
    status: CandidatePatternStatus
    created_at: datetime
    updated_at: datetime


# ---------------------------------------------------------------------------
# LLM context (read model)
# ---------------------------------------------------------------------------

class LLMContextResponse(BaseModel):
    user_profile_summary: str = ""
    user_facts: List[UserFact] = Field(default_factory=list)
    preferred_tone: str = "supportive"
    current_session_goal: str
    task_status: TaskStatus
    session_status: SessionStatus
    goal_history: List[GoalHistoryEntry] = Field(default_factory=list)
    recent_messages: List[MessageResponseV3] = Field(default_factory=list)
    top_user_behavior_patterns: List[UserBehaviorPatternResponse] = Field(default_factory=list)
    recent_pattern_occurrences: List[PatternOccurrenceResponse] = Field(default_factory=list)
    pattern_definitions: List[PatternDefinitionResponse] = Field(default_factory=list)
    playbook: Optional[UserPlaybookResponse] = None
