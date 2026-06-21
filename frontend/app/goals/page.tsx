"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, ChevronDown, CheckCircle2 } from "lucide-react";
import AppShell from "../components/layout/AppShell";
import PageContent from "../components/layout/PageContent";
import { CardLabel } from "../components/layout/right-panel/PanelCard";
import { useWorkspace } from "../context/WorkspaceContext";
import { useAuth } from "../context/AuthContext";
import { formatLastActive } from "../lib/mock-data";
import { formatApiError } from "../lib/api-errors";
import InlineAlert from "../components/ui/InlineAlert";
import Button from "../components/ui/Button";
import {
  formatPatternsObserved,
  getGoalsPageSummary,
  groupGoalsByStatus,
  MOMENTUM_META,
} from "../lib/goal-helpers";
import type { Goal, GoalRecentEvent } from "../lib/types";

export default function GoalsPage() {
  return (
    <AppShell>
      <GoalsPageContent />
    </AppShell>
  );
}

function GoalsPageContent() {
  const router = useRouter();
  const { isAuthenticated, loading: authLoading } = useAuth();
  const { openNewGoalModal, goals, refreshGoals } = useWorkspace();
  const [goalsLoaded, setGoalsLoaded] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.replace("/login");
      return;
    }
    if (isAuthenticated) {
      setLoadError(null);
      refreshGoals()
        .catch((err) => setLoadError(formatApiError(err)))
        .finally(() => setGoalsLoaded(true));
    }
  }, [authLoading, isAuthenticated, router, refreshGoals]);

  if (authLoading || (isAuthenticated && !goalsLoaded)) {
    return (
      <PageContent
        title="Goals"
        subtitle="Your active journeys, experiments, and long-term projects."
        maxWidth={900}
      >
        <div />
      </PageContent>
    );
  }

  if (loadError) {
    return (
      <PageContent
        title="Goals"
        subtitle="Your active journeys, experiments, and long-term projects."
        maxWidth={900}
      >
        <InlineAlert title="Could not load goals">{loadError}</InlineAlert>
        <div style={{ marginTop: 16 }}>
          <Button
            variant="secondary"
            onClick={() => {
              setGoalsLoaded(false);
              setLoadError(null);
              refreshGoals()
                .catch((err) => setLoadError(formatApiError(err)))
                .finally(() => setGoalsLoaded(true));
            }}
          >
            Try again
          </Button>
        </div>
      </PageContent>
    );
  }

  if (goals.length === 0) {
    return (
      <PageContent
        title="Goals"
        subtitle="Your active journeys, experiments, and long-term projects."
        maxWidth={900}
      >
        <EmptyState onNewGoal={openNewGoalModal} />
      </PageContent>
    );
  }

  const summary = getGoalsPageSummary(goals);
  const grouped = groupGoalsByStatus(goals);

  return (
    <PageContent
      title="Goals"
      subtitle="Your active journeys, experiments, and long-term projects."
      maxWidth={900}
      action={
        <button
          type="button"
          onClick={openNewGoalModal}
          style={primaryButtonStyle}
        >
          <Plus size={15} strokeWidth={2} />
          New Goal
        </button>
      }
    >
      <SummaryCards summary={summary} />

      <GoalSection title="Active" defaultOpen>
        {grouped.active.map((goal, i) => (
          <GoalCard key={goal.id} goal={goal} variant="active" index={i} />
        ))}
      </GoalSection>

      {grouped.paused.length > 0 && (
        <GoalSection title="Paused" defaultOpen={false}>
          {grouped.paused.map((goal, i) => (
            <GoalCard key={goal.id} goal={goal} variant="paused" index={i} />
          ))}
        </GoalSection>
      )}

      {grouped.completed.length > 0 && (
        <GoalSection title="Completed" defaultOpen={false}>
          {grouped.completed.map((goal, i) => (
            <GoalCard key={goal.id} goal={goal} variant="completed" index={i} />
          ))}
        </GoalSection>
      )}
    </PageContent>
  );
}

function EmptyState({ onNewGoal }: { onNewGoal: () => void }) {
  return (
    <div
      style={{
        padding: "48px 32px",
        borderRadius: "var(--radius-card)",
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
        textAlign: "center",
      }}
    >
      <h2 className="font-heading" style={{ fontSize: 22, color: "var(--text-primary)", margin: "0 0 12px" }}>
        No goals yet
      </h2>
      <p style={{ fontSize: 15, color: "var(--text-secondary)", lineHeight: 1.6, margin: "0 0 28px", maxWidth: 440, marginLeft: "auto", marginRight: "auto" }}>
        Start with something you want to make progress on. Zelos will help you understand the patterns that help or hinder you.
      </p>
      <button type="button" onClick={onNewGoal} style={primaryButtonStyle}>
        Start Your First Goal
      </button>
    </div>
  );
}

