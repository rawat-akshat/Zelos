"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const SUGGESTIONS = [
  {
    label: "Research Spiral",
    preview:
      "I've been wanting to build a startup for months, but I keep researching instead of building. Every time I choose a direction, I find another idea, competitor, or strategy to analyze. I tell myself I'm being thorough, but deep down I wonder if I'm avoiding the risk of committing to something. How do I stop going in circles and finally move forward?",
    prompt:
      "I've been wanting to build a startup for months, but I keep researching instead of building. Every time I choose a direction, I find another idea, competitor, or strategy to analyze. I tell myself I'm being thorough, but deep down I wonder if I'm avoiding the risk of committing to something. How do I stop going in circles and finally move forward?",
  },
  {
    label: "Career Uncertainty",
    preview:
      "I'm in college and everyone around me seems to know what they're working toward. Some people are preparing for placements, some want to pursue higher studies, and others are building startups. Meanwhile, I keep changing my mind about what I want to do. The more I think about my future, the more confused I become. Why does everyone else seem so certain while I feel stuck?",
    prompt:
      "I'm in college and everyone around me seems to know what they're working toward. Some people are preparing for placements, some want to pursue higher studies, and others are building startups. Meanwhile, I keep changing my mind about what I want to do. The more I think about my future, the more confused I become. Why does everyone else seem so certain while I feel stuck?",
  },
  {
    label: "Overwhelm & Avoidance",
    preview:
      "My apartment is a mess, I have messages I haven't replied to, bills I need to pay, and a growing list of things I've been putting off. None of them are particularly difficult, but together they feel overwhelming. Instead of starting, I keep distracting myself and feeling guilty about it afterward. How do I get unstuck?",
    prompt:
      "My apartment is a mess, I have messages I haven't replied to, bills I need to pay, and a growing list of things I've been putting off. None of them are particularly difficult, but together they feel overwhelming. Instead of starting, I keep distracting myself and feeling guilty about it afterward. How do I get unstuck?",
  },
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
        Not sure where to begin? Start with one of these
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {SUGGESTIONS.map((suggestion, i) => (
          <motion.button
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06, duration: 0.25 }}
            onClick={() => onSelect(suggestion.prompt)}
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
            <span style={{ display: "flex", flexDirection: "column", gap: 6, minWidth: 0 }}>
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--text-muted)",
                }}
              >
                {suggestion.label}
              </span>
              <span>{suggestion.preview}</span>
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
