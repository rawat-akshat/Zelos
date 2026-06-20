"use client";

import { PanelCard, CardLabel } from "./PanelCard";
import { mockTimelineEvents, formatRelativeTime } from "../../../lib/mock-data";
import type { TimelineEvent } from "../../../lib/types";

interface GoalTimelineCardProps {
  events?: TimelineEvent[];
}

export default function GoalTimelineCard({ events = mockTimelineEvents }: GoalTimelineCardProps) {
  const sorted = [...events].sort(
    (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
  );

  return (
    <PanelCard>
      <CardLabel>Goal Timeline</CardLabel>
      <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
        {sorted.slice(0, 6).map((event, i) => (
          <div
            key={event.id}
            style={{
              display: "flex",
              gap: 12,
              paddingBottom: i < sorted.length - 1 ? 16 : 0,
              position: "relative",
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
              <p style={{ fontSize: 13, color: "var(--text-primary)", lineHeight: 1.45, marginBottom: 3 }}>
                {event.title}
              </p>
              <p style={{ fontSize: 11, color: "var(--text-muted)" }}>
                {formatRelativeTime(event.createdAt)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </PanelCard>
  );
}
