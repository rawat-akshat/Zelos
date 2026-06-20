"use client";

import FadeUp from "./FadeUp";

export default function FounderInsightSection() {
  return (
    <section
      style={{
        padding: "96px clamp(24px, 5vw, 64px)",
        position: "relative",
        zIndex: 1,
      }}
    >
      <FadeUp>
        <div
          style={{
            maxWidth: 640,
            margin: "0 auto",
            textAlign: "center",
            background: "var(--landing-card)",
            border: "1px solid var(--landing-border)",
            borderRadius: 24,
            padding: "48px clamp(28px, 5vw, 48px)",
            boxShadow: "var(--landing-shadow)",
          }}
        >
          <h2 className="font-landing-heading landing-section-title" style={{ marginBottom: 28 }}>
            Why Zelos Exists
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <p className="landing-body" style={{ margin: 0 }}>
              Most tools assume the problem is organization.
            </p>
            <p className="landing-body" style={{ margin: 0 }}>
              So they give you more lists, more reminders, more systems, and more productivity advice.
            </p>
            <p className="landing-body" style={{ margin: 0 }}>
              But sometimes the problem isn&apos;t organization.
            </p>
            <p className="landing-body" style={{ margin: 0 }}>
              Sometimes the problem is understanding why you keep getting stuck in the same place.
            </p>
            <p className="landing-body" style={{ margin: 0, color: "var(--landing-text)" }}>
              Zelos was built for those moments.
            </p>
          </div>
        </div>
      </FadeUp>
    </section>
  );
}
