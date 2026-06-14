import { mockUserStats } from "@/app/lib/mock-data";

export default function StatsRow() {
  const { tasksCompleted, focusSessions, totalActionsCompleted } = mockUserStats;
  const items = [
    { label: "Tasks", value: tasksCompleted },
    { label: "Focus", value: focusSessions },
    { label: "Actions", value: totalActionsCompleted },
  ];

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
      {items.map(({ label, value }) => (
        <div
          key={label}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 4,
            padding: "16px 8px",
            borderRadius: "var(--radius-md)",
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
            boxShadow: "var(--shadow-sm)",
          }}
        >
          <span
            className="font-heading"
            style={{ fontSize: 22, fontWeight: 400, color: "var(--text-primary)" }}
          >
            {value}
          </span>
          <span style={{ fontSize: 10, color: "var(--text-muted)" }}>{label}</span>
        </div>
      ))}
    </div>
  );
}
