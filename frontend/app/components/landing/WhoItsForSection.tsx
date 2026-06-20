"use client";

import FadeUp from "./FadeUp";

const AUDIENCES = [
  "Startup Founders",
  "Career Switchers",
  "Students",
  "Creators",
  "Professionals",
  "Parents",
  "Lifelong Learners",
  "Decision Makers",
];

export default function WhoItsForSection() {
  return (
    <section
      style={{
        padding: "96px clamp(24px, 5vw, 64px)",
        position: "relative",
        zIndex: 1,
      }}
    >
      <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
        <FadeUp>
          <h2 className="font-landing-heading landing-section-title" style={{ marginBottom: 40 }}>
            For anyone working toward something meaningful.
          </h2>
        </FadeUp>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 14,
          }}
          className="audience-grid"
        >
          {AUDIENCES.map((label, i) => (
            <FadeUp key={label} delay={i * 0.04}>
              <div
                className="landing-card"
                style={{
                  padding: "20px 16px",
                  background: "var(--landing-card)",
                  border: "1px solid var(--landing-border)",
                  borderRadius: 16,
                  fontSize: 15,
                  fontWeight: 500,
                  color: "var(--landing-text)",
                  fontFamily: "var(--font-body)",
                  minHeight: 72,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  lineHeight: 1.35,
                }}
              >
                {label}
              </div>
            </FadeUp>
          ))}
        </div>

        <style>{`
          @media (max-width: 768px) {
            .audience-grid {
              grid-template-columns: repeat(2, 1fr) !important;
            }
          }
        `}</style>
      </div>
    </section>
  );
}
