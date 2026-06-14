"use client";

import { motion } from "framer-motion";

const STEPS = [
  "Analyzing what's blocking you…",
  "Breaking the task into actions…",
  "Creating your first step…",
];

interface LoadingStepsProps {
  activeStep: number;
}

export default function LoadingSteps({ activeStep }: LoadingStepsProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {STEPS.map((step, i) => (
        <motion.div
          key={step}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: i <= activeStep ? 1 : 0.2, x: 0 }}
          transition={{ duration: 0.25, delay: i * 0.05 }}
          style={{ display: "flex", alignItems: "center", gap: 10 }}
        >
          <div
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              flexShrink: 0,
              background: i <= activeStep ? "var(--accent)" : "var(--progress-track)",
            }}
          />
          <span
            style={{
              fontSize: 13,
              color: i <= activeStep ? "var(--text-secondary)" : "var(--text-muted)",
            }}
          >
            {step}
          </span>
        </motion.div>
      ))}
    </div>
  );
}
