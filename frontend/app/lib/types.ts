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
}

export interface TaskResponse {
  mode: "task";
  sessionId: string;
  blockerType: BlockerType;
  blockerLabel: string;
  explanation: string;
  actions: Action[];
  concept?: string;
}

export interface LearnSection {
  title: string;
  content: string;
}

export interface LearnResponse {
  mode: "learn";
  sessionId: string;
  title: string;
  summary: string;
  sections: LearnSection[];
  suggestedQuestions: string[];
}

export interface MixedResponse {
  mode: "mixed";
  sessionId: string;
  task: Omit<TaskResponse, "mode" | "sessionId">;
  learn: Omit<LearnResponse, "mode" | "sessionId">;
}

export type AIResponse = TaskResponse | LearnResponse | MixedResponse;

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

export interface UserStats {
  currentStreak: number;
  longestStreak: number;
  totalXP: number;
  xpToNextLevel: number;
  level: number;
  tasksCompleted: number;
  focusSessions: number;
  totalActionsCompleted: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: Date;
  category: "streak" | "actions" | "focus" | "explore";
}

export interface StreakDay {
  date: Date;
  active: boolean;
  actionsCompleted: number;
}

export type NavItem = {
  id: string;
  label: string;
  href: string;
  icon: string;
};

export interface TodaysFocus {
  sessionId: string;
  title: string;
  lastActive: Date;
  nextAction: string;
  estimatedMinutes: number;
  totalActions: number;
  completedActions: number;
}
