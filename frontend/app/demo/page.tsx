"use client";

import Link from "next/link";
import { Fragment, useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";
import LandingNav from "../components/landing/LandingNav";
import LandingFooter from "../components/landing/LandingFooter";
import LandingBackground from "../components/landing/LandingBackground";
import FadeUp from "../components/landing/FadeUp";

const AUTO_ADVANCE_MS = 5000;
const WEEK_TRANSITION = { duration: 0.65, ease: [0.4, 0, 0.2, 1] as const };

type DemoWeek = {
  id: number;
  label: string;
  goal: string;
  userMessage: string;
  zelosResponse: string;
  contextTitle: string;
  contextBody: string;
  pattern?: {
    name: string;
    confidence: number;
    evidence: string[];
  };
  experiment?: string;
  playbook?: { works: string[]; doesnt: string[] };
  timelineAdded: string[];
  patternsLabel?: string;
};

const WEEKS: DemoWeek[] = [
  {
    id: 0,
    label: "Week 1",
    goal: "Launch Startup",
    userMessage:
      "I have three startup ideas, but I can't decide which one to build first.",
    zelosResponse:
      "Let's slow it down. Which idea feels most worth testing this week, even if it is not the perfect choice?",
    contextTitle: "Goal Memory Started",
    contextBody:
      "Zelos creates a long-term goal instead of treating this as a one-off chat.",
    patternsLabel: "No patterns detected yet.",
    timelineAdded: ["Goal started: Launch Startup"],
  },
  {
    id: 1,
    label: "Week 2",
    goal: "Launch Startup",
    userMessage:
      "I'm still comparing startup ideas. I found a few more competitors and now I'm not sure again.",
    zelosResponse:
      "I notice you're collecting more information before choosing an experiment. That may be useful, but it may also be delaying the first real test.",
    contextTitle: "Early Pattern Signal",
    contextBody: "A possible loop is emerging across conversations.",
    pattern: {
      name: "Research Spiral",
      confidence: 43,
      evidence: [
        "More ideas added",
        "Competitors researched",
        "No experiment chosen yet",
      ],
    },
    timelineAdded: ["Research spiral signal detected"],
  },
  {
    id: 2,
    label: "Week 3",
    goal: "Launch Startup",
    userMessage:
      "I still haven't picked one. Maybe I should research the market more before deciding.",
    zelosResponse:
      "This has now appeared across multiple conversations. You may be using research to avoid the discomfort of committing to one small test.",
    contextTitle: "Pattern Detected",
    contextBody: "Confidence has increased as the same loop repeats.",
    pattern: {
      name: "Research Spiral",
      confidence: 82,
      evidence: [
        "Startup idea comparison repeated across 3 conversations",
        "No test shipped",
        "Decision delayed multiple times",
      ],
    },
    experiment: "Pick one idea and test it for 48 hours.",
    timelineAdded: ["Research Spiral detected"],
  },
  {
    id: 3,
    label: "Week 4",
    goal: "Launch Startup",
    userMessage:
      "I tested one idea and spoke to two potential users. It wasn't perfect, but I learned a lot.",
    zelosResponse:
      "That is meaningful progress. Your playbook is updating: small experiments seem to help you move faster than additional research.",
    contextTitle: "Personal Playbook Updated",
    contextBody: "What works for you is becoming clearer over time.",
    playbook: {
      works: ["Small experiments", "Short deadlines", "Imperfect first drafts"],
      doesnt: [
        "Endless research",
        "Comparing every option",
        "Waiting for confidence",
      ],
    },
    timelineAdded: [
      "First experiment completed",
      "Customer conversations started",
      "Playbook updated",
    ],
  },
];

function cumulativeTimeline(throughWeek: number): string[] {
  return WEEKS.slice(0, throughWeek + 1).flatMap((w) => w.timelineAdded);
}

export default function DemoPage() {
  const [navBlur, setNavBlur] = useState(false);
  const [activeWeek, setActiveWeek] = useState(0);
  const [progressKey, setProgressKey] = useState(0);
  const week = WEEKS[activeWeek];
  const timeline = cumulativeTimeline(activeWeek);

  const selectWeek = useCallback((index: number) => {
    setActiveWeek(index);
    setProgressKey((k) => k + 1);
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setActiveWeek((prev) => (prev + 1) % WEEKS.length);
      setProgressKey((k) => k + 1);
    }, AUTO_ADVANCE_MS);
    return () => window.clearTimeout(timer);
  }, [activeWeek]);

  return (
    <div
      className="landing-page"
      onScroll={(e) => setNavBlur(e.currentTarget.scrollTop > 8)}
      style={{ overflowY: "auto", height: "100vh" }}
    >
      <LandingBackground />
      <LandingNav blurred={navBlur} showCta={false} />

      <main style={{ position: "relative", zIndex: 1, padding: "120px clamp(24px, 5vw, 64px) 80px" }}>
        <div style={{ maxWidth: 1040, margin: "0 auto" }}>
          <FadeUp>
            <p
              style={{
                fontSize: 12,
                color: "var(--landing-text-muted)",
                textAlign: "center",
                marginBottom: 20,
                fontStyle: "italic",
              }}
            >
              Fictional example. No real user conversations are shown.
            </p>
            <h1
              className="font-landing-heading landing-section-title"
              style={{ textAlign: "center", marginBottom: 16 }}
            >
              Watch Zelos learn over time
            </h1>
            <p
              className="landing-subhead"
              style={{ textAlign: "center", marginBottom: 40, maxWidth: 560, marginInline: "auto" }}
            >
              A fictional walkthrough showing how Zelos remembers goals, notices patterns, and helps
              you move from discussion to action.
            </p>
          </FadeUp>

          <WeekSelector active={activeWeek} progressKey={progressKey} onSelect={selectWeek} />

          <div className="demo-week-stage">
            <div className="demo-main-grid">
              <div className="demo-grid-cell">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`chat-${activeWeek}`}
                    className="demo-grid-cell-inner"
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -16 }}
                    transition={WEEK_TRANSITION}
                  >
                    <ConversationCard week={week} />
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="demo-grid-cell">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`intel-${activeWeek}`}
                    className="demo-grid-cell-inner"
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -16 }}
                    transition={{ ...WEEK_TRANSITION, delay: 0.06 }}
                  >
                    <GoalIntelligenceCard week={week} />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            <div className="demo-timeline-stage">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`timeline-${activeWeek}`}
                  className="demo-timeline-inner"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={WEEK_TRANSITION}
                >
                  <TimelineCard items={timeline} goal={week.goal} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="demo-bottom-cta">
              <h2 className="font-landing-heading landing-card-title" style={{ marginBottom: 12 }}>
                Ready to stop restarting the same loop?
              </h2>
              <p className="landing-subhead" style={{ marginBottom: 28 }}>
                Start with one goal. Zelos will learn with you over time.
              </p>
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
        </div>
      </main>

      <LandingFooter />

      <style>{`
        .demo-week-stage {
          margin-bottom: 0;
        }
        .demo-main-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 24px;
        }
        .demo-grid-cell {
          position: relative;
          min-height: 480px;
        }
        .demo-grid-cell-inner {
          position: absolute;
          inset: 0;
        }
        .demo-timeline-stage {
          position: relative;
          min-height: 360px;
        }
        .demo-timeline-inner {
          position: absolute;
          inset: 0;
        }
        .demo-bottom-cta {
          text-align: center;
          margin-top: 64px;
          max-width: 480px;
          margin-inline: auto;
        }
        @media (max-width: 768px) {
          .demo-main-grid {
            grid-template-columns: 1fr;
          }
          .demo-grid-cell {
            min-height: 280px;
          }
          .demo-timeline-stage {
            min-height: 280px;
          }
          .demo-week-arrow {
            display: none;
          }
          .demo-week-selector {
            gap: 8px !important;
          }
        }
      `}</style>
    </div>
  );
}

