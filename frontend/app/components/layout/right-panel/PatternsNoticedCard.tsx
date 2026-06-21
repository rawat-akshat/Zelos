"use client";

import { PanelCard, CardLabel } from "./PanelCard";
import type { Pattern } from "../../../lib/types";

interface PatternsNoticedCardProps {
  patterns?: Pattern[];
  empty?: boolean;
}

export default function PatternsNoticedCard({
  patterns = [],
  empty = false,
}: PatternsNoticedCardProps) {
  return (
    <PanelCard>
      <CardLabel>Patterns Noticed</CardLabel>
      {empty || patterns.length === 0 ? (
        <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.55 }}>
          Patterns detected: 0
          <br />
          <span style={{ color: "var(--text-muted)" }}>
            Zelos will start noticing patterns as you talk.
          </span>
        </p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {patterns.map((p) => (
            <div
              key={p.id}
              style={{
                padding: "12px 14px",
                borderRadius: 10,
                background: "var(--bg-elevated)",
                border: "1px solid var(--border)",
              }}
            >
              <p style={{ fontSize: 13, fontWeight: 500, color: "var(--text-primary)", marginBottom: 6 }}>
                {p.name}
              </p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <Meta label="Confidence" value={`${Math.round(p.confidence * 100)}%`} />
                <Meta label="Evidence" value={`${p.evidenceCount} moments`} />
              </div>
            </div>
          ))}
        </div>
      )}
    </PanelCard>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <span style={{ fontSize: 11, color: "var(--text-muted)" }}>
      {label}:{" "}
      <span style={{ color: "var(--text-secondary)" }}>{value}</span>
    </span>
  );
}
