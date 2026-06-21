"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AppShell from "../components/layout/AppShell";
import PageContent from "../components/layout/PageContent";
import { CardLabel } from "../components/layout/right-panel/PanelCard";
import PatternEvidenceModal from "../components/insights/PatternEvidenceModal";
import InlineAlert from "../components/ui/InlineAlert";
import Button from "../components/ui/Button";
import { apiInsightsToPageData, getOccurrencesForPattern } from "../lib/insights-api";
import { api } from "../lib/api";
import { formatApiError } from "../lib/api-errors";
import { useAuth } from "../context/AuthContext";
import { formatRelativeTime } from "../lib/mock-data";
import type { InsightPattern, InsightsPageData } from "../lib/types";

const TIMELINE_TYPE_LABELS: Record<string, string> = {
  goal_created: "Goal started",
  pattern_detected: "Pattern detected",
  decision_made: "Decision made",
  experiment_started: "Experiment started",
  playbook_updated: "Playbook updated",
  action_completed: "Milestone",
};

export default function InsightsPage() {
  const router = useRouter();
  const { isAuthenticated, loading: authLoading } = useAuth();
  const [data, setData] = useState<InsightsPageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [selectedPattern, setSelectedPattern] = useState<InsightPattern | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const loadInsights = useCallback(() => {
    setLoading(true);
    setLoadError(null);
    return api
      .getInsights()
      .then((raw) => setData(apiInsightsToPageData(raw)))
      .catch((err) => {
        setData(null);
        setLoadError(formatApiError(err));
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (authLoading) return;
    if (!isAuthenticated) {
      router.replace("/login");
      return;
    }
    loadInsights();
  }, [authLoading, isAuthenticated, router, loadInsights]);

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 3200);
  };

  if (loading) {
    return (
      <AppShell>
        <PageContent title="Insights" subtitle="Loading your behavioral patterns…" maxWidth={640}>
          <div />
        </PageContent>
      </AppShell>
    );
  }

  if (loadError) {
    return (
      <AppShell>
        <PageContent
          title="Insights"
          subtitle="Your long-term behavioral patterns and what works for you"
          maxWidth={640}
        >
          <InlineAlert title="Could not load insights">{loadError}</InlineAlert>
          <div style={{ marginTop: 16 }}>
            <Button variant="secondary" onClick={() => loadInsights()}>
              Try again
            </Button>
          </div>
        </PageContent>
      </AppShell>
    );
  }

  if (!data) {
    return (
      <AppShell>
        <PageContent title="Insights" subtitle="Something went wrong." maxWidth={640}>
          <div />
        </PageContent>
      </AppShell>
    );
  }

  if (!data.hasData) {
    return (
      <AppShell>
        <PageContent
          title="Insights"
          subtitle="Your long-term behavioral patterns and what works for you"
          maxWidth={640}
        >
          <EmptyState />
        </PageContent>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <PatternEvidenceModal
        open={selectedPattern !== null}
        pattern={selectedPattern}
        occurrences={
          selectedPattern ? getOccurrencesForPattern(selectedPattern.id, data.occurrences) : []
        }
        onClose={() => setSelectedPattern(null)}
        onDeepLinkPlaceholder={showToast}
      />

      {toast && (
        <div
          style={{
            position: "fixed",
            bottom: 28,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 60,
            padding: "12px 20px",
            borderRadius: 10,
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
            boxShadow: "var(--shadow-md)",
            fontSize: 14,
            color: "var(--text-primary)",
          }}
        >
          {toast}
        </div>
      )}

      <PageContent
        title="Insights"
        subtitle="Your long-term behavioral patterns and what works for you"
        maxWidth={900}
      >
        <SummaryCards summary={data.summary} />

        <Section title="Behavioral Profile">
          <p style={{ fontSize: 14, color: "var(--text-secondary)", margin: "0 0 20px", lineHeight: 1.55 }}>
            A working snapshot of how you tend to move through goals.
          </p>
          <BehavioralProfile metrics={data.behavioralProfile} />
        </Section>

        <Section title="Most Frequent Patterns">
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {data.patterns.map((pattern) => (
              <PatternCard
                key={pattern.id}
                pattern={pattern}
                onViewEvidence={() => setSelectedPattern(pattern)}
              />
            ))}
          </div>
        </Section>

        <Section title="Personal Playbook">
          <PlaybookSection playbook={data.playbook} />
        </Section>

        <Section title="Behavioral Timeline">
          <BehavioralTimeline items={data.timeline} />
        </Section>

        <Section title="Experiments">
          <ExperimentsSection
            active={data.activeExperiments}
            completed={data.completedExperiments}
          />
        </Section>
      </PageContent>
    </AppShell>
  );
}

function EmptyState() {
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
        Insights will appear as Zelos learns with you.
      </h2>
      <p style={{ fontSize: 15, color: "var(--text-secondary)", lineHeight: 1.6, margin: "0 0 28px", maxWidth: 420, marginLeft: "auto", marginRight: "auto" }}>
        As you work through goals, Zelos will surface patterns, strengths, experiments, and playbook rules.
      </p>
      <Link
        href="/dashboard"
        style={{
          display: "inline-block",
          padding: "12px 24px",
          borderRadius: 10,
          background: "var(--accent-glow)",
          border: "1px solid var(--border-accent)",
          color: "var(--text-primary)",
          fontSize: 14,
          fontWeight: 500,
          textDecoration: "none",
        }}
      >
        Start Your First Goal
      </Link>
    </div>
  );
}

