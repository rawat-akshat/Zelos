"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import type { Goal, Pattern, TimelineEvent } from "../lib/types";
import {
  mockActiveGoal,
  mockPatterns,
  mockTimelineEvents,
} from "../lib/mock-data";

interface WorkspaceContextValue {
  activeGoal: Goal | null;
  patterns: Pattern[];
  timelineEvents: TimelineEvent[];
  isNewUser: boolean;
  newGoalModalOpen: boolean;
  setActiveGoal: (goal: Goal | null) => void;
  startNewGoal: (title: string) => void;
  openNewGoalModal: () => void;
  closeNewGoalModal: () => void;
}

const WorkspaceContext = createContext<WorkspaceContextValue | null>(null);

export function WorkspaceProvider({ children }: { children: ReactNode }) {
  const [activeGoal, setActiveGoal] = useState<Goal | null>(mockActiveGoal);
  const [patterns] = useState<Pattern[]>(mockPatterns);
  const [timelineEvents] = useState<TimelineEvent[]>(mockTimelineEvents);
  const [newGoalModalOpen, setNewGoalModalOpen] = useState(false);

  const startNewGoal = useCallback((title: string) => {
    const now = new Date();
    setActiveGoal({
      id: `goal-${Date.now()}`,
      title,
      description: title,
      currentFocus: "Getting started",
      nextStep: "Share what's on your mind in the workspace",
      momentum: "good",
      patternsObservedCount: 0,
      lastActiveAt: now,
      status: "active",
      recentEvents: [],
      activeExperiments: [],
      createdAt: now,
    });
  }, []);

  const isNewUser = activeGoal === null;

  return (
    <WorkspaceContext.Provider
      value={{
        activeGoal,
        patterns: isNewUser ? [] : patterns,
        timelineEvents: isNewUser ? [] : timelineEvents,
        isNewUser,
        newGoalModalOpen,
        setActiveGoal,
        startNewGoal,
        openNewGoalModal: () => setNewGoalModalOpen(true),
        closeNewGoalModal: () => setNewGoalModalOpen(false),
      }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
}

export function useWorkspace() {
  const ctx = useContext(WorkspaceContext);
  if (!ctx) throw new Error("useWorkspace must be used within WorkspaceProvider");
  return ctx;
}
