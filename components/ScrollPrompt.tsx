"use client";

import { ChevronDown } from "lucide-react";

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export default function ScrollPrompt({
  text,
  targetId,
}: {
  text: string;
  targetId: string;
}) {
  return (
    <div
      onClick={() => scrollTo(targetId)}
      className="h-[8vh] flex items-center justify-center cursor-pointer select-none bg-slate-950/20 hover:bg-slate-950/30 text-white"
    >
      <div className="flex flex-row items-center gap-2">
        <span className="text-sm">{text}</span>
        <ChevronDown className="w-6 h-6 animate-bounce translate-y-[3px]" />
      </div>
    </div>
  );
}
