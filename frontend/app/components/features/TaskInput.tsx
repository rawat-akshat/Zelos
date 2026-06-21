"use client";

import { useState, useRef, useEffect, useLayoutEffect, useCallback } from "react";
import { ArrowUp, Loader2, Paperclip, Mic } from "lucide-react";

const PLACEHOLDERS = [
  "Share what you're thinking about, avoiding, or trying to decide…",
  "What's on your mind about this goal?",
  "Describe the loop you're stuck in…",
  "What feels uncertain right now?",
  "What would progress look like today?",
];

const MIN_ROWS = 2;
const MAX_ROWS = 5;
const LINE_HEIGHT = 24; // 15px × 1.6
const MIN_TEXT_HEIGHT = LINE_HEIGHT * MIN_ROWS;
const MAX_TEXT_HEIGHT = LINE_HEIGHT * MAX_ROWS;

interface TaskInputProps {
  onSubmit: (text: string) => void;
  loading?: boolean;
  value?: string;
  onValueChange?: (value: string) => void;
  focusKey?: number;
  prominent?: boolean;
}

const textareaStyle: React.CSSProperties = {
  display: "block",
  width: "100%",
  resize: "none",
  background: "transparent",
  outline: "none",
  padding: "0 8px 0 0",
  fontSize: 15,
  lineHeight: 1.6,
  color: "var(--text-primary)",
  caretColor: "var(--accent)",
  fontFamily: "var(--font-body)",
  border: "none",
  scrollPaddingTop: 4,
  scrollPaddingBottom: 4,
};

export default function TaskInput({
  onSubmit,
  loading = false,
  value: controlledValue,
  onValueChange,
  focusKey = 0,
  prominent = false,
}: TaskInputProps) {
  const [internalValue, setInternalValue] = useState("");
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;
  const setValue = (next: string) => {
    if (isControlled) onValueChange?.(next);
    else setInternalValue(next);
  };
  const [focused, setFocused] = useState(false);
  const [placeholderIdx, setPlaceholderIdx] = useState(0);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const minTextHeight = prominent ? LINE_HEIGHT * 3 : MIN_TEXT_HEIGHT;
  const maxTextHeight = prominent ? LINE_HEIGHT * 6 : MAX_TEXT_HEIGHT;

  const syncHeight = useCallback(() => {
    const el = textareaRef.current;
    if (!el) return;

    el.style.height = "0px";
    const scrollHeight = el.scrollHeight;
    const nextHeight = Math.min(Math.max(scrollHeight, minTextHeight), maxTextHeight);
    el.style.height = `${nextHeight}px`;
    el.style.overflowY = scrollHeight > maxTextHeight ? "auto" : "hidden";
  }, [minTextHeight, maxTextHeight]);

  useLayoutEffect(() => {
    syncHeight();
  }, [value, syncHeight]);

  useEffect(() => {
    if (focusKey > 0) textareaRef.current?.focus();
  }, [focusKey]);

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
        borderRadius: "var(--radius-card)",
        background: prominent ? "var(--bg-card)" : "var(--bg-input)",
        border: focused
          ? prominent
            ? "1.5px solid var(--accent)"
            : "1px solid var(--border-focus)"
          : tooShort
          ? "1px solid var(--error)"
          : prominent
          ? "1.5px solid var(--border-accent)"
          : "1px solid var(--border)",
        boxShadow: focused
          ? prominent
            ? "0 0 0 3px var(--accent-glow-md), var(--shadow-md)"
            : "var(--input-shadow-focus)"
          : prominent
          ? "var(--shadow-md)"
          : "var(--input-shadow)",
        transition: "border-color 200ms var(--ease), box-shadow 200ms var(--ease)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          padding: prominent ? "18px 20px 10px 22px" : "14px 14px 8px 18px",
          flexShrink: 0,
        }}
      >
        <textarea
          ref={textareaRef}
          className="task-input-textarea"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onKeyDown={handleKeyDown}
          placeholder={PLACEHOLDERS[placeholderIdx]}
          rows={prominent ? 3 : MIN_ROWS}
          disabled={loading}
          style={{
            ...textareaStyle,
            minHeight: minTextHeight,
            maxHeight: maxTextHeight,
            fontSize: prominent ? 16 : 15,
            opacity: loading ? 0.6 : 1,
          }}
          aria-label="Share what you're working through"
        />
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 12px 12px",
          flexShrink: 0,
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
