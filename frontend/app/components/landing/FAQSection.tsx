"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import FadeUp from "./FadeUp";

const FAQS = [
  {
    q: "Is Zelos therapy?",
    a: "No. Zelos is a productivity companion that helps you understand blockers and take small steps forward. It is not a substitute for professional mental health care.",
  },
  {
    q: "How is this different from ChatGPT?",
    a: "Zelos is built specifically for task paralysis and getting started — with structured breakdowns, learn mode, and progress tracking designed around that single problem.",
  },
  {
    q: "Do I need to have ADHD?",
    a: "Not at all. Anyone who knows what to do but struggles to begin will find Zelos helpful — whether that's procrastination, overwhelm, or perfectionism.",
  },
  {
    q: "Is Zelos free?",
    a: "We're starting with a free experience so you can see if Zelos helps you move forward. Pricing details will be shared as we grow.",
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
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
        <span className="font-landing-heading" style={{ fontSize: 20, letterSpacing: "-0.02em", color: "var(--landing-text)" }}>
          {q}
        </span>
        <ChevronDown
          size={20}
          style={{
            color: "var(--landing-text-secondary)",
            flexShrink: 0,
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 200ms ease",
          }}
        />
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
            <p className="landing-body" style={{ margin: "0 0 22px", paddingRight: 32 }}>
              {a}
            </p>
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
            Questions
          </h2>
        </FadeUp>

        <FadeUp delay={0.08}>
          <div
            style={{
              background: "var(--landing-card)",
              border: "1px solid var(--landing-border)",
              borderRadius: 20,
              padding: "8px 28px",
              boxShadow: "var(--landing-shadow)",
            }}
          >
            {FAQS.map((faq) => (
              <FAQItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
