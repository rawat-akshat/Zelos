import { Star } from "lucide-react";
import { mockUserStats } from "@/app/lib/mock-data";
import { PanelCard, CardLabel } from "./PanelCard";

export default function XPCard() {
  const { totalXP, xpToNextLevel, level } = mockUserStats;
  const pct = Math.round((totalXP / xpToNextLevel) * 100);

  return (
    <PanelCard>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
        <CardLabel>Experience</CardLabel>
        <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 99, background: "rgba(198,169,105,0.1)", border: "1px solid rgba(198,169,105,0.2)", color: "#C6A969" }}>
          <Star size={9} /> Lv. {level}
        </span>
      </div>

      <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 14 }}>
        <span style={{ fontSize: 36, fontWeight: 700, color: "#FFFFFF", lineHeight: 1 }}>{totalXP}</span>
        <span style={{ fontSize: 14, color: "#6A6A6A" }}>/ {xpToNextLevel} XP</span>
      </div>

      <div style={{ height: 6, borderRadius: 99, background: "rgba(255,255,255,0.07)", overflow: "hidden", marginBottom: 10 }}>
        <div style={{ height: "100%", width: `${pct}%`, borderRadius: 99, background: "linear-gradient(90deg,#B89B5E,#D4AF37)", transition: "width 700ms ease-out" }} />
      </div>

      <p style={{ fontSize: 11, color: "#555" }}>{xpToNextLevel - totalXP} XP to Level {level + 1}</p>
    </PanelCard>
  );
}
