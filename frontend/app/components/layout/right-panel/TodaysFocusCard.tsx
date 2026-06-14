import { ArrowRight, Clock } from "lucide-react";
import { mockTodaysFocus } from "@/app/lib/mock-data";
import { PanelCard } from "./PanelCard";

export default function TodaysFocusCard() {
  const focus = mockTodaysFocus;
  const progress = Math.round((focus.completedActions / focus.totalActions) * 100);

  return (
    <PanelCard accent>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--accent)" }}>
          Today&apos;s Focus
        </p>
        <span
          style={{
            fontSize: 10,
            fontWeight: 600,
            padding: "3px 10px",
            borderRadius: 99,
            background: "var(--accent-glow)",
            color: "var(--accent)",
          }}
        >
          {focus.completedActions}/{focus.totalActions} done
        </span>
      </div>

      <p style={{ fontSize: 16, fontWeight: 600, color: "var(--text-primary)", marginBottom: 6 }}>
        {focus.title}
      </p>
      <p style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 16 }}>
        Last active yesterday
      </p>

      <div
        style={{
          height: 5,
          borderRadius: 99,
          background: "var(--progress-track)",
          overflow: "hidden",
          marginBottom: 16,
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${progress}%`,
            borderRadius: 99,
            background: "linear-gradient(90deg, var(--accent-dim), var(--accent))",
            transition: "width 500ms ease-out",
          }}
        />
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: 10,
          padding: "12px 14px",
          borderRadius: 12,
          background: "var(--nav-hover-bg)",
          marginBottom: 16,
        }}
      >
        <ArrowRight size={12} style={{ color: "var(--accent)", marginTop: 2, flexShrink: 0 }} />
        <div>
          <p style={{ fontSize: 12, color: "var(--text-secondary)", lineHeight: 1.45 }}>
            {focus.nextAction}
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 4 }}>
            <Clock size={10} style={{ color: "var(--text-muted)" }} />
            <span style={{ fontSize: 10, color: "var(--text-muted)" }}>
              {focus.estimatedMinutes} min
            </span>
          </div>
        </div>
      </div>

      <button
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          padding: "11px 0",
          borderRadius: 12,
          fontSize: 13,
          fontWeight: 600,
          background: "var(--accent)",
          color: "var(--accent-on)",
          border: "none",
          cursor: "pointer",
          transition: "background 200ms var(--ease)",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "var(--accent-hover)")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "var(--accent)")}
      >
        Continue <ArrowRight size={13} />
      </button>
    </PanelCard>
  );
}
