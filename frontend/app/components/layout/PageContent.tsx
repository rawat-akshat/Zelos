"use client";

import { motion } from "framer-motion";

interface PageContentProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  maxWidth?: number;
}

export default function PageContent({
  title,
  subtitle,
  children,
  maxWidth = 640,
}: PageContentProps) {
  return (
    <div
      style={{
        minHeight: "100vh",
        overflowY: "auto",
        padding: "48px 48px 56px",
      }}
    >
      <div style={{ maxWidth, margin: "0 auto", width: "100%" }}>
        <motion.header
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28 }}
          style={{ textAlign: "center", marginBottom: 36 }}
        >
          <h1
            style={{
              fontSize: 28,
              fontWeight: 600,
              color: "#FFFFFF",
              marginBottom: subtitle ? 8 : 0,
              letterSpacing: "-0.01em",
            }}
          >
            {title}
          </h1>
          {subtitle && (
            <p style={{ fontSize: 14, color: "#7A7A7A", lineHeight: 1.5 }}>
              {subtitle}
            </p>
          )}
        </motion.header>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.06 }}
          style={{ display: "flex", flexDirection: "column", gap: 24 }}
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}
