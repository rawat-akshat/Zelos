"use client";

import { FormEvent, Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import LandingBackground from "../../components/landing/LandingBackground";
import LandingNav from "../../components/landing/LandingNav";
import { useAuth } from "../../context/AuthContext";
import { formatAuthError } from "../../lib/auth-errors";
import { RESEND_SUCCESS_MESSAGE } from "../../lib/auth-email";

function VerifyEmailContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialEmail = searchParams.get("email") ?? "";
  const { resendVerificationEmail, isAuthenticated, loading: authLoading, syncAuthFromSupabase } =
    useAuth();

  const [email, setEmail] = useState(initialEmail);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [navBlur, setNavBlur] = useState(false);

  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      router.replace("/dashboard");
    }
  }, [authLoading, isAuthenticated, router]);

  // If user confirms in another tab (same browser), Supabase syncs session → auto-redirect.
  useEffect(() => {
    const check = () => {
      syncAuthFromSupabase().catch(() => undefined);
    };
    check();
    const onFocus = () => check();
    window.addEventListener("focus", onFocus);
    const interval = setInterval(check, 15_000);
    return () => {
      window.removeEventListener("focus", onFocus);
      clearInterval(interval);
    };
  }, [syncAuthFromSupabase]);

  async function handleResend(e: FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");
    const trimmed = email.trim();
    if (!trimmed) {
      setError("Enter the email you used to sign up.");
      return;
    }
    setLoading(true);
    try {
      await resendVerificationEmail(trimmed);
      setSuccess(RESEND_SUCCESS_MESSAGE);
    } catch (err) {
      setError(formatAuthError(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="landing-page"
      onScroll={(e) => setNavBlur(e.currentTarget.scrollTop > 8)}
      style={{ overflowY: "auto", minHeight: "100vh" }}
    >
      <LandingBackground />
      <LandingNav blurred={navBlur} showCta={false} />

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
          style={{ width: "100%", maxWidth: 440 }}
        >
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <h1 className="font-landing-heading landing-section-title" style={{ marginBottom: 12 }}>
              Confirm your email
            </h1>
            <p className="landing-subhead" style={{ maxWidth: 380, margin: "0 auto", lineHeight: 1.6 }}>
              Confirmation pending — click the link we sent
              {initialEmail ? (
                <>
                  {" "}
                  to <strong style={{ fontWeight: 600 }}>{initialEmail}</strong>
                </>
              ) : (
                " to your email"
              )}
              . This page will send you to your workspace as soon as you confirm (same browser).
            </p>
          </div>

          <form
            onSubmit={handleResend}
            style={{
              background: "var(--landing-card)",
              border: "1px solid var(--landing-border)",
              borderRadius: 20,
              padding: "28px 28px 24px",
              boxShadow: "var(--landing-shadow)",
            }}
          >
            <label style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
              <span style={{ fontSize: 13, fontWeight: 500, color: "var(--landing-text-secondary)" }}>
                Email
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
                style={fieldStyle}
              />
            </label>

            {error ? (
              <p style={{ fontSize: 13, color: "var(--landing-error)", margin: "0 0 12px", lineHeight: 1.5 }}>
                {error}
              </p>
            ) : null}

            {success ? (
              <p style={{ fontSize: 13, color: "#5a7a5e", margin: "0 0 12px", lineHeight: 1.5 }}>
                {success}
              </p>
            ) : null}

            <button type="submit" disabled={loading} style={submitStyle}>
              {loading ? "Sending…" : "Resend confirmation email"}
            </button>
          </form>

          <p style={{ textAlign: "center", marginTop: 24, fontSize: 14, color: "var(--landing-text-muted)" }}>
            Already confirmed?{" "}
            <Link href="/login" style={{ color: "var(--landing-accent)", fontWeight: 600 }}>
              Log in
            </Link>
          </p>
        </motion.div>
      </main>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={null}>
      <VerifyEmailContent />
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
