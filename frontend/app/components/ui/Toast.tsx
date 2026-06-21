"use client";

interface ToastProps {
  message: string;
}

export default function Toast({ message }: ToastProps) {
  return (
    <div
      role="status"
      style={{
        position: "fixed",
        bottom: 28,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 80,
        padding: "12px 20px",
        borderRadius: 10,
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
        boxShadow: "var(--shadow-lg)",
        fontSize: 14,
        color: "var(--text-primary)",
        maxWidth: "min(90vw, 420px)",
        textAlign: "center",
      }}
    >
      {message}
    </div>
  );
}
