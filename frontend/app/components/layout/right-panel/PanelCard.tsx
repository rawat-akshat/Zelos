// Shared card shell and label used by every right-panel card.
// Import these instead of styling cards from scratch.

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
        background: accent ? "rgba(198,169,105,0.05)" : "#202020",
        border: `1px solid ${accent ? "rgba(198,169,105,0.22)" : "rgba(255,255,255,0.09)"}`,
        borderRadius: 16,
        padding: "20px",
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
        fontWeight: 700,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        color: "#6A6A6A",
        marginBottom: 14,
      }}
    >
      {children}
    </p>
  );
}
