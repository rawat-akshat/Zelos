"use client";

import { motion } from "framer-motion";
import AppShell from "../components/layout/AppShell";
import PageContent from "../components/layout/PageContent";
import Card from "../components/ui/Card";
import { BlockerBadge } from "../components/ui/Badge";
import { mockSessions } from "../lib/mock-data";
import type { Session } from "../lib/types";
import { CheckCircle2, Clock, MoreHorizontal } from "lucide-react";

function groupByDate(sessions: Session[]) {
  const groups: Record<string, Session[]> = {};
  const now = Date.now();
  const dayMs = 86400000;

  for (const s of sessions) {
    const diff = Math.floor((now - s.createdAt.getTime()) / dayMs);
    const label =
      diff === 0 ? "Today" : diff === 1 ? "Yesterday" : diff < 7 ? "This Week" : "Last Week";
    if (!groups[label]) groups[label] = [];
    groups[label].push(s);
  }
  return groups;
}

const groupOrder = ["Today", "Yesterday", "This Week", "Last Week"];

export default function HistoryPage() {
  const groups = groupByDate(mockSessions);
  const completed = mockSessions.filter((s) => s.isCompleted).length;

  return (
    <AppShell>
      <PageContent
        title="History"
        subtitle={`${mockSessions.length} sessions · ${completed} completed`}
      >
        {groupOrder
          .filter((g) => groups[g])
          .map((group) => (
            <section key={group}>
              <p
                style={{
                  fontSize: 10,
                  fontWeight: 600,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "#555",
                  textAlign: "center",
                  marginBottom: 10,
                }}
              >
                {group}
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {groups[group].map((session, i) => (
                  <motion.div
                    key={session.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.25 }}
                  >
                    <SessionCard session={session} />
                  </motion.div>
                ))}
              </div>
            </section>
          ))}

        {mockSessions.length === 0 && <EmptyState />}
      </PageContent>
    </AppShell>
  );
}

function SessionCard({ session }: { session: Session }) {
  const progress =
    session.totalActions > 0
      ? Math.round((session.completedActions / session.totalActions) * 100)
      : 0;

  return (
    <Card hover padding="md">
      <div className="flex items-start gap-4">
        <div
          className="w-8 h-8 rounded-[8px] flex items-center justify-center flex-shrink-0 mt-0.5"
          style={{
            background: session.isCompleted
              ? "rgba(74,140,111,0.12)"
              : "rgba(198,169,105,0.08)",
          }}
        >
          {session.isCompleted ? (
            <CheckCircle2 size={14} style={{ color: "#4A8C6F" }} />
          ) : (
            <Clock size={14} style={{ color: "#C6A969" }} />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-sm font-medium leading-snug" style={{ color: "#E0E0E0" }}>
              {session.title}
            </h3>
            <button
              className="flex-shrink-0 p-1 rounded transition-colors"
              style={{ color: "#555" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#7A7A7A")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#555")}
              aria-label="More options"
            >
              <MoreHorizontal size={14} />
            </button>
          </div>

          <div className="flex items-center gap-2 mt-1.5 flex-wrap">
            {session.blockerType && (
              <BlockerBadge type={session.blockerType} label={session.blockerLabel!} size="sm" />
            )}
            {session.totalActions > 0 && (
              <span className="text-xs" style={{ color: "#555" }}>
                {session.completedActions}/{session.totalActions} actions
              </span>
            )}
          </div>

          {session.totalActions > 0 && (
            <div
              className="mt-2.5 h-1 rounded-full overflow-hidden"
              style={{ background: "rgba(255,255,255,0.06)" }}
            >
              <div
                className="h-full rounded-full transition-all"
                style={{
                  width: `${progress}%`,
                  background: session.isCompleted
                    ? "#4A8C6F"
                    : "linear-gradient(90deg,#B89B5E,#C6A969)",
                }}
              />
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}

function EmptyState() {
  return (
    <div className="text-center py-16">
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
      >
        <Clock size={22} style={{ color: "#3A3A3A" }} />
      </div>
      <h3 className="text-sm font-medium mb-1" style={{ color: "#555" }}>
        No conversations yet
      </h3>
      <p className="text-xs" style={{ color: "#3A3A3A" }}>
        Your task sessions will appear here
      </p>
    </div>
  );
}