function SummaryCards({
  summary,
}: {
  summary: ReturnType<typeof getGoalsPageSummary>;
}) {
  const cards = [
    { label: "Active Goals", value: summary.activeGoals },
    { label: "Paused Goals", value: summary.pausedGoals },
    { label: "Completed Goals", value: summary.completedGoals },
    { label: "Patterns Observed", value: summary.patternsObserved },
  ];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
        gap: 12,
      }}
    >
      {cards.map((card) => (
        <div
          key={card.label}
          style={{
            padding: "18px 20px",
            borderRadius: "var(--radius-card)",
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
          }}
        >
          <p className="font-heading" style={{ fontSize: 28, fontWeight: 500, color: "var(--text-primary)", margin: "0 0 6px" }}>
            {card.value}
          </p>
          <p style={{ fontSize: 12, color: "var(--text-muted)", margin: 0, lineHeight: 1.4 }}>
            {card.label}
          </p>
        </div>
      ))}
    </div>
  );
}

function GoalSection({
  title,
  defaultOpen,
  children,
}: {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen ?? true);
  const collapsible = defaultOpen === false;

  return (
    <section>
      <button
        type="button"
        onClick={() => collapsible && setOpen((v) => !v)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          width: "100%",
          background: "none",
          border: "none",
          padding: 0,
          cursor: collapsible ? "pointer" : "default",
          marginBottom: 14,
        }}
      >
        <CardLabel>{title}</CardLabel>
        {collapsible && (
          <ChevronDown
            size={14}
            style={{
              color: "var(--text-muted)",
              transform: open ? "rotate(0deg)" : "rotate(-90deg)",
              transition: "transform 180ms",
            }}
          />
        )}
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={collapsible ? { height: 0, opacity: 0 } : false}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{ overflow: "hidden" }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 14, paddingBottom: 4 }}>
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function GoalCard({
  goal,
  variant,
  index,
}: {
  goal: Goal;
  variant: "active" | "paused" | "completed";
  index: number;
}) {
  const router = useRouter();
  const [expanded, setExpanded] = useState(false);
  const momentum = MOMENTUM_META[goal.momentum];
  const patternsLabel = formatPatternsObserved(goal.patternsObservedCount, goal.primaryPatternName);
  const timeline = goal.recentEvents;

  const continueGoal = () => router.push(`/dashboard?goal=${goal.id}`);

  return (
    <motion.article
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.25 }}
      style={{
        borderRadius: "var(--radius-card)",
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
        overflow: "hidden",
      }}
    >
      <div
        role="button"
        tabIndex={0}
        onClick={() => setExpanded((v) => !v)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setExpanded((v) => !v);
          }
        }}
        style={{ padding: "22px 24px", cursor: "pointer" }}
      >
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, marginBottom: 16 }}>
          <h3 className="font-heading" style={{ fontSize: 20, color: "var(--text-primary)", margin: 0, lineHeight: 1.25 }}>
            {variant === "completed" && (
              <CheckCircle2
                size={16}
                style={{ color: "var(--success)", marginRight: 8, verticalAlign: "middle" }}
              />
            )}
            {goal.title}
          </h3>
          {variant === "paused" && (
            <span style={{ fontSize: 12, fontWeight: 500, color: "var(--text-muted)", flexShrink: 0 }}>
              Paused
            </span>
          )}
          {variant === "completed" && (
            <span style={{ fontSize: 12, fontWeight: 500, color: "var(--success)", flexShrink: 0 }}>
              Completed
            </span>
          )}
        </div>

        {variant === "active" && (
          <>
            <CurrentFocusBlock focus={goal.currentFocus} />
            <MetaGrid
              rows={[
                { label: "Next Step", value: goal.nextStep },
                { label: "Momentum", value: momentum.label, momentum },
                { label: "Patterns Observed", value: patternsLabel },
                { label: "Last Active", value: formatLastActive(goal.lastActiveAt) },
              ]}
            />
            <RecentJourney events={goal.recentEvents} />
          </>
        )}

        {variant === "paused" && (
          <>
            {goal.pauseReason && (
              <p style={{ fontSize: 13, color: "var(--text-secondary)", margin: "0 0 14px" }}>
                <span style={{ color: "var(--text-muted)" }}>Reason: </span>
                {goal.pauseReason}
              </p>
            )}
            <MetaGrid
              rows={[
                { label: "Next Step", value: goal.nextStep },
                { label: "Last Active", value: formatLastActive(goal.lastActiveAt) },
              ]}
            />
          </>
        )}

        {variant === "completed" && (
          <>
            {goal.completedSummary && (
              <p style={{ fontSize: 13, color: "var(--text-secondary)", margin: "0 0 10px" }}>
                <span style={{ color: "var(--text-muted)" }}>Completed: </span>
                {goal.completedSummary}
              </p>
            )}
            {goal.keyLearning && (
              <p style={{ fontSize: 14, color: "var(--text-primary)", lineHeight: 1.55, margin: "0 0 14px" }}>
                <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--text-muted)", display: "block", marginBottom: 6 }}>
                  Key Learning
                </span>
                {goal.keyLearning}
              </p>
            )}
          </>
        )}
      </div>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{ overflow: "hidden" }}
          >
            <GoalDetailPreview goal={goal} timeline={timeline} patternsLabel={patternsLabel} />
          </motion.div>
        )}
      </AnimatePresence>

      <div style={{ padding: "0 24px 22px" }}>
        {variant === "active" && (
          <button type="button" onClick={continueGoal} style={primaryButtonStyle}>
            Continue Goal
          </button>
        )}
        {variant === "paused" && (
          <button type="button" onClick={continueGoal} style={secondaryButtonStyle}>
            Resume Goal
          </button>
        )}
        {variant === "completed" && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setExpanded(true);
            }}
            style={secondaryButtonStyle}
          >
            View Journey
          </button>
        )}
      </div>
    </motion.article>
  );
}

