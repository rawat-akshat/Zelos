import Link from "next/link";
import { Zap } from "lucide-react";

const FOOTER_LINKS = ["Privacy", "Terms", "Help", "Contact"];

export default function LandingFooter() {
  return (
    <footer
      style={{
        padding: "64px clamp(24px, 5vw, 64px) 48px",
        borderTop: "1px solid var(--landing-border)",
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 24,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              background: "rgba(107, 248, 253, 0.12)",
              border: "1px solid rgba(107, 248, 253, 0.35)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Zap size={16} strokeWidth={2.5} style={{ color: "#1E1E1E" }} />
          </div>
          <span className="font-landing-heading" style={{ fontSize: 18, color: "var(--landing-text)" }}>
            Zelos
          </span>
        </div>

        <nav style={{ display: "flex", flexWrap: "wrap", gap: "8px 28px" }}>
          {FOOTER_LINKS.map((label) => (
            <Link
              key={label}
              href="#"
              style={{
                fontSize: 14,
                color: "var(--landing-text-secondary)",
                textDecoration: "none",
              }}
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
