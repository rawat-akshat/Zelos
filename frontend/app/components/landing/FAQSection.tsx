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
          It&apos;s not a task manager, planner, or generic chatbot — it&apos;s a long-term thinking partner
          for meaningful goals.
        </p>
      </>
    ),
  },
  {
    q: "How is Zelos different from ChatGPT?",
    answer: (
      <>
        <p className="landing-body" style={answerStyle}>
          ChatGPT responds to prompts. Zelos builds memory around your goals, tracks behavioral patterns across
          conversations, and suggests experiments based on how you actually work.
        </p>
        <p className="landing-body" style={{ ...answerStyle, marginBottom: 22 }}>
          The difference is continuity — progress, patterns, and coaching that compounds over weeks and months.
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
          finishing a degree, making a difficult life decision, or building a new habit.
        </p>
        <p className="landing-body" style={{ ...answerStyle, marginBottom: 22 }}>
          Zelos is built for goals that unfold over time — not one-off task lists.
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
          They appear as gentle observations with evidence, not diagnoses. The goal is understanding, not labeling.
        </p>
      </>
    ),
  },
  {
    q: "Do I need to know what's blocking me?",
    answer: (
      <>
        <p className="landing-body" style={answerStyle}>
          Not at all. You can start with a vague sense of being stuck, a goal you keep circling, or uncertainty
          about what to do next.
        </p>
        <p className="landing-body" style={{ ...answerStyle, marginBottom: 22 }}>
          Zelos helps you talk it through and surface patterns you might not see on your own.
        </p>
      </>
    ),
  },
  {
    q: "Is Zelos a replacement for professional help?",
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
  {
    q: "Is Zelos private?",
    answer: (
      <>
        <p className="landing-body" style={answerStyle}>
          Your conversations and goals belong to you. We only collect what&apos;s needed to provide and improve
          the service, and we&apos;re committed to being transparent about data handling.
        </p>
        <p className="landing-body" style={{ ...answerStyle, marginBottom: 22 }}>
          Trust is essential for honest coaching — protecting it is a priority.
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
