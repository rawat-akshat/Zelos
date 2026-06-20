"use client";

import { Brain, Target, Sparkles } from "lucide-react";
import FadeUp from "./FadeUp";

const CARDS = [
  {
    icon: Target,
    title: "Goal Memory",
    body: "Remembers what you're actually trying to achieve across weeks and months.",
  },
  {
    icon: Sparkles,
    title: "Pattern Detection",
    body: "Identifies research spirals, decision loops, avoidance, topic drift, and other recurring behaviors.",
  },
  {
    icon: Brain,
    title: "Behavioral Coaching",
    body: "Suggests experiments and next steps tailored to how you actually work.",
  },
];

export default function MoatSection() {
  return (
    <section
      style={{
        padding: "96px clamp(24px, 5vw, 64px)",
        position: "relative",
        zIndex: 1,
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <FadeUp>
          <h2
            className="font-landing-heading landing-section-title"
            style={{ textAlign: "center", marginBottom: 56, maxWidth: 640, marginInline: "auto" }}
          >
            Most AI sees prompts. Zelos sees patterns.
          </h2>
        </FadeUp>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 24,
          }}
        >
          {CARDS.map((card, i) => (
            <FadeUp key={card.title} delay={i * 0.08}>
              <article className="landing-card" style={{ padding: "36px 32px", height: "100%" }}>
                <card.icon
                  size={22}
                  strokeWidth={1.5}
                  style={{ color: "#9A7B3C", marginBottom: 20 }}
                />
                <h3 className="font-landing-heading landing-card-title" style={{ marginBottom: 12 }}>
                  {card.title}
                </h3>
                <p className="landing-body" style={{ margin: 0 }}>
                  {card.body}
                </p>
              </article>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
