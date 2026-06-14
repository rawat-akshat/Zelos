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
      style={{ display: "flex", flexDirection: "column", gap: 20 }}
    >
      {/* Explanation — left gold accent, no card background */}
      <div
        style={{
          borderLeft: "2px solid rgba(198,169,105,0.45)",
          paddingLeft: 16,
          paddingTop: 2,
          paddingBottom: 2,
        }}
      >
        <p style={{ fontSize: 14, color: "#B5B5B5", lineHeight: 1.65, margin: 0 }}>
          {response.explanation}
        </p>
      </div>

      {/* Progress bar — only when items are ticked */}
      {completedCount > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{ display: "flex", alignItems: "center", gap: 12 }}
        >
          <div
            style={{
              flex: 1,
              height: 3,
              borderRadius: 99,
              background: "rgba(255,255,255,0.06)",
              overflow: "hidden",
            }}
          >
            <motion.div
              style={{
                height: "100%",
                borderRadius: 99,
                background: "linear-gradient(90deg,#4A8C6F,#5FAD88)",
              }}
              initial={{ width: 0 }}
              animate={{ width: `${progressPct}%` }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          </div>
          <span style={{ fontSize: 11, color: "#4A8C6F", flexShrink: 0 }}>
            {completedCount}/{actions.length}
          </span>
        </motion.div>
      )}

      {/* Action list — clean rows, no card backgrounds */}
      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <p
          style={{
            fontSize: 10,
            fontWeight: 600,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#444",
            marginBottom: 10,
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

      {/* CTA row */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, paddingTop: 4 }}>
        <button
          onClick={() => onStartFocus(actions)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "10px 18px",
            borderRadius: 10,
            background: "#C6A969",
            color: "#0F0F0F",
            fontSize: 14,
            fontWeight: 600,
            border: "none",
            cursor: "pointer",
            transition: "all 150ms",
            boxShadow: "0 2px 12px rgba(198,169,105,0.25)",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#D4AF37")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#C6A969")}
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
            padding: "10px 14px",
            borderRadius: 10,
            background: "transparent",
            color: "#555",
            fontSize: 13,
            border: "1px solid rgba(255,255,255,0.06)",
            cursor: "pointer",
            transition: "all 150ms",
            marginLeft: "auto",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "#B5B5B5";
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "#555";
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
          }}
        >
          <RotateCcw size={11} />
          Regenerate
        </button>
      </div>
    </motion.div>
  );
}

// ── ActionItem ──────────────────────────────────────────────
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
          padding: "13px 4px",
          background: "transparent",
          border: "none",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
          cursor: "pointer",
          textAlign: "left",
          position: "relative",
          transition: "opacity 150ms",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
      >
        {/* Checkbox */}
        <div
          style={{
            flexShrink: 0,
            width: 20,
            height: 20,
            borderRadius: 6,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: action.completed ? "#4A8C6F" : "transparent",
            border: `1.5px solid ${action.completed ? "#4A8C6F" : "rgba(255,255,255,0.2)"}`,
            transition: "all 200ms",
          }}
        >
          {action.completed && <Check size={11} color="white" strokeWidth={2.5} />}
        </div>

        {/* Label */}
        <span
          style={{
            flex: 1,
            fontSize: 14,
            fontWeight: 500,
            lineHeight: 1.4,
            color: action.completed ? "#4A8C6F" : "#E0E0E0",
            textDecoration: action.completed ? "line-through" : "none",
            textDecorationColor: "rgba(74,140,111,0.4)",
            transition: "all 150ms",
          }}
        >
          {action.description}
        </span>

        {/* Time */}
        <div style={{ display: "flex", alignItems: "center", gap: 4, flexShrink: 0 }}>
          <Clock size={10} color="#444" />
          <span style={{ fontSize: 11, color: "#444" }}>{action.estimatedMinutes} min</span>
        </div>

        {/* XP float */}
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
              color: "#C6A969",
            }}
          >
            +5 XP
          </motion.span>
        )}
      </button>
    </motion.div>
  );
}

// ── OptionsMenu ─────────────────────────────────────────────
const OPTIONS = [
  { label: "Smaller Steps",  sub: "Split into tinier actions",  icon: Layers },
  { label: "More Detail",    sub: "Add context and examples",   icon: AlignLeft },
  { label: "Faster Version", sub: "Quick 2-minute version",     icon: Zap },
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
          padding: "10px 14px",
          borderRadius: 10,
          background: open ? "rgba(255,255,255,0.05)" : "transparent",
          color: open ? "#B5B5B5" : "#7A7A7A",
          fontSize: 13,
          border: "1px solid rgba(255,255,255,0.08)",
          cursor: "pointer",
          transition: "all 150ms",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = "#B5B5B5";
          e.currentTarget.style.background = "rgba(255,255,255,0.05)";
        }}
        onMouseLeave={(e) => {
          if (!open) {
            e.currentTarget.style.color = "#7A7A7A";
            e.currentTarget.style.background = "transparent";
          }
        }}
        aria-label="Adjust response"
      >
        Adjust
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform 150ms" }}>
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <>
            {/* Click outside to close */}
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
                borderRadius: 12,
                background: "#222",
                border: "1px solid rgba(255,255,255,0.09)",
                boxShadow: "0 12px 32px rgba(0,0,0,0.5)",
                minWidth: 210,
                overflow: "hidden",
                padding: "6px",
              }}
            >
              <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#444", padding: "6px 10px 4px" }}>
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
                    padding: "9px 10px",
                    borderRadius: 8,
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "background 120ms",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.05)")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                >
                  <div style={{ width: 30, height: 30, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(255,255,255,0.04)", flexShrink: 0 }}>
                    <Icon size={14} color="#7A7A7A" />
                  </div>
                  <div>
                    <p style={{ fontSize: 13, color: "#E0E0E0", fontWeight: 500, margin: 0 }}>{label}</p>
                    <p style={{ fontSize: 11, color: "#555", margin: 0 }}>{sub}</p>
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
