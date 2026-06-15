"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const SUGGESTIONS = [
  "My exam is coming up soon and I know I need to study, but I can't figure out where to start so I keep putting it off.",

  "I always seem to avoid important tasks until the last minute. Why does this happen even when I genuinely want to get them done?",

  "I've been trying to update my resume for weeks. Every time I open it, I feel overwhelmed and end up doing something else instead.",

  "What's the difference between procrastination, task paralysis, and executive dysfunction? I think I experience all three.",

  "My apartment is a complete mess, I have 5 outstanding bills to pay, and I need to book a dentist appointment. The sheer volume of things to do is making me dizzy, so I'm just sitting on the couch playing phone games."
];
interface SuggestionCardsProps {
  onSelect: (text: string) => void;
}

export default function SuggestionCards({ onSelect }: SuggestionCardsProps) {
  return (
    <div>
      <p
        style={{
          fontSize: 13,
          fontWeight: 500,
          color: "var(--text-muted)",
          marginBottom: 10,
          letterSpacing: "0.01em",
        }}
      >
        Not sure where to start? Try one of these
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {SUGGESTIONS.map((label, i) => (
        <motion.button
          key={label}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.07, duration: 0.25 }}
          onClick={() => onSelect(label)}
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: 12,
            padding: "12px 16px",
            borderRadius: "var(--radius-card)",
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
            color: "var(--text-secondary)",
            fontSize: 14,
            lineHeight: 1.45,
            fontWeight: 400,
            cursor: "pointer",
            textAlign: "left",
            width: "100%",
            boxShadow: "var(--shadow-sm)",
            transition: "all 200ms var(--ease)",
            fontFamily: "var(--font-body)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "var(--border-accent)";
            e.currentTarget.style.color = "var(--text-primary)";
            e.currentTarget.style.background = "var(--bg-card-hover)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "var(--border)";
            e.currentTarget.style.color = "var(--text-secondary)";
            e.currentTarget.style.background = "var(--bg-card)";
          }}
        >
          <Sparkles
            size={15}
            strokeWidth={1.75}
            style={{ color: "var(--accent)", flexShrink: 0, marginTop: 2 }}
            aria-hidden
          />
          <span>{label}</span>
        </motion.button>
      ))}
      </div>
    </div>
  );
}
