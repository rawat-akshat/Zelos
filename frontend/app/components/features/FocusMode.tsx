"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, Play, Pause, Timer, ChevronRight } from "lucide-react";
import type { Action } from "@/app/lib/types";

interface FocusModeProps {
  actions: Action[];
  onClose: () => void;
  onComplete: (completedActions: Action[]) => void;
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

// Isolated timer component — remounts on each action via key prop
function ActionTimer({ minutes }: { minutes: number }) {
  const totalSeconds = minutes * 60;
  const [secondsLeft, setSecondsLeft] = useState(totalSeconds);
  const [running, setRunning] = useState(false);
  const [started, setStarted] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setSecondsLeft((s) => {
          if (s <= 1) {
            clearInterval(intervalRef.current!);
            setRunning(false);
            return 0;
          }
          return s - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running]);

  if (!started) {
    return (
      <button
        onClick={() => { setStarted(true); setRunning(true); }}
        className="flex items-center gap-2 mx-auto px-5 py-2.5 rounded-[10px] text-sm font-medium transition-all duration-150"
        style={{
          background: "rgba(155,163,188,0.1)",
          color: "#9BA3BC",
          border: "1px solid rgba(155,163,188,0.2)",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(155,163,188,0.15)")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(155,163,188,0.1)")}
      >
        <Timer size={14} />
        Start {minutes}min timer
      </button>
    );
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <span
        className="text-5xl font-bold tabular-nums"
        style={{
          color: secondsLeft <= 30 ? "#C6A969" : "#9BA3BC",
          letterSpacing: "0.04em",
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {formatTime(secondsLeft)}
      </span>
      <button
        onClick={() => setRunning((r) => !r)}
        className="flex items-center gap-1.5 text-xs transition-colors"
        style={{ color: "#555" }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "#7A7A7A")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "#555")}
      >
        {running ? <Pause size={11} /> : <Play size={11} />}
        {running ? "Pause" : "Resume"}
      </button>
    </div>
  );
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
    <AnimatePresence>
      <motion.div
        key="focus-mode"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-[60] flex flex-col"
        style={{ background: "#0A0A0A" }}
      >
        {/* Progress bar */}
        <div className="h-0.5 w-full" style={{ background: "rgba(255,255,255,0.06)" }}>
          <motion.div
            className="h-full"
            style={{ background: "#C6A969" }}
            animate={{ width: `${progressPct}%` }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <span className="text-xs font-medium" style={{ color: "#555" }}>
              Action {Math.min(currentIndex + 1, actions.length)} of {actions.length}
            </span>
            <span className="text-xs" style={{ color: "#3A3A3A" }}>·</span>
            <span className="text-xs" style={{ color: "#555" }}>
              {completed.size} completed
            </span>
          </div>
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-[8px] transition-colors"
            style={{ color: "#555" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#7A7A7A")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#555")}
          >
            <X size={13} />
            Exit
          </button>
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col items-center justify-center px-6 max-w-xl mx-auto w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="w-full"
            >
              <div
                className="relative rounded-[20px] p-8 mb-6 text-center"
                style={{
                  background: "#1A1A1A",
                  border: "1px solid rgba(198,169,105,0.25)",
                  boxShadow:
                    "0 0 40px rgba(198,169,105,0.08), 0 8px 32px rgba(0,0,0,0.4)",
                }}
              >
                <AnimatePresence>
                  {celebrating && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      className="absolute inset-0 rounded-[20px] pointer-events-none"
                      style={{ background: "rgba(74,140,111,0.12)" }}
                    />
                  )}
                </AnimatePresence>

                <p
                  className="text-[10px] font-semibold uppercase tracking-[0.14em] mb-4"
                  style={{ color: "#555" }}
                >
                  Current Step
                </p>

                <p
                  className="text-xl font-semibold leading-snug mb-6"
                  style={{ color: "#FFFFFF" }}
                >
                  {current.description}
                </p>

                {/* Timer — keyed to action so it resets automatically */}
                <div className="mb-6">
                  <ActionTimer
                    key={current.id}
                    minutes={current.estimatedMinutes}
                  />
                </div>

                <button
                  onClick={markDone}
                  className="flex items-center gap-2 mx-auto px-7 py-3 rounded-[12px] text-sm font-semibold transition-all duration-150 active:scale-[0.98]"
                  style={{
                    background: "#C6A969",
                    color: "#0F0F0F",
                    boxShadow: "0 2px 16px rgba(198,169,105,0.3)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#D4AF37";
                    e.currentTarget.style.boxShadow =
                      "0 4px 20px rgba(198,169,105,0.4)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "#C6A969";
                    e.currentTarget.style.boxShadow =
                      "0 2px 16px rgba(198,169,105,0.3)";
                  }}
                >
                  <Check size={14} strokeWidth={2.5} />
                  Mark as Done
                </button>
              </div>
            </motion.div>
          </AnimatePresence>

          {currentIndex < actions.length - 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="w-full"
            >
              <div
                className="flex items-center gap-3 px-5 py-3.5 rounded-[14px] opacity-35"
                style={{
                  background: "#151515",
                  border: "1px solid rgba(255,255,255,0.04)",
                }}
              >
                <ChevronRight size={14} style={{ color: "#555" }} />
                <span className="text-sm" style={{ color: "#7A7A7A" }}>
                  Next: {actions[currentIndex + 1]?.description}
                </span>
              </div>
            </motion.div>
          )}
        </div>

        {/* Dots */}
        <div className="flex items-center justify-center gap-2 pb-8">
          {actions.map((action, i) => (
            <div
              key={action.id}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === currentIndex ? 20 : 6,
                height: 6,
                background: completed.has(action.id)
                  ? "#4A8C6F"
                  : i === currentIndex
                  ? "#C6A969"
                  : "rgba(255,255,255,0.1)",
              }}
            />
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
