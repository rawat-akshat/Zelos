from typing import Any, Optional

from openai import OpenAI

from app.core.config import settings
from app.llm.prompts import build_system_prompt


class LLMClient:
    def __init__(self):
        self._client: Optional[OpenAI] = None

    @property
    def client(self) -> OpenAI:
        if not settings.OPENAI_API_KEY:
            raise ValueError("OPENAI_API_KEY is not configured")
        if self._client is None:
            self._client = OpenAI(api_key=settings.OPENAI_API_KEY)
        return self._client

    def chat(
        self,
        *,
        context_block: str,
        messages: list[dict[str, str]],
        mode: Optional[str] = None,
        model: str = "gpt-4o-mini",
    ) -> str:
        system_prompt = build_system_prompt(mode, context_block)
        payload: list[dict[str, str]] = [
            {"role": "system", "content": system_prompt},
            *messages,
        ]
        response = self.client.chat.completions.create(
            model=model,
            messages=payload,
            temperature=0.7,
            max_tokens=1200,
        )
        return response.choices[0].message.content or ""


llm_client = LLMClient()
