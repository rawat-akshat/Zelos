"use client";

import { motion } from "framer-motion";

interface PageContentProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  maxWidth?: number;
}

export default function PageContent({
  title,
  subtitle,
  action,
  children,
  maxWidth = 600,
}: PageContentProps) {
  return (
    <div
      style={{
        minHeight: "100vh",
        overflowY: "auto",
        padding: "64px 56px 72px",
      }}
    >
      <div style={{ maxWidth, margin: "0 auto", width: "100%" }}>
        <motion.header
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28 }}
          style={{ textAlign: action ? "left" : "center", marginBottom: 48 }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: action ? "space-between" : "center",
              gap: 16,
              flexWrap: "wrap",
            }}
          >
            <div style={{ flex: 1, textAlign: action ? "left" : "center" }}>
              <h1
                className="font-heading"
                style={{
                  fontSize: 36,
                  color: "var(--text-primary)",
                  marginBottom: subtitle ? 12 : 0,
                  letterSpacing: "-0.038em",
                  lineHeight: 1.08,
                }}
              >
                {title}
              </h1>
              {subtitle && (
                <p style={{ fontSize: 15, color: "var(--text-secondary)", lineHeight: 1.65 }}>
                  {subtitle}
                </p>
              )}
            </div>
            {action && <div style={{ flexShrink: 0 }}>{action}</div>}
          </div>
        </motion.header>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.06 }}
          style={{ display: "flex", flexDirection: "column", gap: 32 }}
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}
