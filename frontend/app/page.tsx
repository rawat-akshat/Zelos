"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AppShell from "./components/layout/AppShell";
import TaskInput from "./components/features/TaskInput";
import TaskBreakdown from "./components/features/TaskBreakdown";
import LearnMode from "./components/features/LearnMode";
import FocusMode from "./components/features/FocusMode";
import AuthModal from "./components/features/AuthModal";
import CenterHero from "./components/features/CenterHero";
import EditorialAccents from "./components/features/EditorialAccents";
import UserBubble from "./components/features/UserBubble";
import SuggestionCards from "./components/features/SuggestionCards";
import LoadingSteps from "./components/features/LoadingSteps";
import { TaskBreakdownSkeleton } from "./components/ui/Skeleton";
import { generateMockResponse } from "./lib/mock-ai";
import type { AIResponse, TaskResponse, LearnResponse, Action } from "./lib/types";

type CenterState = "home" | "loading" | "result";

export default function HomePage() {
  const [centerState, setCenterState] = useState<CenterState>("home");
  const [inFocusMode, setInFocusMode] = useState(false);
  const [promptText, setPromptText] = useState("");
  const [response, setResponse] = useState<AIResponse | null>(null);
  const [focusActions, setFocusActions] = useState<Action[]>([]);
  const [showAuth, setShowAuth] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const hasRespondedOnce = useRef(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (centerState !== "home") {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [centerState, response]);

  const handleSubmit = useCallback(async (text: string) => {
    setPromptText(text);
    setCenterState("loading");
    setLoadingStep(0);

    const stepInterval = setInterval(() => {
      setLoadingStep((s) => Math.min(s + 1, 2));
    }, 600);

    try {
      const result = await generateMockResponse(text);
      clearInterval(stepInterval);
      setResponse(result);
      setCenterState("result");

      if (!hasRespondedOnce.current) {
        hasRespondedOnce.current = true;
        setTimeout(() => setShowAuth(true), 2200);
      }
    } catch {
      clearInterval(stepInterval);
      setCenterState("home");
    }
  }, []);

  const handleNewTask = useCallback(() => {
    setCenterState("home");
    setResponse(null);
    setPromptText("");
  }, []);

  return (
    <AppShell>
      {inFocusMode && (
        <FocusMode
          actions={focusActions}
          onClose={() => setInFocusMode(false)}
          onComplete={() => { setInFocusMode(false); handleNewTask(); }}
        />
      )}

      <AuthModal open={showAuth} onClose={() => setShowAuth(false)} />

      <div style={{ display: "flex", flexDirection: "column", height: "100vh", position: "relative" }}>

        <EditorialAccents />

        {/* Always-visible hero */}
        <CenterHero />

        {/* Scrollable chat / suggestions area */}
        <div style={{ flex: 1, overflowY: "auto", padding: "12px 56px 0", position: "relative", zIndex: 1 }}>
          <div style={{ maxWidth: 600, margin: "0 auto", width: "100%" }}>
            <AnimatePresence mode="wait">

              {centerState === "home" && (
                <motion.div
                  key="home"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.22 }}
                >
                  <SuggestionCards onSelect={handleSubmit} />
                </motion.div>
              )}

              {centerState === "loading" && (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.18 }}
                  style={{ display: "flex", flexDirection: "column", gap: 20 }}
                >
                  <UserBubble text={promptText} />
                  <LoadingSteps activeStep={loadingStep} />
                  <TaskBreakdownSkeleton />
                </motion.div>
              )}

              {centerState === "result" && response && (
                <motion.div
                  key="result"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.18 }}
                  style={{ display: "flex", flexDirection: "column", gap: 28, paddingBottom: 32 }}
                >
                  <UserBubble text={promptText} />

                  {response.mode === "task" && (
                    <TaskBreakdown
                      response={response as TaskResponse}
                      onStartFocus={(actions) => { setFocusActions(actions); setInFocusMode(true); }}
                      onRegenerate={() => handleSubmit(promptText)}
                    />
                  )}
                  {response.mode === "learn" && (
                    <LearnMode
                      response={response as LearnResponse}
                      onFollowUp={(q) => handleSubmit(q)}
                    />
                  )}

                  <div style={{ textAlign: "center" }}>
                    <button
                      onClick={handleNewTask}
                      style={{ fontSize: 12, color: "var(--text-muted)", background: "none", border: "none", cursor: "pointer", padding: "4px 8px", transition: "color 180ms" }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
                    >
                      ← Start a new task
                    </button>
                  </div>

                  <div ref={bottomRef} />
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </div>

        {/* Pinned input */}
        <div
          style={{
            flexShrink: 0,
            padding: "12px 56px 20px",
            borderTop: "1px solid var(--border)",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div style={{ maxWidth: 600, margin: "0 auto", width: "100%" }}>
            <TaskInput onSubmit={handleSubmit} />
          </div>
        </div>

      </div>
    </AppShell>
  );
}