function WeekSelector({
  active,
  progressKey,
  onSelect,
}: {
  active: number;
  progressKey: number;
  onSelect: (i: number) => void;
}) {
  return (
    <div style={{ marginBottom: 28 }}>
      <div
        className="demo-week-selector"
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
          gap: 6,
        }}
      >
        {WEEKS.map((w, index) => (
          <Fragment key={w.id}>
            <button
              type="button"
              onClick={() => onSelect(w.id)}
              className="demo-week-btn"
              aria-current={active === w.id ? "step" : undefined}
              style={{
                position: "relative",
                overflow: "hidden",
                padding: "10px 20px",
                borderRadius: 20,
                fontSize: 14,
                fontWeight: 500,
                cursor: "pointer",
                fontFamily: "var(--font-body)",
                border:
                  active === w.id
                    ? "1px solid rgba(201, 167, 92, 0.55)"
                    : "1px solid var(--landing-border)",
                background: active === w.id ? "rgba(201, 167, 92, 0.14)" : "var(--landing-card)",
                color: active === w.id ? "var(--landing-text)" : "var(--landing-text-secondary)",
                transition: "background 400ms ease, border-color 400ms ease, color 400ms ease",
              }}
            >
              {w.label}
              {active === w.id && (
                <motion.span
                  key={progressKey}
                  aria-hidden
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: AUTO_ADVANCE_MS / 1000, ease: "linear" }}
                  style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    bottom: 0,
                    height: 2,
                    background: "#C9A75C",
                    transformOrigin: "left center",
                    display: "block",
                  }}
                />
              )}
            </button>
            {index < WEEKS.length - 1 && (
              <ChevronRight
                size={15}
                strokeWidth={2}
                aria-hidden
                className="demo-week-arrow"
                style={{
                  color: "var(--landing-text-secondary)",
                  opacity: 0.85,
                  flexShrink: 0,
                }}
              />
            )}
          </Fragment>
        ))}
      </div>
    </div>
  );
}

