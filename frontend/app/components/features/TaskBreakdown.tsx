"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RotateCcw, Play, Clock, Check } from "lucide-react";
import type { Action } from "../../lib/types";

interface TaskBreakdownProps {
  explanation: string;
  actions?: Action[];
  suggestedQuestions?: string[];
  onStartFocus: (actions: Action[]) => void;
  onTryAnotherApproach: () => void;
  onFollowUp?: (question: string) => void;
}

export default function TaskBreakdown({
  explanation,
  actions: initialActions = [],
  suggestedQuestions = [],
  onStartFocus,
  onTryAnotherApproach,
  onFollowUp,
}: TaskBreakdownProps) {
  const [actions, setActions] = useState<Action[]>(initialActions);
  const [showXP, setShowXP] = useState<Record<string, boolean>>({});
  const [expandedSteps, setExpandedSteps] = useState<Set<string>>(new Set());

  const hasActions = actions.length > 0;
  const hasSuggestedQuestions = suggestedQuestions.length > 0;
  const completedCount = actions.filter((a) => a.completed).length;
  const totalMinutes = actions.reduce((s, a) => s + a.estimatedMinutes, 0);
  const progressPct = hasActions ? Math.round((completedCount / actions.length) * 100) : 0;

  const toggleAction = useCallback((id: string) => {
    setActions((prev) =>
      prev.map((a) =>
        a.id === id ? { ...a, completed: !a.completed, completedAt: new Date() } : a
      )
    );
    setShowXP((prev) => ({ ...prev, [id]: true }));
    setTimeout(() => setShowXP((prev) => ({ ...prev, [id]: false })), 1000);
  }, []);

  const breakDownStep = useCallback((id: string) => {
    setExpandedSteps((prev) => {
      if (prev.has(id)) return prev;
      const next = new Set(prev);
      next.add(id);
      return next;
    });
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
          {explanation}
        </p>
      </div>

      {hasActions && completedCount > 0 && (
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

      {hasActions && (
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
            Steps · {totalMinutes} min total
          </p>
          <AnimatePresence initial={false}>
            {actions.map((action, idx) => (
              <ActionItem
                key={action.id}
                action={action}
                index={idx}
                showXP={showXP[action.id]}
                isExpanded={expandedSteps.has(action.id)}
                onToggle={() => toggleAction(action.id)}
                onBreakDown={() => breakDownStep(action.id)}
              />
            ))}
          </AnimatePresence>
        </div>
      )}

      {hasSuggestedQuestions && (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <p
            style={{
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--text-muted)",
              margin: 0,
            }}
          >
            Suggested next questions
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {suggestedQuestions.map((question) => (
              <button
                key={question}
                type="button"
                onClick={() => onFollowUp?.(question)}
                disabled={!onFollowUp}
                style={{
                  display: "block",
                  width: "100%",
                  textAlign: "left",
                  padding: "11px 14px",
                  borderRadius: "var(--radius-md)",
                  background: "var(--bg-card)",
                  border: "1px solid var(--border)",
                  color: "var(--text-secondary)",
                  fontSize: 14,
                  lineHeight: 1.45,
                  cursor: onFollowUp ? "pointer" : "default",
                  transition: "all 200ms var(--ease)",
                  fontFamily: "var(--font-body)",
                }}
                onMouseEnter={(e) => {
                  if (!onFollowUp) return;
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
                {question}
              </button>
            ))}
          </div>
        </div>
      )}

      <div style={{ display: "flex", alignItems: "center", gap: 10, paddingTop: hasActions ? 6 : 0 }}>
        {hasActions && (
          <button
            type="button"
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
        )}

        <button
          type="button"
          onClick={onTryAnotherApproach}
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
            marginLeft: hasActions ? 0 : 0,
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
          Try Another Approach
        </button>
      </div>
    </motion.div>
  );
}

export function ActionItem({
  action,
  index,
  showXP,
  isExpanded,
  onToggle,
  onBreakDown,
}: {
  action: Action;
  index: number;
  showXP: boolean;
  isExpanded: boolean;
  onToggle: () => void;
  onBreakDown: () => void;
}) {
  const hasSubSteps = Boolean(action.subSteps?.length);
  const canBreakDown = hasSubSteps && !isExpanded;

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.22, ease: "easeOut" }}
      style={{ borderBottom: "1px solid var(--border)" }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "14px 4px",
          position: "relative",
        }}
      >
        <button
          type="button"
          onClick={onToggle}
          role="checkbox"
          aria-checked={action.completed}
          aria-label={action.description}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            flex: 1,
            minWidth: 0,
            background: "transparent",
            border: "none",
            cursor: "pointer",
            textAlign: "left",
            padding: 0,
          }}
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
              textDecorationLine: action.completed ? "line-through" : "none",
              textDecorationColor: action.completed ? "var(--success-dim)" : "transparent",
              transition: "all 150ms",
            }}
          >
            <span style={{ color: "var(--text-muted)", marginRight: 6 }}>{index + 1}.</span>
            {action.description}
          </span>
        </button>

        {canBreakDown && (
          <button
            type="button"
            onClick={onBreakDown}
            style={{
              flexShrink: 0,
              padding: "5px 10px",
              borderRadius: 8,
              border: "1px solid var(--border)",
              background: "var(--bg-card)",
              color: "var(--text-muted)",
              fontSize: 11,
              fontWeight: 500,
              cursor: "pointer",
              transition: "all 180ms var(--ease)",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--border-accent)";
              e.currentTarget.style.color = "var(--text-secondary)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--border)";
              e.currentTarget.style.color = "var(--text-muted)";
            }}
          >
            Break It Down
          </button>
        )}

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
      </div>

      <AnimatePresence>
        {isExpanded && action.subSteps && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            style={{ overflow: "hidden", paddingLeft: 32, paddingBottom: 12 }}
          >
            <ul
              style={{
                listStyle: "none",
                margin: 0,
                padding: 0,
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}
            >
              {action.subSteps.map((step) => (
                <li
                  key={step}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 8,
                    fontSize: 13,
                    lineHeight: 1.45,
                    color: "var(--text-secondary)",
                  }}
                >
                  <Check
                    size={12}
                    style={{ color: "var(--accent)", flexShrink: 0, marginTop: 2 }}
                    strokeWidth={2}
                  />
                  {step}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
