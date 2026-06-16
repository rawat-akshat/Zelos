"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AppShell from "../components/layout/AppShell";
import TaskInput from "../components/features/TaskInput";
import TaskBreakdown from "../components/features/TaskBreakdown";
import FocusMode from "../components/features/FocusMode";
import AuthModal from "../components/features/AuthModal";
import CenterHero from "../components/features/CenterHero";
import UserBubble from "../components/features/UserBubble";
import SuggestionCards from "../components/features/SuggestionCards";
import LoadingSteps from "../components/features/LoadingSteps";
import { TaskBreakdownSkeleton } from "../components/ui/Skeleton";
import { generateMockResponse } from "../lib/mock-ai";
import { PROMPT_LOADING_VARIANT, SHOW_BREAKDOWN_SKELETON } from "../lib/loading-config";
import type { AIResponse, Action } from "../lib/types";

function getResponseContent(response: AIResponse) {
  if (response.mode === "task") {
    return {
      explanation: response.explanation,
      actions: response.actions,
      suggestedQuestions: response.suggestedQuestions ?? [],
    };
  }
  if (response.mode === "learn") {
    return {
      explanation: response.explanation,
      actions: response.actions ?? [],
      suggestedQuestions: response.suggestedQuestions ?? [],
    };
  }
  return {
    explanation: response.task.explanation,
    actions: response.task.actions,
    suggestedQuestions: response.task.suggestedQuestions ?? response.learn.suggestedQuestions ?? [],
  };
}

type CenterState = "home" | "loading" | "result";

export default function DashboardPage() {
  const [centerState, setCenterState] = useState<CenterState>("home");
  const [inFocusMode, setInFocusMode] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [inputFocusKey, setInputFocusKey] = useState(0);
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

  const handleSubmit = useCallback(async (text: string, options?: { alternative?: boolean }) => {
    setPromptText(text);
    setCenterState("loading");
    setLoadingStep(0);

    const stepInterval =
      PROMPT_LOADING_VARIANT === "steps"
        ? setInterval(() => {
            setLoadingStep((s) => Math.min(s + 1, 2));
          }, 600)
        : null;

    try {
      const result = await generateMockResponse(text, options);
      if (stepInterval) clearInterval(stepInterval);
      setResponse(result);
      setCenterState("result");

      if (!hasRespondedOnce.current) {
        hasRespondedOnce.current = true;
        setTimeout(() => setShowAuth(true), 2200);
      }
    } catch {
      if (stepInterval) clearInterval(stepInterval);
      setCenterState("home");
    }
  }, []);

  const handleSuggestionSelect = useCallback((text: string) => {
    setInputValue(text);
    setInputFocusKey((k) => k + 1);
  }, []);

  const handleNewTask = useCallback(() => {
    setCenterState("home");
    setResponse(null);
    setPromptText("");
    setInputValue("");
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

        <AnimatePresence mode="wait">
          {centerState === "home" && (
            <motion.div
              key="hero"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              style={{ flexShrink: 0, overflow: "hidden" }}
            >
              <CenterHero />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Scrollable prompts / chat only */}
        <div style={{ flex: 1, overflowY: "auto", padding: "8px 20px 0", position: "relative", zIndex: 1, minHeight: 0 }}>
          <div style={{ maxWidth: 720, margin: "0 auto", width: "100%" }}>
            <AnimatePresence mode="wait">

              {centerState === "home" && (
                <motion.div
                  key="home"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.22 }}
                >
                  <SuggestionCards onSelect={handleSuggestionSelect} />
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
                  {SHOW_BREAKDOWN_SKELETON && <TaskBreakdownSkeleton />}
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

                  <TaskBreakdown
                    key={response.sessionId}
                    {...getResponseContent(response)}
                    onStartFocus={(actions) => {
                      setFocusActions(actions);
                      setInFocusMode(true);
                    }}
                    onTryAnotherApproach={() => handleSubmit(promptText, { alternative: true })}
                    onFollowUp={handleSubmit}
                  />

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
            padding: "12px 20px 20px",
            borderTop: "1px solid var(--border)",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div style={{ maxWidth: 720, margin: "0 auto", width: "100%" }}>
            <TaskInput
              value={inputValue}
              onValueChange={setInputValue}
              focusKey={inputFocusKey}
              onSubmit={handleSubmit}
              loading={centerState === "loading"}
            />
          </div>
        </div>

      </div>
    </AppShell>
  );
}
