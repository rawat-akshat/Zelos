"use client";

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
        background: "var(--bg-elevated)",
        borderLeft: "1px solid var(--border)",
        position: "fixed",
        right: 0,
        top: 0,
        height: "100%",
        overflowY: "auto",
        zIndex: 20,
        flexDirection: "column",
        gap: 18,
        padding: "40px 22px",
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
