"use client";

import { useEffect, useRef } from "react";
import { Building2, Calendar, MapPin, Repeat } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import { experiences } from "@/data/experiences";

const COPIES = 5;

export default function Experiences() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const drag = useRef({ active: false, startX: 0, startLeft: 0 });

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    // Start on the 2nd copy so there is room to scroll both ways
    el.scrollLeft = el.scrollWidth / COPIES - 32;

    const onScroll = () => {
      const setWidth = el.scrollWidth / COPIES;
      let delta = 0;
      if (el.scrollLeft < setWidth * 0.5) delta = setWidth;
      else if (el.scrollLeft >= setWidth * 1.5) delta = -setWidth;
      if (delta !== 0) {
        el.scrollLeft += delta;
        drag.current.startLeft += delta; // keep an in-progress drag consistent
      }
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  // Click-and-drag for mouse users (trackpad and touch already scroll sideways)
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = scrollerRef.current;
    if (!el || e.pointerType !== "mouse") return;
    drag.current = {
      active: true,
      startX: e.clientX,
      startLeft: el.scrollLeft,
    };
    el.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = scrollerRef.current;
    if (!el || !drag.current.active) return;
    el.scrollLeft = drag.current.startLeft - (e.clientX - drag.current.startX);
  };
  const endDrag = () => {
    drag.current.active = false;
  };

  return (
    <section id="experiences" className="min-h-[92vh] py-20">
      <div className="max-w-7xl mx-auto px-8">
        <FadeIn className="mb-12 text-center">
          <h2 className="text-5xl text-white mb-4 font-space-grotesk font-bold">
            My Journey
          </h2>
          <p className="text-white text-lg">
            Drag or scroll sideways. It loops.
          </p>
        </FadeIn>
      </div>

      {/* No mask-image here: a masked parent stops backdrop-blur from seeing the background */}
      <div
        ref={scrollerRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        className="w-full overflow-x-auto cursor-grab active:cursor-grabbing select-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <div className="flex items-center w-max py-10">
          {Array.from({ length: COPIES }, (_, copy) => (
            <div
              key={copy}
              className="flex flex-none items-center"
              aria-hidden={copy !== 1}
            >
              {/* Start / end marker: one per lap */}
              <div className="flex-none w-24 h-24 rounded-full border-2 border-slate-400 flex flex-col items-center justify-center text-center font-space-grotesk text-sm leading-tight text-slate-400">
                <Repeat className="w-4 h-4 mb-1" />
                start /<br />
                end
              </div>

              {experiences.map((e) => (
                <div key={e.company} className="contents">
                  {/* Line + node */}
                  <div className="relative flex-none h-px w-16 bg-white/25">
                    <span className="absolute left-1/2 top-1/2 w-2.5 h-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#F5B037]" />
                  </div>

                  {/* Card */}
                  <div
                    className="relative flex-none w-96 h-[400px] rounded-2xl overflow-hidden
                      bg-gradient-to-br from-white/10 to-white/[0.02]
                      backdrop-blur-2xl backdrop-saturate-150
                      border border-white/30
                      shadow-[0_8px_32px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.5),inset_0_-1px_0_rgba(255,255,255,0.08)]
                      hover:scale-105 transition-transform duration-300"
                  >
                    {/* Glare: light catching the top-left corner */}
                    <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(120%_80%_at_0%_0%,rgba(255,255,255,0.22),transparent_55%)]" />

                    {/* Color tint: raise or lower the opacity to taste */}
                    <div
                      className={`absolute inset-0 pointer-events-none bg-gradient-to-br ${e.color} opacity-15`}
                    />

                    {/* Content sits above the glare and tint */}
                    <div className="relative h-full p-8 text-white flex flex-col justify-between">
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 text-white/80 text-sm">
                          <Building2 className="w-4 h-4 shrink-0" /> {e.company}
                        </div>
                        <h3 className="text-2xl font-bold">{e.role}</h3>
                        <div className="space-y-1 text-sm text-white/90">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" /> {e.period}
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" /> {e.location}
                          </div>
                        </div>
                        <p className="text-white/90 leading-relaxed text-sm">
                          {e.description}
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-4">
                        {e.skills.map((s) => (
                          <span
                            key={s}
                            className="bg-white/20 text-xs px-3 py-1 rounded-full"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Line into the next lap's start marker */}
              <div className="flex-none h-px w-16 bg-white/25" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
