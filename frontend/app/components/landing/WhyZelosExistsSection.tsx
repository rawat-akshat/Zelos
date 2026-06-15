"use client";

import FadeUp from "./FadeUp";

const PARAGRAPHS = [
  "Most productivity tools assume the problem is organization. They give you more lists, more systems, more reminders, and more things to manage.",
  "But sometimes the problem isn't knowing what to do. Sometimes the problem is getting yourself to start.",
  "Zelos was created for those moments.",
  "The moments when a task feels bigger than it should. When your mind feels crowded. When you genuinely want to move forward but can't seem to take the first step.",
  "Instead of adding more complexity, Zelos focuses on clarity.",
  "Understand the blocker. Take one small step. Build momentum from there.",
];

function SectionLineArt() {
  return (
    <svg
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        opacity: 0.04,
        pointerEvents: "none",
      }}
      viewBox="0 0 900 700"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
    >
      <path
        d="M80 580 C80 480, 240 480, 240 580 C240 680, 80 680, 80 580 C80 380, 360 380, 360 580 C360 780, 80 780, 80 580 C80 280, 480 280, 480 480 C480 680, 240 680, 240 480 C240 280, 580 280, 580 420 C580 560, 420 560, 420 420 C420 280, 680 280, 680 160"
        stroke="#1E1E1E"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M620 120 C680 80, 760 100, 780 180"
        stroke="#1E1E1E"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function WhyZelosExistsSection() {
  return (
    <section
      style={{
        padding: "100px clamp(24px, 5vw, 64px)",
        position: "relative",
        zIndex: 1,
        overflow: "hidden",
      }}
    >
      <SectionLineArt />

      <div style={{ maxWidth: 750, margin: "0 auto", position: "relative" }}>
        <FadeUp>
          <h2
            className="font-landing-heading landing-section-title"
            style={{ textAlign: "center", marginBottom: 48 }}
          >
            Why Zelos Exists
          </h2>
        </FadeUp>

        <FadeUp delay={0.08}>
          <div
            style={{
              background: "var(--landing-card)",
              border: "1px solid var(--landing-border)",
              borderRadius: 24,
              padding: "48px clamp(28px, 5vw, 56px)",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {PARAGRAPHS.map((paragraph) => (
                <p
                  key={paragraph}
                  style={{
                    margin: 0,
                    fontSize: 18,
                    lineHeight: 1.75,
                    letterSpacing: "0.005em",
                    color: "var(--landing-text-secondary)",
                    fontFamily: "var(--font-inter), system-ui, sans-serif",
                  }}
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <p
              style={{
                margin: "36px 0 0",
                fontSize: 15,
                lineHeight: 1.5,
                color: "var(--landing-text-secondary)",
                fontFamily: "var(--font-inter), system-ui, sans-serif",
              }}
            >
              — The Zelos Team
            </p>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
