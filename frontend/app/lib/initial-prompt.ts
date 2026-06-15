export const INITIAL_PROMPT_KEY = "zelos_initial_prompt";

export function saveInitialPrompt(prompt: string) {
  const trimmed = prompt.trim();
  if (trimmed) {
    localStorage.setItem(INITIAL_PROMPT_KEY, trimmed);
  } else {
    localStorage.removeItem(INITIAL_PROMPT_KEY);
  }
}

export function loadInitialPrompt(): string {
  if (typeof window === "undefined") return "";
  return localStorage.getItem(INITIAL_PROMPT_KEY) ?? "";
}
