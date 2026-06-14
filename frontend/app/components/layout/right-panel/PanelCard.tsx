export function PanelCard({
  children,
  accent = false,
}: {
  children: React.ReactNode;
  accent?: boolean;
}) {
  return (
    <div
      style={{
        background: accent ? "var(--accent-glow)" : "var(--bg-card)",
        border: `1px solid ${accent ? "var(--border-accent)" : "var(--border)"}`,
        borderRadius: "var(--radius-card)",
        padding: "26px",
        boxShadow: "var(--shadow-sm)",
      }}
    >
      {children}
    </div>
  );
}

export function CardLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{
        fontSize: 10,
        fontWeight: 600,
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        color: "var(--text-muted)",
        marginBottom: 18,
      }}
    >
      {children}
    </p>
  );
}
