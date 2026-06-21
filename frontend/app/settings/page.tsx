"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import AppShell from "../components/layout/AppShell";
import PageContent from "../components/layout/PageContent";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import EditProfileModal from "../components/profile/EditProfileModal";
import UpgradeProModal from "../components/profile/UpgradeProModal";
import DeleteAccountModal from "../components/settings/DeleteAccountModal";
import { useAuth } from "../context/AuthContext";
import { api } from "../lib/api";
import { formatApiError } from "../lib/api-errors";
import InlineAlert from "../components/ui/InlineAlert";

type CoachingStyle = "supportive" | "balanced" | "direct";

const COACHING_STYLES: Array<{
  id: CoachingStyle;
  label: string;
  description: string;
  isDefault?: boolean;
}> = [
  {
    id: "supportive",
    label: "Supportive",
    description: "Encouraging and reflective.",
  },
  {
    id: "balanced",
    label: "Balanced",
    description: "Supportive with occasional challenges.",
    isDefault: true,
  },
  {
    id: "direct",
    label: "Direct",
    description: "Clear observations and accountability.",
  },
];

function formatMemberSince(date: Date) {
  return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

function formatDeletionDate(date: Date) {
  return date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

function formatRenewalDate(date: Date) {
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

function addDays(date: Date, days: number): Date {
  return new Date(date.getTime() + days * 86400000);
}

export default function SettingsPage() {
  const router = useRouter();
  const { user, isAuthenticated, loading: authLoading, refreshUser } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [editOpen, setEditOpen] = useState(false);
  const [upgradeOpen, setUpgradeOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deletionScheduledFor, setDeletionScheduledFor] = useState<Date | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const [coachingStyle, setCoachingStyle] = useState<CoachingStyle>("balanced");
  const [goalCheckins, setGoalCheckins] = useState(true);
  const [weeklyReflection, setWeeklyReflection] = useState(false);
  const [patternAlerts, setPatternAlerts] = useState(true);
  const [prefsError, setPrefsError] = useState<string | null>(null);

  const memberSince = user?.created_at ? new Date(user.created_at) : new Date();
  const isPremium = user?.subscription_plan === "premium";
  const showUpgrade = !isPremium;

  useEffect(() => {
    if (authLoading) return;
    if (!isAuthenticated) {
      router.replace("/login");
    }
  }, [authLoading, isAuthenticated, router]);

  useEffect(() => {
    if (!user) return;
    setName(user.name ?? "");
    setEmail(user.email);
    setAvatarUrl(user.avatar_url ?? null);
  }, [user]);

  useEffect(() => {
    if (!isAuthenticated) return;
    setPrefsError(null);
    api
      .getCoachingPreferences()
      .then((prefs) => {
        setCoachingStyle(prefs.coaching_style);
        setGoalCheckins(prefs.goal_checkins);
        setWeeklyReflection(prefs.weekly_reflection);
        setPatternAlerts(prefs.pattern_alerts);
      })
      .catch((err) => {
        setPrefsError(formatApiError(err));
      });
  }, [isAuthenticated]);

  const showToast = useCallback((message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 3200);
  }, []);

  const persistPreferences = useCallback(
    async (patch: Partial<{
      coaching_style: CoachingStyle;
      goal_checkins: boolean;
      weekly_reflection: boolean;
      pattern_alerts: boolean;
    }>) => {
      if (!isAuthenticated) return;
      try {
        await api.updateCoachingPreferences(patch);
      } catch (err) {
        showToast(formatApiError(err));
      }
    },
    [isAuthenticated, showToast]
  );

  const handleScheduleDeletion = () => {
    setDeletionScheduledFor(addDays(new Date(), 30));
    showToast("Account scheduled for deletion in 30 days.");
  };

  const handleRestoreAccount = () => {
    setDeletionScheduledFor(null);
    showToast("Account restored.");
  };

  if (authLoading || !isAuthenticated || !user) {
    return (
      <AppShell>
        <PageContent title="Settings" subtitle="Loading your account…" maxWidth={560}>
          <div />
        </PageContent>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <EditProfileModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        name={name}
        email={email}
        avatarUrl={avatarUrl}
        onSave={async ({ name: nextName, avatarUrl: nextAvatar }) => {
          try {
            await api.updateMe({ name: nextName, avatar_url: nextAvatar ?? undefined });
            setName(nextName);
            setAvatarUrl(nextAvatar);
            await refreshUser();
            showToast("Profile updated.");
          } catch (err) {
            showToast(formatApiError(err));
          }
        }}
      />
      <UpgradeProModal
        open={upgradeOpen}
        onClose={() => setUpgradeOpen(false)}
        onNotify={() => {
          setUpgradeOpen(false);
          showToast("We'll let you know when Pro is available.");
        }}
      />
      <DeleteAccountModal
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleScheduleDeletion}
      />

      <PageContent
        title="Settings"
        subtitle="Manage your account and coaching preferences."
        maxWidth={560}
      >
        <SettingSection title="Account">
          <Card padding="none" className="zelos-settings-card">
            <AccountProfileCard
              name={name || "Zelos user"}
              email={email}
              memberSince={formatMemberSince(memberSince)}
              loginMethod={user?.auth_provider ?? "Email"}
              avatarUrl={avatarUrl}
            />
          </Card>
          <Button
            variant="secondary"
            fullWidth
            className="zelos-settings-action-below"
            onClick={() => setEditOpen(true)}
          >
            Edit Profile
          </Button>
        </SettingSection>

        <SettingSection title="Coaching Preferences">
          {prefsError ? (
            <div style={{ marginBottom: 12 }}>
              <InlineAlert onDismiss={() => setPrefsError(null)}>{prefsError}</InlineAlert>
            </div>
          ) : null}
          <Card padding="none" className="zelos-settings-card">
            <CoachingStyleGroup
              value={coachingStyle}
              onChange={(style) => {
                setCoachingStyle(style);
                persistPreferences({ coaching_style: style });
              }}
              options={COACHING_STYLES}
            />
          </Card>
        </SettingSection>

        <SettingSection title="Coaching & Reminders">
          <Card padding="none" className="zelos-settings-card">
            <ToggleRow
              label="Goal Check-ins"
              description="Receive reminders when goals become inactive."
              checked={goalCheckins}
              onChange={(v) => {
                setGoalCheckins(v);
                persistPreferences({ goal_checkins: v });
              }}
            />
            <ToggleRow
              label="Weekly Reflection"
              description="Receive a weekly summary of patterns, progress, and insights."
              checked={weeklyReflection}
              onChange={(v) => {
                setWeeklyReflection(v);
                persistPreferences({ weekly_reflection: v });
              }}
            />
            <ToggleRow
              label="Pattern Alerts"
              description="Get notified when Zelos notices recurring behavioral patterns."
              checked={patternAlerts}
              onChange={(v) => {
                setPatternAlerts(v);
                persistPreferences({ pattern_alerts: v });
              }}
            />
          </Card>
        </SettingSection>

        <SettingSection title="Current Plan">
          <Card padding="none" className="zelos-settings-card">
            <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 12 }}>
              <MetaLine label="Plan" value={isPremium ? "Premium" : "Free"} />
              <MetaLine label="Status" value={isPremium ? "Active" : "Free tier"} />
            </div>
          </Card>
          {showUpgrade && (
            <Button
              variant="primary"
              fullWidth
              className="zelos-settings-action-below"
              onClick={() => setUpgradeOpen(true)}
            >
              Upgrade
            </Button>
          )}
        </SettingSection>

        <SettingSection
          title="Your Data"
          description="You own your data. Export controls are being expanded."
        >
          <Card padding="none" className="zelos-settings-card">
            <DataAction label="Export Conversations" onClick={() => showToast("Coming soon.")} />
            <DataAction label="Export Goals" onClick={() => showToast("Coming soon.")} />
            <DataAction label="Export Insights" onClick={() => showToast("Coming soon.")} />
          </Card>
        </SettingSection>

        <SettingSection title="Danger Zone" danger>
          {deletionScheduledFor ? (
            <>
              <Card padding="none" className="zelos-settings-card zelos-settings-card--danger">
                <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 14 }}>
                  <p style={{ fontSize: 15, fontWeight: 500, color: "var(--danger)", margin: 0 }}>
                    Account Scheduled For Deletion
                  </p>
                  <MetaLine label="Deletion Date" value={formatDeletionDate(deletionScheduledFor)} />
                  <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.55, margin: 0 }}>
                    You may restore your account before this date.
                  </p>
                </div>
              </Card>
              <Button
                variant="primary"
                fullWidth
                className="zelos-settings-action-below"
                onClick={handleRestoreAccount}
              >
                Restore Account
              </Button>
            </>
          ) : (
            <>
              <Card padding="none" className="zelos-settings-card zelos-settings-card--danger">
                <div style={{ padding: 24 }}>
                  <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.6, margin: 0 }}>
                    Schedule account deletion with a 30-day recovery window.
                  </p>
                </div>
              </Card>
              <Button
                variant="dangerOutline"
                fullWidth
                className="zelos-settings-action-below"
                onClick={() => setDeleteOpen(true)}
              >
                Delete Account
              </Button>
            </>
          )}
        </SettingSection>

        <div style={{ textAlign: "center", paddingTop: 8 }}>
          <p style={{ fontSize: 12, color: "var(--text-muted)" }}>Zelos · v1.0.0-beta</p>
        </div>
      </PageContent>

      {toast && (
        <div
          style={{
            position: "fixed",
            bottom: 28,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 60,
            padding: "12px 20px",
            borderRadius: 10,
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
            boxShadow: "var(--shadow-md)",
            fontSize: 14,
            color: "var(--text-primary)",
          }}
        >
          {toast}
        </div>
      )}
    </AppShell>
  );
}

