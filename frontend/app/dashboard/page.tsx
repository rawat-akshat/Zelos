"use client";

import { useState, useCallback, useRef, useEffect, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "next/navigation";
import AppShell from "../components/layout/AppShell";
import TaskInput from "../components/features/TaskInput";
import AuthModal from "../components/features/AuthModal";
import CenterHero from "../components/features/CenterHero";
import UserBubble from "../components/features/UserBubble";
import AssistantMessage from "../components/features/AssistantMessage";
import SuggestionCards from "../components/features/SuggestionCards";
import FloatingInterventionCard from "../components/features/FloatingInterventionCard";
import { generateCoachTurn } from "../lib/mock-coach";
import { useWorkspace } from "../context/WorkspaceContext";
import type { ChatMessage, Intervention } from "../lib/types";

type CenterState = "home" | "chat";

function DashboardContent() {
  const searchParams = useSearchParams();
  const { activeGoal, isNewUser, openNewGoalModal, markWorkspaceHistory } = useWorkspace();
  const [centerState, setCenterState] = useState<CenterState>("home");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [inputFocusKey, setInputFocusKey] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [floatingIntervention, setFloatingIntervention] = useState<Intervention | null>(null);
  const turnIndex = useRef(0);
  const hasRespondedOnce = useRef(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (searchParams.get("newGoal") === "1") {
      openNewGoalModal();
    }
  }, [searchParams, openNewGoalModal]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSubmit = useCallback(async (text: string) => {
    setCenterState("chat");
    setLoading(true);
    setFloatingIntervention(null);
    markWorkspaceHistory();

    try {
      const turn = await generateCoachTurn(text, turnIndex.current);
      turnIndex.current += 1;

      setMessages((prev) => [...prev, turn.userMessage, turn.assistantMessage]);

      if (turn.floatingIntervention) {
        setFloatingIntervention(turn.floatingIntervention);
      }

      if (!hasRespondedOnce.current) {
        hasRespondedOnce.current = true;
        setTimeout(() => setShowAuth(true), 2200);
      }
    } finally {
      setLoading(false);
    }
  }, [markWorkspaceHistory]);

  const handleSuggestionSelect = useCallback((text: string) => {
    setInputValue(text);
    setInputFocusKey((k) => k + 1);
  }, []);

  const showHero = centerState === "home" && messages.length === 0;

  const inputProps = {
    value: inputValue,
    onValueChange: setInputValue,
    focusKey: inputFocusKey,
    onSubmit: handleSubmit,
    loading,
  };

  return (
    <>
      <AuthModal open={showAuth} onClose={() => setShowAuth(false)} />

      <div style={{ display: "flex", flexDirection: "column", height: "100vh", position: "relative" }}>
        {activeGoal && !showHero && (
          <div
            style={{
              flexShrink: 0,
              padding: "16px 20px 0",
              borderBottom: "1px solid var(--border)",
              maxWidth: 720,
              margin: "0 auto",
              width: "100%",
            }}
          >
            <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 4 }}>
              Active Goal
            </p>
            <p className="font-heading" style={{ fontSize: 18, color: "var(--text-primary)", paddingBottom: 12 }}>
              {activeGoal.title}
            </p>
          </div>
        )}

        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: showHero ? "0 20px" : "8px 20px 0",
            position: "relative",
            zIndex: 1,
            minHeight: 0,
          }}
        >
          <div style={{ maxWidth: 720, margin: "0 auto", width: "100%" }}>
            <AnimatePresence mode="wait">
              {showHero && (
                <motion.div
                  key="hero"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <CenterHero />

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.28, delay: 0.05 }}
                    style={{ marginBottom: 28 }}
                  >
                    <TaskInput prominent {...inputProps} />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.28, delay: 0.12 }}
                  >
                    <SuggestionCards onSelect={handleSuggestionSelect} />
                  </motion.div>

                  {isNewUser && (
                    <div style={{ textAlign: "center", marginTop: 28 }}>
                      <button
                        type="button"
                        onClick={openNewGoalModal}
                        style={{
                          padding: "10px 20px",
                          borderRadius: 10,
                          background: "transparent",
                          border: "1px solid var(--border)",
                          color: "var(--text-secondary)",
                          fontSize: 13,
                          fontWeight: 500,
                          cursor: "pointer",
                          fontFamily: "var(--font-body)",
                        }}
                      >
                        Or start a named goal
                      </button>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {messages.length > 0 && (
              <div style={{ display: "flex", flexDirection: "column", gap: 24, paddingTop: 16, paddingBottom: 24 }}>
                {messages.map((msg) =>
                  msg.role === "user" ? (
                    <UserBubble key={msg.id} text={msg.content} />
                  ) : (
                    <AssistantMessage
                      key={msg.id}
                      message={msg}
                      onInterventionDismiss={() => {
                        setMessages((prev) =>
                          prev.map((m) =>
                            m.id === msg.id ? { ...m, intervention: undefined } : m
                          )
                        );
                      }}
                    />
                  )
                )}
                {loading && (
                  <div style={{ display: "flex", gap: 6, padding: "8px 4px" }}>
                    {[0, 1, 2].map((i) => (
                      <div
                        key={i}
                        style={{
                          width: 6,
                          height: 6,
                          borderRadius: "50%",
                          background: "var(--text-muted)",
                          opacity: 0.5,
                          animation: `pulse 1.2s ease-in-out ${i * 0.15}s infinite`,
                        }}
                      />
                    ))}
                  </div>
                )}
                <div ref={bottomRef} />
              </div>
            )}
          </div>
        </div>

        {!showHero && (
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
              {floatingIntervention && (
                <FloatingInterventionCard
                  intervention={floatingIntervention}
                  onDismiss={() => setFloatingIntervention(null)}
                  onAction={() => setFloatingIntervention(null)}
                />
              )}
              <TaskInput {...inputProps} />
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default function DashboardPage() {
  return (
    <AppShell>
      <Suspense fallback={null}>
        <DashboardContent />
      </Suspense>
    </AppShell>
  );
}
