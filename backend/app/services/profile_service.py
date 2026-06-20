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


profile_service = ProfileService()
