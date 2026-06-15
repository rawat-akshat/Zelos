import FadeUp from "./FadeUp";
import DashboardMockup from "./mockup/DashboardMockup";

export default function ProductPreviewSection() {
  return (
    <section
      style={{
        padding: "80px clamp(24px, 5vw, 64px) 120px",
        position: "relative",
        zIndex: 1,
      }}
    >
      <div style={{ maxWidth: 960, margin: "0 auto", textAlign: "center" }}>
        <FadeUp>
          <h2 className="font-landing-heading landing-section-title" style={{ marginBottom: 20 }}>
            A calmer way to move forward.
          </h2>
          <p className="landing-subhead" style={{ maxWidth: 520, margin: "0 auto 48px" }}>
            Built for people who know what they need to do, but struggle to begin.
          </p>
        </FadeUp>

        <FadeUp delay={0.1}>
          <div
            style={{
              background: "var(--landing-card)",
              border: "1px solid var(--landing-border)",
              borderRadius: 24,
              padding: 16,
              boxShadow: "0 12px 48px rgba(30, 30, 30, 0.08)",
            }}
          >
            <DashboardMockup />
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
