"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Zap } from "lucide-react";

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
}

export default function AuthModal({ open, onClose }: AuthModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 50,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 16px",
            background: "var(--bg-overlay)",
            backdropFilter: "blur(8px)",
          }}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.93, y: 14 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.22, ease: [0.25, 0.1, 0.25, 1] }}
            style={{
              position: "relative",
              width: "100%",
              maxWidth: 340,
              borderRadius: "var(--radius-card)",
              padding: "36px 28px 28px",
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
              boxShadow: "var(--shadow-lg)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              aria-label="Close"
              style={{
                position: "absolute",
                top: 14,
                right: 14,
                padding: 6,
                borderRadius: 8,
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "var(--text-muted)",
                lineHeight: 0,
                transition: "color 150ms",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
            >
              <X size={15} />
            </button>

            <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 14,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "var(--accent-glow)",
                  border: "1px solid var(--border-accent)",
                }}
              >
                <Zap size={20} style={{ color: "var(--accent)" }} strokeWidth={2} />
              </div>
            </div>

            <h2
              className="font-heading"
              style={{
                fontSize: 22,
                fontWeight: 400,
                color: "var(--text-primary)",
                textAlign: "center",
                marginBottom: 8,
              }}
            >
              Save your progress
            </h2>
            <p
              style={{
                fontSize: 13,
                color: "var(--text-secondary)",
                textAlign: "center",
                lineHeight: 1.55,
                marginBottom: 28,
              }}
            >
              Build streaks, earn XP, and continue your journey across sessions.
            </p>

            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
              <button
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 10,
                  width: "100%",
                  padding: "13px 20px",
                  borderRadius: 12,
                  background: "var(--accent)",
                  color: "var(--accent-on)",
                  fontSize: 14,
                  fontWeight: 600,
                  border: "none",
                  cursor: "pointer",
                  transition: "background 200ms var(--ease)",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "var(--accent-hover)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "var(--accent)")}
              >
                <GoogleIcon />
                Continue with Google
              </button>

              <button
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  padding: "13px 20px",
                  borderRadius: 12,
                  background: "transparent",
                  color: "var(--accent)",
                  fontSize: 14,
                  fontWeight: 500,
                  border: "1px solid var(--border-accent)",
                  cursor: "pointer",
                  transition: "all 180ms var(--ease)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "var(--accent-glow)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                }}
              >
                Continue with Email
              </button>

              <button
                onClick={onClose}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: 12,
                  color: "var(--text-muted)",
                  padding: "6px 12px",
                  transition: "color 150ms",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
              >
                Maybe later
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  );
}
