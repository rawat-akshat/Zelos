import FadeUp from "./FadeUp";

export default function SocialProofSection() {
  return (
    <section
      style={{
        padding: "100px clamp(24px, 5vw, 64px)",
        position: "relative",
        zIndex: 1,
      }}
    >
      <FadeUp>
        <p className="font-landing-heading landing-quote" style={{ textAlign: "center", maxWidth: 720, margin: "0 auto" }}>
          Designed for students, professionals, creators, founders and anyone who struggles to start.
        </p>
      </FadeUp>
    </section>
  );
}
