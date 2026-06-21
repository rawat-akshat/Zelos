from datetime import datetime
from typing import Any, Optional

from app.stores.patterns import patterns
from app.stores.sessions import sessions


def _parse_dt(value: Any) -> datetime:
    if isinstance(value, datetime):
        return value
    if isinstance(value, str):
        return datetime.fromisoformat(value.replace("Z", "+00:00"))
    return datetime.min


class TimelineService:
    def get_session_timeline(
        self,
        user_id: str,
        session_id: str,
        *,
        limit: Optional[int] = None,
    ) -> list[dict[str, Any]]:
        session = sessions.get_by_id(session_id, user_id)
        if not session:
            raise LookupError("Session not found")

        events: list[dict[str, Any]] = []

        created_at = session.get("created_at")
        if created_at:
            events.append(
                {
                    "id": f"goal-created-{session_id}",
                    "goal_id": session_id,
                    "type": "goal_created",
                    "title": f"Started: {session.get('title') or session.get('goal', 'Goal')[:60]}",
                    "description": session.get("goal"),
                    "message_id": None,
                    "created_at": created_at,
                }
            )

        for entry in session.get("goal_history") or []:
            if not isinstance(entry, dict):
                continue
            events.append(
                {
                    "id": f"goal-change-{entry.get('changed_at', '')}",
                    "goal_id": session_id,
                    "type": "decision_made",
                    "title": "Goal updated",
                    "description": entry.get("reason")
                    or f"{entry.get('old_goal', '')} → {entry.get('new_goal', '')}",
                    "message_id": None,
                    "created_at": entry.get("changed_at"),
                }
            )

        occurrences = patterns.list_occurrences_for_session(
            user_id, session_id, limit=50
        )
        definitions = {d["pattern_id"]: d for d in patterns.list_definitions()}

        for occ in occurrences:
            defn = definitions.get(occ["pattern_id"], {})
            name = defn.get("name") or occ["pattern_id"]
            event_type = (
                "topic_drift_detected"
                if occ["pattern_id"] == "topic_drift"
                else "pattern_detected"
            )
            events.append(
                {
                    "id": str(occ["id"]),
                    "goal_id": session_id,
                    "type": event_type,
                    "title": occ.get("note") or f"{name} noticed",
                    "description": occ.get("evidence"),
                    "confidence": occ.get("confidence"),
                    "message_id": str(occ["message_id"]),
                    "pattern_id": occ["pattern_id"],
                    "created_at": occ["created_at"],
                }
            )

        events.sort(key=lambda e: _parse_dt(e.get("created_at")), reverse=True)
        if limit:
            return events[:limit]
        return events


timeline_service = TimelineService()
