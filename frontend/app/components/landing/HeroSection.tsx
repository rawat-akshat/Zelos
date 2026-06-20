"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import FadeUp from "./FadeUp";

function HeroConversationVisual() {
  return (
    <div
      style={{
        background: "var(--landing-card)",
        border: "1px solid var(--landing-border)",
        borderRadius: 24,
        padding: "28px 24px",
        boxShadow: "var(--landing-shadow)",
        textAlign: "left",
      }}
    >
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 16 }}>
        <div
          style={{
            maxWidth: "88%",
            padding: "12px 16px",
            borderRadius: "16px 16px 4px 16px",
            background: "rgba(201, 167, 92, 0.12)",
            border: "1px solid rgba(201, 167, 92, 0.28)",
            fontSize: 14,
            lineHeight: 1.5,
            color: "var(--landing-text)",
          }}
        >
          I&apos;m still researching startup ideas.
        </div>
      </div>

      <div
        style={{
          padding: "16px 18px",
          borderRadius: "16px 16px 16px 4px",
          background: "var(--landing-card-surface)",
          border: "1px solid var(--landing-border)",
          marginBottom: 14,
        }}
      >
        <p className="landing-body" style={{ margin: "0 0 10px", color: "var(--landing-text)" }}>
          You&apos;ve explored startup ideas across 5 conversations.
        </p>
        <p className="landing-body" style={{ margin: "0 0 10px", color: "var(--landing-text)" }}>
          Possible pattern detected: <strong style={{ fontWeight: 600 }}>Research Spiral</strong>
        </p>
        <p className="landing-body" style={{ margin: 0, color: "var(--landing-text-secondary)" }}>
          Would it help to explore what&apos;s making commitment feel risky?
        </p>
      </div>

      <div
        style={{
          padding: "14px 16px",
          borderRadius: 14,
          border: "1px solid rgba(201, 167, 92, 0.4)",
          background: "rgba(201, 167, 92, 0.08)",
        }}
      >
        <p
          style={{
            margin: "0 0 6px",
            fontSize: 10,
            fontWeight: 600,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "#9A7B3C",
          }}
        >
          Pattern
        </p>
        <p className="font-landing-heading landing-card-title" style={{ margin: "0 0 8px" }}>
          Research Spiral
        </p>
        <p className="landing-caption" style={{ margin: 0 }}>
          Confidence: 82%
        </p>
      </div>
    </div>
  );
}

export default function HeroSection() {
  return (
    <section
      style={{
        padding: "120px clamp(24px, 5vw, 64px) 80px",
        position: "relative",
        zIndex: 1,
      }}
    >
      <div
        style={{
          maxWidth: 1180,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "clamp(40px, 5vw, 72px)",
          alignItems: "center",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <h1 className="font-landing-heading landing-display" style={{ marginBottom: 24, textAlign: "left" }}>
            Stop having the same conversation with yourself.
          </h1>

          <p className="landing-subhead" style={{ marginBottom: 36, textAlign: "left", maxWidth: 520 }}>
            Zelos remembers your goals, notices recurring behavioral patterns, and helps you move from endless thinking to meaningful action.
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
            <Link
              href="/dashboard?newGoal=1"
              className="landing-btn-primary"
              style={{
                fontSize: 15,
                fontWeight: 600,
                padding: "14px 28px",
                borderRadius: 12,
                background: "#C9A75C",
                color: "#1E1E1E",
                textDecoration: "none",
              }}
            >
              Start a Goal
            </Link>
            <a
              href="#how-it-works"
              className="landing-btn-secondary"
              style={{
                fontSize: 15,
                fontWeight: 500,
                padding: "14px 28px",
                borderRadius: 12,
                background: "transparent",
                border: "1px solid var(--landing-border)",
                color: "var(--landing-text-secondary)",
                textDecoration: "none",
              }}
            >
              See How It Works
            </a>
          </div>
        </motion.div>

        <FadeUp delay={0.12}>
          <HeroConversationVisual />
        </FadeUp>
      </div>
    </section>
  );
}
