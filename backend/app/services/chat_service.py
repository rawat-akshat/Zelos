import json
from typing import Any, Optional

from app.llm.analysis_prompt import (
    ANALYSIS_SYSTEM_PROMPT,
    VALID_INTERVENTION_TYPES,
    VALID_PATTERN_IDS,
    VALID_TASK_STATUSES,
    build_analysis_user_message,
)
from app.llm.client import llm_client
from app.services.intervention_service import intervention_service
from app.services.pattern_service import pattern_service
from app.stores.messages import messages
from app.stores.patterns import patterns as pattern_store
from app.stores.sessions import sessions
from app.services.llm_context_service import llm_context_service


def _safe_analysis(raw: str) -> dict[str, Any]:
    try:
        data = json.loads(raw)
        if not isinstance(data, dict):
            return {}
        return data
    except json.JSONDecodeError:
        return {}


def _normalize_analysis(data: dict[str, Any]) -> dict[str, Any]:
    detected = []
    for item in data.get("detected_patterns") or []:
        if not isinstance(item, dict):
            continue
        pid = item.get("pattern_id")
        if pid not in VALID_PATTERN_IDS:
            continue
        conf = float(item.get("confidence") or 0.5)
        conf = max(0.0, min(1.0, conf))
        detected.append(
            {
                "pattern_id": pid,
                "confidence": conf,
                "evidence": item.get("evidence"),
                "timeline_title": item.get("timeline_title"),
            }
        )

    intervention_raw = data.get("intervention") or {}
    intervention = None
    if isinstance(intervention_raw, dict):
        display = (intervention_raw.get("display_type") or "none").lower()
        itype = intervention_raw.get("intervention_type") or "continue_normally"
        if itype not in VALID_INTERVENTION_TYPES:
            itype = "continue_normally"
        if display in ("inline", "floating"):
            intervention = {
                "intervention_type": itype,
                "display_type": display,
                "message": intervention_raw.get("message") or "",
                "pattern_name": intervention_raw.get("pattern_name") or "Pattern noticed",
            }

    task_status = data.get("task_status") or "in_progress"
    if task_status not in VALID_TASK_STATUSES:
        task_status = "in_progress"

    return {
        "detected_patterns": detected,
        "intervention": intervention,
        "task_status": task_status,
    }


class ChatService:
    def list_messages(
        self,
        user_id: str,
        session_id: str,
        *,
        limit: int = 100,
        offset: int = 0,
    ) -> list[dict[str, Any]]:
        if not sessions.get_by_id(session_id, user_id):
            raise LookupError("Session not found")
        return messages.list_for_session(session_id, limit=limit, offset=offset)

    def send_message(
        self,
        user_id: str,
        session_id: str,
        *,
        content: str,
        mode: Optional[str] = None,
    ) -> dict[str, Any]:
        session = sessions.get_by_id(session_id, user_id)
        if not session:
            raise LookupError("Session not found")

        user_message = messages.create(
            user_id=user_id,
            session_id=session_id,
            role="user",
            content=content,
            mode=mode,
        )
        sessions.touch_last_message_at(session_id, user_message["created_at"])

        context = llm_context_service.get_llm_context(user_id, session_id)
        context_block = llm_context_service.build_context_block(context)

        history_rows = messages.get_recent_for_session(session_id, limit=20)
        llm_messages = [
            {"role": row["role"], "content": row["content"]}
            for row in history_rows
            if row["role"] in ("user", "assistant")
        ]

        assistant_content = llm_client.chat(
            context_block=context_block,
            messages=llm_messages,
            mode=mode,
        )

        catalog = pattern_store.list_definitions()
        analysis_input = build_analysis_user_message(
            session_goal=session.get("goal") or "",
            user_message=content,
            assistant_reply=assistant_content,
            pattern_catalog=catalog,
        )
        analysis_raw = llm_client.complete(
            system_prompt=ANALYSIS_SYSTEM_PROMPT,
            user_message=analysis_input,
            temperature=0.2,
            max_tokens=600,
            json_mode=True,
        )
        analysis = _normalize_analysis(_safe_analysis(analysis_raw))

        metadata: dict[str, Any] = {
            "task_status_after_message": analysis["task_status"],
        }
        if analysis["intervention"]:
            metadata["intervention_used"] = analysis["intervention"]["intervention_type"]
            metadata["intervention_display"] = analysis["intervention"]["display_type"]
            metadata["intervention_message"] = analysis["intervention"]["message"]
            metadata["intervention_pattern_name"] = analysis["intervention"]["pattern_name"]

        assistant_message = messages.create(
            user_id=user_id,
            session_id=session_id,
            role="assistant",
            content=assistant_content,
            mode=mode,
            metadata=metadata,
        )
        sessions.touch_last_message_at(
            session_id, assistant_message["created_at"]
        )

        sessions.update_task_status(session_id, user_id, analysis["task_status"])

        detected_summaries: list[dict[str, Any]] = []
        pattern_name_map = {p["pattern_id"]: p["name"] for p in catalog}

        for item in analysis["detected_patterns"]:
            note = item.get("timeline_title") or pattern_name_map.get(
                item["pattern_id"], item["pattern_id"]
            )
            pattern_service.save_occurrence(
                user_id,
                session_id=session_id,
                message_id=str(assistant_message["id"]),
                pattern_id=item["pattern_id"],
                note=note,
                evidence=item.get("evidence"),
                confidence=item["confidence"],
            )
            detected_summaries.append(
                {
                    "pattern_id": item["pattern_id"],
                    "pattern_name": pattern_name_map.get(
                        item["pattern_id"], item["pattern_id"]
                    ),
                    "confidence": item["confidence"],
                    "evidence": item.get("evidence"),
                    "timeline_title": note,
                    "message_id": str(assistant_message["id"]),
                }
            )

        intervention_summary = None
        if analysis["intervention"]:
            logged = intervention_service.create(
                user_id,
                session_id=session_id,
                message_id=str(assistant_message["id"]),
                intervention_type=analysis["intervention"]["intervention_type"],
                reason=analysis["intervention"].get("message"),
            )
            intervention_summary = {
                "id": logged["id"],
                "type": analysis["intervention"]["display_type"],
                "pattern_name": analysis["intervention"]["pattern_name"],
                "message": analysis["intervention"]["message"],
                "confidence": (
                    detected_summaries[0]["confidence"]
                    if detected_summaries
                    else 0.7
                ),
                "intervention_type": analysis["intervention"]["intervention_type"],
                "message_id": str(assistant_message["id"]),
            }

        from app.services.timeline_service import timeline_service

        timeline_events = timeline_service.get_session_timeline(
            user_id, session_id, limit=5
        )

        return {
            "user_message": user_message,
            "assistant_message": assistant_message,
            "detected_patterns": detected_summaries,
            "intervention": intervention_summary,
            "timeline_events": timeline_events,
        }


chat_service = ChatService()
