"use client";

import { PanelCard, CardLabel } from "./PanelCard";
import { mockActiveGoal } from "../../../lib/mock-data";

interface NextStepCardProps {
  nextStep?: string | null;
  empty?: boolean;
}

export default function NextStepCard({
  nextStep = mockActiveGoal.nextStep,
  empty = false,
}: NextStepCardProps) {
  return (
    <PanelCard>
      <CardLabel>Next Step</CardLabel>
      {empty || !nextStep ? (
        <p style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.55 }}>
          Your next honest step will appear here once you start talking through a goal.
        </p>
      ) : (
        <>
          <p
            style={{
              fontSize: 14,
              color: "var(--text-primary)",
              lineHeight: 1.55,
              marginBottom: 16,
            }}
          >
            {nextStep}
          </p>
          <button
            type="button"
            style={{
              width: "100%",
              padding: "10px 16px",
              borderRadius: 10,
              background: "var(--accent)",
              border: "1px solid var(--accent)",
              color: "var(--accent-on)",
              fontSize: 13,
              fontWeight: 500,
              cursor: "pointer",
              transition: "background 180ms",
              fontFamily: "var(--font-body)",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "var(--accent-hover)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "var(--accent)")}
          >
            Commit to this step
          </button>
        </>
      )}
    </PanelCard>
  );
}
