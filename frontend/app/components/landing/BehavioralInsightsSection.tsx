"use client";

import FadeUp from "./FadeUp";

const PATTERNS = [
  {
    name: "Research Spiral",
    body: "You often gather more information before committing to an experiment.",
  },
  {
    name: "Decision Loop",
    body: "You compare multiple options without choosing one.",
  },
  {
    name: "Topic Drift",
    body: "You switch topics when execution becomes uncomfortable.",
  },
  {
    name: "Action Gap",
    body: "You know the next step but delay taking it.",
  },
];

export default function BehavioralInsightsSection() {
  return (
    <section
      style={{
        padding: "96px clamp(24px, 5vw, 64px)",
        position: "relative",
        zIndex: 1,
      }}
    >
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <FadeUp>
          <h2
            className="font-landing-heading landing-section-title"
            style={{ textAlign: "center", marginBottom: 56 }}
          >
            See the patterns behind the struggle.
          </h2>
        </FadeUp>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: 20,
          }}
        >
          {PATTERNS.map((pattern, i) => (
            <FadeUp key={pattern.name} delay={i * 0.06}>
              <article
                className="landing-card"
                style={{
                  padding: "28px 24px",
                  height: "100%",
                  background: "var(--landing-card)",
                  border: "1px solid var(--landing-border)",
                  borderRadius: 20,
                }}
              >
                <p
                  style={{
                    fontSize: 10,
                    fontWeight: 600,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "#9A7B3C",
                    marginBottom: 10,
                  }}
                >
                  Observation
                </p>
                <h3 className="font-landing-heading landing-card-title" style={{ marginBottom: 10 }}>
                  {pattern.name}
                </h3>
                <p className="landing-body-sm" style={{ margin: 0 }}>
                  {pattern.body}
                </p>
              </article>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
