"use client";

import { motion } from "framer-motion";

const SUGGESTIONS = [
  { label: "Update my resume but keep avoiding it",        emoji: "📄" },
  { label: "Study for an exam, don't know where to start", emoji: "📚" },
  { label: "I don't know why I'm stuck",                  emoji: "🌀" },
];

interface SuggestionCardsProps {
  onSelect: (text: string) => void;
}

export default function SuggestionCards({ onSelect }: SuggestionCardsProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {SUGGESTIONS.map(({ label, emoji }, i) => (
        <motion.button
          key={label}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.07, duration: 0.22 }}
          onClick={() => onSelect(label)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            padding: "15px 20px",
            borderRadius: 13,
            background: "#1C1C1C",
            border: "1px solid rgba(255,255,255,0.07)",
            color: "#B5B5B5",
            fontSize: 14,
            fontWeight: 500,
            cursor: "pointer",
            textAlign: "left",
            width: "100%",
            transition: "all 150ms ease-out",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "rgba(198,169,105,0.3)";
            e.currentTarget.style.color = "#FFFFFF";
            e.currentTarget.style.background = "#232323";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
            e.currentTarget.style.color = "#B5B5B5";
            e.currentTarget.style.background = "#1C1C1C";
          }}
        >
          <span style={{ fontSize: 18, flexShrink: 0 }} aria-hidden="true">
            {emoji}
          </span>
          {label}
        </motion.button>
      ))}
    </div>
  );
}
