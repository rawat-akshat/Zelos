import { clsx } from "clsx";
import type { BlockerType } from "@/app/lib/types";
import { blockerColors, blockerTextColors } from "@/app/lib/mock-data";

interface BlockerBadgeProps {
  type: BlockerType;
  label: string;
  size?: "sm" | "md";
}

export function BlockerBadge({ type, label, size = "md" }: BlockerBadgeProps) {
  const bg = blockerColors[type];
  const color = blockerTextColors[type];
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1.5 rounded-full font-medium tracking-wide",
        size === "sm" ? "px-2.5 py-0.5 text-xs" : "px-3 py-1 text-xs"
      )}
      style={{ background: bg, color }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
        style={{ background: color, opacity: 0.8 }}
      />
      {label}
    </span>
  );
}

interface StatBadgeProps {
  icon: React.ReactNode;
  value: string | number;
  label?: string;
  color?: string;
}

export function StatBadge({ icon, value, label, color = "#C6A969" }: StatBadgeProps) {
  return (
    <div
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium"
      style={{
        background: `${color}14`,
        color,
        border: `1px solid ${color}22`,
      }}
    >
      {icon}
      <span>{value}</span>
      {label && <span className="text-[#7A7A7A] font-normal text-xs">{label}</span>}
    </div>
  );
}
