"use client";

import FadeUp from "./FadeUp";

export default function EmotionalHookSection() {
  return (
    <section
      style={{
        padding: "72px clamp(24px, 5vw, 64px) 48px",
        position: "relative",
        zIndex: 1,
      }}
    >
      <FadeUp>
        <div style={{ maxWidth: 620, margin: "0 auto", textAlign: "center" }}>
          <h2 className="font-landing-heading landing-section-title" style={{ marginBottom: 28 }}>
            You already know what to do.
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <p className="landing-body" style={{ margin: 0 }}>
              You know you should send the application, start the project, make the decision, have the
              conversation, or take the first step.
            </p>
            <p className="landing-body" style={{ margin: 0 }}>
              Yet somehow you keep delaying, rethinking, researching, or waiting for the right moment.
            </p>
            <p className="landing-body" style={{ margin: 0, color: "var(--landing-text)" }}>
              Zelos was built for that gap.
            </p>
            <p className="landing-body" style={{ margin: 0, fontWeight: 500, color: "var(--landing-text)" }}>
              The gap between intention and action.
            </p>
          </div>
        </div>
      </FadeUp>
    </section>
  );
}
