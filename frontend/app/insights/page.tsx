"use client";

import AppShell from "../components/layout/AppShell";
import PageContent from "../components/layout/PageContent";
import ProfileSection from "../components/layout/ProfileSection";
import { mockInsights } from "../lib/mock-data";
import { PanelCard, CardLabel } from "../components/layout/right-panel/PanelCard";

export default function InsightsPage() {
  const { strengths, growthAreas, recurringPatterns, playbook, timelineSummary } =
    mockInsights;

  return (
    <AppShell>
      <PageContent
        title="Insights"
        subtitle="Your long-term behavioral patterns and what works for you"
        maxWidth={640}
      >
        <InsightSection title="Strengths">
          <BulletList items={strengths} />
        </InsightSection>

        <InsightSection title="Growth Areas">
          <BulletList items={growthAreas} />
        </InsightSection>

        <InsightSection title="Recurring Patterns">
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {recurringPatterns.map((p) => (
              <PanelCard key={p.id}>
                <p style={{ fontSize: 14, fontWeight: 500, color: "var(--text-primary)", marginBottom: 6 }}>
                  {p.name}
                </p>
                <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.5, marginBottom: 8 }}>
                  {p.description}
                </p>
                <p style={{ fontSize: 11, color: "var(--text-muted)" }}>
                  Confidence: {Math.round(p.confidence * 100)}% · Evidence: {p.evidenceCount} moments
                </p>
              </PanelCard>
            ))}
          </div>
        </InsightSection>

        <InsightSection title="Personal Playbook">
          <PlaybookBlock label="What works" items={playbook.worksWell} />
          <PlaybookBlock label="What does not work" items={playbook.doesNotWork} />
        </InsightSection>

        <InsightSection title="Behavioral Experiments">
          <BulletList items={playbook.experiments} accent />
        </InsightSection>

        <InsightSection title="Timeline Summary">
          <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.65 }}>
            {timelineSummary}
          </p>
        </InsightSection>
      </PageContent>
    </AppShell>
  );
}

function InsightSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <CardLabel>{title}</CardLabel>
      {children}
    </section>
  );
}

function BulletList({ items, accent }: { items: string[]; accent?: boolean }) {
  return (
    <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 8 }}>
      {items.map((item) => (
        <li
          key={item}
          style={{
            fontSize: 14,
            color: accent ? "var(--text-primary)" : "var(--text-secondary)",
            lineHeight: 1.55,
            paddingLeft: 16,
            position: "relative",
          }}
        >
          <span
            style={{
              position: "absolute",
              left: 0,
              color: "var(--accent)",
            }}
          >
            ·
          </span>
          {item}
        </li>
      ))}
    </ul>
  );
}

function PlaybookBlock({ label, items }: { label: string; items: string[] }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <p style={{ fontSize: 13, fontWeight: 500, color: "var(--text-primary)", marginBottom: 8 }}>
        {label}
      </p>
      <BulletList items={items} />
    </div>
  );
}
