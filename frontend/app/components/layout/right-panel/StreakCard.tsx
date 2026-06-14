import { Flame } from "lucide-react";
import { mockUserStats } from "@/app/lib/mock-data";
import { PanelCard, CardLabel } from "./PanelCard";

export default function StreakCard() {
  const { currentStreak, longestStreak } = mockUserStats;
  const last7 = Array.from({ length: 7 }, (_, i) => i < currentStreak);

  return (
    <PanelCard>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
        <CardLabel>Current Streak</CardLabel>
        <Flame size={15} color="#C6A969" />
      </div>

      <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 14 }}>
        <span style={{ fontSize: 36, fontWeight: 700, color: "#FFFFFF", lineHeight: 1 }}>{currentStreak}</span>
        <span style={{ fontSize: 14, color: "#6A6A6A" }}>days</span>
      </div>

      <div style={{ display: "flex", gap: 5, marginBottom: 12 }}>
        {last7.map((active, i) => (
          <div key={i} style={{ flex: 1, height: 6, borderRadius: 99, background: active ? "linear-gradient(90deg,#B89B5E,#C6A969)" : "rgba(255,255,255,0.07)" }} />
        ))}
      </div>

      <p style={{ fontSize: 11, color: "#555" }}>
        Best: <span style={{ color: "#7A7A7A" }}>{longestStreak} days</span>
      </p>
    </PanelCard>
  );
}
