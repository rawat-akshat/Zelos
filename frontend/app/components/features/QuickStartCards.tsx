"use client";

import { clsx } from "clsx";

const QUICK_STARTS = [
  { label: "Update my resume", emoji: "📄" },
  { label: "Study for an exam", emoji: "📚" },
  { label: "Send a difficult email", emoji: "✉️" },
  { label: "Clean my room", emoji: "🧹" },
  { label: "Start my side project", emoji: "💡" },
  { label: "I don't know why I'm stuck", emoji: "🌀" },
];

interface QuickStartCardsProps {
  onSelect: (text: string) => void;
}

export default function QuickStartCards({ onSelect }: QuickStartCardsProps) {
  return (
    <div className="w-full">
      <p
        className="text-xs font-medium uppercase tracking-[0.12em] mb-3"
        style={{ color: "#555" }}
      >
        Quick Start
      </p>
      <div className="grid grid-cols-2 gap-2">
        {QUICK_STARTS.map(({ label, emoji }) => (
          <button
            key={label}
            onClick={() => onSelect(label)}
            className={clsx(
              "group flex items-center gap-3 px-4 py-3 rounded-[12px] text-left text-sm",
              "border transition-all duration-150 ease-out cursor-pointer",
              "focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C6A969]",
              "hover:-translate-y-0.5"
            )}
            style={{
              background: "#202020",
              border: "1px solid rgba(255,255,255,0.06)",
              color: "#B5B5B5",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(198,169,105,0.2)";
              e.currentTarget.style.color = "#FFFFFF";
              e.currentTarget.style.background = "#262626";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
              e.currentTarget.style.color = "#B5B5B5";
              e.currentTarget.style.background = "#202020";
            }}
          >
            <span
              className="text-base flex-shrink-0 opacity-70 group-hover:opacity-100 transition-opacity"
              aria-hidden="true"
            >
              {emoji}
            </span>
            <span className="leading-snug font-medium">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
