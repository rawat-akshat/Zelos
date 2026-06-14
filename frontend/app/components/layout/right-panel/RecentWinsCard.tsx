import { CheckCircle2, Zap } from "lucide-react";
import { mockRecentWins } from "@/app/lib/mock-data";
import { PanelCard, CardLabel } from "./PanelCard";

export default function RecentWinsCard() {
  return (
    <PanelCard>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
        <CardLabel>Recent Wins</CardLabel>
        <Zap size={13} color="#C6A969" />
      </div>

      <ul style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {mockRecentWins.map((win, i) => (
          <li key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <CheckCircle2 size={14} style={{ color: "#4A8C6F", flexShrink: 0 }} />
            <span style={{ fontSize: 12, color: "#B5B5B5", flex: 1, lineHeight: 1.4 }}>{win.label}</span>
            <span style={{ fontSize: 11, fontWeight: 600, color: "#C6A969", flexShrink: 0 }}>+{win.xp}</span>
          </li>
        ))}
      </ul>
    </PanelCard>
  );
}
