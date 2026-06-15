/**
 * Subtle journal-style line art for landing pages (~5% opacity).
 */
export default function LandingBackground() {
  return (
    <div
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 0,
      }}
    >
      <svg
        style={{
          position: "absolute",
          top: "45%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "min(1000px, 110vw)",
          height: "min(1000px, 110vh)",
          opacity: 0.05,
        }}
        viewBox="0 0 900 900"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M120 720 C120 620, 280 620, 280 720 C280 820, 120 820, 120 720 C120 520, 400 520, 400 720 C400 920, 120 920, 120 720 C120 420, 520 420, 520 620 C520 820, 280 820, 280 620 C280 420, 620 420, 620 560 C620 700, 460 700, 460 560 C460 420, 720 420, 720 300 C720 180, 580 180, 580 300 C580 420, 780 420, 780 260"
          stroke="#1E1E1E"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <rect x="640" y="120" width="140" height="180" rx="8" stroke="#1E1E1E" strokeWidth="1.5" />
        <line x1="660" y1="160" x2="760" y2="160" stroke="#1E1E1E" strokeWidth="1" />
        <line x1="660" y1="190" x2="740" y2="190" stroke="#1E1E1E" strokeWidth="1" />
        <line x1="660" y1="220" x2="750" y2="220" stroke="#1E1E1E" strokeWidth="1" />
        <line x1="660" y1="250" x2="720" y2="250" stroke="#1E1E1E" strokeWidth="1" />
        <path d="M180 180 C220 140, 280 140, 320 180" stroke="#1E1E1E" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="220" cy="640" r="48" stroke="#1E1E1E" strokeWidth="1.2" />
        <path d="M200 640 L215 655 L245 625" stroke="#1E1E1E" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    </div>
  );
}
