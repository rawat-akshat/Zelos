import type {
  UserStats,
  Session,
  Achievement,
  StreakDay,
  TodaysFocus,
  BlockerType,
} from "./types";

export const mockUser = {
  name: "Alex Morgan",
  email: "alex@example.com",
  memberSince: new Date("2025-11-01"),
  plan: "Free" as const,
};

export const mockProfileAchievements = [
  { id: "first-session", title: "First Session", unlocked: true },
  { id: "streak-3", title: "3-Day Streak", unlocked: true },
  { id: "streak-7", title: "7-Day Streak", unlocked: false },
  { id: "sessions-10", title: "10 Sessions Completed", unlocked: false },
  { id: "first-task", title: "First Task Completed", unlocked: true },
];

export const mockUserStats: UserStats = {
  currentStreak: 7,
  longestStreak: 12,
  totalXP: 320,
  xpToNextLevel: 500,
  level: 4,
  tasksCompleted: 18,
  focusSessions: 6,
  totalActionsCompleted: 47,
  totalSessions: 6,
};

export const mockTodaysFocus: TodaysFocus = {
  sessionId: "session-1",
  title: "Resume Writing",
  lastActive: new Date(Date.now() - 86400000),
  nextAction: "Update project experience section",
  estimatedMinutes: 5,
  totalActions: 5,
  completedActions: 3,
};

function daysAgo(n: number): Date {
  return new Date(Date.now() - n * 86400000);
}

export const mockSessions: Session[] = [
  {
    id: "session-1",
    title: "Resume Writing",
    blockerType: "perfectionism",
    blockerLabel: "Perfectionism",
    totalActions: 5,
    completedActions: 3,
    createdAt: daysAgo(1),
    isCompleted: false,
  },
  {
    id: "session-2",
    title: "Understanding Procrastination",
    totalActions: 0,
    completedActions: 0,
    createdAt: daysAgo(1),
    isCompleted: true,
  },
  {
    id: "session-3",
    title: "Study Plan for Exams",
    blockerType: "overwhelm",
    blockerLabel: "Overwhelm",
    totalActions: 4,
    completedActions: 4,
    createdAt: daysAgo(2),
    isCompleted: true,
  },
  {
    id: "session-4",
    title: "Cleaning My Room",
    blockerType: "avoidance",
    blockerLabel: "Avoidance",
    totalActions: 3,
    completedActions: 3,
    createdAt: daysAgo(2),
    isCompleted: true,
  },
  {
    id: "session-5",
    title: "Side Project Planning",
    blockerType: "ambiguity",
    blockerLabel: "Ambiguity",
    totalActions: 5,
    completedActions: 2,
    createdAt: daysAgo(7),
    isCompleted: false,
  },
  {
    id: "session-6",
    title: "Sending a Difficult Email",
    blockerType: "avoidance",
    blockerLabel: "Avoidance",
    totalActions: 3,
    completedActions: 3,
    createdAt: daysAgo(7),
    isCompleted: true,
  },
];

export const mockRecentWins = [
  { label: "Study Plan Completed", xp: 25, daysAgo: 2 },
  { label: "Sent Difficult Email", xp: 15, daysAgo: 7 },
  { label: "Cleaned Room — 3 steps done", xp: 15, daysAgo: 7 },
];

export const mockAchievements: Achievement[] = [
  {
    id: "first-step",
    title: "First Step",
    description: "Complete your very first action",
    icon: "footprints",
    unlocked: true,
    unlockedAt: daysAgo(14),
    category: "actions",
  },
  {
    id: "streak-starter",
    title: "Streak Starter",
    description: "Maintain a 3-day streak",
    icon: "flame",
    unlocked: true,
    unlockedAt: daysAgo(5),
    category: "streak",
  },
  {
    id: "deep-thinker",
    title: "Deep Thinker",
    description: "Read 5 educational breakdowns",
    icon: "book-open",
    unlocked: true,
    unlockedAt: daysAgo(3),
    category: "explore",
  },
  {
    id: "focus-session",
    title: "Focus Starter",
    description: "Complete your first Focus Session",
    icon: "timer",
    unlocked: true,
    unlockedAt: daysAgo(2),
    category: "focus",
  },
  {
    id: "action-hero",
    title: "Action Hero",
    description: "Complete 50 actions in total",
    icon: "zap",
    unlocked: false,
    category: "actions",
  },
  {
    id: "focus-master",
    title: "Focus Master",
    description: "Complete 10 Focus Sessions",
    icon: "target",
    unlocked: false,
    category: "focus",
  },
  {
    id: "week-streak",
    title: "Week Warrior",
    description: "Reach a 7-day streak",
    icon: "calendar-check",
    unlocked: false,
    category: "streak",
  },
  {
    id: "perfectionism-slayer",
    title: "Perfectionism Slayer",
    description: "Break through perfectionism 5 times",
    icon: "shield-check",
    unlocked: false,
    category: "actions",
  },
  {
    id: "month-streak",
    title: "Unstoppable",
    description: "Reach a 30-day streak",
    icon: "crown",
    unlocked: false,
    category: "streak",
  },
  {
    id: "explorer",
    title: "Explorer",
    description: "Try all 5 blocker types",
    icon: "compass",
    unlocked: false,
    category: "explore",
  },
  {
    id: "speed-runner",
    title: "Speed Runner",
    description: "Complete a task in under 10 minutes",
    icon: "rocket",
    unlocked: false,
    category: "focus",
  },
  {
    id: "comeback",
    title: "Comeback Kid",
    description: "Return after a 3-day gap and complete a task",
    icon: "refresh-cw",
    unlocked: false,
    category: "streak",
  },
];

export function generateStreakDays(days = 35): StreakDay[] {
  const result: StreakDay[] = [];
  for (let i = days - 1; i >= 0; i--) {
    const date = daysAgo(i);
    const isRecent = i < 7;
    const active = isRecent ? Math.random() > 0.15 : Math.random() > 0.45;
    result.push({
      date,
      active,
      actionsCompleted: active ? Math.floor(Math.random() * 6) + 1 : 0,
    });
  }
  return result;
}

export const blockerColors: Record<BlockerType, string> = {
  perfectionism: "rgba(198, 169, 105, 0.15)",
  overwhelm: "rgba(139, 92, 246, 0.12)",
  ambiguity: "rgba(59, 130, 246, 0.12)",
  avoidance: "rgba(236, 72, 153, 0.1)",
  fear: "rgba(239, 68, 68, 0.1)",
  procrastination: "rgba(245, 158, 11, 0.1)",
};

export const blockerTextColors: Record<BlockerType, string> = {
  perfectionism: "#C6A969",
  overwhelm: "#A78BFA",
  ambiguity: "#93C5FD",
  avoidance: "#F9A8D4",
  fear: "#FCA5A5",
  procrastination: "#FCD34D",
};