function ConversationCard({ week }: { week: DemoWeek }) {
  return (
    <article
      style={{
        background: "var(--landing-card)",
        border: "1px solid var(--landing-border)",
        borderRadius: 24,
        padding: "24px 22px",
        boxShadow: "var(--landing-shadow)",
        height: "100%",
      }}
    >
      <p
        style={{
          fontSize: 10,
          fontWeight: 600,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "var(--landing-text-muted)",
          marginBottom: 6,
        }}
      >
        {week.label}
      </p>
      <p className="landing-body-sm" style={{ margin: "0 0 20px", color: "var(--landing-text-muted)" }}>
        Goal: {week.goal}
      </p>

      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 14 }}>
        <div
          style={{
            maxWidth: "92%",
            padding: "12px 16px",
            borderRadius: "16px 16px 4px 16px",
            background: "rgba(201, 167, 92, 0.12)",
            border: "1px solid rgba(201, 167, 92, 0.28)",
            fontSize: 14,
            lineHeight: 1.55,
            color: "var(--landing-text)",
          }}
        >
          {week.userMessage}
        </div>
      </div>

      <div
        style={{
          padding: "14px 16px",
          borderRadius: "16px 16px 16px 4px",
          background: "var(--landing-card-surface)",
          border: "1px solid var(--landing-border)",
        }}
      >
        <p
          style={{
            fontSize: 10,
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "#9A7B3C",
            marginBottom: 8,
          }}
        >
          Zelos
        </p>
        <p className="landing-body" style={{ margin: 0, color: "var(--landing-text)" }}>
          {week.zelosResponse}
        </p>
      </div>
    </article>
  );
}

