"use client";

import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import type { InsightPattern, PatternOccurrence } from "../../lib/types";

interface PatternEvidenceModalProps {
  open: boolean;
  pattern: InsightPattern | null;
  occurrences: PatternOccurrence[];
  onClose: () => void;
  onDeepLinkPlaceholder: (message: string) => void;
}

export default function PatternEvidenceModal({
  open,
  pattern,
  occurrences,
  onClose,
  onDeepLinkPlaceholder,
}: PatternEvidenceModalProps) {
  const router = useRouter();

  const handleOpenConversation = (occ: PatternOccurrence) => {
    if (!occ.messageId || !occ.goalId) {
      onDeepLinkPlaceholder("No linked message for this occurrence.");
      return;
    }
    router.push(`/dashboard?goal=${occ.goalId}&messageId=${occ.messageId}`);
    onClose();
  };

  return (
    <>
      <style>{`
        @media (min-width: 1024px) {
          .insights-modal-overlay {
            left: var(--sidebar-width, 270px) !important;
          }
        }
      `}</style>
      <AnimatePresence>
        {open && pattern && (
          <motion.div
            className="insights-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed",
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              zIndex: 50,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "24px",
              background: "var(--bg-overlay)",
              backdropFilter: "blur(8px)",
            }}
            onClick={onClose}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 8 }}
              transition={{ duration: 0.22 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                width: "100%",
                maxWidth: 560,
                maxHeight: "85vh",
                overflowY: "auto",
                margin: "0 auto",
                borderRadius: "var(--radius-card)",
                padding: "28px 28px 24px",
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                boxShadow: "var(--shadow-lg)",
                position: "relative",
              }}
            >
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                style={{
                  position: "absolute",
                  top: 14,
                  right: 14,
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "var(--text-muted)",
                }}
              >
                <X size={16} />
              </button>

              <h2 className="font-heading" style={{ fontSize: 22, marginBottom: 6, color: "var(--text-primary)" }}>
                {pattern.name}
              </h2>
              <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 24 }}>
                Observed {pattern.observedCount} times across {pattern.goals.length}{" "}
                {pattern.goals.length === 1 ? "goal" : "goals"}
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {occurrences.map((occ) => (
                  <article
                    key={occ.id}
                    style={{
                      padding: "16px 18px",
                      borderRadius: 14,
                      background: "var(--bg-elevated)",
                      border: "1px solid var(--border)",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", gap: 12, marginBottom: 10 }}>
                      <div>
                        <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 4 }}>
                          Goal
                        </p>
                        <p style={{ fontSize: 14, fontWeight: 500, color: "var(--text-primary)", margin: 0 }}>
                          {occ.goalTitle}
                        </p>
                      </div>
                      <p style={{ fontSize: 12, color: "var(--text-muted)", flexShrink: 0 }}>{occ.createdAt}</p>
                    </div>
                    <p style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 8 }}>
                      Confidence: {occ.confidence}%
                    </p>
                    <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.55, marginBottom: 10 }}>
                      {occ.evidenceText}
                    </p>
                    <p
                      style={{
                        fontSize: 13,
                        fontStyle: "italic",
                        color: "var(--text-muted)",
                        lineHeight: 1.5,
                        marginBottom: 14,
                        padding: "10px 12px",
                        borderRadius: 10,
                        background: "var(--bg-card)",
                        border: "1px solid var(--border)",
                      }}
                    >
                      &ldquo;{occ.messagePreview}&rdquo;
                    </p>
                    <button
                      type="button"
                      onClick={() => handleOpenConversation(occ)}
                      style={{
                        padding: "8px 14px",
                        borderRadius: 8,
                        background: "var(--accent-glow)",
                        border: "1px solid var(--border-accent)",
                        color: "var(--text-primary)",
                        fontSize: 12,
                        fontWeight: 500,
                        cursor: "pointer",
                        fontFamily: "var(--font-body)",
                      }}
                    >
                      Open Conversation
                    </button>
                  </article>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
