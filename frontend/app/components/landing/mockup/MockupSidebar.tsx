import { NAV_ITEMS } from "@/app/components/layout/nav-config";

export default function MockupSidebar() {
  return (
    <div
      style={{
        width: "22%",
        background: "#F0E9DD",
        borderRight: "1px solid rgba(30, 30, 30, 0.06)",
        padding: "18px 14px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ marginBottom: 22, textAlign: "center" }}>
        <span
          className="font-heading"
          style={{
            fontSize: 16,
            letterSpacing: "-0.02em",
            color: "#2A2723",
          }}
        >
          Zelos
        </span>
      </div>

      <nav style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        {NAV_ITEMS.map(({ icon: Icon, label }, i) => {
          const active = i === 0;
          return (
            <div
              key={label}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                fontSize: 10,
                fontWeight: active ? 500 : 400,
                color: active ? "#C9A85A" : "#9A9388",
                background: active ? "rgba(201, 168, 90, 0.1)" : "transparent",
                borderRadius: 8,
                padding: "7px 10px",
              }}
            >
              <Icon
                size={12}
                strokeWidth={active ? 2 : 1.75}
                style={{ flexShrink: 0, color: active ? "#C9A85A" : "inherit" }}
              />
              {label}
            </div>
          );
        })}
      </nav>
    </div>
  );
}
