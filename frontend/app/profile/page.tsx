"use client";

import AppShell from "../components/layout/AppShell";
import PageContent from "../components/layout/PageContent";
import ProfileSection, { ProfileRow, ProfileRowLast } from "../components/layout/ProfileSection";
import {
  mockUser,
  mockUserStats,
  mockProfileAchievements,
} from "../lib/mock-data";
import { Check } from "lucide-react";

const FREE_FEATURES = ["Learn Mode", "Task Mode", "Session History"];
const PREMIUM_FEATURES = [
  "Weekly Insights",
  "Voice Input",
  "Advanced Reflection Reports",
];

const FUTURE_INSIGHTS = [
  "Most Common Blocker",
  "Most Productive Day",
  "Most Common Session Type",
  "Weekly Reflection",
];

function formatMemberSince(date: Date) {
  return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

export default function ProfilePage() {
  return (
    <AppShell>
      <PageContent title="Profile" subtitle="Your account, progress, and reflection journey">
        <ProfileSection title="Account">
          <ProfileRow label="Name" value={mockUser.name} />
          <ProfileRow label="Email" value={mockUser.email} />
          <ProfileRowLast label="Member Since" value={formatMemberSince(mockUser.memberSince)} />
        </ProfileSection>

        <ProfileSection title="Plan">
          <ProfileRow label="Current Plan" value={mockUser.plan} />
          <div style={{ paddingTop: 16 }}>
            <p style={{ fontSize: 13, fontWeight: 500, color: "var(--text-primary)", marginBottom: 10 }}>
              Available Features
            </p>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 8 }}>
              {FREE_FEATURES.map((feature) => (
                <li key={feature} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, color: "var(--text-secondary)" }}>
                  <Check size={14} style={{ color: "var(--success)", flexShrink: 0 }} />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          <div style={{ paddingTop: 20, borderTop: "1px solid var(--border)", marginTop: 16 }}>
            <p style={{ fontSize: 13, fontWeight: 500, color: "var(--text-primary)", marginBottom: 10 }}>
              Premium Features (Coming Soon)
            </p>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 8 }}>
              {PREMIUM_FEATURES.map((feature) => (
                <li key={feature} style={{ fontSize: 14, color: "var(--text-muted)" }}>
                  • {feature}
                </li>
              ))}
            </ul>
          </div>
        </ProfileSection>

        <ProfileSection title="Progress">
          <ProfileRow label="Current Streak" value={`${mockUserStats.currentStreak} days`} />
          <ProfileRow label="Longest Streak" value={`${mockUserStats.longestStreak} days`} />
          <ProfileRow label="Total Sessions" value={mockUserStats.totalSessions} />
          <ProfileRowLast label="Tasks Completed" value={mockUserStats.tasksCompleted} />
        </ProfileSection>

        <ProfileSection title="Achievements">
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {mockProfileAchievements.map((achievement, i) => (
              <div
                key={achievement.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 12,
                  padding: "10px 0",
                  borderBottom:
                    i < mockProfileAchievements.length - 1 ? "1px solid var(--border)" : "none",
                }}
              >
                <span
                  style={{
                    fontSize: 14,
                    color: achievement.unlocked ? "var(--text-primary)" : "var(--text-muted)",
                  }}
                >
                  {achievement.title}
                </span>
                <span
                  style={{
                    fontSize: 12,
                    color: achievement.unlocked ? "var(--accent)" : "var(--text-muted)",
                  }}
                >
                  {achievement.unlocked ? "Unlocked" : "Locked"}
                </span>
              </div>
            ))}
          </div>
        </ProfileSection>

        <ProfileSection title="Insights">
          <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 16, lineHeight: 1.6 }}>
            Coming Soon — gentle reflections on your patterns over time.
          </p>
          <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 8 }}>
            {FUTURE_INSIGHTS.map((insight) => (
              <li key={insight} style={{ fontSize: 14, color: "var(--text-muted)" }}>
                • {insight}
              </li>
            ))}
          </ul>
        </ProfileSection>
      </PageContent>
    </AppShell>
  );
}
