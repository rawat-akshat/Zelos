"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import AppShell from "../components/layout/AppShell";
import PageContent from "../components/layout/PageContent";
import Card from "../components/ui/Card";
import { BlockerBadge } from "../components/ui/Badge";
import { mockSessions } from "../lib/mock-data";
import type { Session } from "../lib/types";
import { CheckCircle2, Clock } from "lucide-react";

function formatDate(date: Date) {
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function formatLastActive(date: Date) {
  const diffDays = Math.floor((Date.now() - date.getTime()) / 86400000);
  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  return `${diffDays} days ago`;
}

function groupByDate(sessions: Session[]) {
  const groups: Record<string, Session[]> = {};
  const now = Date.now();
  const dayMs = 86400000;

  for (const s of sessions) {
    const diff = Math.floor((now - s.createdAt.getTime()) / dayMs);
    const label =
      diff === 0 ? "Today" : diff === 1 ? "Yesterday" : diff < 7 ? "This Week" : "Earlier";
    if (!groups[label]) groups[label] = [];
    groups[label].push(s);
  }
  return groups;
}

const groupOrder = ["Today", "Yesterday", "This Week", "Earlier"];

export default function SessionsPage() {
  const groups = groupByDate(mockSessions);

  return (
    <AppShell>
      <PageContent
        title="My Sessions"
        subtitle={`${mockSessions.length} conversations saved`}
      >
        {groupOrder
          .filter((g) => groups[g])
          .map((group) => (
            <section key={group}>
              <p
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--text-muted)",
                  marginBottom: 12,
                }}
              >
                {group}
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {groups[group].map((session, i) => (
                  <motion.div
                    key={session.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.25 }}
                  >
                    <SessionCard session={session} />
                  </motion.div>
                ))}
              </div>
            </section>
          ))}
      </PageContent>
    </AppShell>
  );
}

function SessionCard({ session }: { session: Session }) {
  const router = useRouter();
  const progress =
    session.totalActions > 0
      ? Math.round((session.completedActions / session.totalActions) * 100)
      : 0;

  return (
    <Card hover padding="md">
      <button
        type="button"
        onClick={() => router.push(`/dashboard?session=${session.id}`)}
        style={{
          width: "100%",
          textAlign: "left",
          background: "none",
          border: "none",
          padding: 0,
          cursor: "pointer",
        }}
      >
        <div className="flex items-start gap-4">
          <div
            className="w-8 h-8 rounded-[8px] flex items-center justify-center flex-shrink-0 mt-0.5"
            style={{
              background: session.isCompleted ? "var(--success-dim)" : "var(--accent-glow)",
            }}
          >
            {session.isCompleted ? (
              <CheckCircle2 size={14} style={{ color: "var(--success)" }} />
            ) : (
              <Clock size={14} style={{ color: "var(--accent)" }} />
            )}
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-medium leading-snug" style={{ color: "var(--text-primary)" }}>
              {session.title}
            </h3>

            <div className="flex items-center gap-2 mt-1.5 flex-wrap">
              <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                {formatDate(session.createdAt)}
              </span>
              <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                · Last active {formatLastActive(session.createdAt)}
              </span>
            </div>

            <div className="flex items-center gap-2 mt-2 flex-wrap">
              {session.blockerType && (
                <BlockerBadge type={session.blockerType} label={session.blockerLabel!} size="sm" />
              )}
              {session.totalActions > 0 && (
                <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                  {session.completedActions}/{session.totalActions} steps
                </span>
              )}
            </div>

            {session.totalActions > 0 && (
              <div
                className="mt-2.5 h-1 rounded-full overflow-hidden"
                style={{ background: "var(--progress-track)" }}
              >
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${progress}%`,
                    background: session.isCompleted ? "var(--success)" : "var(--accent)",
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </button>
    </Card>
  );
}
