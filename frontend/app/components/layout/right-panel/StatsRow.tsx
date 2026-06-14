import { mockUserStats } from "@/app/lib/mock-data";

export default function StatsRow() {
  const { tasksCompleted, focusSessions, totalActionsCompleted } = mockUserStats;
  const items = [
    { label: "Tasks",   value: tasksCompleted },
    { label: "Focus",   value: focusSessions },
    { label: "Actions", value: totalActionsCompleted },
  ];

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
      {items.map(({ label, value }) => (
        <div
          key={label}
          style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, padding: "14px 8px", borderRadius: 12, background: "#202020", border: "1px solid rgba(255,255,255,0.09)" }}
        >
          <span style={{ fontSize: 20, fontWeight: 700, color: "#FFFFFF" }}>{value}</span>
          <span style={{ fontSize: 10, color: "#555" }}>{label}</span>
        </div>
      ))}
    </div>
  );
}
