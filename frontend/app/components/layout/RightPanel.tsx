"use client";

import ActiveGoalCard from "./right-panel/ActiveGoalCard";
import GoalTimelineCard from "./right-panel/GoalTimelineCard";
import PatternsNoticedCard from "./right-panel/PatternsNoticedCard";
import NextStepCard from "./right-panel/NextStepCard";
import type { Goal, Pattern, TimelineEvent } from "../../lib/types";

interface RightPanelProps {
  activeGoal?: Goal | null;
  patterns?: Pattern[];
  timelineEvents?: TimelineEvent[];
  isNewUser?: boolean;
  hasWorkspaceHistory?: boolean;
}

export default function RightPanel({
  activeGoal,
  patterns,
  timelineEvents,
  isNewUser = false,
  hasWorkspaceHistory = false,
}: RightPanelProps) {
  const empty = isNewUser || !activeGoal;
  const showTimeline = hasWorkspaceHistory && !empty;

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
      <ActiveGoalCard goal={empty ? null : activeGoal} />
      {showTimeline && <GoalTimelineCard events={timelineEvents} />}
      <PatternsNoticedCard patterns={empty ? [] : patterns} empty={empty || !hasWorkspaceHistory} />
      <NextStepCard nextStep={empty ? null : activeGoal?.nextStep} empty={empty} />
    </aside>
  );
}
