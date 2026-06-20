import type { ChatMessage, Intervention } from "./types";
import { mockInlineIntervention } from "./mock-data";

const COACH_RESPONSES: string[] = [
  "It sounds like you're carrying a lot of context about this goal — that's honest, and it's a useful starting point. Before we add more options, let's name what's actually blocking progress right now: is it clarity, confidence, or commitment?",
  "You're thinking carefully, which is a strength — but I notice the conversation keeps circling comparison without a next step. What would change if you picked one direction for the next 48 hours, even imperfectly?",
  "Long-term goals often stall when the next step feels too small to matter or too big to start. Let's find something in between: one honest action you could take in the next 25 minutes that moves this goal forward.",
  "You don't need to solve the whole goal today. What matters is understanding the pattern — when uncertainty shows up, what do you tend to do? Research more, switch tasks, or wait for a better moment?",
];

let msgCounter = 0;

function makeId(): string {
  return `msg-${++msgCounter}-${Date.now()}`;
}

export interface CoachTurnResult {
  userMessage: ChatMessage;
  assistantMessage: ChatMessage;
  floatingIntervention?: Intervention;
}

export async function generateCoachTurn(
  userText: string,
  turnIndex: number
): Promise<CoachTurnResult> {
  await new Promise((r) => setTimeout(r, 900 + Math.random() * 600));

  const userMessage: ChatMessage = {
    id: makeId(),
    role: "user",
    content: userText,
  };

  const responseText =
    COACH_RESPONSES[turnIndex % COACH_RESPONSES.length] ??
    COACH_RESPONSES[0];

  const showInline = turnIndex >= 0 && turnIndex % 2 === 0;

  const assistantMessage: ChatMessage = {
    id: makeId(),
    role: "assistant",
    content: responseText,
    intervention: showInline
      ? { ...mockInlineIntervention, id: makeId() }
      : undefined,
  };

  const floatingIntervention =
    turnIndex === 1
      ? {
          id: makeId(),
          goalId: "goal-1",
          type: "floating" as const,
          patternName: "Decision Loop",
          message:
            "You may be comparing options to avoid committing to one next step.",
          confidence: 0.68,
          evidenceCount: 2,
          actions: ["Choose one now", "Continue exploring"],
        }
      : undefined;

  return { userMessage, assistantMessage, floatingIntervention };
}
