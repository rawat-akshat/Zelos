"use client";

import AppShell from "../components/layout/AppShell";
import PageContent from "../components/layout/PageContent";
import Card from "../components/ui/Card";
import ActivityCalendar from "../components/features/ActivityCalendar";
import { generateStreakDays, mockUserStats } from "../lib/mock-data";
import { Flame, Trophy } from "lucide-react";

const streakDays = generateStreakDays(35);

const leaderboard = [
  { rank: 1, label: "User #4521", streak: 21, medal: "🥇" },
  { rank: 2, label: "User #1829", streak: 18, medal: "🥈" },
  { rank: 3, label: "User #7263", streak: 15, medal: "🥉" },
  { rank: 4, label: "User #3341", streak: 12 },
  { rank: 5, label: "User #9902", streak: 11 },
  { rank: 6, label: "User #5517", streak: 9 },
  { rank: 7, label: "User #2234", streak: 8 },
  { rank: 8, label: "You", streak: 7, isYou: true },
];

export default function StreaksPage() {
  const { currentStreak, longestStreak } = mockUserStats;
  const activeDays = streakDays.filter((d) => d.active).length;

  return (
    <AppShell>
      <PageContent title="Streaks" subtitle="Consistency compounds">
        {/* Current streak */}
        <Card accent padding="lg" className="relative overflow-hidden text-center">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at 50% 0%, rgba(198,169,105,0.12), transparent 60%)",
            }}
          />
          <Flame size={28} color="#C6A969" className="mx-auto mb-2" strokeWidth={1.5} />
          <p className="text-5xl font-bold mb-1 tabular-nums" style={{ color: "#FFFFFF" }}>
            {currentStreak}
          </p>
          <p className="text-sm" style={{ color: "#7A7A7A" }}>
            day streak
          </p>
          <div
            className="flex items-center justify-center gap-6 mt-4 pt-4"
            style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
          >
            <div className="text-center">
              <p className="text-lg font-semibold" style={{ color: "#FFFFFF" }}>
                {longestStreak}
              </p>
              <p className="text-xs mt-0.5" style={{ color: "#555" }}>
                Best
              </p>
            </div>
            <div className="w-px h-7" style={{ background: "rgba(255,255,255,0.06)" }} />
            <div className="text-center">
              <p className="text-lg font-semibold" style={{ color: "#FFFFFF" }}>
                {activeDays}
              </p>
              <p className="text-xs mt-0.5" style={{ color: "#555" }}>
                Active days
              </p>
            </div>
          </div>
        </Card>

        {/* Compact calendar */}
        <Card padding="lg">
          <ActivityCalendar days={streakDays} title="Activity Calendar" />
        </Card>

        {/* Leaderboard */}
        <Card padding="lg">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Trophy size={14} style={{ color: "#C6A969" }} />
            <h2 className="text-sm font-semibold" style={{ color: "#B5B5B5" }}>
              Streak Leaderboard
            </h2>
          </div>
          <div className="space-y-1">
            {leaderboard.map((entry) => (
              <div
                key={entry.rank}
                className="flex items-center gap-3 px-3 py-2 rounded-[10px]"
                style={{
                  background: entry.isYou ? "rgba(198,169,105,0.08)" : "transparent",
                  border: entry.isYou
                    ? "1px solid rgba(198,169,105,0.15)"
                    : "1px solid transparent",
                }}
              >
                <span
                  className="w-5 text-xs text-center flex-shrink-0"
                  style={{ color: entry.medal ? undefined : "#555" }}
                >
                  {entry.medal ?? entry.rank}
                </span>
                <span
                  className="flex-1 text-sm"
                  style={{
                    color: entry.isYou ? "#C6A969" : "#B5B5B5",
                    fontWeight: entry.isYou ? 600 : 400,
                  }}
                >
                  {entry.label}
                </span>
                <div className="flex items-center gap-1.5">
                  <Flame size={12} style={{ color: "#C6A969" }} />
                  <span className="text-sm font-medium" style={{ color: "#FFFFFF" }}>
                    {entry.streak}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </PageContent>
    </AppShell>
  );
}
