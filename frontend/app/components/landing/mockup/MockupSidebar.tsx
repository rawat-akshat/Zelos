import { MOCKUP_NAV } from "./mockup-data";

export default function MockupSidebar() {
  return (
    <div
      style={{
        width: "22%",
        background: "#F2ECE2",
        borderRight: "1px solid rgba(30, 30, 30, 0.06)",
        padding: "18px 14px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 22 }}>
        <div
          style={{
            width: 22,
            height: 22,
            borderRadius: 6,
            background: "rgba(201, 168, 90, 0.15)",
            border: "1px solid rgba(201, 168, 90, 0.3)",
          }}
        />
        <span
          style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.08em",
            color: "#2A2723",
            fontFamily: "var(--font-cormorant), Georgia, serif",
          }}
        >
          ZELOS
        </span>
      </div>

      <nav style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        {MOCKUP_NAV.map((label, i) => (
          <div
            key={label}
            style={{
              fontSize: 10,
              fontWeight: i === 0 ? 500 : 400,
              color: i === 0 ? "#C9A85A" : "#9A9388",
              background: i === 0 ? "rgba(201, 168, 90, 0.1)" : "transparent",
              borderRadius: 8,
              padding: "7px 10px",
            }}
          >
            {label}
          </div>
        ))}
      </nav>
    </div>
  );
}
