"use client";

import Link from "next/link";
import FadeUp from "./FadeUp";
import { useAuth } from "../../context/AuthContext";
import { landingRoutes } from "../../lib/landing-nav";

export default function FinalCTASection() {
  const { isAuthenticated } = useAuth();
  const routes = landingRoutes(isAuthenticated);

  return (
    <section
      style={{
        padding: "120px clamp(24px, 5vw, 64px) 140px",
        textAlign: "center",
        position: "relative",
        zIndex: 1,
      }}
    >
      <FadeUp>
        <div style={{ maxWidth: 560, margin: "0 auto" }}>
          <h2 className="font-landing-heading landing-section-title" style={{ marginBottom: 12 }}>
            The goal isn&apos;t another conversation.
          </h2>
          <p className="landing-subhead" style={{ marginBottom: 36, fontSize: 20 }}>
            It&apos;s meaningful progress.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
            <Link
              href={routes.startGoal}
              className="landing-btn-primary"
              style={{
                display: "inline-block",
                fontSize: 15,
                fontWeight: 600,
                padding: "14px 32px",
                borderRadius: 12,
                background: "#C9A75C",
                color: "#1E1E1E",
                textDecoration: "none",
              }}
            >
              {isAuthenticated ? "Open Workspace" : "Start Your First Goal"}
            </Link>
            <Link
              href="/demo"
              className="landing-btn-secondary"
              style={{
                display: "inline-block",
                fontSize: 15,
                fontWeight: 500,
                padding: "14px 32px",
                borderRadius: 12,
                background: "transparent",
                border: "1px solid var(--landing-border)",
                color: "var(--landing-text-secondary)",
                textDecoration: "none",
              }}
            >
              See Demo
            </Link>
          </div>
        </div>
      </FadeUp>
    </section>
  );
}
