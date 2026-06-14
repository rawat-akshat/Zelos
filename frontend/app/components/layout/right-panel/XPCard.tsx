import { Star } from "lucide-react";
import { mockUserStats } from "@/app/lib/mock-data";
import { PanelCard, CardLabel } from "./PanelCard";

export default function XPCard() {
  const { totalXP, xpToNextLevel, level } = mockUserStats;
  const pct = Math.round((totalXP / xpToNextLevel) * 100);

  return (
    <PanelCard>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <CardLabel>Experience</CardLabel>
        <span
          style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
            fontSize: 10,
            fontWeight: 700,
            padding: "3px 10px",
            borderRadius: 99,
            background: "var(--accent-glow)",
            border: "1px solid var(--border-accent)",
            color: "var(--accent)",
          }}
        >
          <Star size={9} /> Lv. {level}
        </span>
      </div>

      <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 16 }}>
        <span
          className="font-heading"
          style={{ fontSize: 36, fontWeight: 400, color: "var(--text-primary)", lineHeight: 1 }}
        >
          {totalXP}
        </span>
        <span style={{ fontSize: 14, color: "var(--text-secondary)" }}>/ {xpToNextLevel} XP</span>
      </div>

      <div
        style={{
          height: 5,
          borderRadius: 99,
          background: "var(--progress-track)",
          overflow: "hidden",
          marginBottom: 10,
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${pct}%`,
            borderRadius: 99,
            background: "linear-gradient(90deg, var(--accent-dim), var(--accent-bright))",
            transition: "width 700ms ease-out",
          }}
        />
      </div>

      <p style={{ fontSize: 11, color: "var(--text-muted)" }}>
        {xpToNextLevel - totalXP} XP to Level {level + 1}
      </p>
    </PanelCard>
  );
}
