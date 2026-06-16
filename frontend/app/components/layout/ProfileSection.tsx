"use client";

import { motion } from "framer-motion";

interface ProfileSectionProps {
  title: string;
  children: React.ReactNode;
}

export default function ProfileSection({ title, children }: ProfileSectionProps) {
  return (
    <section>
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
        {title}
      </p>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius-card)",
          padding: "24px 28px",
          boxShadow: "var(--shadow-sm)",
        }}
      >
        {children}
      </motion.div>
    </section>
  );
}

interface ProfileRowProps {
  label: string;
  value: React.ReactNode;
}

export function ProfileRow({ label, value }: ProfileRowProps) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "baseline",
        gap: 16,
        padding: "12px 0",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <span style={{ fontSize: 14, color: "var(--text-secondary)" }}>{label}</span>
      <span style={{ fontSize: 14, color: "var(--text-primary)", textAlign: "right" }}>{value}</span>
    </div>
  );
}

export function ProfileRowLast({ label, value }: ProfileRowProps) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "baseline",
        gap: 16,
        padding: "12px 0 0",
      }}
    >
      <span style={{ fontSize: 14, color: "var(--text-secondary)" }}>{label}</span>
      <span style={{ fontSize: 14, color: "var(--text-primary)", textAlign: "right" }}>{value}</span>
    </div>
  );
}
