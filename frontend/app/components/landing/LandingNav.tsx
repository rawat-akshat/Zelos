"use client";

import Link from "next/link";
import { useAuth } from "../../context/AuthContext";
import { landingRoutes } from "../../lib/landing-nav";

interface LandingNavProps {
  blurred?: boolean;
  showCta?: boolean;
}

export default function LandingNav({ blurred = false, showCta = true }: LandingNavProps) {
  const { isAuthenticated } = useAuth();
  const routes = landingRoutes(isAuthenticated);

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
        background: blurred ? "rgba(243, 238, 229, 0.82)" : "transparent",
        backdropFilter: blurred ? "blur(12px)" : "none",
        borderBottom: blurred ? "1px solid var(--landing-border)" : "1px solid transparent",
        transition: "background 200ms ease, border-color 200ms ease",
      }}
    >
      <Link
        href="/"
        style={{
          textDecoration: "none",
          color: "var(--landing-text)",
        }}
      >
        <span
          className="font-landing-heading"
          style={{ fontSize: 28, letterSpacing: "-0.02em", color: "var(--landing-text)" }}
        >
          Zelos
        </span>
      </Link>

      <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
        <Link
          href={routes.signIn}
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
          {isAuthenticated ? "Workspace" : "Log in"}
        </Link>
        {showCta && (
          <Link
            href={routes.startGoal}
            className="landing-btn-primary"
            style={{
              fontSize: 14,
              fontWeight: 600,
              padding: "10px 20px",
              borderRadius: 10,
              background: "#C9A75C",
              color: "#1E1E1E",
              textDecoration: "none",
            }}
          >
            {isAuthenticated ? "Open Workspace" : "Start a Goal"}
          </Link>
        )}
      </div>
    </header>
  );
}
