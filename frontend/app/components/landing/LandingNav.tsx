"use client";

import Link from "next/link";
import { Zap } from "lucide-react";

interface LandingNavProps {
  blurred?: boolean;
}

export default function LandingNav({ blurred = false }: LandingNavProps) {
  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        height: 80,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 clamp(24px, 5vw, 64px)",
        background: blurred ? "rgba(245, 241, 234, 0.82)" : "transparent",
        backdropFilter: blurred ? "blur(12px)" : "none",
        borderBottom: blurred ? "1px solid var(--landing-border)" : "1px solid transparent",
        transition: "background 200ms ease, border-color 200ms ease",
      }}
    >
      <Link
        href="/"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          textDecoration: "none",
          color: "var(--landing-text)",
        }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            background: "rgba(107, 248, 253, 0.12)",
            border: "1px solid rgba(107, 248, 253, 0.35)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Zap size={18} strokeWidth={2.5} style={{ color: "#1E1E1E" }} />
        </div>
        <span
          className="font-landing-heading"
          style={{ fontSize: 20, letterSpacing: "-0.02em", color: "var(--landing-text)" }}
        >
          Zelos
        </span>
      </Link>

      <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
        <Link
          href="/login"
          style={{
            fontSize: 14,
            fontWeight: 500,
            color: "var(--landing-text-secondary)",
            textDecoration: "none",
            transition: "color 180ms ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--landing-text)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--landing-text-secondary)")}
        >
          Login
        </Link>
        <Link
          href="/login"
          style={{
            fontSize: 14,
            fontWeight: 600,
            color: "var(--landing-accent-on)",
            background: "var(--landing-accent)",
            padding: "10px 20px",
            borderRadius: 10,
            textDecoration: "none",
            transition: "background 180ms ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "var(--landing-accent-hover)")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "var(--landing-accent)")}
        >
          Get Started
        </Link>
      </div>
    </header>
  );
}
