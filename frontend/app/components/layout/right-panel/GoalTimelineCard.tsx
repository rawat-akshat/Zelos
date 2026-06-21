"use client";

import { PanelCard, CardLabel } from "./PanelCard";
import { formatRelativeTime } from "../../../lib/mock-data";
import type { TimelineEvent } from "../../../lib/types";

interface GoalTimelineCardProps {
  events?: TimelineEvent[];
}

export default function GoalTimelineCard({ events = [] }: GoalTimelineCardProps) {
  const sorted = [...events].sort(
    (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
  );

  function handleClick(event: TimelineEvent) {
    if (!event.messageId) return;
    window.dispatchEvent(
      new CustomEvent("zelos:scroll-to-message", {
        detail: { messageId: event.messageId },
      })
    );
  }

  return (
    <PanelCard>
      <CardLabel>Goal Timeline</CardLabel>
      <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
        {sorted.slice(0, 6).map((event, i) => (
          <button
            key={event.id}
            type="button"
            onClick={() => handleClick(event)}
            disabled={!event.messageId}
            style={{
              display: "flex",
              gap: 12,
              position: "relative",
              background: "none",
              border: "none",
              textAlign: "left",
              cursor: event.messageId ? "pointer" : "default",
              padding: 0,
              paddingBottom: i < Math.min(sorted.length, 6) - 1 ? 16 : 0,
              width: "100%",
              fontFamily: "var(--font-body)",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "var(--accent)",
                  marginTop: 5,
                  flexShrink: 0,
                }}
              />
              {i < Math.min(sorted.length, 6) - 1 && (
                <div
                  style={{
                    width: 1,
                    flex: 1,
                    minHeight: 20,
                    background: "var(--border)",
                    marginTop: 4,
                  }}
                />
              )}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p
                style={{
                  fontSize: 13,
                  color: event.messageId ? "var(--accent)" : "var(--text-primary)",
                  lineHeight: 1.45,
                  marginBottom: 3,
                }}
              >
                {event.title}
              </p>
              <p style={{ fontSize: 11, color: "var(--text-muted)" }}>
                {formatRelativeTime(event.createdAt)}
              </p>
            </div>
          </button>
        ))}
        {sorted.length === 0 && (
          <p style={{ fontSize: 12, color: "var(--text-muted)", lineHeight: 1.5 }}>
            Timeline events will appear as you work on this goal.
          </p>
        )}
      </div>
    </PanelCard>
  );
}
