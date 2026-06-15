"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Paperclip, Mic, ArrowUp } from "lucide-react";

const MOCK_TEXT =
  "I've been trying to update my resume for weeks. Every time I open it, I feel overwhelmed and end up doing something else.";

export default function HeroSection() {
  return (
    <section
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        padding: "140px clamp(24px, 5vw, 64px) 64px",
        textAlign: "center",
        position: "relative",
        zIndex: 1,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
        style={{ width: "100%", maxWidth: 680 }}
      >
        <h1 className="font-landing-heading landing-display" style={{ marginBottom: 24 }}>
          What&apos;s keeping you stuck today?
        </h1>

        <p className="landing-subhead" style={{ maxWidth: 600, margin: "0 auto 48px" }}>
          Talk it through, understand the blocker, and take the next step.
        </p>

        <div
          style={{
            textAlign: "left",
            background: "var(--landing-card)",
            border: "1px solid var(--landing-border)",
            borderRadius: 24,
            padding: "24px 26px 52px",
            boxShadow: "var(--landing-shadow)",
            marginBottom: 36,
            position: "relative",
          }}
        >
          <p className="landing-body" style={{ margin: 0 }}>
            {MOCK_TEXT}
          </p>
          <div
            style={{
              position: "absolute",
              bottom: 14,
              left: 16,
              right: 16,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Paperclip size={16} style={{ color: "var(--landing-text-muted)" }} />
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <Mic size={16} style={{ color: "var(--landing-text-muted)" }} />
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  background: "var(--landing-accent)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ArrowUp size={14} style={{ color: "var(--landing-accent-on)" }} />
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 12,
            justifyContent: "center",
            marginBottom: 20,
          }}
        >
          <Link
            href="/login"
            style={{
              fontSize: 15,
              fontWeight: 600,
              color: "var(--landing-accent-on)",
              background: "var(--landing-accent)",
              padding: "14px 28px",
              borderRadius: 12,
              textDecoration: "none",
              transition: "background 180ms ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "var(--landing-accent-hover)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "var(--landing-accent)")}
          >
            Get Started
          </Link>
          <a
            href="#how-it-works"
            style={{
              fontSize: 15,
              fontWeight: 500,
              color: "var(--landing-text)",
              background: "transparent",
              padding: "14px 28px",
              borderRadius: 12,
              textDecoration: "none",
              border: "1px solid var(--landing-border)",
              transition: "border-color 180ms ease, background 180ms ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(30, 30, 30, 0.2)";
              e.currentTarget.style.background = "rgba(255, 253, 249, 0.6)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--landing-border)";
              e.currentTarget.style.background = "transparent";
            }}
          >
            See How It Works
          </a>
        </div>

        <p className="landing-caption" style={{ margin: 0 }}>
          No productivity hacks. Just self-awareness and momentum.
        </p>
      </motion.div>
    </section>
  );
}
