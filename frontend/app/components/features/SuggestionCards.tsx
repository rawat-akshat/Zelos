"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const SUGGESTIONS = [
  {
    preview:
      "I've been wanting to build a startup for months, but I keep researching instead of building. Every time I choose a direction, I find something else to analyze. How do I stop going in circles and finally move forward?",
    prompt:
      "I've been wanting to build a startup for months, but I keep researching ideas, competitors, and pricing instead of actually building anything. Every time I decide on a direction, I find another thing to analyze and end up back at square one. I know I should just start, but I can't seem to move forward. Can you help me understand what's keeping me stuck and what the smallest next step should be?",
  },
  {
    preview:
      "I need to prepare for interviews and apply for jobs, but there are so many things to do that I keep postponing all of them. How do I break this down and start making progress?",
    prompt:
      "I need to prepare for interviews and apply for jobs, but the whole process feels overwhelming. There are resumes, applications, coding practice, networking, and I don't know where to start. Because everything feels important, I keep postponing all of it and then feel guilty for not making progress. Can you help me break this down?",
  },
  {
    preview:
      "I've been focused on work and responsibilities for years, but lately I'm unsure what I actually want next. How do I gain clarity and decide what direction feels right?",
    prompt:
      "For the past few years, I've been focused on work and responsibilities, but lately I feel like I'm just going through the motions. There are things I'd like to change or explore, but every option seems uncertain and I keep second-guessing myself. The more I think about it, the more confused I become. Can you help me sort through my thoughts and figure out what direction feels right?",
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
            <span>{suggestion.preview}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
