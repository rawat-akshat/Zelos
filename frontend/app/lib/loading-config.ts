/** Toggle `steps` + SHOW_BREAKDOWN_SKELETON to restore the detailed loading UI later. */
export const PROMPT_LOADING_STEPS = [
  "Analyzing what's blocking you…",
  "Breaking the task into actions…",
  "Creating your first step…",
] as const;

export type PromptLoadingVariant = "simple" | "steps";

export const PROMPT_LOADING_VARIANT: PromptLoadingVariant = "simple";
export const SHOW_BREAKDOWN_SKELETON = false;
