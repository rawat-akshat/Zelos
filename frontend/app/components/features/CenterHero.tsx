export default function CenterHero() {
  return (
    <div
      style={{
        flexShrink: 0,
        padding: "28px 20px 12px",
        textAlign: "center",
        position: "relative",
        zIndex: 1,
      }}
    >
      <h1
        className="font-heading"
        style={{
          fontSize: "clamp(32px, 4.2vw, 48px)",
          fontWeight: 400,
          lineHeight: 1.2,
          color: "var(--text-primary)",
          marginBottom: 10,
          letterSpacing: "-0.01em",
        }}
      >
        What&apos;s keeping you stuck today?
      </h1>
      <p
        className="font-heading"
        style={{
          fontSize: "clamp(20px, 2.4vw, 34px)",
          fontStyle: "italic",
          fontWeight: 500,
          lineHeight: 1.3,
          color: "var(--accent)",
          letterSpacing: "-0.01em",
        }}
      >
        Talk it through, understand the blocker, and take the next step.
      </p>
    </div>
  );
}
