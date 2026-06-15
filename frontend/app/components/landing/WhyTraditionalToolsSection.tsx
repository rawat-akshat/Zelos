"use client";

import { Check, X } from "lucide-react";
import FadeUp from "./FadeUp";

const TRADITIONAL = [
  "Giant task lists that feel overwhelming",
  "Complex systems that require constant maintenance",
  "Focus only on tasks, not why you're avoiding them",
  "Expect motivation before action",
  "Add more information when your brain already feels overloaded",
];

const ZELOS = [
  "Meet yourself where you are",
  "Understand what's creating resistance",
  "Get one tiny next step instead of twenty",
  "Build momentum before motivation",
  "Reduce overwhelm through clarity and action",
];

function ListIcon({ positive }: { positive?: boolean }) {
  return (
    <span
      style={{
        flexShrink: 0,
        width: 20,
        height: 20,
        borderRadius: "50%",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 3,
        background: positive ? "rgba(107, 248, 253, 0.18)" : "rgba(30, 30, 30, 0.07)",
        color: positive ? "#4A9599" : "#8A8FA0",
      }}
    >
      {positive ? <Check size={11} strokeWidth={2.5} /> : <X size={11} strokeWidth={2.5} />}
    </span>
  );
}

function ComparisonCard({
  title,
  items,
  accent,
}: {
  title: string;
  items: string[];
  accent?: boolean;
}) {
  return (
    <article
      className="comparison-card"
      style={{
        background: "var(--landing-card)",
        border: accent
          ? "1px solid rgba(107, 248, 253, 0.45)"
          : "1px solid var(--landing-border)",
        borderRadius: 24,
        padding: "40px 36px",
        boxShadow: accent
          ? "0 4px 28px rgba(107, 248, 253, 0.08), var(--landing-shadow)"
          : "var(--landing-shadow)",
        height: "100%",
        transition: "transform 200ms ease, box-shadow 200ms ease",
      }}
    >
      <h3
        className="font-landing-heading landing-card-title"
        style={{ marginBottom: 28 }}
      >
        {title}
      </h3>
      <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 18 }}>
        {items.map((item) => (
          <li key={item} className="landing-body" style={{ display: "flex", gap: 12, alignItems: "flex-start", margin: 0 }}>
            <ListIcon positive={accent} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

function SectionLineArt() {
  return (
    <svg
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        opacity: 0.035,
        pointerEvents: "none",
      }}
      viewBox="0 0 1200 800"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
    >
      {Array.from({ length: 18 }, (_, i) => (
        <line
          key={i}
          x1="80"
          y1={120 + i * 36}
          x2="1120"
          y2={120 + i * 36}
          stroke="#1E1E1E"
          strokeWidth="1"
        />
      ))}
      <rect x="920" y="60" width="120" height="160" rx="6" stroke="#1E1E1E" strokeWidth="1.2" />
      <path
        d="M140 680 C200 620, 320 620, 380 680"
        stroke="#1E1E1E"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function WhyTraditionalToolsSection() {
  return (
    <section
      style={{
        padding: "96px clamp(24px, 5vw, 64px)",
        position: "relative",
        zIndex: 1,
        overflow: "hidden",
      }}
    >
      <SectionLineArt />

      <div style={{ maxWidth: 1080, margin: "0 auto", position: "relative" }}>
        <FadeUp>
          <h2
            className="font-landing-heading landing-section-title"
            style={{ textAlign: "center", marginBottom: 20, maxWidth: 720, marginInline: "auto" }}
          >
            Why traditional productivity tools feel exhausting
          </h2>
          <p
            className="landing-subhead"
            style={{ textAlign: "center", maxWidth: 560, margin: "0 auto 56px" }}
          >
            Most productivity tools assume you already know exactly what to do.
            The problem is that many people get stuck long before that.
          </p>
        </FadeUp>

        <style>{`
          .comparison-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 28px;
          }
          @media (max-width: 768px) {
            .comparison-grid {
              grid-template-columns: 1fr;
            }
          }
          .comparison-card:hover {
            transform: translateY(-3px);
            box-shadow: 0 12px 40px rgba(30, 30, 30, 0.09);
          }
        `}</style>

        <div className="comparison-grid">
          <FadeUp delay={0.06}>
            <ComparisonCard title="Traditional Productivity Tools" items={TRADITIONAL} />
          </FadeUp>
          <FadeUp delay={0.12}>
            <ComparisonCard title="Zelos" items={ZELOS} accent />
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
