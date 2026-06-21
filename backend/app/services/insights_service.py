from datetime import datetime, timedelta, timezone
from typing import Any, Optional

from app.stores.messages import messages as message_store
from app.stores.patterns import patterns
from app.stores.playbooks import playbooks
from app.stores.sessions import sessions
from app.services.timeline_service import timeline_service


def _parse_dt(value: Any) -> datetime:
    if isinstance(value, datetime):
        return value
    if isinstance(value, str):
        return datetime.fromisoformat(value.replace("Z", "+00:00"))
    return datetime.min.replace(tzinfo=timezone.utc)


def _human_last_seen(dt: datetime) -> str:
    now = datetime.now(timezone.utc)
    if dt.tzinfo is None:
        dt = dt.replace(tzinfo=timezone.utc)
    delta = now - dt
    days = delta.days
    if days == 0:
        return "Today"
    if days == 1:
        return "Yesterday"
    if days < 7:
        return f"{days} days ago"
    if days < 14:
        return "1 week ago"
    return f"{days // 7} weeks ago"


PROFILE_METRIC_PATTERNS: dict[str, list[str]] = {
    "Self Awareness": ["reassurance_seeking", "confidence_collapse", "avoidance"],
    "Action Taking": ["action_gap", "research_spiral", "overplanning"],
    "Consistency": ["topic_drift", "avoidance", "perfectionism_loop"],
    "Decision Clarity": ["decision_paralysis", "comparison_trigger", "outcome_dependence"],
    "Follow Through": ["action_gap", "perfectionism_loop", "overplanning"],
    "Adaptability": ["topic_drift", "overwhelm", "comparison_trigger"],
}


