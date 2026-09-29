import Image from "next/image";
import { ExternalLink, Globe } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import { projects } from "@/data/projects";

export default function Projects() {
  return (
    <section id="projects" className="min-h-screen py-20 px-8">
      <div className="max-w-6xl mx-auto">
        <FadeIn className="mb-16 text-center">
          <h2 className="text-5xl text-white pb-4 mb-4 font-space-grotesk font-bold">
            My Projects
          </h2>
          <p className="text-white text-lg">
            {"A collection of things I've built and shipped"}
          </p>
        </FadeIn>
        <div className="space-y-12">
          {projects.map((p, i) => (
            <FadeIn key={p.title} delay={i * 100}>
              <div
                className={`rounded-2xl overflow-hidden md:h-[350px] flex flex-col md:flex-row
    bg-gradient-to-br from-white/15 to-white/5
    backdrop-blur-xl border border-white/20
    shadow-[0_8px_32px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.25)]
    ${i % 2 !== 0 ? "md:flex-row-reverse" : ""}`}
              >
                <div className="relative h-[250px] md:h-full w-full md:w-1/2 flex-none">
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover object-top"
                  />
                </div>
                <div className="p-8 text-white flex flex-col justify-between md:w-1/2 min-w-0">
                  <div className="space-y-4">
                    <h3 className="text-3xl font-bold">{p.title}</h3>
                    <p className="text-white/90 leading-relaxed whitespace-pre-line">
                      {p.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {p.tech.map((t) => (
                        <span
                          key={t}
                          className="bg-white/20 text-xs px-3 py-1 rounded-full"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-4 pt-6">
                    <a
                      href={p.projectLink}
                      className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-sm px-4 py-2 rounded-lg transition-colors text-sm"
                    >
                      <ExternalLink className="w-4 h-4" /> Live Demo
                    </a>
                    <a
                      href="#"
                      className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-sm px-4 py-2 rounded-lg transition-colors text-sm"
                    >
                      <Globe className="w-4 h-4" /> Code
                    </a>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
