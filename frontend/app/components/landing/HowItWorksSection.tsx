"use client";

import { MessageCircle, Eye, Lightbulb, FlaskConical, Bookmark } from "lucide-react";
import FadeUp from "./FadeUp";

const STEPS = [
  {
    icon: MessageCircle,
    title: "You talk",
    body: "Share what you're working through — goals, doubts, decisions, or momentum.",
  },
  {
    icon: Eye,
    title: "Zelos notices patterns",
    body: "Recurring loops surface across conversations, not just one chat at a time.",
  },
  {
    icon: Lightbulb,
    title: "Behavioral insight appears",
    body: "Observations feel optional and evidence-based — never like a diagnosis.",
  },
  {
    icon: FlaskConical,
    title: "Small experiment suggested",
    body: "A next step sized for how you actually behave, not how you wish you worked.",
  },
  {
    icon: Bookmark,
    title: "Progress remembered",
    body: "Goals, patterns, and what works build into a long-term coaching memory.",
  },
];

export default function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      style={{
        padding: "96px clamp(24px, 5vw, 64px)",
        position: "relative",
        zIndex: 1,
      }}
    >
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <FadeUp>
          <h2
            className="font-landing-heading landing-section-title"
            style={{ textAlign: "center", marginBottom: 56 }}
          >
            From discussion to action.
          </h2>
        </FadeUp>

        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {STEPS.map((step, i) => (
            <FadeUp key={step.title} delay={i * 0.06}>
              <div style={{ display: "flex", gap: 20, position: "relative" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 12,
                      background: "var(--landing-card)",
                      border: "1px solid var(--landing-border)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "var(--landing-shadow)",
                    }}
                  >
                    <step.icon size={20} strokeWidth={1.5} style={{ color: "#9A7B3C" }} />
                  </div>
                  {i < STEPS.length - 1 && (
                    <div
                      style={{
                        width: 1,
                        flex: 1,
                        minHeight: 32,
                        background: "var(--landing-border)",
                        margin: "8px 0",
                      }}
                    />
                  )}
                </div>
                <div style={{ paddingBottom: i < STEPS.length - 1 ? 32 : 0, flex: 1 }}>
                  <h3 className="font-landing-heading landing-card-title" style={{ marginBottom: 8 }}>
                    {step.title}
                  </h3>
                  <p className="landing-body" style={{ margin: 0 }}>
                    {step.body}
                  </p>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
