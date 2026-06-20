"use client";

import AppShell from "../components/layout/AppShell";
import PageContent from "../components/layout/PageContent";
import ProfileSection, { ProfileRow, ProfileRowLast } from "../components/layout/ProfileSection";
import { mockUser, mockUsage } from "../lib/mock-data";

function formatMemberSince(date: Date) {
  return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

export default function ProfilePage() {
  return (
    <AppShell>
      <PageContent title="Profile" subtitle="Your account and usage">
        <ProfileSection title="Account">
          <ProfileRow label="Name" value={mockUser.name} />
          <ProfileRow label="Email" value={mockUser.email} />
          <ProfileRowLast label="Member Since" value={formatMemberSince(mockUser.memberSince)} />
        </ProfileSection>

        <ProfileSection title="Subscription">
          <ProfileRow label="Plan" value={mockUser.plan} />
          <ProfileRowLast
            label="Status"
            value={mockUser.plan === "Free" ? "Free tier" : "Premium"}
          />
        </ProfileSection>

        <ProfileSection title="Usage">
          <ProfileRow label="Active Goals" value={mockUsage.goalsActive} />
          <ProfileRow label="Messages This Month" value={mockUsage.messagesThisMonth} />
          <ProfileRowLast
            label="Focus Sessions This Month"
            value={mockUsage.focusSessionsThisMonth}
          />
        </ProfileSection>

        <ProfileSection title="Data Controls">
          <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.6 }}>
            Export and delete options will live here. For now, manage account settings under Settings.
          </p>
        </ProfileSection>
      </PageContent>
    </AppShell>
  );
}
