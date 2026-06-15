"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import FadeUp from "./FadeUp";

const answerStyle = { margin: "0 0 14px", paddingRight: 32 };
const listStyle = {
  margin: "0 0 14px",
  paddingLeft: 20,
  paddingRight: 32,
  display: "flex",
  flexDirection: "column" as const,
  gap: 6,
};

const FAQS = [
  {
    q: "How do I know if Zelos is for me?",
    answer: (
      <>
        <p className="landing-body" style={answerStyle}>
          Zelos is for people who often find themselves stuck between intention and action.
        </p>
        <p className="landing-body" style={answerStyle}>
          You might know exactly what needs to be done but still struggle to begin. Maybe you
          procrastinate on important tasks, feel overwhelmed by large projects, overthink
          decisions, or keep putting something off even though you genuinely want to do it.
        </p>
        <p className="landing-body" style={answerStyle}>
          If you&apos;ve ever thought:
        </p>
        <ul className="landing-body" style={listStyle}>
          <li>&ldquo;I&apos;ll start tomorrow.&rdquo;</li>
          <li>&ldquo;I don&apos;t even know where to begin.&rdquo;</li>
          <li>&ldquo;This feels overwhelming.&rdquo;</li>
          <li>&ldquo;Why can&apos;t I just do it?&rdquo;</li>
        </ul>
        <p className="landing-body" style={answerStyle}>
          then Zelos was built with you in mind.
        </p>
        <p className="landing-body" style={{ ...answerStyle, marginBottom: 22 }}>
          You don&apos;t need a diagnosis, a productivity system, or a perfectly organized life.
          You just need something you&apos;d like to move forward on.
        </p>
      </>
    ),
  },
  {
    q: "What kinds of things can Zelos help with?",
    answer: (
      <>
        <p className="landing-body" style={answerStyle}>
          Almost anything that feels overwhelming, unclear, or mentally heavy.
        </p>
        <p className="landing-body" style={answerStyle}>
          People use Zelos for things like:
        </p>
        <ul className="landing-body" style={listStyle}>
          <li>Updating a resume</li>
          <li>Studying for exams</li>
          <li>Cleaning a room or apartment</li>
          <li>Starting a side project</li>
          <li>Writing an important email</li>
          <li>Preparing for interviews</li>
          <li>Organizing their week</li>
          <li>Making difficult decisions</li>
        </ul>
        <p className="landing-body" style={{ ...answerStyle, marginBottom: 22 }}>
          Sometimes the challenge isn&apos;t the task itself—it&apos;s figuring out how to begin.
          That&apos;s where Zelos helps.
        </p>
      </>
    ),
  },
  {
    q: "How is Zelos different from ChatGPT?",
    answer: (
      <>
        <p className="landing-body" style={answerStyle}>
          ChatGPT is a powerful general-purpose AI. Zelos is built specifically for moments when
          you feel stuck.
        </p>
        <p className="landing-body" style={answerStyle}>
          Instead of giving broad answers, Zelos focuses on understanding what&apos;s creating
          resistance and helping you take a realistic next step.
        </p>
        <p className="landing-body" style={answerStyle}>
          It combines practical action with psychological insight, so you&apos;re not just getting
          advice—you&apos;re building momentum.
        </p>
        <p className="landing-body" style={answerStyle}>
          Think of ChatGPT as a brilliant assistant.
        </p>
        <p className="landing-body" style={{ ...answerStyle, marginBottom: 22 }}>
          Think of Zelos as a guide for moments when your brain refuses to cooperate.
        </p>
      </>
    ),
  },
  {
    q: "Do I need to know exactly what's wrong?",
    answer: (
      <>
        <p className="landing-body" style={answerStyle}>
          Not at all.
        </p>
        <p className="landing-body" style={answerStyle}>
          Many people come to Zelos because they don&apos;t know what&apos;s wrong.
        </p>
        <p className="landing-body" style={answerStyle}>
          You can start with a messy thought, a vague feeling of overwhelm, or a task you&apos;ve
          been avoiding for weeks.
        </p>
        <p className="landing-body" style={answerStyle}>
          You don&apos;t need the perfect explanation.
        </p>
        <p className="landing-body" style={{ ...answerStyle, marginBottom: 22 }}>
          Just tell Zelos what&apos;s going on, and it will help you untangle it from there.
        </p>
      </>
    ),
  },
  {
    q: "Is Zelos safe and private?",
    answer: (
      <>
        <p className="landing-body" style={answerStyle}>
          Yes. Your conversations belong to you.
        </p>
        <p className="landing-body" style={answerStyle}>
          Zelos is designed to help you think through challenges, not expose them.
        </p>
        <p className="landing-body" style={answerStyle}>
          We only collect the information needed to provide and improve the service, and we&apos;re
          committed to being transparent about how your data is handled.
        </p>
        <p className="landing-body" style={{ ...answerStyle, marginBottom: 22 }}>
          Trust is essential for a product like this, and protecting that trust will always be a
          priority.
        </p>
      </>
    ),
  },
  {
    q: "Is Zelos appropriate for all ages?",
    answer: (
      <>
        <p className="landing-body" style={answerStyle}>
        Zelos is designed for anyone who wants help overcoming overwhelm, procrastination, or difficulty getting started.
        </p>
        <p className="landing-body" style={answerStyle}>
        Whether you're a student, professional, creator, founder, or simply trying to tackle everyday tasks, Zelos can help you break through mental friction and take the next step.
        </p>
        <p className="landing-body" style={{ ...answerStyle, marginBottom: 22 }}>
        The experience is built around self-reflection, goal-setting, and taking action, making it most useful for people who want to better understand their challenges and make steady progress toward their goals.
        </p>
        <p className="landing-body" style={answerStyle}>
        If you've ever known what you needed to do but struggled to begin, Zelos is for you.
        </p>
      </>
    ),
  },
  {
    q: "Is Zelos a replacement for professional help?",
    answer: (
      <>
        <p className="landing-body" style={answerStyle}>
          No.
        </p>
        <p className="landing-body" style={answerStyle}>
          Zelos is a productivity and self-reflection tool, not a therapist, doctor, or mental
          health service.
        </p>
        <p className="landing-body" style={{ ...answerStyle, marginBottom: 22 }}>
          It can help you organize your thoughts, understand common blockers, and take practical next
          steps, but it should not be used as a substitute for professional medical, psychological,
          or crisis support.
        </p>
      </>
    ),
  },
  {
    q: "Is Zelos free?",
    answer: (
      <>
        <p className="landing-body" style={answerStyle}>
          Yes.
        </p>
        <p className="landing-body" style={answerStyle}>
          The current version of Zelos is free to use.
        </p>
        <p className="landing-body" style={answerStyle}>
          As the product grows, premium features may be introduced, but the core mission remains the
          same: helping people get unstuck and take meaningful action.
        </p>
        <p className="landing-body" style={{ ...answerStyle, marginBottom: 22 }}>
          Right now, the focus is simple—build something genuinely useful.
        </p>
      </>
    ),
  },
];

function FAQItem({ q, answer }: { q: string; answer: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      style={{
        borderBottom: "1px solid var(--landing-border)",
      }}
    >
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
        padding: "80px clamp(24px, 5vw, 64px) 120px",
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
