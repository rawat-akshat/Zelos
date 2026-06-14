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
            color: "#B5B5B5",
            textAlign: "center",
            marginBottom: 16,
          }}
        >
          {title}
        </h2>
      )}

      <div style={{ display: "flex", justifyContent: "center" }}>
        <div>
          {/* Day labels */}
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
                  color: "#444",
                }}
              >
                {d}
              </div>
            ))}
          </div>

          {/* Cells */}
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
                    ? `rgba(198,169,105,${0.25 + (day.actionsCompleted / 6) * 0.65})`
                    : "rgba(255,255,255,0.04)",
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
          <span style={{ fontSize: 10, color: "#444" }}>Less</span>
          {[0.1, 0.3, 0.6, 0.9].map((op) => (
            <div
              key={op}
              style={{
                width: 10,
                height: 10,
                borderRadius: 2,
                background: `rgba(198,169,105,${op})`,
              }}
            />
          ))}
          <span style={{ fontSize: 10, color: "#444" }}>More</span>
        </div>
      )}
    </div>
  );
}
