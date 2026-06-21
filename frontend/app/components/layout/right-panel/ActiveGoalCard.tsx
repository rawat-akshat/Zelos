"use client";

import { PanelCard, CardLabel } from "./PanelCard";
import { mockActiveGoal } from "../../../lib/mock-data";

interface ActiveGoalCardProps {
  goal?: typeof mockActiveGoal | null;
}

export default function ActiveGoalCard({ goal }: ActiveGoalCardProps) {
  const g = goal ?? mockActiveGoal;
  const isEmpty = !goal;

  return (
    <PanelCard accent>
      <CardLabel>Active Goal</CardLabel>
      {isEmpty ? (
        <div>
          <p style={{ fontSize: 15, fontWeight: 500, color: "var(--text-primary)", marginBottom: 8 }}>
            Not started yet
          </p>
          <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.55 }}>
            Start a goal to see your current state and next step here.
          </p>
        </div>
      ) : (
        <>
          <h3
            className="font-heading"
            style={{ fontSize: 20, color: "var(--text-primary)", marginBottom: 14, lineHeight: 1.25 }}
          >
            {g.title}
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <Row label="Current Focus" value={g.currentFocus} highlight />
            <Row label="Last Action" value={g.lastAction ?? "—"} />
            <Row label="Next Step" value={g.nextStep} />
          </div>
        </>
      )}
    </PanelCard>
  );
}

function Row({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div>
      <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 4 }}>
        {label}
      </p>
      <p
        style={{
          fontSize: 13,
          lineHeight: 1.5,
          color: highlight ? "var(--text-primary)" : "var(--text-secondary)",
          fontWeight: highlight ? 500 : 400,
        }}
      >
        {value}
      </p>
    </div>
  );
}
