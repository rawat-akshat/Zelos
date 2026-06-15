"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { ArrowUp } from "lucide-react";
import LandingBackground from "../components/landing/LandingBackground";
import { loadInitialPrompt } from "../lib/initial-prompt";

const MOCK_RESPONSE = {
  blocker: "Ambiguity",
  explanation:
    "This feels difficult because the task is large, unclear, and emotionally heavy. Let's reduce the pressure and make the first step small enough to begin.",
  actions: [
    "Open the document or space where this task belongs.",
    "Look at it for 30 seconds without trying to fix everything.",
    "Choose one tiny part to work on.",
    "Complete just that part.",
    "Stop or continue only if it feels manageable.",
  ],
};

const FOLLOW_UP_RESPONSE =
  "That's a good instinct. Let's make the next step even smaller — pick just one sentence, one drawer, or one line to change. You don't need momentum yet; you need a door that's easy to walk through.";

type Phase = "input" | "responded" | "followup" | "wall";

export default function TryPage() {
  const [prompt, setPrompt] = useState("");
  const [followUp, setFollowUp] = useState("");
  const [phase, setPhase] = useState<Phase>("input");
  const [userMessages, setUserMessages] = useState<string[]>([]);
  const [showFollowUpResponse, setShowFollowUpResponse] = useState(false);

  useEffect(() => {
    const saved = loadInitialPrompt();
    if (saved) {
      setPrompt(saved);
      setUserMessages([saved]);
      setPhase("responded");
    }
  }, []);

  const showWall = phase === "wall";

  const handleInitialSubmit = useCallback(() => {
    const text = prompt.trim();
    if (!text || phase !== "input") return;
    setUserMessages([text]);
    setPhase("responded");
  }, [prompt, phase]);

  const handleFollowUpSubmit = useCallback(() => {
    const text = followUp.trim();
    if (!text || phase !== "responded") return;
    setUserMessages((prev) => [...prev, text]);
    setShowFollowUpResponse(true);
    setPhase("wall");
  }, [followUp, phase]);

  function handleInitialKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleInitialSubmit();
    }
  }

  function handleFollowUpKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleFollowUpSubmit();
    }
  }

  const hasResponse = phase !== "input";

  return (
    <div className="landing-page" style={{ minHeight: "100vh", position: "relative" }}>
      <LandingBackground />

      <header
        style={{
          position: "relative",
          zIndex: 10,
          height: 80,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 clamp(24px, 5vw, 64px)",
          borderBottom: "1px solid var(--landing-border)",
        }}
      >
        <Link
          href="/"
          style={{ textDecoration: "none", color: "var(--landing-text)" }}
        >
          <span className="font-landing-heading" style={{ fontSize: 28, letterSpacing: "-0.02em" }}>
            Zelos
          </span>
        </Link>
        <Link
          href="/login"
          style={{
            fontSize: 14,
            fontWeight: 500,
            color: "var(--landing-text-secondary)",
            textDecoration: "none",
          }}
        >
          Login
        </Link>
      </header>

      <main
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: 680,
          margin: "0 auto",
          padding: "64px clamp(24px, 5vw, 64px) 120px",
        }}
      >
        <h1 className="font-landing-heading landing-section-title" style={{ marginBottom: 12 }}>
          Let&apos;s untangle this.
        </h1>
        <p className="landing-subhead" style={{ marginBottom: 40 }}>
          We&apos;ll start with one small step.
        </p>

        {userMessages.map((msg, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginBottom: 16,
            }}
          >
            <div
              style={{
                maxWidth: "88%",
                background: "rgba(201, 167, 92, 0.12)",
                border: "1px solid rgba(201, 167, 92, 0.25)",
                borderRadius: "16px 16px 4px 16px",
                padding: "14px 18px",
                fontSize: 15,
                lineHeight: 1.55,
                color: "var(--landing-text)",
              }}
            >
              {msg}
            </div>
          </div>
        ))}

        {hasResponse && (
          <div
            style={{
              background: "var(--landing-card)",
              border: "1px solid var(--landing-border)",
              borderRadius: 20,
              padding: "28px 28px 24px",
              marginBottom: 24,
            }}
          >
            <span
              style={{
                display: "inline-block",
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: "var(--landing-text-secondary)",
                background: "rgba(30, 30, 30, 0.06)",
                padding: "4px 10px",
                borderRadius: 6,
                marginBottom: 16,
              }}
            >
              Blocker: {MOCK_RESPONSE.blocker}
            </span>
            <p className="landing-body" style={{ margin: "0 0 20px", fontSize: 16 }}>
              {MOCK_RESPONSE.explanation}
            </p>
            <p
              style={{
                margin: "0 0 12px",
                fontSize: 14,
                fontWeight: 600,
                color: "var(--landing-text)",
              }}
            >
              Micro-actions:
            </p>
            <ol
              style={{
                margin: "0 0 24px",
                paddingLeft: 20,
                display: "flex",
                flexDirection: "column",
                gap: 10,
              }}
            >
              {MOCK_RESPONSE.actions.map((action) => (
                <li key={action} className="landing-body" style={{ fontSize: 15 }}>
                  {action}
                </li>
              ))}
            </ol>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {["Start first step", "Make steps smaller", "Try another breakdown"].map((label) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => setPhase("wall")}
                  style={{
                    fontSize: 13,
                    fontWeight: 500,
                    color: "var(--landing-text)",
                    background: "transparent",
                    border: "1px solid var(--landing-border)",
                    borderRadius: 10,
                    padding: "10px 14px",
                    cursor: "pointer",
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        )}

        {showFollowUpResponse && (
          <div
            style={{
              background: "var(--landing-card)",
              border: "1px solid var(--landing-border)",
              borderRadius: 20,
              padding: "24px 28px",
              marginBottom: 24,
            }}
          >
            <p className="landing-body" style={{ margin: 0, fontSize: 16 }}>
              {FOLLOW_UP_RESPONSE}
            </p>
          </div>
        )}

        {!showWall && phase === "input" && (
          <div
            style={{
              background: "var(--landing-card)",
              border: "1px solid var(--landing-border)",
              borderRadius: 20,
              padding: "20px 22px 52px",
              position: "relative",
            }}
          >
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={handleInitialKeyDown}
              placeholder="What's been weighing on you?"
              rows={3}
              className="landing-body"
              style={{
                width: "100%",
                border: "none",
                outline: "none",
                resize: "none",
                background: "transparent",
                color: "var(--landing-text)",
                fontFamily: "inherit",
                fontSize: 16,
                lineHeight: 1.55,
                padding: 0,
              }}
            />
            <button
              type="button"
              onClick={handleInitialSubmit}
              disabled={!prompt.trim()}
              aria-label="Submit"
              style={{
                position: "absolute",
                bottom: 14,
                right: 16,
                width: 36,
                height: 36,
                borderRadius: 10,
                background: prompt.trim() ? "var(--landing-accent)" : "var(--landing-border)",
                border: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: prompt.trim() ? "pointer" : "default",
              }}
            >
              <ArrowUp size={16} style={{ color: "var(--landing-accent-on)" }} />
            </button>
          </div>
        )}

        {!showWall && phase === "responded" && (
          <div
            style={{
              background: "var(--landing-card)",
              border: "1px solid var(--landing-border)",
              borderRadius: 20,
              padding: "20px 22px 52px",
              position: "relative",
            }}
          >
            <textarea
              value={followUp}
              onChange={(e) => setFollowUp(e.target.value)}
              onKeyDown={handleFollowUpKeyDown}
              placeholder="Ask a follow-up or describe what's still stuck..."
              rows={2}
              className="landing-body"
              style={{
                width: "100%",
                border: "none",
                outline: "none",
                resize: "none",
                background: "transparent",
                color: "var(--landing-text)",
                fontFamily: "inherit",
                fontSize: 16,
                lineHeight: 1.55,
                padding: 0,
              }}
            />
            <button
              type="button"
              onClick={handleFollowUpSubmit}
              disabled={!followUp.trim()}
              aria-label="Submit follow-up"
              style={{
                position: "absolute",
                bottom: 14,
                right: 16,
                width: 36,
                height: 36,
                borderRadius: 10,
                background: followUp.trim() ? "var(--landing-accent)" : "var(--landing-border)",
                border: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: followUp.trim() ? "pointer" : "default",
              }}
            >
              <ArrowUp size={16} style={{ color: "var(--landing-accent-on)" }} />
            </button>
          </div>
        )}

        {showWall && (
          <div
            style={{
              background: "var(--landing-card)",
              border: "1px solid var(--landing-border)",
              borderRadius: 24,
              padding: "40px 36px",
              textAlign: "center",
              marginTop: 8,
            }}
          >
            <h2
              className="font-landing-heading"
              style={{ fontSize: 28, marginBottom: 12, letterSpacing: "-0.02em" }}
            >
              Create a free account to keep going.
            </h2>
            <p className="landing-subhead" style={{ marginBottom: 32 }}>
              Save your sessions, track progress, and continue where you left off.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 320, margin: "0 auto" }}>
              <Link
                href="/login"
                style={{
                  fontSize: 15,
                  fontWeight: 600,
                  color: "var(--landing-accent-on)",
                  background: "var(--landing-accent)",
                  padding: "14px 24px",
                  borderRadius: 12,
                  textDecoration: "none",
                }}
              >
                Continue with Google
              </Link>
              <Link
                href="/login"
                style={{
                  fontSize: 15,
                  fontWeight: 500,
                  color: "var(--landing-text)",
                  background: "transparent",
                  padding: "14px 24px",
                  borderRadius: 12,
                  textDecoration: "none",
                  border: "1px solid var(--landing-border)",
                }}
              >
                Continue with Email
              </Link>
              <Link
                href="/login"
                style={{
                  fontSize: 14,
                  fontWeight: 500,
                  color: "var(--landing-text-secondary)",
                  textDecoration: "none",
                  paddingTop: 8,
                }}
              >
                Login
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
