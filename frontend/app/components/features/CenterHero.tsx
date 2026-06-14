export default function CenterHero() {
  return (
    <div
      style={{
        flexShrink: 0,
        padding: "48px 48px 28px",
        textAlign: "center",
      }}
    >
      <h1
        style={{
          fontSize: "clamp(26px, 3.5vw, 38px)",
          fontWeight: 300,
          lineHeight: 1.22,
          color: "#FFFFFF",
          marginBottom: 10,
          letterSpacing: "-0.01em",
        }}
      >
        When you know what to do,
        <br />
        <span
          style={{
            fontWeight: 650,
            background: "linear-gradient(135deg, #D4AF37, #C6A969)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          but can&apos;t get yourself to start.
        </span>
      </h1>
      <p style={{ fontSize: 15, color: "#6A6A6A", lineHeight: 1.6 }}>
        Break overwhelming tasks into tiny actions and start in under 60 seconds.
      </p>
    </div>
  );
}
