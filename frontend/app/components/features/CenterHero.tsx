export default function CenterHero() {
  return (
    <div
      style={{
        flexShrink: 0,
        padding: "64px 56px 40px",
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
          marginBottom: 16,
          letterSpacing: "-0.01em",
        }}
      >
        When you know what to do,
        <br />
        <span
          style={{
            fontStyle: "italic",
            color: "var(--accent)",
            fontWeight: 500,
          }}
        >
          but can&apos;t get yourself to start.
        </span>
      </h1>
      <p
        style={{
          fontSize: 16,
          color: "var(--text-secondary)",
          lineHeight: 1.7,
          maxWidth: 440,
          margin: "0 auto",
          fontWeight: 400,
        }}
      >
        Break overwhelming tasks into tiny actions and start in under 60 seconds.
      </p>
    </div>
  );
}
