"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Paperclip, Mic, ArrowUp } from "lucide-react";
import { saveInitialPrompt } from "../../lib/initial-prompt";

export default function HeroSection() {
  const router = useRouter();
  const [prompt, setPrompt] = useState("");

  const canSubmit = prompt.trim().length > 0;

  const submitPrompt = useCallback(() => {
    if (!prompt.trim()) return;
    saveInitialPrompt(prompt);
    router.push("/try");
  }, [prompt, router]);

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (canSubmit) submitPrompt();
    }
  }

  return (
    <section
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        padding: "140px clamp(24px, 5vw, 64px) 64px",
        textAlign: "center",
        position: "relative",
        zIndex: 1,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
        style={{ width: "100%", maxWidth: 680 }}
      >
        <h1 className="font-landing-heading landing-display" style={{ marginBottom: 24 }}>
          What&apos;s keeping you stuck today?
        </h1>

        <p className="landing-subhead" style={{ maxWidth: 600, margin: "0 auto 48px" }}>
          Talk it through, understand the blocker, and take the next step.
        </p>

        <div
          style={{
            textAlign: "left",
            background: "var(--landing-card)",
            border: "3px solid #B8A898",
            borderRadius: 24,
            padding: "20px 26px 42px",
            boxShadow: "var(--landing-shadow)",
            marginBottom: 24,
            position: "relative",
          }}
        >
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="I've been avoiding updating my resume for weeks..."
            rows={2}
            className="landing-body"
            style={{
              width: "100%",
              margin: 0,
              padding: 0,
              border: "none",
              outline: "none",
              resize: "none",
              background: "transparent",
              color: "var(--landing-text)",
              fontFamily: "inherit",
              fontSize: "inherit",
              lineHeight: "inherit",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: 14,
              left: 16,
              right: 16,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Paperclip size={16} style={{ color: "var(--landing-text-muted)" }} />
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <Mic size={16} style={{ color: "var(--landing-text-muted)" }} />
              <button
                type="button"
                onClick={submitPrompt}
                disabled={!canSubmit}
                aria-label="Submit prompt"
                className={canSubmit ? "landing-btn-primary" : undefined}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  background: canSubmit ? "#C9A75C" : "var(--landing-border)",
                  color: "#1E1E1E",
                  border: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: canSubmit ? "pointer" : "default",
                  opacity: canSubmit ? 1 : 0.7,
                }}
              >
                <ArrowUp size={14} style={{ color: canSubmit ? "#1E1E1E" : "var(--landing-text-muted)" }} />
              </button>
            </div>
          </div>
        </div>

        <p className="landing-caption" style={{ margin: 0 }}>
          No productivity hacks. Just self-awareness and momentum.
        </p>
      </motion.div>
    </section>
  );
}
