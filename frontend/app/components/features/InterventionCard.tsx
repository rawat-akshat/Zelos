"use client";

import type { Intervention } from "../../lib/types";

interface InterventionCardProps {
  intervention: Intervention;
  onAction?: (action: string) => void;
  onDismiss?: () => void;
}

export default function InterventionCard({
  intervention,
  onAction,
  onDismiss,
}: InterventionCardProps) {
  return (
    <div
      style={{
        marginTop: 12,
        padding: "16px 18px",
        borderRadius: "var(--radius-card)",
        background: "var(--bg-card)",
        border: "1px solid var(--border-accent)",
        boxShadow: "var(--shadow-sm)",
      }}
    >
      <p
        style={{
          fontSize: 10,
          fontWeight: 600,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "var(--accent)",
          marginBottom: 10,
        }}
      >
        Observation
      </p>
      <p style={{ fontSize: 14, color: "var(--text-primary)", lineHeight: 1.55, marginBottom: 14 }}>
        {intervention.message}
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 14 }}>
        <Meta label="Pattern" value={intervention.patternName} />
        <Meta label="Confidence" value={`${Math.round(intervention.confidence * 100)}%`} />
        <Meta label="Evidence" value={`${intervention.evidenceCount} moments`} />
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {intervention.actions.map((action) => (
          <button
            key={action}
            type="button"
            onClick={() => {
              if (action.toLowerCase() === "dismiss") onDismiss?.();
              else onAction?.(action);
            }}
            style={{
              padding: "7px 14px",
              borderRadius: 8,
              fontSize: 12,
              fontWeight: 500,
              cursor: "pointer",
              fontFamily: "var(--font-body)",
              background: action.toLowerCase() === "dismiss" ? "transparent" : "var(--accent-glow)",
              border:
                action.toLowerCase() === "dismiss"
                  ? "1px solid var(--border)"
                  : "1px solid var(--border-accent)",
              color:
                action.toLowerCase() === "dismiss"
                  ? "var(--text-muted)"
                  : "var(--text-primary)",
              transition: "all 180ms",
            }}
          >
            {action}
          </button>
        ))}
      </div>
    </div>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <span style={{ fontSize: 11, color: "var(--text-muted)" }}>
      {label}: <span style={{ color: "var(--text-secondary)" }}>{value}</span>
    </span>
  );
}
