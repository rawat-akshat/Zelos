"use client";

import FadeUp from "./FadeUp";

const TIMELINE = [
  { label: "Started Goal", accent: false },
  { label: "Research Spiral Detected", accent: true },
  { label: "First Landing Page Shipped", accent: false },
  { label: "Customer Interviews Completed", accent: false },
  { label: "Current Stage: MVP Development", accent: false, current: true },
];

export default function GoalTimelineSection() {
  return (
    <section
      style={{
        padding: "96px clamp(24px, 5vw, 64px)",
        position: "relative",
        zIndex: 1,
      }}
    >
      <div style={{ maxWidth: 640, margin: "0 auto", textAlign: "center" }}>
        <FadeUp>
          <h2 className="font-landing-heading landing-section-title" style={{ marginBottom: 16 }}>
            Progress, not just conversations.
          </h2>
          <p className="landing-subhead" style={{ marginBottom: 48, maxWidth: 480, marginInline: "auto" }}>
            Zelos builds a progress narrative, not a collection of disconnected chats.
          </p>
        </FadeUp>

        <FadeUp delay={0.08}>
          <div
            className="landing-card"
            style={{
              padding: "36px 32px",
              textAlign: "left",
              background: "var(--landing-card)",
              border: "1px solid var(--landing-border)",
              borderRadius: 24,
              boxShadow: "var(--landing-shadow)",
            }}
          >
            <p
              style={{
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--landing-text-muted)",
                marginBottom: 8,
              }}
            >
              Goal
            </p>
            <h3 className="font-landing-heading landing-card-title" style={{ marginBottom: 28 }}>
              Launch Startup
            </h3>

            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {TIMELINE.map((item, i) => (
                <div key={item.label} style={{ display: "flex", gap: 14, alignItems: "stretch" }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <div
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: "50%",
                        background: item.accent ? "#C9A75C" : item.current ? "#1E1E1E" : "var(--landing-border)",
                        border: item.current ? "2px solid #C9A75C" : "none",
                        flexShrink: 0,
                        marginTop: 5,
                      }}
                    />
                    {i < TIMELINE.length - 1 && (
                      <div style={{ width: 1, flex: 1, minHeight: 24, background: "var(--landing-border)" }} />
                    )}
                  </div>
                  <p
                    className="landing-body"
                    style={{
                      margin: 0,
                      paddingBottom: i < TIMELINE.length - 1 ? 20 : 0,
                      color: item.current ? "var(--landing-text)" : "var(--landing-text-secondary)",
                      fontWeight: item.current ? 500 : 400,
                    }}
                  >
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
