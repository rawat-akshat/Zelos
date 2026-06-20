import type {
  Goal,
  TimelineEvent,
  Pattern,
  Intervention,
  InsightsData,
  UserUsage,
} from "./types";

export const mockUser = {
  name: "Alex Morgan",
  email: "alex@example.com",
  memberSince: new Date("2025-11-01"),
  plan: "Free" as const,
};

export const mockUsage: UserUsage = {
  goalsActive: 2,
  messagesThisMonth: 47,
  focusSessionsThisMonth: 3,
};

function daysAgo(n: number): Date {
  return new Date(Date.now() - n * 86400000);
}

function hoursAgo(n: number): Date {
  return new Date(Date.now() - n * 3600000);
}

export const mockActiveGoal: Goal = {
  id: "goal-1",
  title: "Build Zelos MVP",
  description: "Ship a goal-native behavioral coach, not another chatbot clone.",
  currentState: "Deciding frontend UX",
  lastAction: "Backend setup completed",
  nextSuggestedAction: "Finalize workspace layout",
  status: "active",
  detectedPatternsCount: 3,
  createdAt: daysAgo(14),
  updatedAt: hoursAgo(2),
};

export const mockGoals: Goal[] = [
  mockActiveGoal,
  {
    id: "goal-2",
    title: "Job Switch",
    description: "Move to a product role with meaningful impact.",
    currentState: "Resume and referrals",
    lastAction: "Updated one resume bullet",
    nextSuggestedAction: "Send 2 applications",
    status: "active",
    detectedPatternsCount: 2,
    createdAt: daysAgo(30),
    updatedAt: daysAgo(1),
  },
  {
    id: "goal-3",
    title: "Write Consistently",
    description: "Publish one essay per week on learning and behavior.",
    currentState: "Paused — low bandwidth",
    lastAction: "Drafted outline for essay 3",
    nextSuggestedAction: "Pick one topic and write 200 words",
    status: "paused",
    detectedPatternsCount: 1,
    createdAt: daysAgo(45),
    updatedAt: daysAgo(8),
  },
  {
    id: "goal-4",
    title: "Morning Fitness Habit",
    description: "20 minutes of movement before work, 4× per week.",
    currentState: "Completed 3-week experiment",
    lastAction: "Reviewed what worked",
    nextSuggestedAction: "Restart with 15-minute walks",
    status: "completed",
    detectedPatternsCount: 0,
    createdAt: daysAgo(90),
    updatedAt: daysAgo(21),
  },
];

export const mockTimelineEvents: TimelineEvent[] = [
  {
    id: "tl-1",
    goalId: "goal-1",
    type: "action_completed",
    title: "Backend setup completed",
    createdAt: hoursAgo(5),
  },
  {
    id: "tl-2",
    goalId: "goal-1",
    type: "blocker_identified",
    title: "Frontend UX uncertainty surfaced",
    description: "Comparing layout options without committing.",
    createdAt: hoursAgo(3),
  },
  {
    id: "tl-3",
    goalId: "goal-1",
    type: "pattern_detected",
    title: "Research spiral risk detected",
    confidence: 0.72,
    createdAt: hoursAgo(2),
  },
  {
    id: "tl-4",
    goalId: "goal-1",
    type: "decision_made",
    title: "Decision made: use 3-panel layout",
    createdAt: hoursAgo(1),
  },
  {
    id: "tl-5",
    goalId: "goal-1",
    type: "action_committed",
    title: "Next action set: build workspace shell",
    createdAt: hoursAgo(0.5),
  },
  {
    id: "tl-6",
    goalId: "goal-1",
    type: "goal_created",
    title: "Goal created: Build Zelos MVP",
    createdAt: daysAgo(14),
  },
];

export const mockPatterns: Pattern[] = [
  {
    id: "pat-1",
    goalId: "goal-1",
    name: "Research Spiral",
    description: "Reading and comparing instead of deciding.",
    confidence: 0.72,
    evidenceCount: 3,
    lastDetectedAt: hoursAgo(2),
  },
  {
    id: "pat-2",
    goalId: "goal-1",
    name: "Decision Loop",
    description: "Weighing options to avoid committing to one next step.",
    confidence: 0.61,
    evidenceCount: 2,
    lastDetectedAt: hoursAgo(3),
  },
  {
    id: "pat-3",
    goalId: "goal-1",
    name: "Topic Drift",
    description: "Moving from implementation to meta-discussion.",
    confidence: 0.54,
    evidenceCount: 1,
    lastDetectedAt: daysAgo(1),
  },
];

export const mockInlineIntervention: Intervention = {
  id: "int-1",
  goalId: "goal-1",
  type: "inline",
  patternName: "Research Spiral",
  message:
    "You may be entering a research spiral. You've compared several options, but no decision has been made yet.",
  confidence: 0.74,
  evidenceCount: 3,
  actions: ["Show evidence", "Help me choose", "Dismiss"],
};

export const mockFloatingIntervention: Intervention = {
  id: "int-2",
  goalId: "goal-1",
  type: "floating",
  patternName: "Decision Loop",
  message:
    "You may be comparing options to avoid committing to one next step.",
  confidence: 0.68,
  evidenceCount: 2,
  actions: ["Choose one now", "Continue exploring"],
};

export const mockInsights: InsightsData = {
  strengths: ["Honest self-reflection", "Long-term thinking"],
  growthAreas: ["Research spiral", "Decision loop", "Avoidance after uncertainty"],
  recurringPatterns: mockPatterns,
  playbook: {
    worksWell: [
      "Small deadlines",
      "Imperfect first drafts",
      "Choosing one next step",
    ],
    doesNotWork: [
      "Endless research",
      "Competitor comparison",
      "Waiting for confidence",
    ],
    experiments: [
      "Ship before optimizing",
      "Apply before perfecting resume",
      "One imperfect draft daily",
    ],
  },
  timelineSummary:
    "Over the past two weeks you've made steady progress on Zelos, with recurring loops around research and decision-making before committing to action.",
};

export function formatRelativeTime(date: Date): string {
  const diffMs = Date.now() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 60) {
    if (diffMins < 1) return "Just now";
    return diffMins === 1 ? "1 min ago" : `${diffMins} mins ago`;
  }
  if (diffHours < 24) {
    const label =
      date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }) ??
      "Today";
    return `Today, ${label}`;
  }
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function formatLastActive(date: Date): string {
  const diffDays = Math.floor((Date.now() - date.getTime()) / 86400000);
  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  return `${diffDays} days ago`;
}

export const GOAL_HELPER_CHIPS = [
  "Startup",
  "Career",
  "Learning",
  "Fitness",
  "Writing",
  "Life decision",
  "Not sure yet",
];

export const blockerColors: Record<string, string> = {
  perfectionism: "#C9A85A",
  overwhelm: "#A66B6B",
  ambiguity: "#7B746A",
  avoidance: "#8B7355",
  fear: "#9A9388",
  procrastination: "#B78C54",
};

export const blockerTextColors: Record<string, string> = {
  perfectionism: "#8B6914",
  overwhelm: "#7A4545",
  ambiguity: "#5A534A",
  avoidance: "#6B5435",
  fear: "#6B6458",
  procrastination: "#8B6914",
};
