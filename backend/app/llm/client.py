from typing import Any, Optional

from app.core.config import settings
from app.llm.prompts import build_system_prompt


class LLMClient:
    """Routes LLM requests to Google Gemini (default) or OpenAI (optional)."""

    def __init__(self) -> None:
        self._openai_client: Any = None
        self._gemini_configured = False

    @property
    def provider(self) -> str:
        return settings.LLM_PROVIDER

    @property
    def model(self) -> str:
        if settings.LLM_PROVIDER == "gemini":
            return settings.GEMINI_MODEL
        return settings.OPENAI_MODEL

    def _get_openai_client(self) -> Any:
        if not settings.OPENAI_API_KEY:
            raise ValueError(
                "OPENAI_API_KEY is not configured. Set LLM_PROVIDER=gemini or add OPENAI_API_KEY."
            )
        if self._openai_client is None:
            from openai import OpenAI

            self._openai_client = OpenAI(api_key=settings.OPENAI_API_KEY)
        return self._openai_client

    def _configure_gemini(self) -> None:
        if not settings.GEMINI_API_KEY:
            raise ValueError(
                "GEMINI_API_KEY is not configured. Add it to .env (required for v1)."
            )
        if not self._gemini_configured:
            import google.generativeai as genai

            genai.configure(api_key=settings.GEMINI_API_KEY)
            self._gemini_configured = True

    def complete(
        self,
        *,
        system_prompt: str,
        user_message: str,
        model: Optional[str] = None,
        temperature: float = 0.7,
        max_tokens: int = 1200,
        json_mode: bool = False,
    ) -> str:
        """Single-turn completion with an explicit system prompt."""
        if settings.LLM_PROVIDER == "gemini":
            return self._complete_gemini(
                system_prompt=system_prompt,
                user_message=user_message,
                model=model or settings.GEMINI_MODEL,
                temperature=temperature,
                max_tokens=max_tokens,
                json_mode=json_mode,
            )
        return self._complete_openai(
            system_prompt=system_prompt,
            user_message=user_message,
            model=model or settings.OPENAI_MODEL,
            temperature=temperature,
            max_tokens=max_tokens,
            json_mode=json_mode,
        )

    def chat(
        self,
        *,
        context_block: str,
        messages: list[dict[str, str]],
        mode: Optional[str] = None,
        model: Optional[str] = None,
    ) -> str:
        system_prompt = build_system_prompt(mode, context_block)
        if settings.LLM_PROVIDER == "gemini":
            return self._chat_gemini(
                system_prompt=system_prompt,
                messages=messages,
                model=model or settings.GEMINI_MODEL,
            )
        return self._chat_openai(
            system_prompt=system_prompt,
            messages=messages,
            model=model or settings.OPENAI_MODEL,
        )

    def _complete_openai(
        self,
        *,
        system_prompt: str,
        user_message: str,
        model: str,
        temperature: float,
        max_tokens: int,
        json_mode: bool,
    ) -> str:
        kwargs: dict[str, Any] = {
            "model": model,
            "messages": [
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_message},
            ],
            "temperature": temperature,
            "max_tokens": max_tokens,
        }
        if json_mode:
            kwargs["response_format"] = {"type": "json_object"}

        response = self._get_openai_client().chat.completions.create(**kwargs)
        return response.choices[0].message.content or ""

    def _complete_gemini(
        self,
        *,
        system_prompt: str,
        user_message: str,
        model: str,
        temperature: float,
        max_tokens: int,
        json_mode: bool,
    ) -> str:
        import google.generativeai as genai

        self._configure_gemini()

        generation_config = genai.GenerationConfig(
            temperature=temperature,
            max_output_tokens=max_tokens,
        )
        if json_mode:
            generation_config = genai.GenerationConfig(
                temperature=temperature,
                max_output_tokens=max_tokens,
                response_mime_type="application/json",
            )

        gemini_model = genai.GenerativeModel(
            model_name=model,
            system_instruction=system_prompt,
            generation_config=generation_config,
        )
        response = gemini_model.generate_content(user_message)
        return response.text or ""

    def _chat_openai(
        self,
        *,
        system_prompt: str,
        messages: list[dict[str, str]],
        model: str,
    ) -> str:
        payload: list[dict[str, str]] = [
            {"role": "system", "content": system_prompt},
            *messages,
        ]
        response = self._get_openai_client().chat.completions.create(
            model=model,
            messages=payload,
            temperature=0.7,
            max_tokens=1200,
        )
        return response.choices[0].message.content or ""

    def _chat_gemini(
        self,
        *,
        system_prompt: str,
        messages: list[dict[str, str]],
        model: str,
    ) -> str:
        import google.generativeai as genai

        self._configure_gemini()

        gemini_model = genai.GenerativeModel(
            model_name=model,
            system_instruction=system_prompt,
        )

        if not messages:
            response = gemini_model.generate_content(
                "Please acknowledge you are ready to help."
            )
            return response.text or ""

        if len(messages) == 1:
            response = gemini_model.generate_content(messages[0]["content"])
            return response.text or ""

        history: list[dict[str, Any]] = []
        for msg in messages[:-1]:
            role = "user" if msg["role"] == "user" else "model"
            history.append({"role": role, "parts": [msg["content"]]})

        chat = gemini_model.start_chat(history=history)
        response = chat.send_message(messages[-1]["content"])
        return response.text or ""


llm_client = LLMClient()
