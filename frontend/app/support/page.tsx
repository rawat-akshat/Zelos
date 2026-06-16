"use client";

import Link from "next/link";
import AppShell from "../components/layout/AppShell";
import PageContent from "../components/layout/PageContent";
import ProfileSection from "../components/layout/ProfileSection";
import { ChevronRight, Mail } from "lucide-react";

const HELP_LINKS = [
  { label: "FAQ", href: "/help", description: "Answers to common questions" },
  { label: "Contact Support", href: "/contact", description: "Get in touch with our team" },
  { label: "Privacy Policy", href: "/privacy", description: "How we handle your data" },
  { label: "Terms of Service", href: "/terms", description: "Terms of using Zelos" },
];

export default function SupportPage() {
  return (
    <AppShell>
      <PageContent title="Help" subtitle="Support, FAQs, and policies">
        <ProfileSection title="FAQ & Support">
          <div style={{ display: "flex", flexDirection: "column" }}>
            {HELP_LINKS.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 12,
                  padding: "14px 0",
                  borderBottom: i < HELP_LINKS.length - 1 ? "1px solid var(--border)" : "none",
                  textDecoration: "none",
                }}
              >
                <div>
                  <p style={{ fontSize: 14, fontWeight: 500, color: "var(--text-primary)", marginBottom: 2 }}>
                    {link.label}
                  </p>
                  <p style={{ fontSize: 13, color: "var(--text-muted)", margin: 0 }}>
                    {link.description}
                  </p>
                </div>
                <ChevronRight size={16} style={{ color: "var(--text-muted)", flexShrink: 0 }} />
              </Link>
            ))}
          </div>
        </ProfileSection>

        <ProfileSection title="Contact">
          <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
            <Mail size={18} style={{ color: "var(--accent)", marginTop: 2, flexShrink: 0 }} />
            <div>
              <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 8, lineHeight: 1.6 }}>
                Need help with something specific? Email us and we&apos;ll get back to you within 2–3
                business days.
              </p>
              <Link
                href="mailto:contact@zelos.app"
                style={{ fontSize: 14, color: "var(--text-primary)", textDecoration: "underline", textUnderlineOffset: 3 }}
              >
                contact@zelos.app
              </Link>
            </div>
          </div>
        </ProfileSection>
      </PageContent>
    </AppShell>
  );
}
