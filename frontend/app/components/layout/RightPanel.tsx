"use client";

// ─────────────────────────────────────────────────────────────────
// To add a new card:
//   1. Create a new file in ./right-panel/YourCard.tsx
//   2. Import it below and drop it into the aside
// ─────────────────────────────────────────────────────────────────

import TodaysFocusCard from "./right-panel/TodaysFocusCard";
import StreakCard from "./right-panel/StreakCard";
import XPCard from "./right-panel/XPCard";
import StatsRow from "./right-panel/StatsRow";
import RecentWinsCard from "./right-panel/RecentWinsCard";

export default function RightPanel() {
  return (
    <aside
      className="hidden xl:flex"
      style={{
        width: "var(--right-panel-width, 340px)",
        background: "var(--bg-elevated, #151515)",
        borderLeft: "1px solid rgba(255,255,255,0.05)",
        position: "fixed",
        right: 0,
        top: 0,
        height: "100%",
        overflowY: "auto",
        zIndex: 20,
        flexDirection: "column",
        gap: 14,
        padding: "32px 18px",
      }}
    >
      <TodaysFocusCard />
      <StreakCard />
      <XPCard />
      <StatsRow />
      <RecentWinsCard />
    </aside>
  );
}
