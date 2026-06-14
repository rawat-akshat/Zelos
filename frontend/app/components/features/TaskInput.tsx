"use client";

import { useState, useRef, useEffect } from "react";
import { ArrowUp, Loader2, Paperclip, Mic } from "lucide-react";

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
      style={{
        position: "relative",
        borderRadius: "var(--radius-card)",
        background: "var(--bg-input)",
        border: focused
          ? "1px solid var(--border-focus)"
          : tooShort
          ? "1px solid var(--error)"
          : "1px solid var(--border)",
        boxShadow: focused ? "var(--input-shadow-focus)" : "var(--input-shadow)",
        transition: "border-color 200ms var(--ease), box-shadow 200ms var(--ease)",
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
          padding: "14px 18px 44px",
          fontSize: 15,
          lineHeight: 1.6,
          color: "var(--text-primary)",
          caretColor: "var(--accent)",
          opacity: loading ? 0.6 : 1,
          fontFamily: "var(--font-body)",
        }}
        aria-label="Describe what you're stuck on"
      />

      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 12px 12px",
        }}
      >
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
            color: "var(--text-muted)",
            transition: "color 200ms var(--ease)",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
          aria-label="Attach file"
        >
          <Paperclip size={15} strokeWidth={1.5} />
        </button>

        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          {tooShort && (
            <span style={{ fontSize: 11, color: "var(--error)", marginRight: 2 }}>
              Keep typing…
            </span>
          )}

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
              color: "var(--text-muted)",
              transition: "color 200ms var(--ease)",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
          >
            <Mic size={15} strokeWidth={1.5} />
          </button>

          <button
            onClick={handleSubmit}
            disabled={!canSubmit}
            title="Submit"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 32,
              height: 32,
              borderRadius: 8,
              background: canSubmit ? "var(--accent)" : "var(--accent-glow)",
              border: canSubmit ? "1px solid var(--accent)" : "1px solid var(--border)",
              cursor: canSubmit ? "pointer" : "not-allowed",
              transition: "background 200ms var(--ease), border-color 200ms var(--ease)",
            }}
            onMouseEnter={(e) => {
              if (canSubmit) e.currentTarget.style.background = "var(--accent-hover)";
            }}
            onMouseLeave={(e) => {
              if (canSubmit) e.currentTarget.style.background = "var(--accent)";
            }}
            aria-label="Submit"
          >
            {loading ? (
              <Loader2
                size={14}
                className="animate-spin"
                style={{ color: canSubmit ? "var(--accent-on)" : "var(--text-muted)" }}
              />
            ) : (
              <ArrowUp
                size={14}
                strokeWidth={2}
                style={{ color: canSubmit ? "var(--accent-on)" : "var(--text-muted)" }}
              />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
