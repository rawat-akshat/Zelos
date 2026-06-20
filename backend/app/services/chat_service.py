from typing import Any, Optional

from app.llm.client import llm_client
from app.stores.messages import messages
from app.stores.sessions import sessions
from app.services.llm_context_service import llm_context_service
from app.services.session_service import session_service


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
        if not sessions.get_by_id(session_id, user_id):
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

        assistant_message = messages.create(
            user_id=user_id,
            session_id=session_id,
            role="assistant",
            content=assistant_content,
            mode=mode,
        )
        sessions.touch_last_message_at(
            session_id, assistant_message["created_at"]
        )

        return {
            "user_message": user_message,
            "assistant_message": assistant_message,
        }


chat_service = ChatService()
