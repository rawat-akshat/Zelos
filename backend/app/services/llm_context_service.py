import json
from typing import Any, Optional

from app.stores.messages import messages
from app.stores.patterns import patterns
from app.stores.playbooks import playbooks
from app.stores.profiles import profiles
from app.stores.sessions import sessions
from app.services.session_service import session_service


RECENT_MESSAGES_LIMIT = 20
TOP_PATTERNS_LIMIT = 5
RECENT_OCCURRENCES_LIMIT = 10


class LLMContextService:
    def build_context_block(self, context: dict[str, Any]) -> str:
        return json.dumps(context, indent=2, default=str)

    def get_llm_context(self, user_id: str, session_id: str) -> dict[str, Any]:
        session = session_service.get_session(user_id, session_id)
        profile = profiles.get_by_user_id(user_id)
        playbook = playbooks.get_by_user_id(user_id)
        recent_messages = messages.get_recent_for_session(
            session_id, RECENT_MESSAGES_LIMIT
        )
        top_patterns = patterns.list_top_user_patterns(
            user_id, TOP_PATTERNS_LIMIT
        )
        recent_occurrences = patterns.list_occurrences_for_session(
            user_id, session_id, RECENT_OCCURRENCES_LIMIT
        )
        pattern_definitions = patterns.list_definitions()

        return {
            "user_profile_summary": (profile or {}).get("summary") or "",
            "user_facts": (profile or {}).get("facts") or [],
            "preferred_tone": (profile or {}).get("preferred_tone") or "supportive",
            "current_session_goal": session["goal"],
            "task_status": session.get("task_status"),
            "session_status": session.get("status"),
            "goal_history": session.get("goal_history") or [],
            "recent_messages": recent_messages,
            "top_user_behavior_patterns": top_patterns,
            "recent_pattern_occurrences": recent_occurrences,
            "pattern_definitions": pattern_definitions,
            "playbook": playbook,
        }

    def get_user_global_context(self, user_id: str) -> dict[str, Any]:
        return {
            "profile": profiles.get_by_user_id(user_id),
            "top_patterns": patterns.list_top_user_patterns(user_id, 5),
            "playbook": playbooks.get_by_user_id(user_id),
            "pattern_definitions": patterns.list_definitions(),
        }

    def get_session_context(self, user_id: str, session_id: str) -> dict[str, Any]:
        session = session_service.get_session(user_id, session_id)
        messages = messages.list_for_session(session_id, limit=500)
        occurrences = patterns.list_occurrences_for_session(
            user_id, session_id, 50
        )
        return {
            "session": session,
            "messages": messages,
            "occurrences": occurrences,
        }


llm_context_service = LLMContextService()
