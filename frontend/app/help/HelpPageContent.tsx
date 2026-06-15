"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const HELP_FAQS: { q: string; answer: React.ReactNode }[] = [
  {
    q: "How do I know if Zelos is for me?",
    answer: (
      <>
        <p>If you&apos;ve ever known what you needed to do but struggled to begin, Zelos is for you.</p>
        <p>
          Whether you&apos;re a student, professional, creator, founder, or simply trying to make
          progress on everyday tasks, Zelos is designed to help you understand what&apos;s creating
          resistance and move forward with clarity.
        </p>
      </>
    ),
  },
  {
    q: "What kinds of things can Zelos help with?",
    answer: (
      <>
        <p>People use Zelos for a wide range of challenges, including:</p>
        <ul>
          <li>Procrastination</li>
          <li>Task paralysis</li>
          <li>Studying and exam preparation</li>
          <li>Job applications and career growth</li>
          <li>Creative projects</li>
          <li>Household responsibilities</li>
          <li>Decision making</li>
          <li>Building habits</li>
          <li>Understanding recurring patterns of avoidance</li>
        </ul>
        <p>If something feels important but difficult to start, Zelos can help.</p>
      </>
    ),
  },
  {
    q: "Do I need to know exactly what's wrong?",
    answer: (
      <>
        <p>Not at all.</p>
        <p>
          Many people come to Zelos because they feel overwhelmed, stuck, confused, or mentally
          blocked without knowing why.
        </p>
        <p>
          You don&apos;t need a clear diagnosis or perfectly organized thoughts. Simply describe
          what&apos;s going on, and Zelos will help you unpack it.
        </p>
      </>
    ),
  },
  {
    q: "Do I need a diagnosis or specific condition to use Zelos?",
    answer: (
      <>
        <p>No.</p>
        <p>
          Zelos is designed for anyone experiencing friction, overwhelm, avoidance, or difficulty
          getting started.
        </p>
        <p>
          You do not need ADHD, executive dysfunction, anxiety, or any other diagnosis to benefit
          from the product.
        </p>
      </>
    ),
  },
  {
    q: "Is Zelos appropriate for all ages?",
    answer: (
      <>
        <p>
          Zelos is designed for anyone who wants help overcoming overwhelm, procrastination, or
          difficulty getting started.
        </p>
        <p>
          Students, professionals, creators, and adults of all ages may find it helpful. Younger
          users may also benefit from Zelos, though the experience is designed primarily for people
          who can independently reflect on their goals, challenges, and habits.
        </p>
      </>
    ),
  },
  {
    q: "What's the difference between Learn Mode and Task Mode?",
    answer: (
      <>
        <p><strong>Learn Mode</strong> focuses on understanding.</p>
        <p>
          It helps you explore why you&apos;re feeling stuck, what psychological factors may be
          contributing, and how patterns like perfectionism, overwhelm, or avoidance might be
          showing up.
        </p>
        <p><strong>Task Mode</strong> focuses on action.</p>
        <p>
          It helps break large goals into small, manageable steps that are easier to begin
          immediately.
        </p>
      </>
    ),
  },
  {
    q: "When should I use Learn Mode?",
    answer: (
      <>
        <p>
          Use Learn Mode when you&apos;re curious about what&apos;s happening beneath the surface.
        </p>
        <p>It&apos;s especially useful when:</p>
        <ul>
          <li>The same problem keeps repeating</li>
          <li>You feel stuck but don&apos;t know why</li>
          <li>You want insight rather than a to-do list</li>
          <li>You want to better understand your habits and patterns</li>
        </ul>
      </>
    ),
  },
  {
    q: "When should I use Task Mode?",
    answer: (
      <>
        <p>
          Use Task Mode when you already know what needs to be done but are struggling to begin.
        </p>
        <p>
          Task Mode helps reduce overwhelm by turning large, intimidating goals into small, concrete
          actions.
        </p>
      </>
    ),
  },
  {
    q: "Can I switch between modes during a session?",
    answer: (
      <>
        <p>Yes.</p>
        <p>
          Sometimes understanding naturally leads to action, and action can reveal deeper patterns
          worth exploring.
        </p>
        <p>
          Zelos may move between reflection and execution as the conversation develops.
        </p>
      </>
    ),
  },
  {
    q: "Can Zelos help with long-term goals?",
    answer: (
      <>
        <p>Yes.</p>
        <p>
          While Zelos is especially useful for overcoming immediate blockers, many users return
          regularly to make steady progress on larger goals over time.
        </p>
        <p>The goal is not just productivity, but sustainable momentum.</p>
      </>
    ),
  },
  {
    q: "Is Zelos safe and private?",
    answer: (
      <>
        <p>We take privacy seriously.</p>
        <p>
          We do not sell your personal information or share your conversations with advertisers.
          Your data is used only to provide and improve the service.
        </p>
        <p>
          For more details, please review our <Link href="/privacy">Privacy Policy</Link>.
        </p>
      </>
    ),
  },
  {
    q: "Is my data used to train AI models?",
    answer: (
      <>
        <p>Zelos may rely on third-party AI providers to generate responses.</p>
        <p>
          Any future use of conversation data for model improvement will be clearly disclosed in our
          Privacy Policy.
        </p>
        <p>We believe transparency is important and will communicate changes openly.</p>
      </>
    ),
  },
  {
    q: "Can I delete my account and conversations?",
    answer: (
      <>
        <p>Yes.</p>
        <p>You can request deletion of your account and associated data at any time.</p>
        <p>If you need assistance, contact us at:</p>
        <p><Link href="mailto:contact@zelos.app">contact@zelos.app</Link></p>
      </>
    ),
  },
  {
    q: "Is Zelos a replacement for professional help?",
    answer: (
      <>
        <p>No.</p>
        <p>Zelos is a productivity and self-reflection tool.</p>
        <p>
          It is not therapy, medical treatment, mental health care, crisis intervention, or
          professional psychological advice.
        </p>
      </>
    ),
  },
  {
    q: "What if I'm experiencing a mental health crisis?",
    answer: (
      <>
        <p>Zelos is not designed for crisis situations.</p>
        <p>
          If you are experiencing thoughts of self-harm, feel unsafe, or are facing a mental health
          emergency, please contact local emergency services, a crisis hotline, or a qualified mental
          health professional immediately.
        </p>
        <p>Your safety is more important than any tool.</p>
      </>
    ),
  },
  {
    q: "How is Zelos different from ChatGPT?",
    answer: (
      <>
        <p>ChatGPT is a general-purpose AI assistant that can help with almost anything.</p>
        <p>
          Zelos is specifically designed around procrastination, overwhelm, task paralysis, and
          understanding mental friction.
        </p>
        <p>
          Rather than simply answering questions, Zelos is designed to help you understand
          what&apos;s creating resistance and move forward one step at a time.
        </p>
      </>
    ),
  },
  {
    q: "Is Zelos free?",
    answer: (
      <>
        <p>Yes.</p>
        <p>
          The current version of Zelos is free to use while we continue improving the product and
          learning from user feedback.
        </p>
      </>
    ),
  },
  {
    q: "Will there be a premium plan?",
    answer: (
      <>
        <p>Possibly.</p>
        <p>
          In the future, we may introduce optional premium features such as deeper insights, advanced
          progress tracking, voice experiences, or other tools.
        </p>
        <p>Our focus right now is building something genuinely useful.</p>
      </>
    ),
  },
  {
    q: "How can I provide feedback?",
    answer: (
      <>
        <p>We&apos;d love to hear from you.</p>
        <p>Every suggestion, bug report, and piece of feedback helps us improve Zelos.</p>
        <p>Contact us at:</p>
        <p><Link href="mailto:contact@zelos.app">contact@zelos.app</Link></p>
      </>
    ),
  },
  {
    q: "How can I contact the team?",
    answer: (
      <>
        <p>For support, feedback, partnerships, or general questions:</p>
        <p><Link href="mailto:contact@zelos.app">contact@zelos.app</Link></p>
        <p>We&apos;ll do our best to respond as quickly as possible.</p>
      </>
    ),
  },
];

function HelpFAQItem({ q, answer, index }: { q: string; answer: React.ReactNode; index: number }) {
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
          padding: "20px 0",
          background: "none",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
        }}
      >
        <span
          style={{
            fontSize: 17,
            lineHeight: 1.4,
            letterSpacing: "-0.01em",
            color: "var(--landing-text)",
            fontWeight: 600,
          }}
        >
          {index + 1}. {q}
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
            <div className="help-faq-answer">{answer}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function HelpPageContent() {
  return (
    <>
      <h2>Frequently Asked Questions</h2>
      <div style={{ borderTop: "1px solid var(--landing-border)" }}>
        {HELP_FAQS.map((faq, i) => (
          <HelpFAQItem key={faq.q} q={faq.q} answer={faq.answer} index={i} />
        ))}
      </div>

      <div style={{ marginTop: 32, paddingTop: 32, borderTop: "1px solid var(--landing-border)" }}>
        <h2>Still have a question?</h2>
        <p>We&apos;re happy to help.</p>
        <p>Email us at:</p>
        <p><Link href="mailto:contact@zelos.app">contact@zelos.app</Link></p>
        <p>We typically respond within 2–3 business days.</p>
      </div>
    </>
  );
}
