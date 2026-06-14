"use client";

import { clsx } from "clsx";

interface ChipProps {
  label: string;
  onClick?: () => void;
  active?: boolean;
  className?: string;
}

export function Chip({ label, onClick, active = false, className }: ChipProps) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "inline-flex items-center px-3.5 py-1.5 rounded-full text-sm",
        "border transition-all duration-150 ease-out cursor-pointer",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C6A969]",
        active
          ? "border-[rgba(198,169,105,0.5)] bg-[rgba(198,169,105,0.1)] text-[#C6A969]"
          : [
              "border-[rgba(255,255,255,0.08)] bg-transparent text-[#B5B5B5]",
              "hover:border-[rgba(198,169,105,0.3)] hover:text-[#C6A969] hover:bg-[rgba(198,169,105,0.05)]",
            ],
        className
      )}
    >
      {label}
    </button>
  );
}
