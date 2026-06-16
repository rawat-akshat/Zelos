"use client";

import { motion } from "framer-motion";
import {
  PROMPT_LOADING_STEPS,
  PROMPT_LOADING_VARIANT,
  type PromptLoadingVariant,
} from "@/app/lib/loading-config";

interface LoadingStepsProps {
  activeStep?: number;
  variant?: PromptLoadingVariant;
}

export default function LoadingSteps({
  activeStep = 0,
  variant = PROMPT_LOADING_VARIANT,
}: LoadingStepsProps) {
  if (variant === "simple") {
    return (
      <p style={{ fontSize: 14, color: "var(--text-muted)", fontStyle: "italic" }}>
        Thinking…
      </p>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {PROMPT_LOADING_STEPS.map((step, i) => (
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
