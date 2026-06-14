import { ArrowRight, Clock } from "lucide-react";
import { mockTodaysFocus } from "@/app/lib/mock-data";
import { PanelCard } from "./PanelCard";

export default function TodaysFocusCard() {
  const focus = mockTodaysFocus;
  const progress = Math.round((focus.completedActions / focus.totalActions) * 100);

  return (
    <PanelCard accent>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
        <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#C6A969" }}>
          Today&apos;s Focus
        </p>
        <span
          style={{
            fontSize: 10, fontWeight: 600, padding: "2px 8px",
            borderRadius: 99, background: "rgba(198,169,105,0.12)", color: "#C6A969",
          }}
        >
          {focus.completedActions}/{focus.totalActions} done
        </span>
      </div>

      <p style={{ fontSize: 15, fontWeight: 600, color: "#FFFFFF", marginBottom: 4 }}>{focus.title}</p>
      <p style={{ fontSize: 12, color: "#6A6A6A", marginBottom: 14 }}>Last active yesterday</p>

      {/* Progress bar */}
      <div style={{ height: 6, borderRadius: 99, background: "rgba(255,255,255,0.07)", overflow: "hidden", marginBottom: 14 }}>
        <div style={{ height: "100%", width: `${progress}%`, borderRadius: 99, background: "linear-gradient(90deg,#B89B5E,#C6A969)", transition: "width 500ms ease-out" }} />
      </div>

      {/* Next action */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "10px 12px", borderRadius: 10, background: "rgba(255,255,255,0.04)", marginBottom: 14 }}>
        <ArrowRight size={12} style={{ color: "#C6A969", marginTop: 2, flexShrink: 0 }} />
        <div>
          <p style={{ fontSize: 12, color: "#B5B5B5", lineHeight: 1.4 }}>{focus.nextAction}</p>
          <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 4 }}>
            <Clock size={10} style={{ color: "#555" }} />
            <span style={{ fontSize: 10, color: "#555" }}>{focus.estimatedMinutes} min</span>
          </div>
        </div>
      </div>

      {/* CTA */}
      <button
        style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "10px 0", borderRadius: 10, fontSize: 13, fontWeight: 600, background: "#C6A969", color: "#0F0F0F", border: "none", cursor: "pointer", transition: "background 150ms ease-out" }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "#D4AF37")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "#C6A969")}
      >
        Continue <ArrowRight size={13} />
      </button>
    </PanelCard>
  );
}
