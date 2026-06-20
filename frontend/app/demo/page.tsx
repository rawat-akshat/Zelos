"use client";

import Link from "next/link";
import { useState } from "react";
import LandingNav from "../components/landing/LandingNav";
import LandingFooter from "../components/landing/LandingFooter";
import LandingBackground from "../components/landing/LandingBackground";
import FadeUp from "../components/landing/FadeUp";

const STEPS = [
  {
    label: "Goal",
    title: "Launch Startup",
    body: "A long-term goal you return to across conversations — not a one-off chat.",
  },
  {
    label: "Conversation",
    title: '"I\'m still researching startup ideas."',
    body: "You talk through what you're working on, avoiding, or trying to decide.",
    isQuote: true,
  },
  {
    label: "Pattern detected",
    title: "Research Spiral",
    body: "Zelos notices a recurring loop — comparing options without committing to an experiment.",
    accent: true,
  },
  {
    label: "Timeline updated",
    title: "Research spiral risk detected",
    body: "Progress is tracked as a narrative: decisions, blockers, and actions — not just chat history.",
  },
  {
    label: "Suggested experiment",
    title: "Pick one idea and test it for 48 hours",
    body: "A small, honest next step sized for how you actually behave.",
  },
  {
    label: "Personal playbook updated",
    title: "What works · What doesn't",
    body: "Over time, Zelos learns that small deadlines and imperfect first drafts work — endless research doesn't.",
  },
];

export default function DemoPage() {
  const [navBlur, setNavBlur] = useState(false);

  return (
    <div
      className="landing-page"
      onScroll={(e) => setNavBlur(e.currentTarget.scrollTop > 8)}
      style={{ overflowY: "auto", height: "100vh" }}
    >
      <LandingBackground />
      <LandingNav blurred={navBlur} showCta={false} />

      <main style={{ position: "relative", zIndex: 1, padding: "120px clamp(24px, 5vw, 64px) 80px" }}>
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          <FadeUp>
            <p
              style={{
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--landing-text-muted)",
                textAlign: "center",
                marginBottom: 16,
              }}
            >
              Product walkthrough
            </p>
            <h1
              className="font-landing-heading landing-section-title"
              style={{ textAlign: "center", marginBottom: 16 }}
            >
              See how Zelos works
            </h1>
            <p className="landing-subhead" style={{ textAlign: "center", marginBottom: 48 }}>
              A mock example of goal memory, pattern detection, and coaching — not a live session.
            </p>
          </FadeUp>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {STEPS.map((step, i) => (
              <FadeUp key={step.label} delay={i * 0.05}>
                <article
                  style={{
                    background: "var(--landing-card)",
                    border: step.accent
                      ? "1px solid rgba(201, 167, 92, 0.45)"
                      : "1px solid var(--landing-border)",
                    borderRadius: 20,
                    padding: "24px 26px",
                    boxShadow: "var(--landing-shadow)",
                  }}
                >
                  <p
                    style={{
                      fontSize: 10,
                      fontWeight: 600,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: step.accent ? "#9A7B3C" : "var(--landing-text-muted)",
                      marginBottom: 10,
                    }}
                  >
                    {step.label}
                  </p>
                  <h2
                    className="font-landing-heading landing-card-title"
                    style={{
                      marginBottom: 10,
                      fontStyle: step.isQuote ? "italic" : "normal",
                    }}
                  >
                    {step.title}
                  </h2>
                  <p className="landing-body-sm" style={{ margin: 0 }}>
                    {step.body}
                  </p>
                </article>
              </FadeUp>
            ))}
          </div>

          <FadeUp delay={0.3}>
            <div style={{ textAlign: "center", marginTop: 48 }}>
              <Link
                href="/dashboard?newGoal=1"
                className="landing-btn-primary"
                style={{
                  display: "inline-block",
                  fontSize: 15,
                  fontWeight: 600,
                  padding: "14px 32px",
                  borderRadius: 12,
                  background: "#C9A75C",
                  color: "#1E1E1E",
                  textDecoration: "none",
                }}
              >
                Start Your First Goal
              </Link>
            </div>
          </FadeUp>
        </div>
      </main>

      <LandingFooter />
    </div>
  );
}
