"use client";

import type { StreakDay } from "@/app/lib/types";

const DAY_LABELS = ["M", "T", "W", "T", "F", "S", "S"];
const CELL = 11;
const GAP = 4;

interface ActivityCalendarProps {
  days: StreakDay[];
  title?: string;
  showLegend?: boolean;
}

export default function ActivityCalendar({
  days,
  title,
  showLegend = false,
}: ActivityCalendarProps) {
  return (
    <div>
      {title && (
        <h2
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: "var(--text-secondary)",
            textAlign: "center",
            marginBottom: 16,
          }}
        >
          {title}
        </h2>
      )}

      <div style={{ display: "flex", justifyContent: "center" }}>
        <div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(7, ${CELL}px)`,
              gap: GAP,
              marginBottom: GAP,
            }}
          >
            {DAY_LABELS.map((d, i) => (
              <div
                key={`label-${i}`}
                style={{
                  width: CELL,
                  textAlign: "center",
                  fontSize: 9,
                  color: "var(--text-muted)",
                }}
              >
                {d}
              </div>
            ))}
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(7, ${CELL}px)`,
              gap: GAP,
            }}
          >
            {days.map((day, i) => (
              <div
                key={i}
                title={`${day.date.toLocaleDateString("en-US", { month: "short", day: "numeric" })} — ${day.actionsCompleted} actions`}
                style={{
                  width: CELL,
                  height: CELL,
                  borderRadius: 3,
                  background: day.active
                    ? `color-mix(in srgb, var(--accent) ${25 + (day.actionsCompleted / 6) * 65}%, transparent)`
                    : "var(--calendar-inactive)",
                  cursor: "default",
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {showLegend && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
            marginTop: 14,
          }}
        >
          <span style={{ fontSize: 10, color: "var(--text-muted)" }}>Less</span>
          {[0.1, 0.3, 0.6, 0.9].map((op) => (
            <div
              key={op}
              style={{
                width: 10,
                height: 10,
                borderRadius: 2,
                background: `color-mix(in srgb, var(--accent) ${op * 100}%, transparent)`,
              }}
            />
          ))}
          <span style={{ fontSize: 10, color: "var(--text-muted)" }}>More</span>
        </div>
      )}
    </div>
  );
}
