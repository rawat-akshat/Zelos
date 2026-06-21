"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Check } from "lucide-react";

const PRO_FEATURES = [
  "Unlimited goals",
  "Longer goal memory",
  "Advanced pattern detection",
  "Personal playbook insights",
  "Weekly behavioral reports",
  "Priority access to new experiments",
];

interface UpgradeProModalProps {
  open: boolean;
  onClose: () => void;
  onNotify: () => void;
}

export default function UpgradeProModal({ open, onClose, onNotify }: UpgradeProModalProps) {
  return (
    <>
      <style>{`
        @media (min-width: 1024px) {
          .upgrade-pro-modal-overlay {
            left: var(--sidebar-width, 270px) !important;
          }
        }
      `}</style>
      <AnimatePresence>
      {open && (
        <motion.div
          className="upgrade-pro-modal-overlay"
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
              maxWidth: 540,
              margin: "0 auto",
              borderRadius: "var(--radius-card)",
              padding: "36px 40px 28px",
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

            <h2
              className="font-heading"
              style={{
                fontSize: 24,
                color: "var(--text-primary)",
                marginBottom: 8,
                letterSpacing: "-0.02em",
                textAlign: "center",
              }}
            >
              Zelos Pro
            </h2>
            <p
              style={{
                fontSize: 14,
                color: "var(--text-secondary)",
                lineHeight: 1.55,
                marginBottom: 24,
                textAlign: "center",
              }}
            >
              Deeper memory, richer insights, and more room to work through your goals.
            </p>

            <ul style={{ listStyle: "none", margin: "0 0 24px", padding: 0, display: "flex", flexDirection: "column", gap: 10 }}>
              {PRO_FEATURES.map((feature) => (
                <li key={feature} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: "var(--text-primary)" }}>
                  <Check size={14} style={{ color: "var(--accent)", flexShrink: 0 }} />
                  {feature}
                </li>
              ))}
            </ul>

            <p
              style={{
                fontSize: 13,
                fontWeight: 500,
                color: "var(--text-muted)",
                marginBottom: 20,
                textAlign: "center",
              }}
            >
              Coming soon
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <button
                type="button"
                onClick={onNotify}
                style={{
                  width: "100%",
                  padding: "12px 20px",
                  borderRadius: 10,
                  background: "var(--accent)",
                  border: "1px solid var(--accent)",
                  color: "var(--accent-on)",
                  fontSize: 14,
                  fontWeight: 500,
                  cursor: "pointer",
                  fontFamily: "var(--font-body)",
                }}
              >
                Notify Me
              </button>
              <button
                type="button"
                onClick={onClose}
                style={{
                  width: "100%",
                  padding: "12px 20px",
                  borderRadius: 10,
                  background: "transparent",
                  border: "1px solid var(--border)",
                  color: "var(--text-secondary)",
                  fontSize: 14,
                  fontWeight: 500,
                  cursor: "pointer",
                  fontFamily: "var(--font-body)",
                }}
              >
                Maybe Later
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
      </AnimatePresence>
    </>
  );
}
