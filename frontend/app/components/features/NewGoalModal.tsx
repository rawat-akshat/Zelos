"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { GOAL_HELPER_CHIPS } from "../../lib/mock-data";
import { formatApiError } from "../../lib/api-errors";

interface NewGoalModalProps {
  open: boolean;
  onClose: () => void;
  onCreate: (title: string) => void | Promise<void>;
}

export default function NewGoalModal({ open, onClose, onCreate }: NewGoalModalProps) {
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 60,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 16px",
            background: "var(--bg-overlay)",
            backdropFilter: "blur(8px)",
          }}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 8 }}
            transition={{ duration: 0.22 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "100%",
              maxWidth: 480,
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-card)",
              padding: "28px 28px 24px",
              boxShadow: "var(--shadow-lg)",
              position: "relative",
            }}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              style={{
                position: "absolute",
                top: 16,
                right: 16,
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "var(--text-muted)",
              }}
            >
              <X size={18} />
            </button>

            <h2
              className="font-heading"
              style={{ fontSize: 24, color: "var(--text-primary)", marginBottom: 8, letterSpacing: "-0.02em" }}
            >
              Start a Goal
            </h2>
            <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 20, lineHeight: 1.55 }}>
              What are you trying to make progress on?
            </p>

            <GoalSetupForm onCreate={onCreate} onClose={onClose} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function GoalSetupForm({
  onCreate,
  onClose,
}: {
  onCreate: (title: string) => void | Promise<void>;
  onClose: () => void;
}) {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const title = String(fd.get("goal") ?? "").trim();
    if (title.length < 3) return;

    setSubmitting(true);
    setError(null);
    try {
      await onCreate(title);
      onClose();
    } catch (err) {
      setError(formatApiError(err));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error ? (
        <p
          role="alert"
          style={{
            fontSize: 13,
            color: "var(--text-primary)",
            background: "rgba(180, 60, 60, 0.08)",
            border: "1px solid rgba(180, 60, 60, 0.35)",
            borderRadius: 10,
            padding: "10px 12px",
            marginBottom: 12,
            lineHeight: 1.5,
          }}
        >
          {error}
        </p>
      ) : null}
      <textarea
        name="goal"
        rows={3}
        placeholder="Example: Build my startup MVP, switch jobs, improve fitness, write consistently…"
        required
        minLength={3}
        style={{
          width: "100%",
          padding: "14px 16px",
          borderRadius: 10,
          border: "1px solid var(--border)",
          background: "var(--bg-input)",
          fontSize: 14,
          lineHeight: 1.55,
          color: "var(--text-primary)",
          resize: "none",
          outline: "none",
          fontFamily: "var(--font-body)",
          marginBottom: 12,
        }}
      />
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20 }}>
        {GOAL_HELPER_CHIPS.map((chip) => (
          <ChipButton key={chip} label={chip} />
        ))}
      </div>
      <button
        type="submit"
        disabled={submitting}
        style={{
          width: "100%",
          padding: "12px 20px",
          borderRadius: 10,
          background: submitting ? "var(--bg-elevated)" : "var(--accent)",
          border: "1px solid var(--border)",
          color: submitting ? "var(--text-muted)" : "var(--accent-on)",
          fontSize: 14,
          fontWeight: 500,
          cursor: submitting ? "not-allowed" : "pointer",
          fontFamily: "var(--font-body)",
        }}
      >
        {submitting ? "Opening workspace…" : "Open Workspace"}
      </button>
    </form>
  );
}

function ChipButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      onClick={(e) => {
        const form = (e.currentTarget.closest("form") as HTMLFormElement | null);
        const textarea = form?.querySelector("textarea");
        if (textarea) {
          const current = textarea.value.trim();
          textarea.value = current ? `${current} (${label})` : label;
          textarea.focus();
        }
      }}
      style={{
        padding: "6px 12px",
        borderRadius: 20,
        fontSize: 12,
        background: "var(--bg-elevated)",
        border: "1px solid var(--border)",
        color: "var(--text-secondary)",
        cursor: "pointer",
        fontFamily: "var(--font-body)",
      }}
    >
      {label}
    </button>
  );
}
