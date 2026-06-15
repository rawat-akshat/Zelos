"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import LandingBackground from "../components/landing/LandingBackground";
import LandingNav from "../components/landing/LandingNav";
import { setAuthenticated, validateCredentials } from "../lib/fake-auth";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [navBlur, setNavBlur] = useState(false);

  function handleScroll(e: React.UIEvent<HTMLDivElement>) {
    setNavBlur(e.currentTarget.scrollTop > 8);
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");

    if (!validateCredentials(email, password)) {
      setError("Invalid email or password. Please try again.");
      return;
    }

    setLoading(true);
    setAuthenticated();
    router.push("/dashboard");
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
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <h1 className="font-landing-heading landing-section-title" style={{ marginBottom: 16 }}>
              Welcome back
            </h1>
            <p className="landing-subhead" style={{ maxWidth: 340, margin: "0 auto" }}>
              Log in to continue where you left off.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            style={{
              background: "var(--landing-card)",
              border: "1px solid var(--landing-border)",
              borderRadius: 20,
              padding: "32px 28px 28px",
              boxShadow: "var(--landing-shadow)",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              <label style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <span style={{ fontSize: 13, fontWeight: 500, color: "var(--landing-text-secondary)" }}>
                  Email
                </span>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="username"
                  placeholder="you@example.com"
                  required
                  style={{
                    width: "100%",
                    padding: "12px 14px",
                    fontSize: 15,
                    borderRadius: 12,
                    border: "1px solid var(--landing-border)",
                    background: "#FFFDF9",
                    color: "var(--landing-text)",
                    outline: "none",
                    transition: "border-color 180ms ease, box-shadow 180ms ease",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "var(--landing-border-focus)";
                    e.currentTarget.style.boxShadow = "0 0 0 3px rgba(107, 248, 253, 0.15)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "var(--landing-border)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                />
              </label>

              <label style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <span style={{ fontSize: 13, fontWeight: 500, color: "var(--landing-text-secondary)" }}>
                  Password
                </span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  placeholder="••••••••"
                  required
                  style={{
                    width: "100%",
                    padding: "12px 14px",
                    fontSize: 15,
                    borderRadius: 12,
                    border: "1px solid var(--landing-border)",
                    background: "#FFFDF9",
                    color: "var(--landing-text)",
                    outline: "none",
                    transition: "border-color 180ms ease, box-shadow 180ms ease",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "var(--landing-border-focus)";
                    e.currentTarget.style.boxShadow = "0 0 0 3px rgba(107, 248, 253, 0.15)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "var(--landing-border)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                />
              </label>

              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    fontSize: 13,
                    color: "var(--landing-error)",
                    margin: 0,
                  }}
                >
                  {error}
                </motion.p>
              )}

              <button
                type="submit"
                disabled={loading}
                style={{
                  marginTop: 4,
                  width: "100%",
                  padding: "14px 20px",
                  fontSize: 15,
                  fontWeight: 600,
                  borderRadius: 12,
                  border: "none",
                  cursor: loading ? "wait" : "pointer",
                  background: "var(--landing-accent)",
                  color: "var(--landing-accent-on)",
                  transition: "background 180ms ease, transform 180ms ease",
                  opacity: loading ? 0.75 : 1,
                }}
                onMouseEnter={(e) => {
                  if (!loading) e.currentTarget.style.background = "var(--landing-accent-hover)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "var(--landing-accent)";
                }}
              >
                {loading ? "Signing in…" : "Log in"}
              </button>
            </div>
          </form>

          <p
            style={{
              textAlign: "center",
              marginTop: 24,
              fontSize: 14,
              color: "var(--landing-text-muted)",
            }}
          >
            Don&apos;t have an account?{" "}
            <span style={{ color: "var(--landing-text-secondary)" }}>Sign up</span>
          </p>
        </motion.div>
      </main>
    </div>
  );
}
