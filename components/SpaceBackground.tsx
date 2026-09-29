import type { CSSProperties } from "react";

/**
 * Fixed full-screen space backdrop: your 3-color gradient, soft nebula glows,
 * twinkling stars, a few 4-point sparkles, and occasional shooting stars.
 *
 * Stars come from a seeded random generator, so the server and browser render
 * identical markup (no hydration mismatch). Change SEED for a new sky.
 */

const SEED = 2026;
const STAR_COUNT = 140;
const SPARKLE_COUNT = 12;
const SHOOTING_STAR_COUNT = 3;

// Deterministic PRNG (mulberry32)
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const STAR_COLORS = [
  "#ffffff",
  "#ffffff",
  "#ffffff",
  "#E8ECF7",
  "#73CBE1", // ice blue
  "#F5B037", // amber
];

const rand = mulberry32(SEED);
const pick = <T,>(arr: T[]) => arr[Math.floor(rand() * arr.length)];
const round = (n: number, d = 2) => Number(n.toFixed(d));

const stars = Array.from({ length: STAR_COUNT }, () => ({
  x: round(rand() * 100),
  y: round(rand() * 100),
  size: round(1 + rand() * 2, 1), // 1 - 3px
  opacity: round(0.4 + rand() * 0.6),
  duration: round(2 + rand() * 4, 1), // 2 - 6s
  delay: round(rand() * 6, 1),
  color: pick(STAR_COLORS),
}));

const sparkles = Array.from({ length: SPARKLE_COUNT }, () => ({
  x: round(5 + rand() * 90),
  y: round(5 + rand() * 90),
  size: Math.round(10 + rand() * 12), // 10 - 22px
  duration: round(3 + rand() * 3, 1),
  delay: round(rand() * 6, 1),
  color: pick(["#ffffff", "#ffffff", "#73CBE1", "#F5B037"]),
}));

const shootingStars = Array.from({ length: SHOOTING_STAR_COUNT }, (_, i) => ({
  x: round(45 + rand() * 50), // start in the upper right, travel down-left
  y: round(rand() * 35),
  delay: round(i * 4 + rand() * 3, 1),
  duration: round(11 + rand() * 6, 1),
}));

const css = `
  .sb-star {
    position: absolute;
    border-radius: 50%;
    animation-name: sb-twinkle;
    animation-timing-function: ease-in-out;
    animation-iteration-count: infinite;
  }
  .sb-sparkle {
    position: absolute;
    clip-path: polygon(50% 0%, 60% 40%, 100% 50%, 60% 60%, 50% 100%, 40% 60%, 0% 50%, 40% 40%);
    animation-name: sb-sparkle;
    animation-timing-function: ease-in-out;
    animation-iteration-count: infinite;
  }
  .sb-shoot {
    position: absolute;
    width: 130px;
    height: 2px;
    border-radius: 2px;
    background: linear-gradient(to left, transparent, rgba(255,255,255,0.9));
    opacity: 0;
    animation-name: sb-shoot;
    animation-timing-function: ease-out;
    animation-iteration-count: infinite;
  }
  @keyframes sb-twinkle {
    0%, 100% { opacity: var(--o); transform: scale(1); }
    50%      { opacity: 0.12;     transform: scale(0.6); }
  }
  @keyframes sb-sparkle {
    0%, 100% { opacity: 0;   transform: scale(0.3) rotate(0deg); }
    50%      { opacity: 0.95; transform: scale(1)   rotate(45deg); }
  }
  @keyframes sb-shoot {
    0%   { opacity: 0; transform: translate(0, 0) rotate(-35deg); }
    2%   { opacity: 1; }
    12%  { opacity: 0; transform: translate(-520px, 364px) rotate(-35deg); }
    100% { opacity: 0; transform: translate(-520px, 364px) rotate(-35deg); }
  }
  @media (prefers-reduced-motion: reduce) {
    .sb-star, .sb-sparkle { animation: none; }
    .sb-sparkle { opacity: 0.6; }
    .sb-shoot { display: none; }
  }
`;

export default function SpaceBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      style={{
        background:
          "linear-gradient(to bottom right, #0D0125, #1B0231, #04244A)",
      }}
    >
      <style>{css}</style>

      {/* Nebula glows */}
      <div
        className="absolute inset-0"
        style={{
          background: [
            "radial-gradient(ellipse 55% 45% at 18% 22%, rgba(107,63,160,0.28), transparent 70%)",
            "radial-gradient(ellipse 50% 40% at 82% 78%, rgba(115,203,225,0.16), transparent 70%)",
            "radial-gradient(ellipse 35% 30% at 70% 18%, rgba(255,66,179,0.10), transparent 70%)",
          ].join(", "),
        }}
      />

      {/* Twinkling stars */}
      {stars.map((s, i) => (
        <span
          key={`star-${i}`}
          className="sb-star"
          style={
            {
              left: `${s.x}%`,
              top: `${s.y}%`,
              width: s.size,
              height: s.size,
              background: s.color,
              boxShadow: `0 0 ${s.size * 2}px ${s.color}`,
              animationDuration: `${s.duration}s`,
              animationDelay: `${s.delay}s`,
              "--o": s.opacity,
            } as CSSProperties
          }
        />
      ))}

      {/* 4-point sparkles */}
      {sparkles.map((s, i) => (
        <span
          key={`sparkle-${i}`}
          className="sb-sparkle"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            background: s.color,
            animationDuration: `${s.duration}s`,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}

      {/* Shooting stars */}
      {shootingStars.map((s, i) => (
        <span
          key={`shoot-${i}`}
          className="sb-shoot"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            animationDuration: `${s.duration}s`,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
