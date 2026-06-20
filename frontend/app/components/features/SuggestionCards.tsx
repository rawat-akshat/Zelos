"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const SUGGESTIONS = [
  "I want to build a startup but keep overthinking the first step.",
  "I'm trying to switch jobs but I keep avoiding applications.",
  "I have a long-term goal, but I keep losing momentum.",
  "I keep researching instead of deciding.",
  "I don't know what's blocking me, help me figure it out.",
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
            transition={{ delay: i * 0.06, duration: 0.25 }}
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
