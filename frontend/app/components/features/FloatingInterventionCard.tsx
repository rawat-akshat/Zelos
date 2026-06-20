"use client";

import { X } from "lucide-react";
import type { Intervention } from "../../lib/types";

interface FloatingInterventionCardProps {
  intervention: Intervention;
  onAction?: (action: string) => void;
  onDismiss: () => void;
}

export default function FloatingInterventionCard({
  intervention,
  onAction,
  onDismiss,
}: FloatingInterventionCardProps) {
  return (
    <div
      style={{
        marginBottom: 12,
        padding: "14px 16px",
        borderRadius: "var(--radius-card)",
        background: "var(--bg-card)",
        border: "1px solid var(--border-accent)",
        boxShadow: "var(--shadow-md)",
        position: "relative",
      }}
    >
      <button
        type="button"
        onClick={onDismiss}
        aria-label="Dismiss"
        style={{
          position: "absolute",
          top: 10,
          right: 10,
          background: "none",
          border: "none",
          cursor: "pointer",
          color: "var(--text-muted)",
          padding: 4,
          display: "flex",
        }}
      >
        <X size={14} />
      </button>
      <p style={{ fontSize: 11, fontWeight: 600, color: "var(--accent)", marginBottom: 6, paddingRight: 24 }}>
        Pattern noticed: {intervention.patternName}
      </p>
      <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.5, marginBottom: 12 }}>
        {intervention.message}
      </p>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {intervention.actions.map((action) => (
          <button
            key={action}
            type="button"
            onClick={() => onAction?.(action)}
            style={{
              padding: "6px 12px",
              borderRadius: 8,
              fontSize: 12,
              fontWeight: 500,
              cursor: "pointer",
              fontFamily: "var(--font-body)",
              background: "var(--accent-glow)",
              border: "1px solid var(--border-accent)",
              color: "var(--text-primary)",
            }}
          >
            {action}
          </button>
        ))}
      </div>
    </div>
  );
}
