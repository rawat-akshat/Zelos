"""Structured turn analysis — patterns, interventions, task status."""

VALID_PATTERN_IDS = [
    "topic_drift",
    "research_spiral",
    "decision_paralysis",
    "avoidance",
    "comparison_trigger",
    "confidence_collapse",
    "overwhelm",
    "perfectionism_loop",
    "reassurance_seeking",
    "outcome_dependence",
    "overplanning",
    "action_gap",
]

VALID_INTERVENTION_TYPES = [
    "gentle_redirect",
    "validate_then_refocus",
    "break_into_micro_step",
    "ask_commitment",
    "task_switch_confirmation",
    "continue_normally",
]

VALID_TASK_STATUSES = [
    "not_started",
    "in_progress",
    "blocked",
    "drifting",
    "completed",
    "changed",
]

ANALYSIS_SYSTEM_PROMPT = f"""You are Zelos's behavioral analysis layer. Given the session goal, recent conversation, and the coach's latest reply, produce structured JSON.

Valid pattern_id values: {", ".join(VALID_PATTERN_IDS)}
Valid intervention_type values: {", ".join(VALID_INTERVENTION_TYPES)}
Valid task_status values: {", ".join(VALID_TASK_STATUSES)}

Rules:
- Only flag patterns you see clear evidence for in THIS turn (confidence 0.5–1.0).
- timeline_title: short human label for the timeline, e.g. "Researched resume options" or "Talked about vacation (drift detected)".
- intervention: include only when a pattern warrants a nudge; display_type is "inline", "floating", or "none".
- If no pattern detected, return empty detected_patterns and intervention with display_type "none".
- task_status reflects progress toward the session goal after this turn.

Return JSON only:
{{
  "detected_patterns": [
    {{"pattern_id": "topic_drift", "confidence": 0.82, "evidence": "...", "timeline_title": "..."}}
  ],
  "intervention": {{
    "intervention_type": "gentle_redirect",
    "display_type": "inline",
    "message": "Short nudge shown to user",
    "pattern_name": "Topic Drift"
  }},
  "task_status": "in_progress"
}}"""


def build_analysis_user_message(
    *,
    session_goal: str,
    user_message: str,
    assistant_reply: str,
    pattern_catalog: list[dict],
) -> str:
    catalog_lines = "\n".join(
        f"- {p['pattern_id']}: {p['name']} — {p['description']}"
        for p in pattern_catalog[:12]
    )
    return f"""SESSION GOAL: {session_goal}

PATTERN CATALOG:
{catalog_lines}

USER MESSAGE:
{user_message}

COACH REPLY:
{assistant_reply}

Analyze this turn and return JSON."""
