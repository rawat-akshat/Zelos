"use client";

import { useState } from "react";
import Link from "next/link";
import AppShell from "../components/layout/AppShell";
import PageContent from "../components/layout/PageContent";
import Card from "../components/ui/Card";
import { mockUser } from "../lib/mock-data";
import {
  Bell,
  BellOff,
  Shield,
  User,
  Palette,
  Trash2,
  ChevronRight,
} from "lucide-react";

function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className="relative flex-shrink-0 rounded-full transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--accent)]"
      style={{
        background: checked ? "var(--accent)" : "var(--progress-track)",
        height: 22,
        width: 40,
      }}
    >
      <div
        className="absolute top-0.5 rounded-full bg-white shadow transition-all duration-200"
        style={{
          width: 18,
          height: 18,
          left: checked ? 20 : 2,
        }}
      />
    </button>
  );
}

function SettingRow({
  icon: Icon,
  label,
  description,
  children,
  borderless,
}: {
  icon: React.ElementType;
  label: string;
  description?: string;
  children?: React.ReactNode;
  borderless?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-4 py-3.5 ${borderless ? "" : "border-b last:border-b-0"}`}
      style={{ borderColor: "var(--border)" }}
    >
      <div
        className="w-8 h-8 rounded-[8px] flex items-center justify-center flex-shrink-0"
        style={{ background: "var(--nav-hover-bg)" }}
      >
        <Icon size={15} style={{ color: "var(--text-muted)" }} strokeWidth={1.75} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
          {label}
        </p>
        {description && (
          <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
            {description}
          </p>
        )}
      </div>
      {children}
    </div>
  );
}

function SettingSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <p
        style={{
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "var(--text-muted)",
          marginBottom: 12,
        }}
      >
        {title}
      </p>
      <Card padding="md">{children}</Card>
    </section>
  );
}

const THEMES = [
  { id: "warm", label: "Warm Cream", description: "Default Zelos aesthetic" },
  { id: "system", label: "System", description: "Match your device settings" },
] as const;

export default function SettingsPage() {
  const [notifications, setNotifications] = useState(true);
  const [emailReminders, setEmailReminders] = useState(false);
  const [sessionSummaries, setSessionSummaries] = useState(true);
  const [theme, setTheme] = useState<(typeof THEMES)[number]["id"]>("warm");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  return (
    <AppShell>
      <PageContent title="Settings" subtitle="Manage your account and preferences" maxWidth={560}>
        <SettingSection title="Account">
          <SettingRow icon={User} label="Name" description={mockUser.name}>
            <ChevronRight size={14} style={{ color: "var(--text-muted)" }} />
          </SettingRow>
          <SettingRow icon={User} label="Email" description={mockUser.email}>
            <ChevronRight size={14} style={{ color: "var(--text-muted)" }} />
          </SettingRow>
        </SettingSection>

        <SettingSection title="Theme">
          {THEMES.map((option, i) => (
            <button
              key={option.id}
              type="button"
              onClick={() => setTheme(option.id)}
              className="w-full text-left"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                padding: "12px 0",
                borderBottom: i < THEMES.length - 1 ? "1px solid var(--border)" : "none",
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              <div
                className="w-8 h-8 rounded-[8px] flex items-center justify-center flex-shrink-0"
                style={{ background: "var(--nav-hover-bg)" }}
              >
                <Palette size={15} style={{ color: "var(--text-muted)" }} strokeWidth={1.75} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                  {option.label}
                </p>
                <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                  {option.description}
                </p>
              </div>
              <div
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: "50%",
                  border: `2px solid ${theme === option.id ? "var(--accent)" : "var(--border)"}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                {theme === option.id && (
                  <div
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: "var(--accent)",
                    }}
                  />
                )}
              </div>
            </button>
          ))}
        </SettingSection>

        <SettingSection title="Notifications">
          <SettingRow
            icon={notifications ? Bell : BellOff}
            label="Push Notifications"
            description="Reminders and gentle nudges after sessions"
          >
            <Toggle
              checked={notifications}
              onChange={setNotifications}
              label="Toggle push notifications"
            />
          </SettingRow>
          <SettingRow
            icon={Bell}
            label="Email Reminders"
            description="Weekly check-in emails"
          >
            <Toggle
              checked={emailReminders}
              onChange={setEmailReminders}
              label="Toggle email reminders"
            />
          </SettingRow>
          <SettingRow
            icon={Bell}
            label="Session Summaries"
            description="Receive a summary after each session"
            borderless
          >
            <Toggle
              checked={sessionSummaries}
              onChange={setSessionSummaries}
              label="Toggle session summaries"
            />
          </SettingRow>
        </SettingSection>

        <SettingSection title="Privacy">
          <SettingRow
            icon={Shield}
            label="Data & Privacy"
            description="How your sessions and data are stored"
          >
            <Link href="/privacy" style={{ color: "var(--text-muted)" }}>
              <ChevronRight size={14} />
            </Link>
          </SettingRow>
          <SettingRow
            icon={Shield}
            label="Export My Data"
            description="Download a copy of your session history"
            borderless
          >
            <ChevronRight size={14} style={{ color: "var(--text-muted)" }} />
          </SettingRow>
        </SettingSection>

        <SettingSection title="Delete Account">
          {!showDeleteConfirm ? (
            <SettingRow
              icon={Trash2}
              label="Delete Account"
              description="Permanently remove your account and all session data"
              borderless
            >
              <button
                type="button"
                onClick={() => setShowDeleteConfirm(true)}
                className="text-xs font-medium px-3 py-1.5 rounded-lg transition-colors"
                style={{
                  color: "var(--danger, #B85C5C)",
                  border: "1px solid var(--border)",
                  background: "transparent",
                }}
              >
                Delete
              </button>
            </SettingRow>
          ) : (
            <div style={{ padding: "8px 0" }}>
              <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: 16 }}>
                This action cannot be undone. All your sessions, progress, and account data will be
                permanently deleted.
              </p>
              <div style={{ display: "flex", gap: 10 }}>
                <button
                  type="button"
                  onClick={() => setShowDeleteConfirm(false)}
                  className="text-sm px-4 py-2 rounded-lg"
                  style={{
                    border: "1px solid var(--border)",
                    color: "var(--text-secondary)",
                    background: "transparent",
                  }}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="text-sm px-4 py-2 rounded-lg"
                  style={{
                    background: "var(--danger, #B85C5C)",
                    color: "#fff",
                    border: "none",
                  }}
                >
                  Confirm Delete
                </button>
              </div>
            </div>
          )}
        </SettingSection>

        <div className="text-center pt-2">
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>
            Zelos · v1.0.0-beta
          </p>
        </div>
      </PageContent>
    </AppShell>
  );
}
