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
          fontSize: "clamp(28px, 3.4vw, 38px)",
          lineHeight: 1.1,
          color: "var(--text-primary)",
          letterSpacing: "-0.034em",
        }}
      >
        What&apos;s keeping you stuck today?
      </h1>
    </div>
  );
}
