"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Upload } from "lucide-react";
import Button, { ButtonRow } from "../ui/Button";

const MAX_AVATAR_BYTES = 5 * 1024 * 1024;

interface EditProfileModalProps {
  open: boolean;
  onClose: () => void;
  name: string;
  email: string;
  avatarUrl: string | null;
  onSave: (data: { name: string; avatarFile: File | null }) => void | Promise<void>;
}

export default function EditProfileModal({
  open,
  onClose,
  name,
  email,
  avatarUrl,
  onSave,
}: EditProfileModalProps) {
  const [draftName, setDraftName] = useState(name);
  const [draftAvatarFile, setDraftAvatarFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [photoError, setPhotoError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setDraftName(name);
      setDraftAvatarFile(null);
      setPhotoError(null);
      setPreviewUrl(avatarUrl);
    }
  }, [open, name, avatarUrl]);

  useEffect(() => {
    if (!draftAvatarFile) return;
    const url = URL.createObjectURL(draftAvatarFile);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [draftAvatarFile]);

  const handleSave = async () => {
    const trimmed = draftName.trim();
    if (!trimmed || saving) return;
    setSaving(true);
    try {
      await onSave({ name: trimmed, avatarFile: draftAvatarFile });
      onClose();
    } finally {
      setSaving(false);
    }
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setPhotoError("Please choose an image file.");
      return;
    }
    if (file.size > MAX_AVATAR_BYTES) {
      setPhotoError("Image must be 5 MB or smaller.");
      return;
    }
    setPhotoError(null);
    setDraftAvatarFile(file);
  };

  const initials = draftName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");

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

              <h2 className="font-heading" style={{ fontSize: 22, marginBottom: 24, color: "var(--text-primary)" }}>
                Edit Profile
              </h2>

              <div style={{ marginBottom: 22 }}>
                <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 12 }}>
                  Profile photo
                </p>
                <div className="zelos-photo-upload">
                  {previewUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={previewUrl}
                      alt=""
                      style={{
                        width: 56,
                        height: 56,
                        borderRadius: "50%",
                        objectFit: "cover",
                        border: "1px solid var(--border)",
                        flexShrink: 0,
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        width: 56,
                        height: 56,
                        borderRadius: "50%",
                        background: "var(--accent-glow)",
                        border: "1px solid var(--border-accent)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 18,
                        fontWeight: 600,
                        color: "var(--text-primary)",
                        flexShrink: 0,
                      }}
                    >
                      {initials || "?"}
                    </div>
                  )}
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload size={14} />
                    {draftAvatarFile ? "Change photo" : "Upload photo"}
                  </Button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/gif"
                    onChange={handlePhotoChange}
                    style={{ display: "none" }}
                  />
                </div>
                {photoError ? (
                  <p style={{ fontSize: 12, color: "var(--danger)", margin: "8px 0 0" }}>{photoError}</p>
                ) : null}
                <p style={{
                  fontSize: 12,
                  color: "var(--text-muted)",
                  margin: "8px 0 0",
                  lineHeight: 1.45,
                }}>
                  JPEG, PNG, WebP, or GIF · max 5 MB. Replacing your photo removes the old one.
                </p>
              </div>

              <div style={{ marginBottom: 22 }}>
                <label htmlFor="edit-profile-name" style={{ display: "block", fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 8 }}>
                  Name
                </label>
                <input
                  id="edit-profile-name"
                  type="text"
                  value={draftName}
                  onChange={(e) => setDraftName(e.target.value)}
                  style={{
                    width: "100%",
                    minHeight: 44,
                    padding: "0 14px",
                    borderRadius: "var(--radius-sm)",
                    border: "1px solid var(--border)",
                    background: "var(--bg-elevated)",
                    color: "var(--text-primary)",
                    fontSize: 14,
                    fontFamily: "var(--font-body)",
                    outline: "none",
                  }}
                />
              </div>

              <div style={{ marginBottom: 28 }}>
                <p style={{
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "var(--text-muted)",
                  marginBottom: 8,
                }}>
                  Email
                </p>
                <p style={{ fontSize: 14, color: "var(--text-primary)", margin: "0 0 8px", wordBreak: "break-word" }}>
                  {email}
                </p>
                <p style={{ fontSize: 12, color: "var(--text-muted)", margin: 0, lineHeight: 1.5 }}>
                  Email changes will be supported in a future update.
                </p>
              </div>

              <ButtonRow>
                <Button variant="ghost" onClick={onClose} disabled={saving}>
                  Cancel
                </Button>
                <Button variant="primary" onClick={handleSave} disabled={saving}>
                  {saving ? "Saving…" : "Save Changes"}
                </Button>
              </ButtonRow>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
