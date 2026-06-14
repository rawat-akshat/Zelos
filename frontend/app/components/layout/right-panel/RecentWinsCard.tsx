import { CheckCircle2, Zap } from "lucide-react";
import { mockRecentWins } from "@/app/lib/mock-data";
import { PanelCard, CardLabel } from "./PanelCard";

export default function RecentWinsCard() {
  return (
    <PanelCard>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <CardLabel>Recent Wins</CardLabel>
        <Zap size={13} style={{ color: "var(--accent)" }} />
      </div>

      <ul style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {mockRecentWins.map((win, i) => (
          <li key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <CheckCircle2 size={14} style={{ color: "var(--success)", flexShrink: 0 }} />
            <span
              style={{
                fontSize: 12,
                color: "var(--text-secondary)",
                flex: 1,
                lineHeight: 1.45,
              }}
            >
              {win.label}
            </span>
            <span
              style={{
                fontSize: 11,
                fontWeight: 600,
                color: "var(--accent)",
                flexShrink: 0,
              }}
            >
              +{win.xp}
            </span>
          </li>
        ))}
      </ul>
    </PanelCard>
  );
}
