"use client";

import FadeUp from "./FadeUp";

const STEPS = [
  {
    emoji: "🧩",
    title: "Understand the Blocker",
    body: "Zelos helps identify why you're stuck before trying to solve it.",
  },
  {
    emoji: "🧠",
    title: "Gain Clarity",
    body: "Learn what's happening psychologically and what might be holding you back.",
  },
  {
    emoji: "⚡",
    title: "Take the Next Step",
    body: "Receive tiny actionable steps that are easy to start immediately.",
  },
];

export default function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      style={{
        padding: "72px clamp(24px, 5vw, 64px)",
        position: "relative",
        zIndex: 1,
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <FadeUp>
          <h2
            className="font-landing-heading landing-section-title"
            style={{ textAlign: "center", marginBottom: 56 }}
          >
            How it works
          </h2>
        </FadeUp>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 24,
          }}
        >
          {STEPS.map((step, i) => (
            <FadeUp key={step.title} delay={i * 0.08}>
              <article className="landing-card" style={{ padding: "36px 32px", height: "100%" }}>
                <span style={{ fontSize: 28, display: "block", marginBottom: 20 }}>{step.emoji}</span>
                <h3 className="font-landing-heading landing-card-title" style={{ marginBottom: 12 }}>
                  {step.title}
                </h3>
                <p className="landing-body" style={{ margin: 0 }}>
                  {step.body}
                </p>
              </article>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
