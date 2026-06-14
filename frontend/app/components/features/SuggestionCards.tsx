"use client";

import { motion } from "framer-motion";

const SUGGESTIONS = [
  "Update my resume but keep avoiding it",
  "Study for an exam, don't know where to start",
  "I know what to do but can't begin",
];

interface SuggestionCardsProps {
  onSelect: (text: string) => void;
}

export default function SuggestionCards({ onSelect }: SuggestionCardsProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {SUGGESTIONS.map((label, i) => (
        <motion.button
          key={label}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.07, duration: 0.25 }}
          onClick={() => onSelect(label)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 0,
            padding: "20px 26px",
            borderRadius: "var(--radius-card)",
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
            color: "var(--text-secondary)",
            fontSize: 15,
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
          {label}
        </motion.button>
      ))}
    </div>
  );
}