class InsightsService:
    def get_insights(self, user_id: str) -> dict[str, Any]:
        session_rows, _ = sessions.list_for_user(user_id, page_size=100)
        active_sessions = [
            s for s in session_rows if s.get("status") in ("active", "paused")
        ]
        completed_sessions = [s for s in session_rows if s.get("status") == "completed"]

        user_patterns = patterns.list_all_user_behavior_patterns(user_id)
        occurrences = patterns.list_occurrences_for_user(user_id, limit=200)
        definitions = {d["pattern_id"]: d for d in patterns.list_definitions()}
        session_map = {s["id"]: s for s in session_rows}

        playbook_row = playbooks.get_by_user_id(user_id) or {}
        works_well = playbook_row.get("works_well") or []
        does_not_work = playbook_row.get("does_not_work") or []
        experiments_raw = playbook_row.get("suggested_experiments") or []

        has_data = bool(session_rows or user_patterns or occurrences)

        summary = {
            "active_goals": len(active_sessions),
            "patterns_detected": len(user_patterns),
            "playbook_rules_learned": len(works_well) + len(does_not_work),
            "experiments_completed": sum(
                1
                for e in experiments_raw
                if isinstance(e, dict) and e.get("status") == "completed"
            ),
        }

        behavioral_profile = self._build_behavioral_profile(user_patterns)

        insight_patterns = self._build_insight_patterns(
            user_patterns, occurrences, definitions, session_map
        )

        insight_occurrences = self._build_occurrences(
            occurrences, definitions, session_map
        )

        timeline = self._build_global_timeline(user_id, session_rows)

        active_experiments, completed_experiments = self._split_experiments(
            experiments_raw, session_map
        )

        return {
            "has_data": has_data,
            "summary": summary,
            "behavioral_profile": behavioral_profile,
            "patterns": insight_patterns,
            "occurrences": insight_occurrences,
            "playbook": {
                "works_well": works_well,
                "does_not_work": does_not_work,
            },
            "timeline": timeline,
            "active_experiments": active_experiments,
            "completed_experiments": completed_experiments,
        }

    def _build_behavioral_profile(
        self, user_patterns: list[dict[str, Any]]
    ) -> list[dict[str, Any]]:
        freq_map = {p["pattern_id"]: int(p.get("frequency") or 0) for p in user_patterns}
        metrics = []
        for label, pattern_ids in PROFILE_METRIC_PATTERNS.items():
            penalty = sum(min(15, freq_map.get(pid, 0) * 3) for pid in pattern_ids)
            value = max(35, min(95, 88 - penalty))
            metrics.append({"label": label, "value": value})
        return metrics

    def _build_insight_patterns(
        self,
        user_patterns: list[dict[str, Any]],
        occurrences: list[dict[str, Any]],
        definitions: dict[str, dict],
        session_map: dict[str, dict],
    ) -> list[dict[str, Any]]:
        goal_counts: dict[str, dict[str, int]] = {}
        for occ in occurrences:
            pid = occ["pattern_id"]
            sid = occ["session_id"]
            goal_counts.setdefault(pid, {})
            goal_counts[pid][sid] = goal_counts[pid].get(sid, 0) + 1

        now = datetime.now(timezone.utc)
        recent_cutoff = now - timedelta(days=14)
        older_cutoff = now - timedelta(days=28)

        result = []
        for row in user_patterns[:12]:
            pid = row["pattern_id"]
            defn = definitions.get(pid, {})
            last_seen = _parse_dt(row.get("last_seen_at"))
            conf = int(float(row.get("confidence_avg") or 0) * 100)

            recent = sum(
                1
                for o in occurrences
                if o["pattern_id"] == pid and _parse_dt(o["created_at"]) >= recent_cutoff
            )
            older = sum(
                1
                for o in occurrences
                if o["pattern_id"] == pid
                and older_cutoff <= _parse_dt(o["created_at"]) < recent_cutoff
            )
            if recent > older:
                trend = "increasing"
            elif recent < older:
                trend = "decreasing"
            else:
                trend = "stable"

            goals = []
            for sid, count in sorted(
                goal_counts.get(pid, {}).items(), key=lambda x: -x[1]
            )[:5]:
                session = session_map.get(sid, {})
                goals.append(
                    {
                        "goal_id": sid,
                        "goal_title": session.get("title")
                        or (session.get("goal") or "Goal")[:60],
                        "count": count,
                    }
                )

            result.append(
                {
                    "id": pid,
                    "name": defn.get("name") or pid,
                    "description": defn.get("description") or row.get("summary") or "",
                    "confidence": conf,
                    "observed_count": int(row.get("frequency") or 0),
                    "last_observed_at": _human_last_seen(last_seen),
                    "goals": goals,
                    "trend": trend,
                }
            )
        return result

    def _build_occurrences(
        self,
        occurrences: list[dict[str, Any]],
        definitions: dict[str, dict],
        session_map: dict[str, dict],
    ) -> list[dict[str, Any]]:
        result = []
        for occ in occurrences[:50]:
            sid = occ["session_id"]
            session = session_map.get(sid, {})
            message_id = occ.get("message_id")
            preview = ""
            if message_id:
                row = message_store.get_by_id(str(message_id))
                if row:
                    preview = (row.get("content") or "")[:160]

            created = _parse_dt(occ.get("created_at"))
            result.append(
                {
                    "id": str(occ["id"]),
                    "pattern_id": occ["pattern_id"],
                    "goal_id": sid,
                    "goal_title": session.get("title")
                    or (session.get("goal") or "Goal")[:60],
                    "conversation_id": sid,
                    "message_id": str(message_id) if message_id else "",
                    "confidence": float(occ.get("confidence") or 0),
                    "evidence_text": occ.get("evidence") or occ.get("note") or "",
                    "message_preview": preview,
                    "created_at": created.date().isoformat(),
                }
            )
        return result

    def _build_global_timeline(
        self, user_id: str, session_rows: list[dict[str, Any]]
    ) -> list[dict[str, Any]]:
        events: list[dict[str, Any]] = []
        for session in session_rows[:20]:
            sid = session["id"]
            title = session.get("title") or (session.get("goal") or "Goal")[:60]
            try:
                session_events = timeline_service.get_session_timeline(
                    user_id, sid, limit=8
                )
                for ev in session_events:
                    events.append(
                        {
                            "id": ev["id"],
                            "type": ev["type"],
                            "title": ev["title"],
                            "goal_title": title,
                            "created_at": ev["created_at"],
                        }
                    )
            except LookupError:
                continue

        events.sort(key=lambda e: _parse_dt(e.get("created_at")), reverse=True)
        return events[:24]

    def _split_experiments(
        self,
        experiments_raw: list[Any],
        session_map: dict[str, dict],
    ) -> tuple[list[dict[str, Any]], list[dict[str, Any]]]:
        active: list[dict[str, Any]] = []
        completed: list[dict[str, Any]] = []
        for i, item in enumerate(experiments_raw):
            if not isinstance(item, dict):
                continue
            title = item.get("title") or "Experiment"
            status = item.get("status") or "proposed"
            goal_title = "Your goals"
            sid = item.get("session_id")
            if sid and sid in session_map:
                s = session_map[sid]
                goal_title = s.get("title") or (s.get("goal") or "Goal")[:60]
            entry = {
                "id": item.get("id") or f"exp-{i}",
                "title": title,
                "goal_title": goal_title,
                "status": "completed" if status == "completed" else "active",
                "date": item.get("date") or datetime.now(timezone.utc).isoformat(),
            }
            if status == "completed":
                completed.append(entry)
            elif status in ("active", "proposed", "in_progress"):
                active.append(entry)
        return active, completed


insights_service = InsightsService()
