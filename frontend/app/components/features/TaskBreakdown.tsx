"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RotateCcw, Play, Clock, Check, Layers, AlignLeft, Zap } from "lucide-react";
import type { TaskResponse, Action } from "@/app/lib/types";

interface TaskBreakdownProps {
  response: TaskResponse;
  onStartFocus: (actions: Action[]) => void;
  onRegenerate: () => void;
}

export default function TaskBreakdown({
  response,
  onStartFocus,
  onRegenerate,
}: TaskBreakdownProps) {
  const [actions, setActions] = useState<Action[]>(response.actions);
  const [showXP, setShowXP] = useState<Record<string, boolean>>({});

  const completedCount = actions.filter((a) => a.completed).length;
  const totalMinutes = actions.reduce((s, a) => s + a.estimatedMinutes, 0);
  const progressPct = Math.round((completedCount / actions.length) * 100);

  const toggleAction = useCallback((id: string) => {
    setActions((prev) =>
      prev.map((a) =>
        a.id === id ? { ...a, completed: !a.completed, completedAt: new Date() } : a
      )
    );
    setShowXP((prev) => ({ ...prev, [id]: true }));
    setTimeout(() => setShowXP((prev) => ({ ...prev, [id]: false })), 1000);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0, 0, 0.2, 1] }}
      style={{ display: "flex", flexDirection: "column", gap: 24 }}
    >
      <div
        style={{
          borderLeft: "2px solid var(--border-accent)",
          paddingLeft: 18,
          paddingTop: 4,
          paddingBottom: 4,
        }}
      >
        <p style={{ fontSize: 15, color: "var(--text-secondary)", lineHeight: 1.7, margin: 0 }}>
          {response.explanation}
        </p>
      </div>

      {completedCount > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{ display: "flex", alignItems: "center", gap: 12 }}
        >
          <div
            style={{
              flex: 1,
              height: 4,
              borderRadius: 99,
              background: "var(--progress-track)",
              overflow: "hidden",
            }}
          >
            <motion.div
              style={{
                height: "100%",
                borderRadius: 99,
                background: "var(--success)",
              }}
              initial={{ width: 0 }}
              animate={{ width: `${progressPct}%` }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          </div>
          <span style={{ fontSize: 11, color: "var(--success)", flexShrink: 0 }}>
            {completedCount}/{actions.length}
          </span>
        </motion.div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <p
          style={{
            fontSize: 10,
            fontWeight: 600,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--text-muted)",
            marginBottom: 12,
          }}
        >
          Micro-actions · {totalMinutes} min total
        </p>
        <AnimatePresence initial={false}>
          {actions.map((action, idx) => (
            <ActionItem
              key={action.id}
              action={action}
              index={idx}
              showXP={showXP[action.id]}
              onToggle={() => toggleAction(action.id)}
            />
          ))}
        </AnimatePresence>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 10, paddingTop: 6 }}>
        <button
          onClick={() => onStartFocus(actions)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "11px 20px",
            borderRadius: 12,
            background: "var(--accent)",
            color: "var(--accent-on)",
            fontSize: 14,
            fontWeight: 600,
            border: "none",
            cursor: "pointer",
            transition: "all 200ms var(--ease)",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "var(--accent-hover)")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "var(--accent)")}
        >
          <Play size={12} strokeWidth={2.5} fill="currentColor" />
          Focus
        </button>

        <OptionsMenu />

        <button
          onClick={onRegenerate}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "11px 16px",
            borderRadius: 12,
            background: "transparent",
            color: "var(--text-muted)",
            fontSize: 13,
            border: "1px solid var(--border)",
            cursor: "pointer",
            transition: "all 180ms var(--ease)",
            marginLeft: "auto",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "var(--text-secondary)";
            e.currentTarget.style.borderColor = "var(--border-accent)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "var(--text-muted)";
            e.currentTarget.style.borderColor = "var(--border)";
          }}
        >
          <RotateCcw size={11} />
          Regenerate
        </button>
      </div>
    </motion.div>
  );
}

