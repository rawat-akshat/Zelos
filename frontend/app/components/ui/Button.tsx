"use client";

import { forwardRef } from "react";
import { clsx } from "clsx";

type Variant = "primary" | "secondary" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  fullWidth?: boolean;
}

const variantStyles: Record<Variant, string> = {
  primary: [
    "bg-[#C6A969] text-[#0F0F0F] font-medium",
    "hover:bg-[#D4AF37] active:bg-[#B89B5E]",
    "shadow-[0_2px_12px_rgba(198,169,105,0.25)]",
    "hover:shadow-[0_4px_20px_rgba(198,169,105,0.35)]",
    "disabled:bg-[#C6A969]/30 disabled:text-[#0F0F0F]/40 disabled:shadow-none",
  ].join(" "),
  secondary: [
    "bg-transparent text-[#C6A969] font-medium",
    "border border-[rgba(198,169,105,0.3)]",
    "hover:border-[rgba(198,169,105,0.6)] hover:bg-[rgba(198,169,105,0.06)]",
    "active:bg-[rgba(198,169,105,0.1)]",
    "disabled:opacity-30",
  ].join(" "),
  ghost: [
    "bg-transparent text-[#B5B5B5] font-normal",
    "hover:text-[#FFFFFF] hover:bg-white/[0.04]",
    "active:bg-white/[0.06]",
    "disabled:opacity-30",
  ].join(" "),
  danger: [
    "bg-transparent text-[#FCA5A5] font-medium",
    "border border-[rgba(252,165,165,0.25)]",
    "hover:border-[rgba(252,165,165,0.5)] hover:bg-[rgba(252,165,165,0.06)]",
    "disabled:opacity-30",
  ].join(" "),
};

const sizeStyles: Record<Size, string> = {
  sm: "h-8 px-3 text-sm rounded-[8px] gap-1.5",
  md: "h-10 px-4 text-sm rounded-[10px] gap-2",
  lg: "h-12 px-6 text-base rounded-[12px] gap-2.5",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      loading = false,
      fullWidth = false,
      className,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={clsx(
          "inline-flex items-center justify-center",
          "transition-all duration-150 ease-out",
          "cursor-pointer select-none whitespace-nowrap",
          "focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C6A969] focus-visible:outline-offset-2",
          "active:scale-[0.98]",
          "disabled:cursor-not-allowed disabled:active:scale-100",
          variantStyles[variant],
          sizeStyles[size],
          fullWidth && "w-full",
          className
        )}
        {...props}
      >
        {loading ? (
          <>
            <svg
              className="animate-spin h-4 w-4 opacity-70"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            <span>Processing…</span>
          </>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
