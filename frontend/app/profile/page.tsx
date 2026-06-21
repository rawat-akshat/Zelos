"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Check } from "lucide-react";
import AppShell from "../components/layout/AppShell";
import PageContent from "../components/layout/PageContent";
import ProfileSection, { ProfileRow, ProfileRowLast } from "../components/layout/ProfileSection";
import Button from "../components/ui/Button";
import Toast from "../components/ui/Toast";
import InlineAlert from "../components/ui/InlineAlert";
import UpgradeProModal from "../components/profile/UpgradeProModal";
import EditProfileModal from "../components/profile/EditProfileModal";
import { useAuth } from "../context/AuthContext";
import { api } from "../lib/api";
import { formatApiError } from "../lib/api-errors";

const FREE_PLAN_FEATURES = [
  "Limited active goals",
  "Basic goal memory",
  "Standard coaching",
  "Basic pattern detection",
];

function formatMemberSince(date: Date) {
  return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export default function ProfilePage() {
  const router = useRouter();
  const { user, isAuthenticated, loading: authLoading, refreshUser } = useAuth();
  const [upgradeOpen, setUpgradeOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [snapshot, setSnapshot] = useState({
    activeGoals: 0,
    patternsIdentified: 0,
    playbookRulesLearned: 0,
    goalsCompleted: 0,
  });
  const [snapshotError, setSnapshotError] = useState<string | null>(null);

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
    api
      .getInsights()
      .then((data) => {
        setSnapshot({
          activeGoals: data.summary.active_goals,
          patternsIdentified: data.summary.patterns_detected,
          playbookRulesLearned: data.summary.playbook_rules_learned,
          goalsCompleted: data.summary.experiments_completed,
        });
      })
      .catch((err) => setSnapshotError(formatApiError(err)));
  }, [isAuthenticated]);

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 3200);
  };

  if (authLoading || !user) {
    return (
      <AppShell>
        <PageContent title="Profile" subtitle="Loading your account…">
          <div />
        </PageContent>
      </AppShell>
    );
  }

  const memberSince = user.created_at ? new Date(user.created_at) : new Date();
  const isPremium = user.subscription_plan === "premium";
  const displayName = name.trim() || email.split("@")[0] || "Account";

  return (
    <AppShell>
      <UpgradeProModal
        open={upgradeOpen}
        onClose={() => setUpgradeOpen(false)}
        onNotify={() => {
          setUpgradeOpen(false);
          showToast("We'll let you know when Pro is available.");
        }}
      />
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

      <PageContent title="Profile" subtitle="Your account, plan, and data controls.">
        <ProfileHeaderCard
          name={displayName}
          email={email}
          memberSince={formatMemberSince(memberSince)}
          avatarUrl={avatarUrl}
          onEdit={() => setEditOpen(true)}
        />

        <ProfileSection title="Current Plan">
          <p className="font-heading" style={{ fontSize: 28, color: "var(--text-primary)", margin: "0 0 8px" }}>
            {isPremium ? "Pro" : "Free"}
          </p>
          <p style={{ fontSize: 14, color: "var(--text-secondary)", margin: "0 0 20px" }}>
            {isPremium ? "You are on the Pro plan." : "You are on the free plan."}
          </p>
          {!isPremium && (
            <>
              <ul
                style={{
                  listStyle: "none",
                  margin: "0 0 24px",
                  padding: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                }}
              >
                {FREE_PLAN_FEATURES.map((feature) => (
                  <li
                    key={feature}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      fontSize: 14,
                      color: "var(--text-secondary)",
                    }}
                  >
                    <Check size={14} style={{ color: "var(--accent)", flexShrink: 0 }} />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button variant="primary" onClick={() => setUpgradeOpen(true)}>
                Upgrade to Pro
              </Button>
            </>
          )}
        </ProfileSection>

        <ProfileSection title="Your Zelos Snapshot">
          {snapshotError ? (
            <InlineAlert onDismiss={() => setSnapshotError(null)}>{snapshotError}</InlineAlert>
          ) : (
            <>
              <ProfileRow label="Active Goals" value={snapshot.activeGoals} />
              <ProfileRow label="Patterns Identified" value={snapshot.patternsIdentified} />
              <ProfileRow
                label="Playbook Rules Learned"
                value={snapshot.playbookRulesLearned}
              />
              <ProfileRowLast label="Goals Completed" value={snapshot.goalsCompleted} />
            </>
          )}
        </ProfileSection>

        <ProfileSection title="Data & Privacy">
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 16 }}>
            <PrivacyAction label="Export Data" disabled />
            <PrivacyAction label="Delete Account" disabled />
            <PrivacyAction label="Privacy Settings" disabled />
          </div>
          <p style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.6, margin: "0 0 12px" }}>
            You control your account data. More detailed export and deletion controls will be added soon.
          </p>
          <Link href="/settings" style={{ fontSize: 13, color: "var(--text-secondary)" }}>
            Account settings →
          </Link>
        </ProfileSection>
      </PageContent>

      {toast && <Toast message={toast} />}
    </AppShell>
  );
}

function ProfileHeaderCard({
  name,
  email,
  memberSince,
  avatarUrl,
  onEdit,
}: {
  name: string;
  email: string;
  memberSince: string;
  avatarUrl: string | null;
  onEdit: () => void;
}) {
  const initials = getInitials(name);

  return (
    <section>
      <div
        style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius-card)",
          padding: "24px 28px",
          boxShadow: "var(--shadow-sm)",
          display: "flex",
          alignItems: "center",
          gap: 20,
          flexWrap: "wrap",
        }}
      >
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
              fontFamily: "var(--font-body)",
            }}
          >
            {initials}
          </div>
        )}

        <div style={{ flex: 1, minWidth: 180 }}>
          <p className="font-heading" style={{ fontSize: 20, color: "var(--text-primary)", margin: "0 0 4px" }}>
            {name}
          </p>
          <p style={{ fontSize: 14, color: "var(--text-secondary)", margin: "0 0 4px" }}>{email}</p>
          <p style={{ fontSize: 13, color: "var(--text-muted)", margin: 0 }}>Member since {memberSince}</p>
        </div>

        <Button variant="secondary" size="sm" onClick={onEdit}>
          Edit Profile
        </Button>
      </div>
    </section>
  );
}

function PrivacyAction({ label, disabled }: { label: string; disabled?: boolean }) {
  return (
    <button
      type="button"
      disabled={disabled}
      style={{
        width: "100%",
        textAlign: "left",
        padding: "12px 14px",
        borderRadius: 10,
        background: "var(--bg-elevated)",
        border: "1px solid var(--border)",
        color: disabled ? "var(--text-muted)" : "var(--text-primary)",
        fontSize: 14,
        cursor: disabled ? "not-allowed" : "pointer",
        fontFamily: "var(--font-body)",
        opacity: disabled ? 0.75 : 1,
      }}
    >
      {label}
    </button>
  );
}
