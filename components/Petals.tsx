import type { CSSProperties } from "react";

// Fixed values (not random) so server and client markup always match.
const PETALS = [
  { left: 6, size: 16, dur: 24, delay: -3, sway: 40, o: 0.7, tone: 0 },
  { left: 18, size: 11, dur: 30, delay: -14, sway: -30, o: 0.55, tone: 1 },
  { left: 31, size: 18, dur: 27, delay: -8, sway: 50, o: 0.75, tone: 0 },
  { left: 44, size: 12, dur: 33, delay: -20, sway: -45, o: 0.5, tone: 1 },
  { left: 57, size: 15, dur: 26, delay: -1, sway: 35, o: 0.7, tone: 0 },
  { left: 69, size: 10, dur: 31, delay: -17, sway: -25, o: 0.5, tone: 1 },
  { left: 80, size: 17, dur: 28, delay: -11, sway: 45, o: 0.7, tone: 0 },
  { left: 92, size: 12, dur: 34, delay: -24, sway: -35, o: 0.55, tone: 1 },
];

const MOTES = [
  { left: 12, top: 22, size: 3, dur: 6, delay: 0 },
  { left: 82, top: 16, size: 4, dur: 7, delay: -2 },
  { left: 26, top: 64, size: 3, dur: 8, delay: -4 },
  { left: 70, top: 58, size: 3, dur: 6.5, delay: -1 },
  { left: 90, top: 78, size: 4, dur: 7.5, delay: -5 },
  { left: 8, top: 84, size: 3, dur: 9, delay: -3 },
  { left: 50, top: 10, size: 3, dur: 7, delay: -6 },
  { left: 40, top: 88, size: 4, dur: 8.5, delay: -2 },
];

/** Slowly drifting petals. `count` keeps the final scene restrained. */
export function Petals({ count = PETALS.length }: { count?: number }) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {PETALS.slice(0, count).map((p, i) => (
        <svg
          key={i}
          viewBox="0 0 20 24"
          className="petal"
          style={
            {
              left: `${p.left}%`,
              width: p.size,
              height: p.size * 1.2,
              "--dur": `${p.dur}s`,
              "--delay": `${p.delay}s`,
              "--sway": `${p.sway}px`,
              "--o": p.o,
            } as CSSProperties
          }
        >
          <path
            d="M10 0 C18 6 20 15 10 24 C0 15 2 6 10 0Z"
            fill={p.tone ? "#E94B83" : "#A61935"}
          />
        </svg>
      ))}
    </div>
  );
}

/** Tiny glowing particles. */
export function Motes() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {MOTES.map((m, i) => (
        <span
          key={i}
          className="mote"
          style={
            {
              left: `${m.left}%`,
              top: `${m.top}%`,
              width: m.size,
              height: m.size,
              "--dur": `${m.dur}s`,
              "--delay": `${m.delay}s`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
