"use client";

import { motion } from "framer-motion";
import AppShell from "../components/layout/AppShell";
import PageContent from "../components/layout/PageContent";
import Card from "../components/ui/Card";
import ActivityCalendar from "../components/features/ActivityCalendar";
import { generateStreakDays, mockUserStats, mockSessions } from "../lib/mock-data";
import { blockerTextColors } from "../lib/mock-data";
import type { BlockerType } from "../lib/types";

const streakDays = generateStreakDays(35);

const blockerBreakdown: Array<{ type: BlockerType; label: string; count: number }> = [
  { type: "perfectionism", label: "Perfectionism", count: 6 },
  { type: "overwhelm", label: "Overwhelm", count: 5 },
  { type: "ambiguity", label: "Ambiguity", count: 4 },
  { type: "avoidance", label: "Avoidance", count: 3 },
  { type: "procrastination", label: "Procrastination", count: 2 },
];
const maxCount = Math.max(...blockerBreakdown.map((b) => b.count));

export default function InsightsPage() {
  const { totalXP, tasksCompleted, focusSessions, totalActionsCompleted } = mockUserStats;
  const completionRate = Math.round(
    (mockSessions.filter((s) => s.isCompleted).length / mockSessions.length) * 100
  );
  const completedCount = mockSessions.filter((s) => s.isCompleted).length;

  return (
    <AppShell>
      <PageContent title="Insights" subtitle="Your progress will deepen over time">
        {/* Stat grid */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: "Total XP", value: totalXP, suffix: "XP" },
            { label: "Tasks Completed", value: tasksCompleted, suffix: "" },
            { label: "Focus Sessions", value: focusSessions, suffix: "" },
            { label: "Actions Done", value: totalActionsCompleted, suffix: "" },
          ].map(({ label, value, suffix }) => (
            <Card key={label} padding="md" className="text-center">
              <p className="text-2xl font-bold mb-1" style={{ color: "#FFFFFF" }}>
                {value}
                {suffix && (
                  <span className="text-sm font-normal ml-1" style={{ color: "#7A7A7A" }}>
                    {suffix}
                  </span>
                )}
              </p>
              <p className="text-xs" style={{ color: "#555" }}>
                {label}
              </p>
            </Card>
          ))}
        </div>

        {/* Compact activity heatmap */}
        <Card padding="lg">
          <ActivityCalendar
            days={streakDays}
            title="Activity — Last 5 Weeks"
            showLegend
          />
        </Card>

        {/* Blocker breakdown */}
        <Card padding="lg">
          <h2
            className="text-sm font-semibold mb-4"
            style={{ color: "#B5B5B5", textAlign: "center" }}
          >
            Common Blockers
          </h2>
          <div className="space-y-3">
            {blockerBreakdown.map(({ type, label, count }) => (
              <div key={type} className="flex items-center gap-3">
                <span className="text-xs w-24 flex-shrink-0" style={{ color: "#7A7A7A" }}>
                  {label}
                </span>
                <div
                  className="flex-1 h-1.5 rounded-full overflow-hidden"
                  style={{ background: "rgba(255,255,255,0.05)" }}
                >
                  <motion.div
                    className="h-full rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${(count / maxCount) * 100}%` }}
                    transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
                    style={{ background: blockerTextColors[type] }}
                  />
                </div>
                <span className="text-xs w-4 text-right flex-shrink-0" style={{ color: "#555" }}>
                  {count}
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* Session completion */}
        <Card padding="lg">
          <h2
            className="text-sm font-semibold mb-4"
            style={{ color: "#B5B5B5", textAlign: "center" }}
          >
            Session Completion
          </h2>
          <div className="flex items-center justify-center gap-5">
            <div className="relative w-16 h-16 flex-shrink-0">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <circle
                  cx="18"
                  cy="18"
                  r="15"
                  fill="none"
                  stroke="rgba(255,255,255,0.06)"
                  strokeWidth="3"
                />
                <circle
                  cx="18"
                  cy="18"
                  r="15"
                  fill="none"
                  stroke="#C6A969"
                  strokeWidth="3"
                  strokeDasharray={`${(completedCount / mockSessions.length) * 94} 94`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-sm font-semibold" style={{ color: "#FFFFFF" }}>
                  {completionRate}%
                </span>
              </div>
            </div>
            <div>
              <p className="text-lg font-semibold" style={{ color: "#FFFFFF" }}>
                {completedCount} of {mockSessions.length}
              </p>
              <p className="text-xs mt-0.5" style={{ color: "#555" }}>
                sessions completed
              </p>
            </div>
          </div>
        </Card>
      </PageContent>
    </AppShell>
  );
}