function CurrentFocusBlock({ focus }: { focus: string }) {
  return (
    <div
      style={{
        padding: "14px 16px",
        borderRadius: 12,
        background: "var(--accent-glow)",
        border: "1px solid var(--border-accent)",
        marginBottom: 16,
      }}
    >
      <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-muted)", margin: "0 0 6px" }}>
        Current Focus
      </p>
      <p style={{ fontSize: 16, fontWeight: 500, color: "var(--text-primary)", margin: 0, lineHeight: 1.4 }}>
        {focus}
      </p>
    </div>
  );
}

function MetaGrid({
  rows,
}: {
  rows: Array<{
    label: string;
    value: string;
    momentum?: (typeof MOMENTUM_META)[keyof typeof MOMENTUM_META];
  }>;
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
        gap: "12px 20px",
        marginBottom: 16,
      }}
    >
      {rows.map((row) => (
        <div key={row.label}>
          <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--text-muted)", margin: "0 0 4px" }}>
            {row.label}
          </p>
          {row.momentum ? (
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: row.momentum.dotColor,
                  flexShrink: 0,
                }}
              />
              <span style={{ fontSize: 13, color: "var(--text-primary)", fontWeight: 500 }}>
                {row.value}
              </span>
            </div>
          ) : (
            <p style={{ fontSize: 13, color: "var(--text-secondary)", margin: 0, lineHeight: 1.4 }}>
              {row.value}
            </p>
          )}
          {row.momentum && (
            <p style={{ fontSize: 11, color: "var(--text-muted)", margin: "4px 0 0 14px" }}>
              {row.momentum.description}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

function RecentJourney({ events }: { events: Goal["recentEvents"] }) {
  if (events.length === 0) return null;

  return (
    <div>
      <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--text-muted)", margin: "0 0 8px" }}>
        Recent Journey
      </p>
      <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 6 }}>
        {events.slice(0, 3).map((event) => (
          <li key={event.id} style={{ fontSize: 13, color: "var(--text-secondary)", paddingLeft: 14, position: "relative", lineHeight: 1.45 }}>
            <span style={{ position: "absolute", left: 0, color: "var(--accent)" }}>·</span>
            {event.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

function GoalDetailPreview({
  goal,
  timeline,
  patternsLabel,
}: {
  goal: Goal;
  timeline: GoalRecentEvent[];
  patternsLabel: string;
}) {
  return (
    <div
      style={{
        padding: "0 24px 20px",
        borderTop: "1px solid var(--border)",
        marginTop: -4,
        paddingTop: 20,
      }}
    >
      {goal.description && (
        <DetailBlock label="Description" value={goal.description} />
      )}
      <DetailBlock label="Current Focus" value={goal.currentFocus} />
      <DetailBlock label="Next Step" value={goal.nextStep} />
      <DetailBlock label="Patterns Observed" value={patternsLabel} />

      {timeline.length > 0 && (
        <div style={{ marginBottom: 16 }}>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--text-muted)", margin: "0 0 10px" }}>
            Timeline
          </p>
          <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 8 }}>
            {timeline.map((event) => (
              <li key={event.id} style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.45 }}>
                {event.title}
              </li>
            ))}
          </ul>
        </div>
      )}

      {goal.activeExperiments.length > 0 && (
        <div>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--text-muted)", margin: "0 0 10px" }}>
            Active Experiments
          </p>
          <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 6 }}>
            {goal.activeExperiments.map((exp) => (
              <li key={exp} style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.45 }}>
                {exp}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function DetailBlock({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--text-muted)", margin: "0 0 4px" }}>
        {label}
      </p>
      <p style={{ fontSize: 13, color: "var(--text-secondary)", margin: 0, lineHeight: 1.55 }}>
        {value}
      </p>
    </div>
  );
}

const primaryButtonStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 8,
  padding: "10px 18px",
  borderRadius: 10,
  background: "var(--accent-glow)",
  border: "1px solid var(--border-accent)",
  color: "var(--text-primary)",
  fontSize: 13,
  fontWeight: 500,
  cursor: "pointer",
  fontFamily: "var(--font-body)",
};

const secondaryButtonStyle: React.CSSProperties = {
  ...primaryButtonStyle,
  background: "var(--bg-elevated)",
  border: "1px solid var(--border)",
};
