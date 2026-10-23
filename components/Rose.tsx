import { useId, type CSSProperties } from "react";

// A wavy-rimmed, cupped petal with its base at the origin, pointing up.
const PETAL =
  "M0 0 C-42 -4 -66 -38 -54 -64 C-48 -80 -30 -90 -10 -88 C-4 -93 5 -93 11 -88 C32 -90 50 -78 55 -62 C64 -36 40 -4 0 0Z";
// Soft highlight along the curled rim.
const RIM = "M-44 -74 C-34 -88 -14 -91 -2 -88 C8 -92 28 -90 42 -76";
// Fine veins that give the petal a silky texture.
const VEINS = ["M0 -6 C-14 -30 -22 -52 -26 -76", "M0 -6 C0 -34 0 -56 1 -82", "M0 -6 C14 -30 24 -52 30 -74"];

// Outer to inner. Each ring is rotated and nudged per petal so no two look identical.
const LAYERS = [
  { count: 5, scale: 1.0, offset: 8, tilt: 5 },
  { count: 5, scale: 0.84, offset: 44, tilt: 7 },
  { count: 4, scale: 0.66, offset: 20, tilt: 9 },
  { count: 4, scale: 0.5, offset: 62, tilt: 10 },
  { count: 3, scale: 0.34, offset: 30, tilt: 12 },
];

const PALETTES = {
  red: { base: "#2a0510", mid: "#8f1230", edge: "#cf2e55", light: "#ff8aa8" },
  pink: { base: "#70112f", mid: "#d63a72", edge: "#f68db2", light: "#ffd6e4" },
} as const;

/** Deterministic pseudo-jitter in [-1, 1] so server and client always match. */
const jitter = (a: number, b: number) => Math.sin(a * 12.9898 + b * 78.233 + 1.7) % 1;

type RoseProps = {
  tone?: "red" | "pink";
  /** Seconds before the bloom begins. */
  delay?: number;
  /** Adds a slow, gentle breathing motion once open. */
  breathe?: boolean;
  className?: string;
  style?: CSSProperties;
};

/** Decorative SVG rose, seen from above. Fills its container; size it with className. */
export default function Rose({ tone = "red", delay = 0, breathe = false, className, style }: RoseProps) {
  const id = useId().replace(/:/g, "");
  const p = PALETTES[tone];

  return (
    <svg viewBox="0 0 200 200" aria-hidden="true" className={className} style={style}>
      <defs>
        <radialGradient id={`g${id}`} gradientUnits="userSpaceOnUse" cx="0" cy="-8" r="96">
          <stop offset="0" stopColor={p.base} />
          <stop offset="0.38" stopColor={p.mid} />
          <stop offset="0.82" stopColor={p.edge} />
          <stop offset="1" stopColor={p.light} />
        </radialGradient>
        <radialGradient id={`c${id}`} cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor={p.base} />
          <stop offset="1" stopColor={p.mid} />
        </radialGradient>
      </defs>
      <g className={breathe ? "breathe" : undefined} style={{ transformBox: "view-box", transformOrigin: "50% 50%" }}>
        {LAYERS.map((layer, i) => (
          <g
            key={i}
            className="bloom-layer"
            style={{ "--d": `${delay + (LAYERS.length - 1 - i) * 0.24}s` } as CSSProperties}
          >
            {Array.from({ length: layer.count }, (_, k) => {
              const j = jitter(i + 1, k + 1);
              const angle = layer.offset + (k * 360) / layer.count + j * layer.tilt;
              const s = layer.scale * (0.96 + j * 0.05);
              const t = `translate(100 100) rotate(${angle}) scale(${s})`;
              return (
                <g key={k} transform={t}>
                  <path d={PETAL} fill="#000" opacity="0.38" transform="translate(0 4) scale(1.05)" />
                  <path d={PETAL} fill={`url(#g${id})`} stroke="rgba(20,0,8,0.45)" strokeWidth="1.2" />
                  {VEINS.map((v) => (
                    <path key={v} d={v} fill="none" stroke="rgba(30,0,12,0.16)" strokeWidth="1" strokeLinecap="round" />
                  ))}
                  <path d={RIM} fill="none" stroke={p.light} strokeOpacity="0.55" strokeWidth="2.2" strokeLinecap="round" />
                </g>
              );
            })}
          </g>
        ))}
        {/* tightly wound heart of the rose */}
        <g className="bloom-layer" style={{ "--d": `${delay}s` } as CSSProperties}>
          <circle cx="100" cy="100" r="12" fill={`url(#c${id})`} />
          <path
            d="M100 100 m-2 0 a3 3 0 1 1 5 2 a7 7 0 1 1 -10 -5 a11 11 0 1 1 15 9"
            fill="none"
            stroke="rgba(255,170,195,0.5)"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </g>
      </g>
    </svg>
  );
}

const LEAF = "M0 0 C18 -30 62 -40 102 -22 C72 8 30 20 0 0Z";
const MIDRIB = "M4 -2 Q54 -18 96 -22";

/** A fan of dark, veined leaves that sits behind a rose or a cluster of roses. */
export function Leaves({ className }: { className?: string }) {
  const id = useId().replace(/:/g, "");
  const leaves = [
    { r: -165, s: 1 },
    { r: -125, s: 0.85 },
    { r: -55, s: 0.9 },
    { r: -15, s: 1.05 },
    { r: 20, s: 0.8 },
    { r: 160, s: 0.9 },
  ];
  return (
    <svg viewBox="0 0 200 200" aria-hidden="true" className={className}>
      <defs>
        <linearGradient id={`l${id}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#0c1912" />
          <stop offset="1" stopColor="#315241" />
        </linearGradient>
      </defs>
      {leaves.map((l, i) => (
        <g key={i} transform={`translate(100 100) rotate(${l.r}) scale(${l.s})`}>
          <path d={LEAF} fill={`url(#l${id})`} stroke="rgba(247,232,239,0.08)" />
          <path d={MIDRIB} fill="none" stroke="rgba(160,210,180,0.25)" strokeWidth="1.2" strokeLinecap="round" />
        </g>
      ))}
    </svg>
  );
}
