"use client";

import { useState, useCallback, useRef, useEffect, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams, useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import AppShell from "../components/layout/AppShell";
import TaskInput from "../components/features/TaskInput";
import AuthModal from "../components/features/AuthModal";
import CenterHero from "../components/features/CenterHero";
import UserBubble from "../components/features/UserBubble";
import AssistantMessage from "../components/features/AssistantMessage";
import SuggestionCards from "../components/features/SuggestionCards";
import FloatingInterventionCard from "../components/features/FloatingInterventionCard";
import InlineAlert from "../components/ui/InlineAlert";
import { generateCoachTurn } from "../lib/mock-coach";
import { formatApiError } from "../lib/api-errors";
import { useWorkspace } from "../context/WorkspaceContext";
import { useAuth } from "../context/AuthContext";
import { api, GUEST_TURN_LIMIT } from "../lib/api";
import {
  apiMessageToChatMessage,
  chatTurnToMessages,
} from "../lib/mappers";
import {
  appendGuestTurn,
  clearGuestSession,
  ensureGuestChat,
  getGuestMessages,
  getGuestTurnCount,
  getGuestChat,
  startNewGuestChat,
} from "../lib/guest-session";
import type { ChatMessage, Intervention } from "../lib/types";

type CenterState = "home" | "chat";

function DashboardContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const {
    activeGoal,
    activeSessionId,
    isNewUser,
    openNewGoalModal,
    markWorkspaceHistory,
    loadSession,
    refreshSessionMeta,
    ensureSessionForMessage,
    refreshGoals,
  } = useWorkspace();

  const [centerState, setCenterState] = useState<CenterState>("home");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [inputFocusKey, setInputFocusKey] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [authRequired, setAuthRequired] = useState(false);
  const [guestTurnsLeft, setGuestTurnsLeft] = useState(GUEST_TURN_LIMIT);
  const [floatingIntervention, setFloatingIntervention] =
    useState<Intervention | null>(null);
  const [thinkingText, setThinkingText] = useState("Thinking…");
  const [chatError, setChatError] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const messageRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const goalIdParam = searchParams.get("goal");
  const messageIdParam = searchParams.get("messageId");

  useEffect(() => {
    if (!isAuthenticated) {
      const guestMsgs = getGuestMessages();
      if (guestMsgs.length > 0) {
        setMessages(guestMsgs);
        setCenterState("chat");
      }
      setGuestTurnsLeft(GUEST_TURN_LIMIT - getGuestTurnCount());
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (!isAuthenticated || !goalIdParam) return;
    (async () => {
      try {
        const rows = await api.listMessages(goalIdParam);
        setMessages(
          rows
            .filter((row) => row.role === "user" || row.role === "assistant")
            .map(apiMessageToChatMessage)
        );
        setCenterState("chat");
        await loadSession(goalIdParam);
        markWorkspaceHistory();
      } catch (err) {
        setChatError(formatApiError(err));
      }
    })();
  }, [goalIdParam, isAuthenticated, loadSession, markWorkspaceHistory]);

  useEffect(() => {
    if (!messageIdParam || messages.length === 0) return;
    const timer = setTimeout(() => {
      window.dispatchEvent(
        new CustomEvent("zelos:scroll-to-message", {
          detail: { messageId: messageIdParam },
        })
      );
    }, 400);
    return () => clearTimeout(timer);
  }, [messageIdParam, messages]);

  useEffect(() => {
    if (isAuthenticated) {
      refreshGoals().catch(() => undefined);
    }
  }, [isAuthenticated, refreshGoals]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<{ messageId: string }>).detail;
      const el = messageRefs.current[detail.messageId];
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
    };
    window.addEventListener("zelos:scroll-to-message", handler);
    return () => window.removeEventListener("zelos:scroll-to-message", handler);
  }, []);

  const handleNewGuestChat = useCallback(() => {
    startNewGuestChat();
    setMessages([]);
    setCenterState("home");
    setInputValue("");
    setFloatingIntervention(null);
    setGuestTurnsLeft(GUEST_TURN_LIMIT);
    setAuthRequired(false);
    setShowAuth(false);
  }, []);

  const handleSubmit = useCallback(
    async (text: string) => {
      if (!isAuthenticated) {
        if (getGuestTurnCount() >= GUEST_TURN_LIMIT) {
          setAuthRequired(true);
          setShowAuth(true);
          return;
        }
        ensureGuestChat(text);
      }

      setCenterState("chat");
      setLoading(true);
      setChatError(null);
      setThinkingText("Thinking…");
      setFloatingIntervention(null);
      markWorkspaceHistory();

      const optimisticUser: ChatMessage = {
        id: `pending-user-${Date.now()}`,
        role: "user",
        content: text,
      };
      setMessages((prev) => [...prev, optimisticUser]);

      try {
        if (!isAuthenticated) {
          const turnIndex = getGuestTurnCount();
          try {
            const turn = await generateCoachTurn(text, turnIndex);
            appendGuestTurn(turn.userMessage, turn.assistantMessage);
            setGuestTurnsLeft(GUEST_TURN_LIMIT - getGuestTurnCount());
            setMessages((prev) => {
              const withoutPending = prev.filter((m) => m.id !== optimisticUser.id);
              return [...withoutPending, turn.userMessage, turn.assistantMessage];
            });
            if (turn.floatingIntervention) {
              setFloatingIntervention(turn.floatingIntervention);
            }
          } catch (err) {
            setMessages((prev) => prev.filter((m) => m.id !== optimisticUser.id));
            setChatError(formatApiError(err));
          }
          return;
        }

        const sessionId =
          activeSessionId ?? (await ensureSessionForMessage(text));
        const turn = await api.sendMessage(sessionId, text);

        const { userMessage, assistantMessage, floatingIntervention: floating } =
          chatTurnToMessages(turn);

        setMessages((prev) => {
          const withoutPending = prev.filter((m) => m.id !== optimisticUser.id);
          return [...withoutPending, userMessage, assistantMessage];
        });

        if (floating) setFloatingIntervention(floating);
        await refreshSessionMeta(sessionId);

        // Keep goal in URL so refresh reloads full history in order
        if (!goalIdParam) {
          router.replace(`/dashboard?goal=${sessionId}`, { scroll: false });
        }
      } catch (err) {
        setMessages((prev) => prev.filter((m) => m.id !== optimisticUser.id));
        setChatError(formatApiError(err));
      } finally {
        setLoading(false);
      }
    },
    [
      isAuthenticated,
      activeSessionId,
      goalIdParam,
      router,
      ensureSessionForMessage,
      markWorkspaceHistory,
      refreshSessionMeta,
    ]
  );

  const handleSuggestionSelect = useCallback((text: string) => {
    setInputValue(text);
    setInputFocusKey((k) => k + 1);
  }, []);

  const handleAuthSuccess = useCallback(() => {
    clearGuestSession();
    setAuthRequired(false);
    setShowAuth(false);
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
      <AuthModal
        open={showAuth}
        required={authRequired}
        onClose={() => {
          if (!authRequired) setShowAuth(false);
        }}
        onSuccess={handleAuthSuccess}
      />

      <div style={{ display: "flex", flexDirection: "column", height: "100vh", position: "relative" }}>
        {(activeGoal && !showHero) || (!isAuthenticated && centerState === "chat") ? (
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
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 4 }}>
                  {isAuthenticated ? "Active Goal" : "Guest chat"}
                </p>
                <p className="font-heading" style={{ fontSize: 18, color: "var(--text-primary)", paddingBottom: 12 }}>
                  {activeGoal?.title ?? getGuestChat()?.title ?? "New conversation"}
                </p>
              </div>
              {!isAuthenticated && (
                <button
                  type="button"
                  onClick={handleNewGuestChat}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "8px 12px",
                    borderRadius: 10,
                    border: "1px solid var(--border)",
                    background: "var(--bg-elevated)",
                    color: "var(--text-secondary)",
                    fontSize: 12,
                    fontWeight: 500,
                    cursor: "pointer",
                    flexShrink: 0,
                  }}
                >
                  <Plus size={14} />
                  New chat
                </button>
              )}
            </div>
            {!isAuthenticated && (
              <p style={{ fontSize: 11, color: "var(--text-muted)", marginTop: -8, paddingBottom: 12 }}>
                {guestTurnsLeft} of {GUEST_TURN_LIMIT} messages left · Sign in to save
              </p>
            )}
          </div>
        ) : null}

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
                    {chatError && (
                      <div style={{ marginBottom: 12 }}>
                        <InlineAlert title="Message not sent" onDismiss={() => setChatError(null)}>
                          {chatError}
                        </InlineAlert>
                      </div>
                    )}
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
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    ref={(el) => {
                      messageRefs.current[msg.id] = el;
                    }}
                    data-message-id={msg.id}
                  >
                    {msg.role === "user" ? (
                      <UserBubble text={msg.content} />
                    ) : (
                      <AssistantMessage
                        message={msg}
                        onInterventionDismiss={() => {
                          setMessages((prev) =>
                            prev.map((m) =>
                              m.id === msg.id ? { ...m, intervention: undefined } : m
                            )
                          );
                        }}
                      />
                    )}
                  </div>
                ))}
                {loading && (
                  <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 4px" }}>
                    <div style={{ display: "flex", gap: 6 }}>
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
                    <span style={{ fontSize: 13, color: "var(--text-muted)" }}>{thinkingText}</span>
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
              {chatError && (
                <div style={{ marginBottom: 12 }}>
                  <InlineAlert title="Message not sent" onDismiss={() => setChatError(null)}>
                    {chatError}
                  </InlineAlert>
                </div>
              )}
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
