"use client";

import FadeUp from "./FadeUp";

const FEATURES = [
  {
    title: "Task Breakdown",
    body: "Turn overwhelming projects into tiny, actionable steps your brain can actually start."
  },
  {
    title: "Learn Mode",
    body: "Understand the psychology behind procrastination, perfectionism, overwhelm, and executive dysfunction.",
  },
  {
    title: "Progress Tracking",
    body: "Build momentum with streaks, achievements and visible progress.",
  },
  {
    title: "Session History",
    body: "Revisit past breakthroughs and continue where you left off.",
  },
];

export default function FeaturesSection() {
  return (
    <section
      style={{
        padding: "120px clamp(24px, 5vw, 64px)",
        position: "relative",
        zIndex: 1,
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <FadeUp>
          <h2
            className="font-landing-heading landing-section-title"
            style={{ textAlign: "center", marginBottom: 56 }}
          >
            Everything you need to begin
          </h2>
        </FadeUp>

        <style>{`
          .features-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 20px;
          }
          @media (max-width: 1024px) {
            .features-grid {
              grid-template-columns: repeat(2, 1fr);
            }
          }
          @media (max-width: 640px) {
            .features-grid {
              grid-template-columns: 1fr;
            }
          }
        `}</style>

        <div className="features-grid">
          {FEATURES.map((feature, i) => (
            <FadeUp key={feature.title} delay={i * 0.06}>
              <article className="landing-card" style={{ padding: "28px 24px", height: "100%" }}>
                <h3 className="font-landing-heading landing-card-title" style={{ marginBottom: 12 }}>
                  {feature.title}
                </h3>
                <p className="landing-body-sm" style={{ margin: 0 }}>
                  {feature.body}
                </p>
              </article>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
