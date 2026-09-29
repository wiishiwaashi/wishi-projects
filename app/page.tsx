import SpaceBackground from "@/components/SpaceBackground";
import ScrollRocket from "@/components/ScrollRocket";
import ScrollPrompt from "@/components/ScrollPrompt";
import Hero from "@/components/home_sections/Hero";
import Projects from "@/components/home_sections/Projects";
import Experiences from "@/components/home_sections/Experiences";
import Skills from "@/components/home_sections/Skills";

export default function Page() {
  return (
    <div className="overflow-x-hidden">
      <SpaceBackground />
      <ScrollRocket />
      <Hero />
      <ScrollPrompt text="scroll to see my projects" targetId="projects" />
      <Projects />
      <ScrollPrompt text="explore my experiences" targetId="experiences" />
      <Experiences />
      <ScrollPrompt text="check out my skills" targetId="skills" />
      <Skills />
      <footer className="text-white py-8 text-center bg-slate-950/20">
        <p className="text-xl mb-2">Thanks for stopping by!</p>
        <p className="text-purple-300 text-sm">
          Built with React, TailwindCSS • © 2026 Ishi
        </p>
      </footer>
    </div>
  );
}
