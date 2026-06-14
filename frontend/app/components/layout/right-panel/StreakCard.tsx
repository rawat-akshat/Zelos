import { Flame } from "lucide-react";
import { mockUserStats } from "@/app/lib/mock-data";
import { PanelCard, CardLabel } from "./PanelCard";

export default function StreakCard() {
  const { currentStreak, longestStreak } = mockUserStats;
  const last7 = Array.from({ length: 7 }, (_, i) => i < currentStreak);

  return (
    <PanelCard>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <CardLabel>Current Streak</CardLabel>
        <Flame size={15} style={{ color: "var(--accent)" }} />
      </div>

      <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 16 }}>
        <span
          className="font-heading"
          style={{ fontSize: 36, fontWeight: 400, color: "var(--text-primary)", lineHeight: 1 }}
        >
          {currentStreak}
        </span>
        <span style={{ fontSize: 14, color: "var(--text-secondary)" }}>days</span>
      </div>

      <div style={{ display: "flex", gap: 5, marginBottom: 12 }}>
        {last7.map((active, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              height: 5,
              borderRadius: 99,
              background: active
                ? "linear-gradient(90deg, var(--accent-dim), var(--accent))"
                : "var(--progress-track)",
            }}
          />
        ))}
      </div>

      <p style={{ fontSize: 11, color: "var(--text-muted)" }}>
        Best: <span style={{ color: "var(--text-secondary)" }}>{longestStreak} days</span>
      </p>
    </PanelCard>
  );
}
