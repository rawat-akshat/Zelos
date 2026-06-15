import { MOCKUP_FOCUS, MOCKUP_STREAK, MOCKUP_XP } from "./mockup-data";

export default function MockupRightPanel() {
  return (
    <div
      style={{
        width: "26%",
        background: "#F2ECE2",
        borderLeft: "1px solid rgba(30, 30, 30, 0.06)",
        padding: "14px 12px",
        display: "flex",
        flexDirection: "column",
        gap: 10,
      }}
    >
      <div
        style={{
          background: "#FDFBF7",
          borderRadius: 12,
          padding: "10px 12px",
          border: "1px solid rgba(30,30,30,0.05)",
        }}
      >
        <p style={{ margin: "0 0 6px", fontSize: 8, fontWeight: 600, color: "#9A9388", textTransform: "uppercase", letterSpacing: "0.06em" }}>
          Today&apos;s Focus
        </p>
        <p style={{ margin: "0 0 8px", fontSize: 10, fontWeight: 500, color: "#2A2723" }}>
          {MOCKUP_FOCUS.title}
        </p>
        <div style={{ height: 4, borderRadius: 2, background: "rgba(221, 210, 194, 0.6)", marginBottom: 8 }}>
          <div style={{ width: `${MOCKUP_FOCUS.progress}%`, height: "100%", borderRadius: 2, background: "#C9A85A" }} />
        </div>
        <div
          style={{
            display: "inline-block",
            fontSize: 8,
            fontWeight: 600,
            color: "#2A2723",
            background: "#C9A85A",
            padding: "4px 10px",
            borderRadius: 6,
          }}
        >
          Continue
        </div>
      </div>

      <div
        style={{
          background: "#FDFBF7",
          borderRadius: 12,
          padding: "10px 12px",
          border: "1px solid rgba(30,30,30,0.05)",
          flex: 1,
        }}
      >
        <p style={{ margin: "0 0 4px", fontSize: 8, fontWeight: 600, color: "#9A9388", textTransform: "uppercase", letterSpacing: "0.06em" }}>
          Current Streak
        </p>
        <p style={{ margin: 0, fontSize: 18, fontWeight: 600, color: "#2A2723", lineHeight: 1.1 }}>
          {MOCKUP_STREAK}{" "}
          <span style={{ fontSize: 10, fontWeight: 400, color: "#7B746A" }}>days</span>
        </p>
      </div>

      <div
        style={{
          background: "#FDFBF7",
          borderRadius: 12,
          padding: "10px 12px",
          border: "1px solid rgba(30,30,30,0.05)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
          <p style={{ margin: 0, fontSize: 8, fontWeight: 600, color: "#9A9388", textTransform: "uppercase", letterSpacing: "0.06em" }}>
            Experience
          </p>
          <span style={{ fontSize: 8, fontWeight: 600, color: "#C9A85A", background: "rgba(201,168,90,0.12)", padding: "2px 6px", borderRadius: 4 }}>
            Lv. {MOCKUP_XP.level}
          </span>
        </div>
        <p style={{ margin: "0 0 6px", fontSize: 10, color: "#2A2723" }}>
          {MOCKUP_XP.current} / {MOCKUP_XP.max} XP
        </p>
        <div style={{ height: 4, borderRadius: 2, background: "rgba(221, 210, 194, 0.6)" }}>
          <div
            style={{
              width: `${(MOCKUP_XP.current / MOCKUP_XP.max) * 100}%`,
              height: "100%",
              borderRadius: 2,
              background: "#C9A85A",
            }}
          />
        </div>
      </div>
    </div>
  );
}
