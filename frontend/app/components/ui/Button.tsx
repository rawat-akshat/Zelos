"use client";

import { forwardRef } from "react";
import { clsx } from "clsx";

type ButtonVariant = "primary" | "secondary" | "danger" | "dangerOutline" | "ghost";
type ButtonSize = "md" | "sm";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
}

const variantStyles: Record<ButtonVariant, React.CSSProperties> = {
  primary: {
    background: "var(--accent-glow)",
    borderColor: "var(--border-accent)",
    color: "var(--text-primary)",
  },
  secondary: {
    background: "var(--bg-elevated)",
    borderColor: "var(--border)",
    color: "var(--text-secondary)",
  },
  danger: {
    background: "var(--error)",
    borderColor: "var(--error)",
    color: "#fff",
  },
  dangerOutline: {
    background: "transparent",
    borderColor: "var(--danger)",
    color: "var(--danger)",
  },
  ghost: {
    background: "transparent",
    borderColor: "var(--border)",
    color: "var(--text-secondary)",
  },
};

const sizeStyles: Record<ButtonSize, React.CSSProperties> = {
  md: {
    minHeight: 44,
    padding: "0 18px",
    fontSize: 14,
  },
  sm: {
    minHeight: 38,
    padding: "0 14px",
    fontSize: 13,
  },
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      fullWidth = false,
      className,
      style,
      children,
      type = "button",
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        className={clsx("zelos-btn", fullWidth && "zelos-btn-full", className)}
        style={{
          ...variantStyles[variant],
          ...sizeStyles[size],
          ...style,
        }}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export function ButtonRow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={clsx("zelos-btn-row", className)}>{children}</div>;
}

export default Button;
