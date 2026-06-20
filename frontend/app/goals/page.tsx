"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import AppShell from "../components/layout/AppShell";
import PageContent from "../components/layout/PageContent";
import Card from "../components/ui/Card";
import { mockGoals, formatLastActive } from "../lib/mock-data";
import type { Goal } from "../lib/types";
import { Target, PauseCircle, CheckCircle2 } from "lucide-react";
import { useWorkspace } from "../context/WorkspaceContext";

const STATUS_LABELS: Record<Goal["status"], string> = {
  active: "Active",
  paused: "Paused",
  completed: "Completed",
};

export default function GoalsPage() {
  return (
    <AppShell>
      <GoalsPageContent />
    </AppShell>
  );
}

function GoalsPageContent() {
  const { openNewGoalModal } = useWorkspace();

  return (
    <PageContent
        title="Goals"
        subtitle={`${mockGoals.length} goals in your workspace`}
        action={
          <button
            type="button"
            onClick={openNewGoalModal}
            style={{
              padding: "8px 16px",
              borderRadius: 8,
              background: "var(--accent-glow)",
              border: "1px solid var(--border-accent)",
              color: "var(--text-primary)",
              fontSize: 13,
              fontWeight: 500,
              cursor: "pointer",
              fontFamily: "var(--font-body)",
            }}
          >
            New Goal
          </button>
        }
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {mockGoals.map((goal, i) => (
            <motion.div
              key={goal.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04, duration: 0.25 }}
            >
              <GoalCard goal={goal} />
            </motion.div>
          ))}
        </div>
      </PageContent>
  );
}

function GoalCard({ goal }: { goal: Goal }) {
  const router = useRouter();
  const patternNames =
    goal.id === "goal-1"
      ? "Research Spiral, Decision Loop"
      : goal.id === "goal-2"
      ? "Optimization Loop, Avoidance"
      : goal.detectedPatternsCount > 0
      ? `${goal.detectedPatternsCount} patterns`
      : "None yet";

  const StatusIcon =
    goal.status === "completed"
      ? CheckCircle2
      : goal.status === "paused"
      ? PauseCircle
      : Target;

  return (
    <Card hover padding="md">
      <button
        type="button"
        onClick={() => router.push(`/dashboard?goal=${goal.id}`)}
        style={{
          width: "100%",
          textAlign: "left",
          background: "none",
          border: "none",
          padding: 0,
          cursor: "pointer",
        }}
      >
        <div className="flex items-start gap-4">
          <div
            className="w-8 h-8 rounded-[8px] flex items-center justify-center flex-shrink-0 mt-0.5"
            style={{
              background:
                goal.status === "completed"
                  ? "var(--success-dim)"
                  : "var(--accent-glow)",
            }}
          >
            <StatusIcon
              size={14}
              style={{
                color:
                  goal.status === "completed" ? "var(--success)" : "var(--accent)",
              }}
            />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-3">
              <h3
                className="text-sm font-medium leading-snug"
                style={{ color: "var(--text-primary)" }}
              >
                {goal.title}
              </h3>
              <span
                className="text-xs flex-shrink-0"
                style={{
                  color:
                    goal.status === "active"
                      ? "var(--accent)"
                      : "var(--text-muted)",
                  fontWeight: 500,
                }}
              >
                {STATUS_LABELS[goal.status]}
              </span>
            </div>

            {goal.currentState && (
              <p className="text-xs mt-1.5" style={{ color: "var(--text-secondary)" }}>
                Current state: {goal.currentState}
              </p>
            )}

            <div className="flex flex-col gap-1 mt-2">
              <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                Patterns: {patternNames}
              </span>
              {goal.nextSuggestedAction && (
                <span className="text-xs" style={{ color: "var(--text-secondary)" }}>
                  Next step: {goal.nextSuggestedAction}
                </span>
              )}
              <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                Last active: {formatLastActive(goal.updatedAt)}
              </span>
            </div>
          </div>
        </div>
      </button>
    </Card>
  );
}