function GoalIntelligenceCard({ week }: { week: DemoWeek }) {
  return (
    <article
      style={{
        background: "var(--landing-card)",
        border: "1px solid var(--landing-border)",
        borderRadius: 24,
        padding: "24px 22px",
        boxShadow: "var(--landing-shadow)",
        height: "100%",
      }}
    >
      <p
        style={{
          fontSize: 10,
          fontWeight: 600,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "#9A7B3C",
          marginBottom: 10,
        }}
      >
        {week.contextTitle}
      </p>
      <p className="landing-body" style={{ margin: "0 0 20px" }}>
        {week.contextBody}
      </p>

      {week.patternsLabel && (
        <div
          style={{
            padding: "12px 14px",
            borderRadius: 12,
            background: "var(--landing-card-surface)",
            border: "1px solid var(--landing-border)",
            marginBottom: 16,
          }}
        >
          <p className="landing-body-sm" style={{ margin: 0, color: "var(--landing-text-muted)" }}>
            Patterns: {week.patternsLabel}
          </p>
        </div>
      )}

      {week.pattern && (
        <div
          style={{
            padding: "14px 16px",
            borderRadius: 14,
            border: "1px solid rgba(201, 167, 92, 0.4)",
            background: "rgba(201, 167, 92, 0.08)",
            marginBottom: 16,
          }}
        >
          <p className="font-landing-heading landing-card-title" style={{ marginBottom: 8 }}>
            {week.pattern.name}
          </p>
          <p className="landing-body-sm" style={{ margin: "0 0 12px" }}>
            Confidence: {week.pattern.confidence}%
          </p>
          <p
            style={{
              fontSize: 11,
              fontWeight: 600,
              color: "var(--landing-text-muted)",
              marginBottom: 8,
            }}
          >
            Evidence
          </p>
          <ul style={{ margin: 0, paddingLeft: 18, display: "flex", flexDirection: "column", gap: 6 }}>
            {week.pattern.evidence.map((e) => (
              <li key={e} className="landing-body-sm" style={{ margin: 0 }}>
                {e}
              </li>
            ))}
          </ul>
        </div>
      )}

      {week.experiment && (
        <div style={{ marginBottom: 16 }}>
          <p className="landing-body-sm" style={{ margin: "0 0 10px", fontWeight: 500, color: "var(--landing-text)" }}>
            Suggested experiment
          </p>
          <p className="landing-body" style={{ margin: "0 0 14px" }}>
            &ldquo;{week.experiment}&rdquo;
          </p>
          <button
            type="button"
            style={{
              padding: "9px 16px",
              borderRadius: 10,
              background: "var(--landing-accent)",
              border: "1px solid #C9A75C",
              color: "#1E1E1E",
              fontSize: 13,
              fontWeight: 500,
              cursor: "default",
              fontFamily: "var(--font-body)",
            }}
          >
            Accept Experiment
          </button>
        </div>
      )}

      {week.playbook && (
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <PlaybookBlock label="Works for you" items={week.playbook.works} />
          <PlaybookBlock label="Doesn't work" items={week.playbook.doesnt} />
        </div>
      )}
    </article>
  );
}

function PlaybookBlock({ label, items }: { label: string; items: string[] }) {
  return (
    <div>
      <p className="landing-body-sm" style={{ margin: "0 0 8px", fontWeight: 500, color: "var(--landing-text)" }}>
        {label}
      </p>
      <ul style={{ margin: 0, paddingLeft: 18, display: "flex", flexDirection: "column", gap: 4 }}>
        {items.map((item) => (
          <li key={item} className="landing-body-sm" style={{ margin: 0 }}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function TimelineCard({ items, goal }: { items: string[]; goal: string }) {
  return (
    <article
      style={{
        background: "var(--landing-card)",
        border: "1px solid var(--landing-border)",
        borderRadius: 24,
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
          color: "var(--landing-text-muted)",
          marginBottom: 6,
        }}
      >
        Progress narrative
      </p>
      <p className="landing-body-sm" style={{ margin: "0 0 20px" }}>
        Goal: {goal}
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
        {items.map((item, i) => (
          <div key={`${item}-${i}`} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: i === items.length - 1 ? "#C9A75C" : "var(--landing-border)",
                  marginTop: 6,
                  flexShrink: 0,
                }}
              />
              {i < items.length - 1 && (
                <div style={{ width: 1, flex: 1, minHeight: 20, background: "var(--landing-border)" }} />
              )}
            </div>
            <p
              className="landing-body"
              style={{
                margin: 0,
                paddingBottom: i < items.length - 1 ? 16 : 0,
                color: i === items.length - 1 ? "var(--landing-text)" : "var(--landing-text-secondary)",
                fontWeight: i === items.length - 1 ? 500 : 400,
              }}
            >
              {item}
            </p>
          </div>
        ))}
      </div>
    </article>
  );
}
