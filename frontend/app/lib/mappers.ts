import type {
  ApiChatTurn,
  ApiMessage,
  ApiSession,
  ApiSessionPattern,
  ApiTimelineEvent,
} from "./api";
import type {
  ChatMessage,
  Goal,
  GoalStatus,
  Intervention,
  Pattern,
  TimelineEvent,
  TimelineEventType,
} from "./types";
import { computeMomentum } from "./goal-helpers";

function parseDate(value?: string | null): Date {
  return value ? new Date(value) : new Date();
}

function mapSessionStatus(status: string): GoalStatus {
  if (status === "paused" || status === "abandoned") return "paused";
  if (status === "completed" || status === "archived") return "completed";
  return "active";
}

export function sessionToGoal(
  session: ApiSession,
  patterns: ApiSessionPattern[] = []
): Goal {
  const lastActive = parseDate(
    session.last_message_at ?? session.updated_at ?? session.created_at
  );
  const sorted = [...patterns].sort((a, b) => b.confidence - a.confidence);

  return {
    id: session.id,
    title: session.title || session.goal.slice(0, 80),
    description: session.goal,
    status: mapSessionStatus(session.status),
    currentFocus: session.goal.split(/[.!?]/)[0]?.trim() || session.goal,
    nextStep: "Continue the conversation in your workspace",
    momentum: computeMomentum(lastActive),
    patternsObservedCount: patterns.length,
    primaryPatternName: sorted[0]?.name,
    lastActiveAt: lastActive,
    createdAt: parseDate(session.created_at),
    recentEvents: [],
    activeExperiments: [],
  };
}

export function apiTimelineToEvent(event: ApiTimelineEvent): TimelineEvent {
  return {
    id: event.id,
    goalId: event.goal_id,
    type: event.type as TimelineEventType,
    title: event.title,
    description: event.description ?? undefined,
    confidence: event.confidence ?? undefined,
    messageId: event.message_id ?? undefined,
    createdAt: parseDate(event.created_at),
  };
}

export function apiPatternToPattern(
  p: ApiSessionPattern,
  goalId: string
): Pattern {
  return {
    id: p.pattern_id,
    goalId,
    name: p.name,
    description: p.description,
    confidence: p.confidence,
    evidenceCount: p.evidence_count,
    lastDetectedAt: parseDate(p.last_detected_at),
  };
}

export function apiMessageToChatMessage(msg: ApiMessage): ChatMessage {
  const meta = msg.metadata ?? {};
  let intervention: Intervention | undefined;

  const display = meta.intervention_display as string | undefined;
  if (display === "inline" || display === "floating") {
    intervention = {
      id: String(meta.intervention_id ?? msg.id),
      goalId: msg.session_id,
      type: display,
      patternName: String(meta.intervention_pattern_name ?? "Pattern noticed"),
      message: String(meta.intervention_message ?? ""),
      confidence: 0.75,
      evidenceCount: Array.isArray(meta.detected_patterns)
        ? meta.detected_patterns.length
        : 1,
      actions: ["Got it", "Tell me more"],
    };
  }

  return {
    id: msg.id,
    role: msg.role === "assistant" ? "assistant" : "user",
    content: msg.content,
    intervention,
  };
}

export function chatTurnToMessages(turn: ApiChatTurn): {
  userMessage: ChatMessage;
  assistantMessage: ChatMessage;
  floatingIntervention?: Intervention;
} {
  const userMessage = apiMessageToChatMessage(turn.user_message);
  const assistantMessage = apiMessageToChatMessage(turn.assistant_message);

  if (turn.intervention && turn.intervention.type === "floating") {
    return {
      userMessage,
      assistantMessage: { ...assistantMessage, intervention: undefined },
      floatingIntervention: {
        id: turn.intervention.id,
        goalId: turn.user_message.session_id,
        type: "floating",
        patternName: turn.intervention.pattern_name,
        message: turn.intervention.message,
        confidence: turn.intervention.confidence,
        evidenceCount: turn.detected_patterns.length || 1,
        actions: ["Refocus on goal", "Continue exploring"],
      },
    };
  }

  if (turn.intervention && turn.intervention.type === "inline") {
    assistantMessage.intervention = {
      id: turn.intervention.id,
      goalId: turn.user_message.session_id,
      type: "inline",
      patternName: turn.intervention.pattern_name,
      message: turn.intervention.message,
      confidence: turn.intervention.confidence,
      evidenceCount: turn.detected_patterns.length || 1,
      actions: ["Got it", "Tell me more"],
    };
  }

  return { userMessage, assistantMessage };
}

export function deriveTitleFromMessage(text: string): string {
  const trimmed = text.trim();
  if (trimmed.length <= 60) return trimmed;
  return `${trimmed.slice(0, 57)}…`;
}
