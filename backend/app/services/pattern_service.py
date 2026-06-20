from datetime import datetime, timezone
from typing import Any, Optional

from app.stores.messages import messages
from app.stores.patterns import patterns


def _utcnow_iso() -> str:
    return datetime.now(timezone.utc).isoformat()


def _derive_severity(frequency: int) -> str:
    if frequency >= 8:
        return "high"
    if frequency >= 4:
        return "medium"
    return "low"


class PatternService:
    def list_definitions(self) -> list[dict[str, Any]]:
        return patterns.list_definitions()

    def save_occurrence(
        self,
        user_id: str,
        *,
        session_id: str,
        message_id: str,
        pattern_id: str,
        note: Optional[str] = None,
        evidence: Optional[str] = None,
        confidence: float,
    ) -> dict[str, Any]:
        occurrence = patterns.create_occurrence(
            user_id=user_id,
            session_id=session_id,
            message_id=message_id,
            pattern_id=pattern_id,
            note=note,
            evidence=evidence,
            confidence=confidence,
        )

        existing = patterns.get_user_behavior_pattern(user_id, pattern_id)
        now = _utcnow_iso()

        if not existing:
            patterns.create_user_behavior_pattern(
                user_id=user_id,
                pattern_id=pattern_id,
                summary=note,
                confidence=confidence,
            )
        else:
            new_freq = int(existing["frequency"]) + 1
            old_avg = float(existing["confidence_avg"])
            new_avg = (old_avg * existing["frequency"] + confidence) / new_freq
            updates = {
                "frequency": new_freq,
                "confidence_avg": round(new_avg, 3),
                "last_seen_at": now,
                "severity": _derive_severity(new_freq),
            }
            if note:
                updates["summary"] = note
            patterns.update_user_behavior_pattern(existing["id"], updates)

        messages.append_detected_pattern(message_id, pattern_id)
        return occurrence

    def update_user_pattern_summary(
        self, user_id: str, pattern_id: str, summary: str
    ) -> dict[str, Any]:
        return patterns.update_user_pattern_summary(
            user_id, pattern_id, summary
        )


pattern_service = PatternService()
