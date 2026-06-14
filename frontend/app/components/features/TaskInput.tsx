"use client";

import { useState, useRef, useEffect } from "react";
import { ArrowUp, Loader2, Paperclip, Mic } from "lucide-react";
import { clsx } from "clsx";

const PLACEHOLDERS = [
  "What feels overwhelming right now?",
  "What are you putting off today?",
  "What task makes you freeze up?",
  "Describe what you're stuck on...",
  "What have you been avoiding?",
];

interface TaskInputProps {
  onSubmit: (text: string) => void;
  loading?: boolean;
  initialValue?: string;
}

export default function TaskInput({
  onSubmit,
  loading = false,
  initialValue = "",
}: TaskInputProps) {
  const [value, setValue] = useState(() => initialValue);
  const [focused, setFocused] = useState(false);
  const [placeholderIdx, setPlaceholderIdx] = useState(0);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (initialValue) textareaRef.current?.focus();
  }, [initialValue]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIdx((i) => (i + 1) % PLACEHOLDERS.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  function handleSubmit() {
    const trimmed = value.trim();
    if (trimmed.length < 5 || loading) return;
    setValue("");
    onSubmit(trimmed);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  }

  const canSubmit = value.trim().length >= 5 && !loading;
  const tooShort = value.trim().length > 0 && value.trim().length < 5;

  return (
    <div
      className={clsx("relative rounded-[16px] transition-all duration-200")}
      style={{
        background: "#1A1A1A",
        border: focused
          ? "1px solid rgba(198,169,105,0.45)"
          : tooShort
          ? "1px solid rgba(180,80,80,0.4)"
          : "1px solid rgba(255,255,255,0.07)",
        boxShadow: focused
          ? "0 0 0 3px rgba(198,169,105,0.07), 0 4px 24px rgba(0,0,0,0.3)"
          : "0 2px 12px rgba(0,0,0,0.2)",
      }}
    >
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onKeyDown={handleKeyDown}
        placeholder={PLACEHOLDERS[placeholderIdx]}
        rows={2}
        disabled={loading}
        style={{
          display: "block",
          width: "100%",
          resize: "none",
          background: "transparent",
          outline: "none",
          padding: "16px 20px 48px",
          fontSize: 15,
          lineHeight: 1.6,
          color: "#FFFFFF",
          caretColor: "#C6A969",
          opacity: loading ? 0.6 : 1,
        }}
        aria-label="Describe what you're stuck on"
      />

      {/* Bottom action row */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 14px 14px",
        }}
      >
        {/* Left: attach file */}
        <button
          type="button"
          title="Attach a file"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 32,
            height: 32,
            borderRadius: 8,
            background: "transparent",
            border: "none",
            cursor: "pointer",
            color: "#444",
            transition: "color 150ms",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#7A7A7A")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#444")}
          aria-label="Attach file"
        >
          <Paperclip size={15} />
        </button>

        {/* Right: error hint + mic + submit */}
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          {tooShort && (
            <span style={{ fontSize: 11, color: "#8C4A4A", marginRight: 2 }}>Keep typing…</span>
          )}

          {/* Mic button */}
          <button
            type="button"
            title="Voice input"
            aria-label="Voice input"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 32,
              height: 32,
              borderRadius: 8,
              background: "transparent",
              border: "none",
              cursor: "pointer",
              color: "#444",
              transition: "color 150ms",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#7A7A7A")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#444")}
          >
            <Mic size={15} />
          </button>

          {/* Submit button */}
          <button
            onClick={handleSubmit}
            disabled={!canSubmit}
            title="Break it down"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 32,
              height: 32,
              borderRadius: 8,
              background: canSubmit ? "#C6A969" : "rgba(198,169,105,0.15)",
              border: "none",
              cursor: canSubmit ? "pointer" : "not-allowed",
              transition: "all 150ms",
              boxShadow: canSubmit ? "0 2px 10px rgba(198,169,105,0.28)" : "none",
            }}
            onMouseEnter={(e) => { if (canSubmit) e.currentTarget.style.background = "#D4AF37"; }}
            onMouseLeave={(e) => { if (canSubmit) e.currentTarget.style.background = "#C6A969"; }}
            aria-label="Submit"
          >
            {loading ? (
              <Loader2 size={14} color={canSubmit ? "#0F0F0F" : "#555"} className="animate-spin" />
            ) : (
              <ArrowUp size={14} strokeWidth={2.5} color={canSubmit ? "#0F0F0F" : "#555"} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
