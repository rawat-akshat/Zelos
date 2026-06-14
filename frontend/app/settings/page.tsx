"use client";

import { useState } from "react";
import AppShell from "../components/layout/AppShell";
import PageContent from "../components/layout/PageContent";
import Card from "../components/ui/Card";
import { Moon, Sun, Bell, BellOff, Shield, LogOut, ChevronRight } from "lucide-react";

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
      className="relative flex-shrink-0 rounded-full transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C6A969]"
      style={{
        background: checked ? "#C6A969" : "rgba(255,255,255,0.1)",
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
}: {
  icon: React.ElementType;
  label: string;
  description?: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      className="flex items-center gap-4 py-3.5 border-b last:border-b-0"
      style={{ borderColor: "rgba(255,255,255,0.04)" }}
    >
      <div
        className="w-8 h-8 rounded-[8px] flex items-center justify-center flex-shrink-0"
        style={{ background: "rgba(255,255,255,0.05)" }}
      >
        <Icon size={15} style={{ color: "#7A7A7A" }} strokeWidth={1.75} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium" style={{ color: "#E0E0E0" }}>
          {label}
        </p>
        {description && (
          <p className="text-xs mt-0.5" style={{ color: "#555" }}>
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
          fontSize: 10,
          fontWeight: 600,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "#555",
          textAlign: "center",
          marginBottom: 8,
        }}
      >
        {title}
      </p>
      <Card padding="md">{children}</Card>
    </section>
  );
}

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  return (
    <AppShell>
      <PageContent title="Settings" subtitle="Customize your experience" maxWidth={480}>
        <SettingSection title="Appearance">
          <SettingRow
            icon={darkMode ? Moon : Sun}
            label="Dark Mode"
            description="Easier on the eyes, especially at night"
          >
            <Toggle checked={darkMode} onChange={setDarkMode} label="Toggle dark mode" />
          </SettingRow>
          <SettingRow
            icon={Shield}
            label="Reduce Motion"
            description="Minimize animations and transitions"
          >
            <Toggle checked={reducedMotion} onChange={setReducedMotion} label="Reduce motion" />
          </SettingRow>
        </SettingSection>

        <SettingSection title="Notifications">
          <SettingRow
            icon={notifications ? Bell : BellOff}
            label="Push Notifications"
            description="Reminders and follow-ups after sessions"
          >
            <Toggle
              checked={notifications}
              onChange={setNotifications}
              label="Toggle notifications"
            />
          </SettingRow>
        </SettingSection>

        <SettingSection title="Account">
          <SettingRow
            icon={Shield}
            label="Privacy & Data"
            description="Manage your data and export options"
          >
            <ChevronRight size={14} style={{ color: "#555" }} />
          </SettingRow>
          <SettingRow
            icon={LogOut}
            label="Sign Out"
            description="You're currently in mock mode"
          >
            <ChevronRight size={14} style={{ color: "#555" }} />
          </SettingRow>
        </SettingSection>

        <div className="text-center pt-2">
          <p className="text-xs" style={{ color: "#3A3A3A" }}>
            Zelos · v1.0.0-beta · Mock Mode
          </p>
          <div className="flex items-center justify-center gap-4 mt-2">
            {["Privacy", "Terms", "Contact"].map((link) => (
              <button
                key={link}
                className="text-xs transition-colors"
                style={{ color: "#3A3A3A" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#555")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#3A3A3A")}
              >
                {link}
              </button>
            ))}
          </div>
        </div>
      </PageContent>
    </AppShell>
  );
}
