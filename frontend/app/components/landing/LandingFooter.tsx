import Link from "next/link";

const FOOTER_LINKS = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Help", href: "/help" },
  { label: "Contact", href: "/contact" },
];

export default function LandingFooter() {
  return (
    <footer
      style={{
        padding: "80px clamp(24px, 5vw, 64px) 48px",
        borderTop: "1px solid var(--landing-border)",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            gap: 40,
            marginBottom: 56,
          }}
        >
          <div style={{ maxWidth: 320 }}>
            <span
              className="font-landing-heading"
              style={{ fontSize: 20, color: "var(--landing-text)", display: "block", marginBottom: 12 }}
            >
              Zelos
            </span>
            <p className="landing-body-sm" style={{ margin: 0 }}>
              Helping people move from intention to action.
            </p>
          </div>

          <nav style={{ display: "flex", flexWrap: "wrap", gap: "12px 32px", alignItems: "flex-start" }}>
            {FOOTER_LINKS.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
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

        <div
          style={{
            borderTop: "1px solid var(--landing-border)",
            paddingTop: 40,
            marginBottom: 40,
          }}
        >
          <h3
            className="font-landing-heading"
            style={{ fontSize: 18, marginBottom: 12, color: "var(--landing-text)" }}
          >
            Acknowledgment
          </h3>
          <p className="landing-body-sm" style={{ margin: 0, maxWidth: 720, lineHeight: 1.65 }}>
            Zelos is not designed for crisis situations and is not a replacement for professional
            mental health care. If you are in immediate danger or experiencing a mental health
            emergency, please seek professional help or contact local emergency services.
          </p>
        </div>

        <p className="landing-caption" style={{ margin: 0 }}>
          © Zelos 2026
        </p>
      </div>
    </footer>
  );
}
