export default function CenterHero() {
  return (
    <div
      style={{
        flexShrink: 0,
        padding: "20px 20px 4px",
        textAlign: "center",
        position: "relative",
        zIndex: 1,
      }}
    >
      <h1
        className="font-heading"
        style={{
          fontSize: "clamp(26px, 3.2vw, 36px)",
          lineHeight: 1.15,
          color: "var(--text-primary)",
          letterSpacing: "-0.034em",
          marginBottom: 10,
        }}
      >
        What are you working through today?
      </h1>
      <p
        style={{
          fontSize: 14,
          lineHeight: 1.55,
          color: "var(--text-secondary)",
          maxWidth: 480,
          margin: "0 auto",
        }}
      >
        Talk it through. Zelos will help you understand the pattern and choose the next honest step.
      </p>
    </div>
  );
}
