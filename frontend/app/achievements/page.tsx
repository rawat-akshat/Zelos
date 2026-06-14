"use client";

import { motion } from "framer-motion";
import AppShell from "../components/layout/AppShell";
import PageContent from "../components/layout/PageContent";
import { mockAchievements } from "../lib/mock-data";
import {
  Footprints,
  Flame,
  BookOpen,
  Timer,
  Zap,
  Target,
  CalendarCheck,
  ShieldCheck,
  Crown,
  Compass,
  Rocket,
  RefreshCw,
} from "lucide-react";
import type { Achievement } from "../lib/types";

const iconMap: Record<string, React.ElementType> = {
  footprints: Footprints,
  flame: Flame,
  "book-open": BookOpen,
  timer: Timer,
  zap: Zap,
  target: Target,
  "calendar-check": CalendarCheck,
  "shield-check": ShieldCheck,
  crown: Crown,
  compass: Compass,
  rocket: Rocket,
  "refresh-cw": RefreshCw,
};

const unlockedAchievements = mockAchievements.filter((a) => a.unlocked);
const lockedAchievements = mockAchievements.filter((a) => !a.unlocked);

export default function AchievementsPage() {
  return (
    <AppShell>
      <PageContent
        title="Achievements"
        subtitle={`${unlockedAchievements.length} of ${mockAchievements.length} unlocked`}
      >
        <section>
          <p
            style={{
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#555",
              textAlign: "center",
              marginBottom: 12,
            }}
          >
            Earned
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {unlockedAchievements.map((achievement, i) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.06, duration: 0.25 }}
              >
                <AchievementCard achievement={achievement} />
              </motion.div>
            ))}
          </div>
        </section>

        <section>
          <p
            style={{
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#3A3A3A",
              textAlign: "center",
              marginBottom: 12,
            }}
          >
            Locked
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {lockedAchievements.map((achievement, i) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + i * 0.06, duration: 0.25 }}
              >
                <AchievementCard achievement={achievement} locked />
              </motion.div>
            ))}
          </div>
        </section>

        {unlockedAchievements.length === 0 && (
          <div className="text-center py-12">
            <p className="text-sm" style={{ color: "#3A3A3A" }}>
              Complete your first action to unlock achievements
            </p>
          </div>
        )}
      </PageContent>
    </AppShell>
  );
}

function AchievementCard({
  achievement,
  locked = false,
}: {
  achievement: Achievement;
  locked?: boolean;
}) {
  const Icon = iconMap[achievement.icon] ?? Zap;

  return (
    <div
      className="flex flex-col items-center text-center p-4 rounded-[14px] transition-all duration-200"
      style={{
        background: locked ? "#161616" : "#202020",
        border: `1px solid ${locked ? "rgba(255,255,255,0.04)" : "rgba(198,169,105,0.15)"}`,
        opacity: locked ? 0.45 : 1,
      }}
    >
      <div
        className="w-10 h-10 rounded-[12px] flex items-center justify-center mb-2.5"
        style={{
          background: locked ? "rgba(255,255,255,0.04)" : "rgba(198,169,105,0.1)",
        }}
      >
        <Icon size={18} style={{ color: locked ? "#3A3A3A" : "#C6A969" }} strokeWidth={1.5} />
      </div>
      <h3
        className="text-xs font-semibold mb-1 leading-tight"
        style={{ color: locked ? "#3A3A3A" : "#E0E0E0" }}
      >
        {locked ? "???" : achievement.title}
      </h3>
      <p className="text-[10px] leading-snug" style={{ color: locked ? "#2A2A2A" : "#555" }}>
        {locked ? "Keep going to unlock" : achievement.description}
      </p>
      {!locked && achievement.unlockedAt && (
        <p className="text-[9px] mt-2" style={{ color: "#C6A969", opacity: 0.6 }}>
          {achievement.unlockedAt.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          })}
        </p>
      )}
    </div>
  );
}
