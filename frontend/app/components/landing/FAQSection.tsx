"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import FadeUp from "./FadeUp";

const answerStyle = { margin: "0 0 14px", paddingRight: 32 };

const FAQS = [
  {
    q: "What is Zelos?",
    answer: (
      <>
        <p className="landing-body" style={answerStyle}>
          Zelos is a goal-native AI behavioral coach. It remembers what you&apos;re trying to achieve over time,
          notices recurring behavioral patterns, and helps you move from discussion to action.
        </p>
        <p className="landing-body" style={{ ...answerStyle, marginBottom: 22 }}>
          It&apos;s built for long-term goals — not quick answers or generic chat.
        </p>
      </>
    ),
  },
  {
    q: "How is Zelos different from ChatGPT?",
    answer: (
      <>
        <p className="landing-body" style={answerStyle}>
          ChatGPT responds to individual prompts. Zelos builds goal memory across conversations, tracks
          behavioral patterns over time, and suggests experiments based on how you actually work.
        </p>
        <p className="landing-body" style={{ ...answerStyle, marginBottom: 22 }}>
          The difference is continuity — coaching, progress, and patterns that compound across weeks and months.
        </p>
      </>
    ),
  },
  {
    q: "What kinds of goals can I work on?",
    answer: (
      <>
        <p className="landing-body" style={answerStyle}>
          Anything meaningful and long-term: launching a startup, switching careers, writing consistently,
          making a difficult decision, returning to school, or building a new habit.
        </p>
        <p className="landing-body" style={{ ...answerStyle, marginBottom: 22 }}>
          If it unfolds over weeks or months and matters to you, it belongs in Zelos.
        </p>
      </>
    ),
  },
  {
    q: "What are behavioral patterns?",
    answer: (
      <>
        <p className="landing-body" style={answerStyle}>
          Patterns are recurring behaviors Zelos notices — like research spirals, decision loops, avoidance,
          topic drift, or action gaps.
        </p>
        <p className="landing-body" style={{ ...answerStyle, marginBottom: 22 }}>
          They appear as gentle observations with evidence, not diagnoses. The goal is understanding your
          behavior, not labeling you.
        </p>
      </>
    ),
  },
  {
    q: "Do I need to know what's blocking me?",
    answer: (
      <>
        <p className="landing-body" style={answerStyle}>
          No. You can start with uncertainty — a goal you keep circling, a decision you keep postponing, or
          a sense that something isn&apos;t moving forward.
        </p>
        <p className="landing-body" style={{ ...answerStyle, marginBottom: 22 }}>
          Zelos helps you talk it through and surface patterns you might not see on your own.
        </p>
      </>
    ),
  },
  {
    q: "How does Zelos learn over time?",
    answer: (
      <>
        <p className="landing-body" style={answerStyle}>
          As you work through goals, Zelos remembers your context, tracks pattern occurrences, and updates
          a personal playbook of what works and what doesn&apos;t for you.
        </p>
        <p className="landing-body" style={{ ...answerStyle, marginBottom: 22 }}>
          Your timeline, patterns, and coaching become more personalized the more honestly you engage with
          your goals.
        </p>
      </>
    ),
  },
  {
    q: "Is my data private?",
    answer: (
      <>
        <p className="landing-body" style={answerStyle}>
          Your conversations and goals belong to you. We only collect what&apos;s needed to provide and improve
          the service, and we&apos;re committed to being transparent about how your data is handled.
        </p>
        <p className="landing-body" style={{ ...answerStyle, marginBottom: 22 }}>
          Honest coaching requires trust — protecting your privacy is part of that.
        </p>
      </>
    ),
  },
  {
    q: "Is Zelos free?",
    answer: (
      <>
        <p className="landing-body" style={answerStyle}>
          Yes — the current version is free to use while we focus on building something genuinely useful.
        </p>
        <p className="landing-body" style={{ ...answerStyle, marginBottom: 22 }}>
          Premium features may be introduced later, but the core mission stays the same: meaningful progress on
          meaningful goals.
        </p>
      </>
    ),
  },
  {
    q: "Can Zelos replace therapy?",
    answer: (
      <>
        <p className="landing-body" style={answerStyle}>
          No. Zelos is a behavioral coaching tool for goal progress and self-understanding — not therapy,
          medical advice, or crisis support.
        </p>
        <p className="landing-body" style={{ ...answerStyle, marginBottom: 22 }}>
          If you need professional mental health support, please reach out to a qualified provider.
        </p>
      </>
    ),
  },
];

function FAQItem({ q, answer }: { q: string; answer: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ borderBottom: "1px solid var(--landing-border)" }}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          padding: "22px 0",
          background: "none",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
        }}
      >
        <span
          style={{
            fontSize: 19,
            lineHeight: 1.4,
            letterSpacing: "-0.01em",
            color: "var(--landing-text)",
            fontWeight: 600,
          }}
        >
          {q}
        </span>
        {open ? (
          <Minus size={18} style={{ color: "var(--landing-text-secondary)", flexShrink: 0 }} />
        ) : (
          <Plus size={18} style={{ color: "var(--landing-text-secondary)", flexShrink: 0 }} />
        )}
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.25, 0.1, 0.25, 1] }}
            style={{ overflow: "hidden" }}
          >
            {answer}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQSection() {
  return (
    <section
      style={{
        padding: "80px clamp(24px, 5vw, 64px) 80px",
        position: "relative",
        zIndex: 1,
      }}
    >
      <div style={{ maxWidth: 680, margin: "0 auto" }}>
        <FadeUp>
          <h2
            className="font-landing-heading landing-section-title"
            style={{ textAlign: "center", marginBottom: 40 }}
          >
            FAQs
          </h2>
        </FadeUp>

        <FadeUp delay={0.08}>
          <div style={{ borderTop: "1px solid var(--landing-border)" }}>
            {FAQS.map((faq) => (
              <FAQItem key={faq.q} q={faq.q} answer={faq.answer} />
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