export function ActionItem({
  action,
  index,
  showXP,
  onToggle,
}: {
  action: Action;
  index: number;
  showXP: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.22, ease: "easeOut" }}
    >
      <button
        onClick={onToggle}
        role="checkbox"
        aria-checked={action.completed}
        aria-label={action.description}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          gap: 14,
          padding: "14px 4px",
          background: "transparent",
          border: "none",
          borderBottom: "1px solid var(--border)",
          cursor: "pointer",
          textAlign: "left",
          position: "relative",
          transition: "opacity 180ms",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
      >
        <div
          style={{
            flexShrink: 0,
            width: 20,
            height: 20,
            borderRadius: 6,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: action.completed ? "var(--success)" : "transparent",
            border: `1.5px solid ${action.completed ? "var(--success)" : "var(--border)"}`,
            transition: "all 200ms",
          }}
        >
          {action.completed && <Check size={11} color="white" strokeWidth={2.5} />}
        </div>

        <span
          style={{
            flex: 1,
            fontSize: 14,
            fontWeight: 500,
            lineHeight: 1.45,
            color: action.completed ? "var(--success)" : "var(--text-primary)",
            textDecoration: action.completed ? "line-through" : "none",
            textDecorationColor: "var(--success-dim)",
            transition: "all 150ms",
          }}
        >
          {action.description}
        </span>

        <div style={{ display: "flex", alignItems: "center", gap: 4, flexShrink: 0 }}>
          <Clock size={10} style={{ color: "var(--text-muted)" }} />
          <span style={{ fontSize: 11, color: "var(--text-muted)" }}>
            {action.estimatedMinutes} min
          </span>
        </div>

        {showXP && (
          <motion.span
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: -8 }}
            exit={{ opacity: 0 }}
            style={{
              position: "absolute",
              right: 36,
              top: 4,
              fontSize: 11,
              fontWeight: 600,
              color: "var(--accent)",
            }}
          >
            +5 XP
          </motion.span>
        )}
      </button>
    </motion.div>
  );
}

const OPTIONS = [
  { label: "Smaller Steps", sub: "Split into tinier actions", icon: Layers },
  { label: "More Detail", sub: "Add context and examples", icon: AlignLeft },
  { label: "Faster Version", sub: "Quick 2-minute version", icon: Zap },
];

export function OptionsMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ position: "relative" }}>
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          padding: "11px 16px",
          borderRadius: 12,
          background: open ? "var(--nav-hover-bg)" : "transparent",
          color: open ? "var(--text-secondary)" : "var(--text-muted)",
          fontSize: 13,
          border: "1px solid var(--border)",
          cursor: "pointer",
          transition: "all 180ms var(--ease)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = "var(--text-secondary)";
          e.currentTarget.style.background = "var(--nav-hover-bg)";
        }}
        onMouseLeave={(e) => {
          if (!open) {
            e.currentTarget.style.color = "var(--text-muted)";
            e.currentTarget.style.background = "transparent";
          }
        }}
        aria-label="Adjust response"
      >
        Adjust
        <svg
          width="11"
          height="11"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            transform: open ? "rotate(180deg)" : "none",
            transition: "transform 180ms",
          }}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <>
            <div
              style={{ position: "fixed", inset: 0, zIndex: 9 }}
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -6, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -4, scale: 0.97 }}
              transition={{ duration: 0.14 }}
              style={{
                position: "absolute",
                bottom: "calc(100% + 8px)",
                left: 0,
                zIndex: 10,
                borderRadius: 14,
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                boxShadow: "var(--shadow-lg)",
                minWidth: 220,
                overflow: "hidden",
                padding: "8px",
              }}
            >
              <p
                style={{
                  fontSize: 10,
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--text-muted)",
                  padding: "6px 10px 4px",
                }}
              >
                Adjust response
              </p>
              {OPTIONS.map(({ label, sub, icon: Icon }) => (
                <button
                  key={label}
                  onClick={() => setOpen(false)}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "10px",
                    borderRadius: 10,
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "background 120ms",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "var(--nav-hover-bg)")
                  }
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                >
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 8,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "var(--accent-glow)",
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={14} style={{ color: "var(--text-muted)" }} />
                  </div>
                  <div>
                    <p
                      style={{
                        fontSize: 13,
                        color: "var(--text-primary)",
                        fontWeight: 500,
                        margin: 0,
                      }}
                    >
                      {label}
                    </p>
                    <p style={{ fontSize: 11, color: "var(--text-muted)", margin: 0 }}>
                      {sub}
                    </p>
                  </div>
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
