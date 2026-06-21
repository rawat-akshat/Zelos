"use client";

import { FormEvent, useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import LandingBackground from "../components/landing/LandingBackground";
import LandingNav from "../components/landing/LandingNav";
import { useAuth } from "../context/AuthContext";
import { isSupabaseConfigured } from "../lib/supabase";
import { formatAuthError } from "../lib/auth-errors";
import PasswordInput from "../components/ui/PasswordInput";

type AuthMode = "login" | "signup";

function LoginPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { signInWithEmail, signUpWithEmail, signInWithGoogle, isAuthenticated, loading: authLoading } =
    useAuth();

  const initialMode: AuthMode =
    searchParams.get("signup") === "1" || searchParams.get("mode") === "signup"
      ? "signup"
      : "login";

  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [navBlur, setNavBlur] = useState(false);

  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      router.replace("/dashboard");
    }
  }, [authLoading, isAuthenticated, router]);

  useEffect(() => {
    setMode(initialMode);
  }, [initialMode]);

  function switchMode(next: AuthMode) {
    setMode(next);
    setError("");
    setSuccess("");
    const url = next === "signup" ? "/login?signup=1" : "/login";
    router.replace(url, { scroll: false });
  }

  function handleScroll(e: React.UIEvent<HTMLDivElement>) {
    setNavBlur(e.currentTarget.scrollTop > 8);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!isSupabaseConfigured()) {
      setError("Supabase is not configured. Add env vars to enable login.");
      return;
    }
    setLoading(true);
    try {
      if (mode === "signup") {
        await signUpWithEmail(email, password);
      } else {
        await signInWithEmail(email, password);
      }
    } catch (err) {
      setError(formatAuthError(err));
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogle() {
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      await signInWithGoogle();
    } catch (err) {
      setError(formatAuthError(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="landing-page" onScroll={handleScroll} style={{ overflowY: "auto", minHeight: "100vh" }}>
      <LandingBackground />
      <LandingNav blurred={navBlur} />

      <main
        style={{
          position: "relative",
          zIndex: 1,
          minHeight: "calc(100vh - 80px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "120px clamp(24px, 5vw, 64px) 80px",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
          style={{ width: "100%", maxWidth: 420 }}
        >
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <h1 className="font-landing-heading landing-section-title" style={{ marginBottom: 12 }}>
              {mode === "signup" ? "Create your account" : "Welcome back"}
            </h1>
            <p className="landing-subhead" style={{ maxWidth: 340, margin: "0 auto" }}>
              {mode === "signup"
                ? "Sign up free to save goals, patterns, and chat history. We'll email you a confirmation link."
                : "Log in to continue where you left off."}
            </p>
          </div>

          {/* Login / Sign up tabs */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 4,
              padding: 4,
              marginBottom: 20,
              borderRadius: 14,
              background: "var(--landing-card)",
              border: "1px solid var(--landing-border)",
            }}
          >
            {(["login", "signup"] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => switchMode(tab)}
                style={{
                  padding: "11px 16px",
                  borderRadius: 10,
                  border: "none",
                  cursor: "pointer",
                  fontSize: 14,
                  fontWeight: 600,
                  fontFamily: "var(--font-body)",
                  background: mode === tab ? "var(--landing-accent)" : "transparent",
                  color: mode === tab ? "var(--landing-accent-on)" : "var(--landing-text-secondary)",
                  transition: "background 180ms ease, color 180ms ease",
                }}
              >
                {tab === "login" ? "Log in" : "Sign up"}
              </button>
            ))}
          </div>

          <form
            onSubmit={handleSubmit}
            style={{
              background: "var(--landing-card)",
              border: "1px solid var(--landing-border)",
              borderRadius: 20,
              padding: "28px 28px 24px",
              boxShadow: "var(--landing-shadow)",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <label style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <span style={{ fontSize: 13, fontWeight: 500, color: "var(--landing-text-secondary)" }}>
                  Email
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="username"
                  placeholder="you@example.com"
                  required
                  style={fieldStyle}
                />
              </label>

              <label style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <span style={{ fontSize: 13, fontWeight: 500, color: "var(--landing-text-secondary)" }}>
                  Password
                </span>
                <PasswordInput
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete={mode === "signup" ? "new-password" : "current-password"}
                  placeholder={mode === "signup" ? "At least 6 characters" : "••••••••"}
                  required
                  minLength={6}
                  inputStyle={fieldStyle}
                />
              </label>

              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{ fontSize: 13, color: "var(--landing-error)", margin: 0, lineHeight: 1.5 }}
                >
                  {error}
                </motion.p>
              )}

              {success && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{ fontSize: 13, color: "#5a7a5e", margin: 0, lineHeight: 1.5 }}
                >
                  {success}
                </motion.p>
              )}

              <button type="submit" disabled={loading} style={submitStyle}>
                {loading
                  ? "Please wait…"
                  : mode === "signup"
                    ? "Create account"
                    : "Log in"}
              </button>

              <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "4px 0" }}>
                <div style={{ flex: 1, height: 1, background: "var(--landing-border)" }} />
                <span style={{ fontSize: 12, color: "var(--landing-text-muted)" }}>or</span>
                <div style={{ flex: 1, height: 1, background: "var(--landing-border)" }} />
              </div>

              <button
                type="button"
                disabled={loading}
                onClick={handleGoogle}
                style={{
                  ...submitStyle,
                  background: "transparent",
                  color: "var(--landing-text)",
                  border: "1px solid var(--landing-border)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 10,
                }}
              >
                <GoogleIcon />
                Continue with Google
              </button>
              <p style={{ fontSize: 11, color: "var(--landing-text-muted)", margin: 0, textAlign: "center", lineHeight: 1.45 }}>
                Google is optional — enable it in Supabase if you want OAuth. Email sign-up works without it.
              </p>
            </div>
          </form>

          <p style={{ textAlign: "center", marginTop: 20, fontSize: 14, color: "var(--landing-text-muted)" }}>
            {mode === "signup" ? "Already have an account?" : "New to Zelos?"}{" "}
            <button
              type="button"
              onClick={() => switchMode(mode === "signup" ? "login" : "signup")}
              style={{
                background: "none",
                border: "none",
                color: "var(--landing-accent)",
                cursor: "pointer",
                fontSize: 14,
                fontWeight: 600,
                textDecoration: "underline",
                textUnderlineOffset: 3,
              }}
            >
              {mode === "signup" ? "Log in" : "Create an account"}
            </button>
          </p>

          <p style={{ textAlign: "center", marginTop: 12 }}>
            <Link href="/" style={{ fontSize: 13, color: "var(--landing-text-muted)" }}>
              Back to home
            </Link>
          </p>
        </motion.div>
      </main>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginPageContent />
    </Suspense>
  );
}

const fieldStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px 14px",
  fontSize: 15,
  borderRadius: 12,
  border: "1px solid var(--landing-border)",
  background: "#FFFDF9",
  color: "var(--landing-text)",
  outline: "none",
};

const submitStyle: React.CSSProperties = {
  marginTop: 4,
  width: "100%",
  padding: "14px 20px",
  fontSize: 15,
  fontWeight: 600,
  borderRadius: 12,
  border: "none",
  cursor: "pointer",
  background: "var(--landing-accent)",
  color: "var(--landing-accent-on)",
};

function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  );
}
