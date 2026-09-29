import FadeIn from "@/components/FadeIn";
import { skills } from "@/data/skills";

export default function Skills() {
  return (
    <section id="skills" className="min-h-screen py-20 px-8">
      <div className="max-w-7xl mx-auto">
        <FadeIn className="mb-16 text-center">
          <h2 className="text-5xl text-white mb-4 font-space-grotesk font-bold">
            Skills & Expertise
          </h2>
          <p className="text-white text-lg">My tech stack and other tools!</p>
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((cat, i) => (
            <FadeIn key={cat.title} delay={i * 50}>
              <div
                className="rounded-2xl p-6 h-full
  bg-gradient-to-br from-white/15 to-white/5
  backdrop-blur-xl border border-white/20
  shadow-[0_8px_32px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.25)]
  hover:scale-105 hover:bg-white/20 transition-all duration-300"
              >
                <h3 className="text-lg font-bold text-white mb-4">
                  {cat.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {cat.items.map((item) => (
                    <span
                      key={item}
                      className="bg-white/10 border border-white/15 text-[#73CBE1] text-sm px-3 py-1 rounded-full font-medium"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