function AccountProfileCard({
  name,
  email,
  memberSince,
  loginMethod,
  avatarUrl,
}: {
  name: string;
  email: string;
  memberSince: string;
  loginMethod: string;
  avatarUrl: string | null;
}) {
  const initials = getInitials(name);

  return (
    <div className="zelos-account-block">
      <div style={{ display: "flex", alignItems: "flex-start", gap: 18 }}>
        {avatarUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={avatarUrl}
            alt=""
            style={{
              width: 64,
              height: 64,
              borderRadius: "50%",
              objectFit: "cover",
              flexShrink: 0,
              border: "1px solid var(--border)",
            }}
          />
        ) : (
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: "50%",
              flexShrink: 0,
              background: "var(--accent-glow)",
              border: "1px solid var(--border-accent)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 20,
              fontWeight: 600,
              color: "var(--text-primary)",
            }}
          >
            {initials}
          </div>
        )}

        <div style={{ flex: 1, minWidth: 0 }}>
          <p className="font-heading" style={{ fontSize: 20, color: "var(--text-primary)", margin: "0 0 4px" }}>
            {name}
          </p>
          <p style={{ fontSize: 14, color: "var(--text-secondary)", margin: "0 0 6px", wordBreak: "break-word" }}>
            {email}
          </p>
          <p style={{ fontSize: 12, color: "var(--text-muted)", margin: 0, lineHeight: 1.45 }}>
            Email changes will be supported in a future update.
          </p>
        </div>
      </div>

      <div className="zelos-account-meta">
        <MetaLine label="Member Since" value={memberSince} />
        <MetaLine label="Login Method" value={loginMethod} />
      </div>
    </div>
  );
}

