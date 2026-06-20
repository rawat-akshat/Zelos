"use client";

import { Check, X } from "lucide-react";
import FadeUp from "./FadeUp";

const WORKS = [
  "Breaking big decisions into one next step",
  "Committing before you feel completely ready",
  "Small deadlines that create momentum",
  "Talking through uncertainty before acting",
  "Focusing on actions instead of outcomes",
];
const DOESNT = [
  "Researching for weeks without testing anything",
  "Comparing every option before choosing one",
  "Waiting until you feel confident enough",
  "Restarting plans instead of continuing them",
  "Avoiding uncomfortable conversations or decisions",
];

export default function PlaybookSection() {
  return (
    <section
      style={{
        padding: "96px clamp(24px, 5vw, 64px)",
        position: "relative",
        zIndex: 1,
      }}
    >
      <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
        <FadeUp>
          <h2 className="font-landing-heading landing-section-title" style={{ marginBottom: 16 }}>
            Over time, Zelos learns what works for you.
          </h2>
          <p className="landing-subhead" style={{ marginBottom: 48, maxWidth: 520, marginInline: "auto" }}>
            The more you use Zelos, the more personalized its coaching becomes.
          </p>
        </FadeUp>

        <FadeUp delay={0.08}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 20,
              textAlign: "left",
              marginBottom: 32,
            }}
          >
            <PlaybookCard title="Works For You" items={WORKS} positive />
            <PlaybookCard title="Doesn't Work" items={DOESNT} />
          </div>
          <p className="landing-body" style={{ margin: 0, maxWidth: 520, marginInline: "auto" }}>
            Over time, Zelos builds a personal coaching playbook based on your conversations, behavior, and progress.
          </p>
        </FadeUp>
      </div>
    </section>
  );
}

function PlaybookCard({
  title,
  items,
  positive,
}: {
  title: string;
  items: string[];
  positive?: boolean;
}) {
  return (
    <article
      style={{
        background: "var(--landing-card)",
        border: positive
          ? "1px solid rgba(201, 167, 92, 0.45)"
          : "1px solid var(--landing-border)",
        borderRadius: 24,
        padding: "32px 28px",
        boxShadow: "var(--landing-shadow)",
      }}
    >
      <h3 className="font-landing-heading landing-card-title" style={{ marginBottom: 20 }}>
        {title}
      </h3>
      <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 14 }}>
        {items.map((item) => (
          <li key={item} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
            <span
              style={{
                flexShrink: 0,
                width: 20,
                height: 20,
                borderRadius: "50%",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop: 2,
                background: positive ? "rgba(201, 167, 92, 0.18)" : "rgba(30, 30, 30, 0.07)",
                color: positive ? "#9A7B3C" : "#8A8FA0",
              }}
            >
              {positive ? <Check size={11} strokeWidth={2.5} /> : <X size={11} strokeWidth={2.5} />}
            </span>
            <span className="landing-body" style={{ margin: 0, color: "var(--landing-text)" }}>
              {item}
            </span>
          </li>
        ))}
      </ul>
    </article>
  );
}
