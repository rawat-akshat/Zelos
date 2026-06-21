import type { InsightsPageData } from "./types";
import type { ApiInsightsPage } from "./api";

export function apiInsightsToPageData(data: ApiInsightsPage): InsightsPageData {
  return {
    hasData: data.has_data,
    summary: {
      activeGoals: data.summary.active_goals,
      patternsDetected: data.summary.patterns_detected,
      playbookRulesLearned: data.summary.playbook_rules_learned,
      experimentsCompleted: data.summary.experiments_completed,
    },
    behavioralProfile: data.behavioral_profile.map((m) => ({
      label: m.label,
      value: m.value,
    })),
    patterns: data.patterns.map((p) => ({
      id: p.id,
      name: p.name,
      description: p.description,
      confidence: p.confidence,
      observedCount: p.observed_count,
      lastObservedAt: p.last_observed_at,
      goals: p.goals.map((g) => ({
        goalId: g.goal_id,
        goalTitle: g.goal_title,
        count: g.count,
      })),
      trend: p.trend as "increasing" | "decreasing" | "stable" | undefined,
    })),
    occurrences: data.occurrences.map((o) => ({
      id: o.id,
      patternId: o.pattern_id,
      goalId: o.goal_id,
      goalTitle: o.goal_title,
      conversationId: o.conversation_id,
      messageId: o.message_id,
      confidence: o.confidence,
      evidenceText: o.evidence_text,
      messagePreview: o.message_preview,
      createdAt: o.created_at,
    })),
    playbook: {
      worksWell: data.playbook.works_well,
      doesNotWork: data.playbook.does_not_work,
    },
    timeline: data.timeline.map((t) => ({
      id: t.id,
      type: t.type,
      title: t.title,
      goalTitle: t.goal_title,
      createdAt: new Date(t.created_at),
    })),
    activeExperiments: data.active_experiments.map((e) => ({
      id: e.id,
      title: e.title,
      goalTitle: e.goal_title,
      status: e.status as "active" | "completed",
      date: new Date(e.date),
    })),
    completedExperiments: data.completed_experiments.map((e) => ({
      id: e.id,
      title: e.title,
      goalTitle: e.goal_title,
      status: e.status as "active" | "completed",
      date: new Date(e.date),
    })),
  };
}

export function getOccurrencesForPattern(
  patternId: string,
  occurrences: InsightsPageData["occurrences"]
) {
  return occurrences.filter((o) => o.patternId === patternId);
}
