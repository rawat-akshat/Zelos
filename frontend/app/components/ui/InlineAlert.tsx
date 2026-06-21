"use client";

interface InlineAlertProps {
  variant?: "error" | "warning" | "info";
  title?: string;
  children: React.ReactNode;
  onDismiss?: () => void;
  action?: React.ReactNode;
}

const VARIANT_STYLES = {
  error: {
    bg: "rgba(180, 60, 60, 0.08)",
    border: "rgba(180, 60, 60, 0.35)",
    color: "var(--text-primary)",
  },
  warning: {
    bg: "rgba(201, 167, 92, 0.1)",
    border: "rgba(201, 167, 92, 0.35)",
    color: "var(--text-primary)",
  },
  info: {
    bg: "var(--bg-elevated)",
    border: "var(--border)",
    color: "var(--text-secondary)",
  },
} as const;

export default function InlineAlert({
  variant = "error",
  title,
  children,
  onDismiss,
  action,
}: InlineAlertProps) {
  const styles = VARIANT_STYLES[variant];

  return (
    <div
      role="alert"
      style={{
        padding: "12px 14px",
        borderRadius: 10,
        background: styles.bg,
        border: `1px solid ${styles.border}`,
        color: styles.color,
        fontSize: 13,
        lineHeight: 1.55,
        display: "flex",
        flexDirection: "column",
        gap: 8,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          {title ? (
            <p style={{ fontWeight: 600, margin: "0 0 4px", color: "var(--text-primary)" }}>
              {title}
            </p>
          ) : null}
          <div>{children}</div>
        </div>
        {onDismiss ? (
          <button
            type="button"
            onClick={onDismiss}
            aria-label="Dismiss alert"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "var(--text-muted)",
              fontSize: 12,
              flexShrink: 0,
            }}
          >
            Close
          </button>
        ) : null}
      </div>
      {action ? <div>{action}</div> : null}
    </div>
  );
}
