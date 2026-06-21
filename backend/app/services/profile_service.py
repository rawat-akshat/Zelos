from datetime import datetime, timezone
from typing import Any, Optional

from app.stores.profiles import profiles


def _utcnow_iso() -> str:
    return datetime.now(timezone.utc).isoformat()


class ProfileService:
    def get_profile(self, user_id: str) -> dict[str, Any]:
        profile = profiles.get_by_user_id(user_id)
        if not profile:
            profile = profiles.create_empty(user_id)
        return profile

    def upsert_fact(
        self,
        user_id: str,
        *,
        key: str,
        value: str,
        confidence: float = 0.7,
        source_session_id: Optional[str] = None,
    ) -> dict[str, Any]:
        profile = self.get_profile(user_id)
        facts = list(profile.get("facts") or [])
        now = _utcnow_iso()

        updated = False
        for fact in facts:
            if fact.get("key") == key:
                fact["value"] = value
                fact["confidence"] = confidence
                fact["updated_at"] = now
                if source_session_id:
                    fact["source_session_id"] = source_session_id
                updated = True
                break

        if not updated:
            facts.append(
                {
                    "key": key,
                    "value": value,
                    "confidence": confidence,
                    "source_session_id": source_session_id,
                    "created_at": now,
                    "updated_at": now,
                }
            )

        return profiles.update(user_id, {"facts": facts})

    def update_profile(
        self,
        user_id: str,
        *,
        summary: Optional[str] = None,
        preferred_tone: Optional[str] = None,
    ) -> dict[str, Any]:
        updates = {}
        if summary is not None:
            updates["summary"] = summary
        if preferred_tone is not None:
            updates["preferred_tone"] = preferred_tone
        if not updates:
            return self.get_profile(user_id)
        self.get_profile(user_id)
        return profiles.update(user_id, updates)

    def get_coaching_preferences(self, user_id: str) -> dict[str, Any]:
        profile = self.get_profile(user_id)
        facts = {
            f.get("key"): f.get("value")
            for f in (profile.get("facts") or [])
            if isinstance(f, dict)
        }

        def fact_bool(key: str, default: bool) -> bool:
            raw = facts.get(key)
            if raw is None:
                return default
            return str(raw).lower() in ("true", "1", "yes")

        return {
            "coaching_style": profile.get("preferred_tone") or "balanced",
            "goal_checkins": fact_bool("pref_goal_checkins", True),
            "weekly_reflection": fact_bool("pref_weekly_reflection", False),
            "pattern_alerts": fact_bool("pref_pattern_alerts", True),
        }

    def update_coaching_preferences(
        self,
        user_id: str,
        *,
        coaching_style: Optional[str] = None,
        goal_checkins: Optional[bool] = None,
        weekly_reflection: Optional[bool] = None,
        pattern_alerts: Optional[bool] = None,
    ) -> dict[str, Any]:
        if coaching_style is not None:
            self.update_profile(user_id, preferred_tone=coaching_style)
        if goal_checkins is not None:
            self.upsert_fact(
                user_id, key="pref_goal_checkins", value=str(goal_checkins).lower()
            )
        if weekly_reflection is not None:
            self.upsert_fact(
                user_id,
                key="pref_weekly_reflection",
                value=str(weekly_reflection).lower(),
            )
        if pattern_alerts is not None:
            self.upsert_fact(
                user_id, key="pref_pattern_alerts", value=str(pattern_alerts).lower()
            )
        return self.get_coaching_preferences(user_id)


profile_service = ProfileService()
