"use client";

import { useEffect, useRef } from "react";

// ── Tuning ────────────────────────────────────────────────────────────────────
const SWINGS = 1; // full right→left→right cycles over the whole page (try 1.5 or 2)
const AMPLITUDE = 0.36; // how far it swings, as a fraction of viewport width
const SMOOTHING = 0.08; // 0-1, lower = floatier and slower to catch up
const MAX_TILT = 65; // max degrees the nose leans away from straight down
const W = 40;
const H = 54;
const EDGE = H * 1.6; // how far off-screen it starts and ends (hidden at both ends)

/**
 * Fixed rocket that flies down the screen as you scroll, following a cosine
 * path: top right → left → back to the right. It steers with the path, so the
 * nose always points along the direction it's travelling.
 *
 * It moves via direct DOM writes (no React state), so scrolling stays smooth.
 */
export default function ScrollRocket() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let target = 0;
    let current = 0;
    let raf = 0;

    const readTarget = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      target = max > 0 ? Math.min(Math.max(window.scrollY / max, 0), 1) : 0;
    };

    const render = () => {
      current += (target - current) * SMOOTHING;
      if (Math.abs(target - current) < 0.0002) current = target;

      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const phase = current * SWINGS * 2 * Math.PI;

      // Position: cosine gives right (p=0) → left (p=0.5) → right (p=1)
      const x = vw * (0.5 + AMPLITUDE * Math.cos(phase));
      // Starts just above the screen (hidden) and finishes just below it (gone)
      const yStart = -EDGE;
      const yEnd = vh + EDGE;
      const y = yStart + (yEnd - yStart) * current;

      // Heading: derivative of the path, so the nose follows the curve
      const dx = -vw * AMPLITUDE * SWINGS * 2 * Math.PI * Math.sin(phase);
      const dy = yEnd - yStart;
      let tilt = (Math.atan2(dx, dy) * 180) / Math.PI;
      tilt = Math.max(-MAX_TILT, Math.min(MAX_TILT, tilt));
      const deg = 180 - tilt; // sprite points up, so 180° = nose down

      el.style.transform = `translate3d(${x - W / 2}px, ${y - H / 2}px, 0) rotate(${deg}deg)`;

      raf = current === target ? 0 : requestAnimationFrame(render);
    };

    const kick = () => {
      readTarget();
      if (!raf) raf = requestAnimationFrame(render);
    };

    kick();
    window.addEventListener("scroll", kick, { passive: true });
    window.addEventListener("resize", kick);
    return () => {
      window.removeEventListener("scroll", kick);
      window.removeEventListener("resize", kick);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      // -z-[5]: above SpaceBackground (-z-10), behind page content.
      // Use z-20 instead to fly in front of your cards and text.
      className="pointer-events-none fixed left-0 top-0 -z-[5]"
      style={{
        width: W,
        height: H,
        willChange: "transform",
        transform: "translate3d(-200px, -200px, 0)",
        filter: "drop-shadow(0 0 8px rgba(245,176,55,0.55))",
      }}
    >
      <style>{`
        .rocket-flame {
          transform-box: fill-box;
          transform-origin: 50% 0%;
          animation: rocket-flicker 0.14s ease-in-out infinite alternate;
        }
        @keyframes rocket-flicker {
          from { transform: scaleY(0.75) scaleX(0.92); }
          to   { transform: scaleY(1.15) scaleX(1.05); }
        }
        @media (prefers-reduced-motion: reduce) {
          .rocket-flame { animation: none; }
        }
      `}</style>

      <svg viewBox="0 0 48 64" width={W} height={H}>
        {/* Flame */}
        <g className="rocket-flame">
          <path d="M17 46 Q24 70 31 46 Z" fill="#F5B037" />
          <path d="M20.5 46 Q24 60 27.5 46 Z" fill="#ffffff" />
        </g>
        {/* Fins */}
        <path d="M14 32 L3 50 L14 45 Z" fill="#FF42B3" />
        <path d="M34 32 L45 50 L34 45 Z" fill="#FF42B3" />
        {/* Body */}
        <path
          d="M24 1 C34 12 37 28 34 46 H14 C11 28 14 12 24 1 Z"
          fill="#E8ECF7"
        />
        {/* Nozzle */}
        <path d="M15 46 H33 L30 51 H18 Z" fill="#8A94B8" />
        {/* Window */}
        <circle
          cx="24"
          cy="22"
          r="5.5"
          fill="#73CBE1"
          stroke="#0C1340"
          strokeWidth="2"
        />
      </svg>
    </div>
  );
}
