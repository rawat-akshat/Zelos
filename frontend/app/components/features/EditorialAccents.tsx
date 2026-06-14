/**
 * Hand-drawn spiral that gradually opens into a path.
 * Confusion → clarity; single thin stroke, full center panel.
 */

type Point = { x: number; y: number; t: number };

function buildOpeningSpiralPoints(): Point[] {
  const steps = 320;
  const points: Point[] = [];
  const originX = 24;
  const originY = 91;

  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const ease = t * t * (3 - 2 * t);
    const open = Math.pow(t, 1.4);

    const rotation = Math.PI * 2 * (3.4 * (1 - open) + 0.12);
    const theta = t * rotation * (1 + 0.45 * (1 - open));
    const radius = 0.6 + ease * 33;

    let lx = radius * Math.cos(theta);
    let ly = radius * Math.sin(theta);

    lx *= 1 - open * 0.22;
    ly *= 1 - open * 0.65;

    const driftX = ease * 56;
    const driftY = -ease * 78;
    const sway = open * open * Math.sin(t * Math.PI * 1.6) * 4.8;

    const wobble =
      Math.sin(theta * 2.2 + t * 9) * 0.38 +
      Math.cos(theta * 1.5 + t * 14) * 0.24;

    points.push({
      x: originX + driftX + lx + sway * 0.35 + wobble,
      y: originY + driftY + ly + sway * 0.2 + wobble * 0.55,
      t,
    });
  }

  return points;
}

function pointsToPath(segment: Point[]): string {
  if (segment.length === 0) return "";
  let d = `M ${segment[0].x.toFixed(2)} ${segment[0].y.toFixed(2)}`;
  for (let i = 1; i < segment.length; i++) {
    d += ` L ${segment[i].x.toFixed(2)} ${segment[i].y.toFixed(2)}`;
  }
  return d;
}

function strokeWidthForPoint(t: number): number {
  const open = Math.pow(t, 1.4);
  const width = 1.75 + open * 1.05 + Math.sin(t * Math.PI * 3.8) * 0.18;
  return Math.min(3.2, Math.max(1.6, width));
}

function buildSegments(points: Point[], chunkSize: number): { d: string; strokeWidth: number }[] {
  const segments: { d: string; strokeWidth: number }[] = [];

  for (let i = 0; i < points.length - 1; i += chunkSize) {
    const chunk = points.slice(i, Math.min(i + chunkSize + 1, points.length));
    if (chunk.length < 2) continue;

    const midT = chunk[Math.floor(chunk.length / 2)].t;
    segments.push({
      d: pointsToPath(chunk),
      strokeWidth: strokeWidthForPoint(midT),
    });
  }

  return segments;
}

const SPIRAL_POINTS = buildOpeningSpiralPoints();
const SPIRAL_SEGMENTS = buildSegments(SPIRAL_POINTS, 12);

export default function EditorialAccents() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 0,
      }}
    >
      <svg
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          opacity: "var(--editorial-watermark-opacity)",
        }}
        viewBox="0 0 100 100"
        fill="none"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="spiral-sketch" x="-8%" y="-4%" width="116%" height="108%">
            <feTurbulence type="fractalNoise" baseFrequency="0.06" numOctaves="2" seed="4" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="0.5" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>

        <g transform="rotate(-10 50 50)" filter="url(#spiral-sketch)">
          {SPIRAL_SEGMENTS.map((segment, index) => (
            <path
              key={index}
              d={segment.d}
              stroke="var(--editorial-stroke-base)"
              strokeWidth={segment.strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              vectorEffect="nonScalingStroke"
            />
          ))}
        </g>
      </svg>
    </div>
  );
}