function SummaryCards({
  summary,
}: {
  summary: InsightsPageData["summary"];
}) {
  const cards = [
    { label: "Active Goals", value: summary.activeGoals },
    { label: "Patterns Detected", value: summary.patternsDetected },
    { label: "Playbook Rules Learned", value: summary.playbookRulesLearned },
    { label: "Experiments Completed", value: summary.experimentsCompleted },
  ];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
        gap: 12,
        marginBottom: 8,
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
          <p style={{ fontSize: 28, fontWeight: 500, color: "var(--text-primary)", margin: "0 0 6px", fontFamily: "var(--font-heading)" }}>
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

function BehavioralProfile({
  metrics,
}: {
  metrics: InsightsPageData["behavioralProfile"];
}) {
  return (
    <div
      style={{
        padding: "22px 24px",
        borderRadius: "var(--radius-card)",
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
        display: "flex",
        flexDirection: "column",
        gap: 16,
      }}
    >
      {metrics.map((metric) => (
        <div key={metric.label}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ fontSize: 13, color: "var(--text-primary)" }}>{metric.label}</span>
            <span style={{ fontSize: 13, color: "var(--text-muted)" }}>{metric.value}</span>
          </div>
          <div
            style={{
              height: 8,
              borderRadius: 4,
              background: "var(--bg-elevated)",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${metric.value}%`,
                borderRadius: 4,
                background: "linear-gradient(90deg, var(--accent-glow), var(--accent))",
                opacity: 0.85,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function PatternCard({
  pattern,
  onViewEvidence,
}: {
  pattern: InsightPattern;
  onViewEvidence: () => void;
}) {
  const maxCount = Math.max(...pattern.goals.map((g) => g.count), 1);

  return (
    <article
      style={{
        padding: "20px 22px",
        borderRadius: "var(--radius-card)",
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, marginBottom: 8 }}>
        <h3 style={{ fontSize: 16, fontWeight: 500, color: "var(--text-primary)", margin: 0 }}>
          {pattern.name}
        </h3>
        {pattern.trend && (
          <span style={{ fontSize: 11, color: "var(--text-muted)", flexShrink: 0 }}>
            {pattern.trend === "increasing" ? "↑ rising" : pattern.trend === "decreasing" ? "↓ easing" : "→ steady"}
          </span>
        )}
      </div>
      <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.55, margin: "0 0 14px" }}>
        &ldquo;{pattern.description}&rdquo;
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 16px", marginBottom: 16, fontSize: 12, color: "var(--text-muted)" }}>
        <span>Confidence: {pattern.confidence}%</span>
        <span>Observed: {pattern.observedCount} times</span>
        <span>Last observed: {pattern.lastObservedAt}</span>
      </div>

      <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--text-muted)", margin: "0 0 10px" }}>
        Goals
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 18 }}>
        {pattern.goals.map((goal) => (
          <div key={goal.goalId}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
              <span style={{ fontSize: 13, color: "var(--text-secondary)" }}>
                {goal.goalTitle} — {goal.count} {goal.count === 1 ? "time" : "times"}
              </span>
            </div>
            <div style={{ height: 4, borderRadius: 2, background: "var(--bg-elevated)", overflow: "hidden" }}>
              <div
                style={{
                  height: "100%",
                  width: `${(goal.count / maxCount) * 100}%`,
                  borderRadius: 2,
                  background: "var(--accent)",
                  opacity: 0.5,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={onViewEvidence}
        style={{
          padding: "9px 16px",
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
        View Evidence
      </button>
    </article>
  );
}

function PlaybookSection({
  playbook,
}: {
  playbook: InsightsPageData["playbook"];
}) {
  return (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: 14,
        }}
      >
        <PlaybookCard title="Works For You" items={playbook.worksWell} positive />
        <PlaybookCard title="Doesn't Work" items={playbook.doesNotWork} />
      </div>
      <p style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 16, lineHeight: 1.5 }}>
        Your playbook updates as Zelos sees what actually helps you move forward.
      </p>
    </>
  );
}

function PlaybookCard({
  title,
  items,
  positive,
}: {
  title: string;
  items: string[];
  positive?: boolean;
}) {
  return (
    <div
      style={{
        padding: "20px 22px",
        borderRadius: "var(--radius-card)",
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
      }}
    >
      <p style={{ fontSize: 14, fontWeight: 500, color: "var(--text-primary)", margin: "0 0 14px" }}>
        {title}
      </p>
      <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 10 }}>
        {items.map((item) => (
          <li
            key={item}
            style={{
              fontSize: 13,
              color: "var(--text-secondary)",
              lineHeight: 1.5,
              paddingLeft: 14,
              position: "relative",
            }}
          >
            <span
              style={{
                position: "absolute",
                left: 0,
                color: positive ? "var(--accent)" : "var(--text-muted)",
              }}
            >
              ·
            </span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function BehavioralTimeline({
  items,
}: {
  items: InsightsPageData["timeline"];
}) {
  return (
    <div
      style={{
        padding: "8px 0",
        borderRadius: "var(--radius-card)",
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
      }}
    >
      {items.map((item, index) => (
        <div
          key={item.id}
          style={{
            display: "flex",
            gap: 16,
            padding: "16px 22px",
            borderBottom: index < items.length - 1 ? "1px solid var(--border)" : "none",
          }}
        >
          <div style={{ width: 10, flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 6 }}>
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "var(--accent)",
                opacity: 0.7,
              }}
            />
            {index < items.length - 1 && (
              <div style={{ width: 1, flex: 1, minHeight: 24, background: "var(--border)", marginTop: 4 }} />
            )}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px 12px", marginBottom: 4 }}>
              <span style={{ fontSize: 12, color: "var(--text-muted)" }}>
                {formatRelativeTime(item.createdAt)}
              </span>
              <span style={{ fontSize: 11, fontWeight: 500, color: "var(--accent)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                {TIMELINE_TYPE_LABELS[item.type] ?? item.type}
              </span>
            </div>
            <p style={{ fontSize: 14, fontWeight: 500, color: "var(--text-primary)", margin: "0 0 4px" }}>
              {item.title}
            </p>
            <p style={{ fontSize: 12, color: "var(--text-muted)", margin: 0 }}>
              {item.goalTitle}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

function ExperimentsSection({
  active,
  completed,
}: {
  active: InsightsPageData["activeExperiments"];
  completed: InsightsPageData["completedExperiments"];
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <ExperimentGroup label="Current Experiments" experiments={active} />
      <ExperimentGroup label="Completed Experiments" experiments={completed} completed />
    </div>
  );
}

function ExperimentGroup({
  label,
  experiments,
  completed,
}: {
  label: string;
  experiments: InsightsPageData["activeExperiments"];
  completed?: boolean;
}) {
  return (
    <div>
      <p style={{ fontSize: 13, fontWeight: 500, color: "var(--text-primary)", margin: "0 0 12px" }}>
        {label}
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {experiments.map((exp) => (
          <div
            key={exp.id}
            style={{
              padding: "16px 18px",
              borderRadius: 14,
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
            }}
          >
            <p style={{ fontSize: 14, fontWeight: 500, color: "var(--text-primary)", margin: "0 0 8px" }}>
              {exp.title}
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 16px", fontSize: 12, color: "var(--text-muted)" }}>
              <span>{exp.goalTitle}</span>
              <span>{completed ? "Completed" : "Active"}</span>
              <span>
                {completed ? "Completed" : "Started"}{" "}
                {exp.date.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginTop: 32 }}>
      <CardLabel>{title}</CardLabel>
      {children}
    </section>
  );
}
