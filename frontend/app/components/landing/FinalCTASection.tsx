"use client";

import Link from "next/link";
import FadeUp from "./FadeUp";

export default function FinalCTASection() {
  return (
    <section
      style={{
        padding: "140px clamp(24px, 5vw, 64px) 160px",
        textAlign: "center",
        position: "relative",
        zIndex: 1,
      }}
    >
      <FadeUp>
        <div style={{ maxWidth: 560, margin: "0 auto" }}>
          <h2 className="font-landing-heading landing-section-title" style={{ marginBottom: 20 }}>
            Ready to take the first step?
          </h2>
          <p className="landing-subhead" style={{ marginBottom: 36 }}>
            Start with what&apos;s keeping you stuck today.
          </p>
          <Link
            href="/login"
            style={{
              display: "inline-block",
              fontSize: 15,
              fontWeight: 600,
              color: "var(--landing-accent-on)",
              background: "var(--landing-accent)",
              padding: "14px 32px",
              borderRadius: 12,
              textDecoration: "none",
              transition: "background 180ms ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "var(--landing-accent-hover)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "var(--landing-accent)")}
          >
            Get Started
          </Link>
        </div>
      </FadeUp>
    </section>
  );
}
