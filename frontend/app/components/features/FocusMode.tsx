"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X } from "lucide-react";
import type { Action } from "@/app/lib/types";

interface FocusModeProps {
  actions: Action[];
  onClose: () => void;
  onComplete: (completedActions: Action[]) => void;
}

export default function FocusMode({ actions, onClose, onComplete }: FocusModeProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [completed, setCompleted] = useState<Set<string>>(new Set());
  const [celebrating, setCelebrating] = useState(false);

  const current = actions[currentIndex];
  const progressPct = Math.round((completed.size / actions.length) * 100);

  const markDone = useCallback(() => {
    setCelebrating(true);
    setTimeout(() => {
      setCelebrating(false);
      const newCompleted = new Set(completed);
      newCompleted.add(current.id);
      setCompleted(newCompleted);

      if (newCompleted.size === actions.length) {
        setTimeout(() => {
          onComplete(
            actions.map((a) => ({
              ...a,
              completed: true,
              completedAt: new Date(),
            }))
          );
        }, 600);
      } else {
        const nextIdx = actions.findIndex(
          (a, i) => i > currentIndex && !newCompleted.has(a.id)
        );
        if (nextIdx !== -1) setCurrentIndex(nextIdx);
      }
    }, 700);
  }, [actions, completed, current.id, currentIndex, onComplete]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.28 }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 60,
        display: "flex",
        flexDirection: "column",
        background: "var(--bg-base)",
      }}
    >
      <div style={{ height: 3, width: "100%", background: "var(--progress-track)" }}>
        <motion.div
          style={{ height: "100%", background: "var(--accent)" }}
          animate={{ width: `${progressPct}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 24px",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <span style={{ fontSize: 13, color: "var(--text-muted)" }}>
          Step {Math.min(currentIndex + 1, actions.length)} of {actions.length}
        </span>
        <button
          type="button"
          onClick={onClose}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "6px 12px",
            borderRadius: 8,
            border: "1px solid var(--border)",
            background: "transparent",
            color: "var(--text-muted)",
            fontSize: 13,
            cursor: "pointer",
          }}
        >
          <X size={14} />
          Exit
        </button>
      </div>

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "32px 24px",
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.28 }}
            style={{ width: "100%", maxWidth: 480, textAlign: "center" }}
          >
            <h2
              className="font-heading"
              style={{
                fontSize: 32,
                color: "var(--text-primary)",
                marginBottom: 32,
                letterSpacing: "-0.034em",
              }}
            >
              Focus Mode
            </h2>

            <div
              style={{
                position: "relative",
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-card)",
                padding: "36px 32px 32px",
                boxShadow: "var(--shadow-md)",
              }}
            >
              <AnimatePresence>
                {celebrating && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    style={{
                      position: "absolute",
                      inset: 0,
                      borderRadius: "var(--radius-card)",
                      background: "var(--success-dim)",
                      pointerEvents: "none",
                    }}
                  />
                )}
              </AnimatePresence>

              <p
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--accent)",
                  marginBottom: 20,
                }}
              >
                Current Step
              </p>

              <p
                className="font-heading"
                style={{
                  fontSize: 22,
                  lineHeight: 1.35,
                  color: "var(--text-primary)",
                  marginBottom: 24,
                  letterSpacing: "-0.02em",
                }}
              >
                {current.description}
              </p>

              <p
                style={{
                  fontSize: 15,
                  lineHeight: 1.65,
                  color: "var(--text-secondary)",
                  marginBottom: 28,
                }}
              >
                Only do this one thing.
                <br />
                Ignore the rest for now.
              </p>

              <button
                type="button"
                onClick={markDone}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "12px 28px",
                  borderRadius: 12,
                  border: "none",
                  background: "var(--accent)",
                  color: "var(--accent-on)",
                  fontSize: 15,
                  fontWeight: 500,
                  cursor: "pointer",
                  transition: "background 200ms var(--ease)",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "var(--accent-hover)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "var(--accent)")}
              >
                <Check size={16} strokeWidth={2.5} />
                Done
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div style={{ display: "flex", justifyContent: "center", gap: 6, paddingBottom: 32 }}>
        {actions.map((action, i) => (
          <div
            key={action.id}
            style={{
              width: i === currentIndex ? 20 : 6,
              height: 6,
              borderRadius: 99,
              background: completed.has(action.id)
                ? "var(--success)"
                : i === currentIndex
                ? "var(--accent)"
                : "var(--progress-track)",
              transition: "all 300ms ease",
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}
