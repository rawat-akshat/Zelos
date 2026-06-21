import type { Goal, GoalMomentum } from "./types";

export function formatPatternsObserved(count: number, primaryPatternName?: string): string {
  if (count === 0) return "None yet";
  if (count === 1 && primaryPatternName) return primaryPatternName;
  if (primaryPatternName && count > 1) return `${primaryPatternName} +${count - 1}`;
  return String(count);
}

export const MOMENTUM_META: Record<
  GoalMomentum,
  { label: string; description: string; dotColor: string }
> = {
  good: {
    label: "Good",
    description: "Recently active",
    dotColor: "#7A9B7E",
  },
  at_risk: {
    label: "At Risk",
    description: "No activity for 7+ days",
    dotColor: "#C9A85A",
  },
  stalled: {
    label: "Stalled",
    description: "No activity for 21+ days",
    dotColor: "#A66B6B",
  },
};

export function computeMomentum(lastActiveAt: Date): GoalMomentum {
  const days = Math.floor((Date.now() - lastActiveAt.getTime()) / 86400000);
  if (days >= 21) return "stalled";
  if (days >= 7) return "at_risk";
  return "good";
}

export function groupGoalsByStatus(goals: Goal[]) {
  return {
    active: goals.filter((g) => g.status === "active"),
    paused: goals.filter((g) => g.status === "paused"),
    completed: goals.filter((g) => g.status === "completed"),
  };
}

export function getGoalsPageSummary(goals: Goal[], patternsObserved = 7) {
  const grouped = groupGoalsByStatus(goals);
  return {
    activeGoals: grouped.active.length,
    pausedGoals: grouped.paused.length,
    completedGoals: grouped.completed.length,
    patternsObserved,
  };
}
