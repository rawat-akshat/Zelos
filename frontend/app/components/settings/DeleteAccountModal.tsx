"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Button, { ButtonRow } from "../ui/Button";

interface DeleteAccountModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeleteAccountModal({ open, onClose, onConfirm }: DeleteAccountModalProps) {
  return (
    <>
      <style>{`
        @media (min-width: 1024px) {
          .settings-modal-overlay {
            left: var(--sidebar-width, 270px) !important;
          }
        }
      `}</style>
      <AnimatePresence>
        {open && (
          <motion.div
            className="settings-modal-overlay"
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
                maxWidth: 440,
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

              <h2 className="font-heading" style={{ fontSize: 22, marginBottom: 12, color: "var(--text-primary)" }}>
                Delete Account?
              </h2>
              <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 12, lineHeight: 1.55 }}>
                Your account will be scheduled for deletion.
              </p>
              <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 12, lineHeight: 1.55 }}>
                You can restore it within 30 days.
              </p>
              <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 28, lineHeight: 1.55 }}>
                After 30 days all goals, conversations, insights, and pattern history will be permanently removed.
              </p>

              <ButtonRow>
                <Button variant="ghost" onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  variant="danger"
                  onClick={() => {
                    onConfirm();
                    onClose();
                  }}
                >
                  Schedule Deletion
                </Button>
              </ButtonRow>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
