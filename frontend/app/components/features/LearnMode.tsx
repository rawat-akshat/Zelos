"use client";

import { motion } from "framer-motion";
import { BookOpen, ArrowRight } from "lucide-react";
import type { LearnResponse } from "@/app/lib/types";
import { Chip } from "../ui/Chip";
import Card from "../ui/Card";

interface LearnModeProps {
  response: LearnResponse;
  onFollowUp: (question: string) => void;
}

export default function LearnMode({ response, onFollowUp }: LearnModeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0, 0, 0.2, 1] }}
      className="space-y-5"
    >
      {/* Mode badge */}
      <div className="flex items-center gap-2">
        <div
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium"
          style={{
            background: "rgba(147,197,253,0.08)",
            color: "#93C5FD",
            border: "1px solid rgba(147,197,253,0.15)",
          }}
        >
          <BookOpen size={11} />
          Learn Mode
        </div>
      </div>

      {/* Article card */}
      <Card padding="lg" className="space-y-5">
        <div>
          <h2 className="text-xl font-semibold leading-snug mb-2" style={{ color: "#FFFFFF" }}>
            {response.title}
          </h2>
          <p className="text-sm leading-relaxed" style={{ color: "#B5B5B5" }}>
            {response.summary}
          </p>
        </div>

        <div
          className="h-px"
          style={{ background: "rgba(255,255,255,0.05)" }}
        />

        {/* Sections */}
        <div className="space-y-4">
          {response.sections.map((section, i) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.08, duration: 0.25 }}
              className="space-y-1.5"
            >
              <h3
                className="text-xs font-semibold uppercase tracking-[0.1em]"
                style={{ color: "#C6A969" }}
              >
                {section.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "#B5B5B5" }}>
                {section.content}
              </p>
            </motion.div>
          ))}
        </div>
      </Card>

      {/* Follow-up questions */}
      <div className="space-y-3">
        <p
          className="text-[10px] font-semibold uppercase tracking-[0.12em]"
          style={{ color: "#555" }}
        >
          Explore further
        </p>
        <div className="flex flex-wrap gap-2">
          {response.suggestedQuestions.map((q) => (
            <Chip key={q} label={q} onClick={() => onFollowUp(q)} />
          ))}
        </div>
      </div>

      {/* CTA to Task Mode */}
      <div
        className="flex items-center justify-between p-4 rounded-[12px]"
        style={{
          background: "rgba(198,169,105,0.05)",
          border: "1px solid rgba(198,169,105,0.12)",
        }}
      >
        <div>
          <p className="text-sm font-medium" style={{ color: "#E0E0E0" }}>
            Ready to take action?
          </p>
          <p className="text-xs mt-0.5" style={{ color: "#7A7A7A" }}>
            Describe a task and get a step-by-step breakdown
          </p>
        </div>
        <button
          onClick={() => onFollowUp("Help me break down a task I'm stuck on")}
          className="flex-shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-[10px] text-sm font-medium transition-all duration-150"
          style={{
            background: "#C6A969",
            color: "#0F0F0F",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#D4AF37")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#C6A969")}
        >
          Get unstuck
          <ArrowRight size={13} />
        </button>
      </div>
    </motion.div>
  );
}
