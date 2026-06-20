"""
Domain enums for Zelos V3 backend.

Keep in sync with Postgres CHECK constraints in:
  supabase/migrations/20260317120000_phase1_v3_schema.sql
"""

from enum import StrEnum


class SubscriptionPlan(StrEnum):
    FREE = "free"
    PREMIUM = "premium"


class SessionStatus(StrEnum):
    ACTIVE = "active"
    PAUSED = "paused"
    COMPLETED = "completed"
    ABANDONED = "abandoned"
    ARCHIVED = "archived"  # legacy soft-delete value


class TaskStatus(StrEnum):
    NOT_STARTED = "not_started"
    IN_PROGRESS = "in_progress"
    BLOCKED = "blocked"
    DRIFTING = "drifting"
    COMPLETED = "completed"
    CHANGED = "changed"


class MessageRole(StrEnum):
    USER = "user"
    ASSISTANT = "assistant"
    SYSTEM = "system"


class CoachMode(StrEnum):
    """V3 modes (legacy task/learn/mixed still accepted in DB)."""
    DO = "do"
    UNDERSTAND = "understand"
    EXPLORE = "explore"
    TASK = "task"
    LEARN = "learn"
    MIXED = "mixed"


class PatternSeverity(StrEnum):
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"


class InterventionType(StrEnum):
    GENTLE_REDIRECT = "gentle_redirect"
    VALIDATE_THEN_REFOCUS = "validate_then_refocus"
    BREAK_INTO_MICRO_STEP = "break_into_micro_step"
    ASK_COMMITMENT = "ask_commitment"
    TASK_SWITCH_CONFIRMATION = "task_switch_confirmation"
    CONTINUE_NORMALLY = "continue_normally"


class FocusSessionStatus(StrEnum):
    STARTED = "started"
    COMPLETED = "completed"
    CANCELLED = "cancelled"


class CandidatePatternStatus(StrEnum):
    CANDIDATE = "candidate"
    REVIEWED = "reviewed"
    PROMOTED = "promoted"
    REJECTED = "rejected"


class V1PatternId(StrEnum):
    """Fixed V1 pattern catalog — seeded in pattern_definitions."""
    TOPIC_DRIFT = "topic_drift"
    RESEARCH_SPIRAL = "research_spiral"
    DECISION_PARALYSIS = "decision_paralysis"
    AVOIDANCE = "avoidance"
    COMPARISON_TRIGGER = "comparison_trigger"
    CONFIDENCE_COLLAPSE = "confidence_collapse"
    OVERWHELM = "overwhelm"
    PERFECTIONISM_LOOP = "perfectionism_loop"
    REASSURANCE_SEEKING = "reassurance_seeking"
    OUTCOME_DEPENDENCE = "outcome_dependence"
    OVERPLANNING = "overplanning"
    ACTION_GAP = "action_gap"
