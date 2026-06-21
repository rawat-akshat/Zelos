"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import type { Goal, Pattern, TimelineEvent } from "../lib/types";
import { api } from "../lib/api";
import {
  apiPatternToPattern,
  apiTimelineToEvent,
  deriveTitleFromMessage,
  sessionToGoal,
} from "../lib/mappers";
import { useAuth } from "./AuthContext";

interface WorkspaceContextValue {
  activeGoal: Goal | null;
  activeSessionId: string | null;
  patterns: Pattern[];
  timelineEvents: TimelineEvent[];
  goals: Goal[];
  isNewUser: boolean;
  hasWorkspaceHistory: boolean;
  newGoalModalOpen: boolean;
  loading: boolean;
  setActiveGoal: (goal: Goal | null) => void;
  startNewGoal: (title: string) => Promise<void>;
  loadSession: (sessionId: string) => Promise<void>;
  refreshSessionMeta: (sessionId: string) => Promise<void>;
  refreshGoals: () => Promise<void>;
  markWorkspaceHistory: () => void;
  openNewGoalModal: () => void;
  closeNewGoalModal: () => void;
  ensureSessionForMessage: (text: string) => Promise<string>;
}

const WorkspaceContext = createContext<WorkspaceContextValue | null>(null);

export function WorkspaceProvider({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [activeGoal, setActiveGoal] = useState<Goal | null>(null);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [hasWorkspaceHistory, setHasWorkspaceHistory] = useState(false);
  const [patterns, setPatterns] = useState<Pattern[]>([]);
  const [timelineEvents, setTimelineEvents] = useState<TimelineEvent[]>([]);
  const [newGoalModalOpen, setNewGoalModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const refreshSessionMeta = useCallback(async (sessionId: string) => {
    const [timeline, sessionPatterns, session] = await Promise.all([
      api.getTimeline(sessionId),
      api.getSessionPatterns(sessionId),
      api.getSession(sessionId),
    ]);
    setTimelineEvents(timeline.map(apiTimelineToEvent));
    setPatterns(sessionPatterns.map((p) => apiPatternToPattern(p, sessionId)));
    setActiveGoal(sessionToGoal(session, sessionPatterns));
    setActiveSessionId(sessionId);
  }, []);

  const refreshGoals = useCallback(async () => {
    if (!isAuthenticated) return;
    const { sessions } = await api.listSessions();
    const withPatterns = await Promise.all(
      sessions.map(async (s) => {
        try {
          const p = await api.getSessionPatterns(s.id);
          return sessionToGoal(s, p);
        } catch {
          return sessionToGoal(s, []);
        }
      })
    );
    setGoals(withPatterns);
  }, [isAuthenticated]);

  const loadSession = useCallback(
    async (sessionId: string) => {
      setLoading(true);
      try {
        await api.openSession(sessionId).catch(() => undefined);
        await refreshSessionMeta(sessionId);
        setHasWorkspaceHistory(true);
      } finally {
        setLoading(false);
      }
    },
    [refreshSessionMeta]
  );

  const startNewGoal = useCallback(
    async (title: string) => {
      if (!isAuthenticated) {
        setActiveGoal({
          id: "guest",
          title,
          description: title,
          currentFocus: "Getting started",
          nextStep: "Share what's on your mind in the workspace",
          momentum: "good",
          patternsObservedCount: 0,
          lastActiveAt: new Date(),
          status: "active",
          recentEvents: [],
          activeExperiments: [],
          createdAt: new Date(),
        });
        setActiveSessionId(null);
        router.push("/dashboard");
        return;
      }

      setLoading(true);
      try {
        const session = await api.createSession({
          title: title.slice(0, 200),
          goal: title,
          first_message: title,
        });
        await refreshSessionMeta(session.id);
        await refreshGoals();
        setHasWorkspaceHistory(true);
        router.push(`/dashboard?goal=${session.id}`);
      } catch (err) {
        setLoading(false);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [isAuthenticated, refreshSessionMeta, refreshGoals, router]
  );

  const ensureSessionForMessage = useCallback(
    async (text: string) => {
      if (activeSessionId) return activeSessionId;
      const title = deriveTitleFromMessage(text);
      const session = await api.createSession({
        title,
        goal: activeGoal?.description ?? activeGoal?.title ?? title,
        first_message: text,
      });
      setActiveSessionId(session.id);
      setActiveGoal(sessionToGoal(session, []));
      await refreshGoals();
      return session.id;
    },
    [activeSessionId, activeGoal, refreshGoals]
  );

  const markWorkspaceHistory = useCallback(() => {
    setHasWorkspaceHistory(true);
  }, []);

  const isNewUser = !isAuthenticated
    ? activeGoal === null
    : goals.length === 0 && activeGoal === null;

  const showSidebarInsights = hasWorkspaceHistory && activeGoal !== null;

  return (
    <WorkspaceContext.Provider
      value={{
        activeGoal,
        activeSessionId,
        patterns: showSidebarInsights ? patterns : [],
        timelineEvents: showSidebarInsights ? timelineEvents : [],
        goals,
        isNewUser,
        hasWorkspaceHistory,
        newGoalModalOpen,
        loading,
        setActiveGoal,
        startNewGoal,
        loadSession,
        refreshSessionMeta,
        refreshGoals,
        markWorkspaceHistory,
        openNewGoalModal: () => setNewGoalModalOpen(true),
        closeNewGoalModal: () => setNewGoalModalOpen(false),
        ensureSessionForMessage,
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
