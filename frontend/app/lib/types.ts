export type GoalStatus = "active" | "paused" | "completed";

export type TimelineEventType =
  | "goal_created"
  | "blocker_identified"
  | "pattern_detected"
  | "topic_drift_detected"
  | "decision_made"
  | "action_committed"
  | "action_completed"
  | "experiment_started"
  | "experiment_reviewed";

export interface Goal {
  id: string;
  title: string;
  description?: string;
  currentState?: string;
  lastAction?: string;
  nextSuggestedAction?: string;
  status: GoalStatus;
  detectedPatternsCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface TimelineEvent {
  id: string;
  goalId: string;
  type: TimelineEventType;
  title: string;
  description?: string;
  confidence?: number;
  createdAt: Date;
}

export interface Pattern {
  id: string;
  goalId?: string;
  name: string;
  description: string;
  confidence: number;
  evidenceCount: number;
  lastDetectedAt: Date;
}

export interface Intervention {
  id: string;
  goalId: string;
  type: "inline" | "floating";
  patternName: string;
  message: string;
  confidence: number;
  evidenceCount: number;
  actions: string[];
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  intervention?: Intervention;
}

export interface PersonalPlaybook {
  worksWell: string[];
  doesNotWork: string[];
  experiments: string[];
}

export interface InsightsData {
  strengths: string[];
  growthAreas: string[];
  recurringPatterns: Pattern[];
  playbook: PersonalPlaybook;
  timelineSummary: string;
}

/** @deprecated Use Goal — kept for legacy mock-ai compatibility */
export type BlockerType =
  | "perfectionism"
  | "overwhelm"
  | "ambiguity"
  | "avoidance"
  | "fear"
  | "procrastination";

export type ResponseMode = "task" | "learn" | "mixed";

export interface Action {
  id: string;
  description: string;
  estimatedMinutes: number;
  completed: boolean;
  completedAt?: Date;
  subSteps?: string[];
}

export interface TaskResponse {
  mode: "task";
  sessionId: string;
  blockerType: BlockerType;
  blockerLabel: string;
  explanation: string;
  actions: Action[];
  suggestedQuestions?: string[];
  concept?: string;
  alternative?: {
    explanation: string;
    actions: Action[];
  };
}

export interface LearnResponse {
  mode: "learn";
  sessionId: string;
  explanation: string;
  actions?: Action[];
  suggestedQuestions?: string[];
}

export interface MixedResponse {
  mode: "mixed";
  sessionId: string;
  task: Omit<TaskResponse, "mode" | "sessionId">;
  learn: Omit<LearnResponse, "mode" | "sessionId">;
}

export type AIResponse = TaskResponse | LearnResponse | MixedResponse;

/** @deprecated Use Goal */
export interface Session {
  id: string;
  title: string;
  blockerType?: BlockerType;
  blockerLabel?: string;
  totalActions: number;
  completedActions: number;
  createdAt: Date;
  isCompleted: boolean;
}

export interface UserUsage {
  goalsActive: number;
  messagesThisMonth: number;
  focusSessionsThisMonth: number;
}