function MetaLine({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", gap: 16, fontSize: 13 }}>
      <span style={{ color: "var(--text-muted)", flexShrink: 0 }}>{label}</span>
      <span style={{ color: "var(--text-secondary)", textAlign: "right" }}>{value}</span>
    </div>
  );
}

function CoachingStyleGroup({
  value,
  onChange,
  options,
}: {
  value: CoachingStyle;
  onChange: (value: CoachingStyle) => void;
  options: typeof COACHING_STYLES;
}) {
  return (
    <div role="radiogroup" aria-label="Coaching style" style={{ display: "flex", flexDirection: "column" }}>
      {options.map((option, index) => {
        const selected = value === option.id;
        return (
          <div
            key={option.id}
            role="radio"
            aria-checked={selected}
            tabIndex={selected ? 0 : -1}
            onClick={() => onChange(option.id)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onChange(option.id);
              }
            }}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 12,
              width: "100%",
              padding: "14px 24px",
              borderBottom: index < options.length - 1 ? "1px solid var(--border)" : "none",
              background: selected ? "var(--accent-glow)" : "transparent",
              cursor: "pointer",
            }}
          >
            <span
              aria-hidden
              style={{
                width: 16,
                height: 16,
                marginTop: 2,
                borderRadius: "50%",
                border: `2px solid ${selected ? "var(--accent)" : "var(--border)"}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              {selected && (
                <span
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: "50%",
                    background: "var(--accent)",
                  }}
                />
              )}
            </span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 500,
                  color: "var(--text-primary)",
                  lineHeight: 1.35,
                  marginBottom: 2,
                }}
              >
                {option.label}
                {option.isDefault && (
                  <span style={{ fontSize: 12, fontWeight: 400, color: "var(--text-muted)", marginLeft: 6 }}>
                    (Default)
                  </span>
                )}
              </div>
              <div style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.4 }}>
                {option.description}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function ToggleRow({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description?: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="zelos-setting-row">
      <div className="zelos-setting-row-content">
        <div style={{ fontSize: 14, fontWeight: 500, color: "var(--text-primary)", lineHeight: 1.4 }}>
          {label}
        </div>
        {description && (
          <div style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.5, marginTop: 6 }}>
            {description}
          </div>
        )}
      </div>
      <Toggle checked={checked} onChange={onChange} label={label} />
    </div>
  );
}

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
      style={{
        position: "relative",
        flexShrink: 0,
        marginTop: 2,
        borderRadius: 999,
        background: checked ? "var(--accent)" : "var(--progress-track)",
        height: 24,
        width: 44,
        border: "none",
        cursor: "pointer",
        transition: "background 180ms var(--ease)",
      }}
    >
      <span
        style={{
          position: "absolute",
          top: 3,
          left: checked ? 23 : 3,
          width: 18,
          height: 18,
          borderRadius: "50%",
          background: "#fff",
          boxShadow: "var(--shadow-sm)",
          transition: "left 180ms var(--ease)",
        }}
      />
    </button>
  );
}

function DataAction({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="zelos-list-row">
      <span>{label}</span>
      <span className="zelos-badge-muted">Coming soon</span>
    </button>
  );
}

function SettingSection({
  title,
  description,
  children,
  danger,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
  danger?: boolean;
}) {
  return (
    <section>
      <p
        style={{
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: danger ? "var(--danger)" : "var(--text-muted)",
          marginBottom: description ? 8 : 12,
        }}
      >
        {title}
      </p>
      {description && <p className="zelos-settings-section-desc">{description}</p>}
      {children}
    </section>
  );
}
