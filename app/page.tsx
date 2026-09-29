"use client";

import { useState, useEffect, useRef } from "react";
import {
  ChevronDown,
  ExternalLink,
  Mail,
  FileText,
  Building2,
  Calendar,
  MapPin,
  Globe,
  ChevronRight,
  Repeat,
} from "lucide-react";

import { Fragment } from "react";

import Typewriter from "@/components/Typewriter";
import SpaceBackground from "@/components/SpaceBackground";
import ScrollRocket from "@/components/ScrollRocket";
import Image from "next/image";


const interests = ["building software", "analyzing data", "playing video games", "learning new things", "creating impact"];

const contacts = [
  { isCustomLogo: true, logoPath: "/logos/linkedin-logo.svg", label: "LinkedIn", url: "https://linkedin.com/in/reysheildoromal", color: "bg-blue-800" },
  { isCustomLogo: true, logoPath: "/logos/github-logo.svg", label: "GitHub", url: "https://github.com/wiishiwaashi", color: "bg-gray-800" },
  { isCustomLogo: false, icon: Mail, label: "Email", url: "mailto:ishi@example.com", color: "bg-red-800" },
  { isCustomLogo: false, icon: FileText, label: "Resume", url: "/Doromal_GeneralResume.pdf", color: "bg-green-800" },
];

const projects = [
  {
    title: "Katha: The Network for Tech Work",
    description: "A B2B/B2C marketplace for tech services in the Philippines, including 3D Printing, Laser, and CAD.",
    image: "/images/project-photos/katha-photos/katha-main-photo.png",
    tech: ["React", "FastAPI", "PostgreSQL", "Railway", "Vercel"],
    color: "from-neutral-400 to-slate-900",
    projectLink: "https://v0-katha-delta.vercel.app"
  },
  {
    title: "Cybersecurity Triage Data Generation & Analysis",
    description: "A data modeling project that simulates real-world cybersecurity data triage and performs Exploratory Data Analysis.",
    image: "/images/project-photos/eif-photos/eif-main-photo.png",
    tech: ["Python", "Pandas", "Matplotlib", "Numpy", "Seaborn", "Tableau"],
    color: "from-slate-900 to-neutral-400",
    projectLink: "https://github.com/wiishiwaashi/cybersec-data-generator-analysis.git"
  },
  {
    title: "Bomberman Game Dupe",
    description: "To try my hand in game dev, and as a project for school. Includes Web Sockets",
    image: "/images/project-photos/bomberman-photos/bomberman-main-photo.png",
    tech: ["Java"],
    color: "from-neutral-400 to-slate-900",
    projectLink: "https://github.com/wiishiwaashi/bombsaway-pvp-game.git"
  },
  {
    title: "Aguhon: AI Disaster Management Assistant",
    description: "AI assistant for pre-, during, and post-disaster scenarios.",
    image: "/images/project-photos/aguhon-photos/aguhon-main-photo.png",
    tech: ["React", "Next.js"],
    color: "from-pink-500 to-orange-500",
    projectLink: "https://aguhon-disaster-intelligence.vercel.app"
  },
  {
    title: "Fuse",
    description: "Site to connect students with fellow students for hackathons teammates, hackathons, and connecting to internships.",
    image: "/images/project-photos/fuse-photos/fuse-main-photo.png",
    tech: ["React", "Next.js", "Firebase"],
    color: "from-pink-500 to-orange-500",
    projectLink: "https://fuse-alpha.vercel.app"
  },
];

const experiences = [
  {
    company: "De La Salle University College of Computer Studies - Center for Language Technologies",
    role: "Natural Language Processing Intern",
    period: "June 2023 – July 2023",
    location: "Taft, Manila",
    description: "Helped in data preparation and validation of chatbot projects, presented research on semantics, made Python scripts for easier data gathering and classification",
    skills: ["DeepNote", "Jupyter", "Python", "RegEx"],
    color: "from-emerald-500 to-teal-600",
  },
  {
    company: "Eskwelabs Cohort 9",
    role: "Data Modeling Fellow",
    period: "Feb 2026– Present",
    location: "Remote",
    description: "Built a cybersecurity triage data generator",
    skills: ["Python", "Numpy", "Matplotlib", "Seaborn", "Pandas", "Tableau"],
    color: "from-neutral-400 to-slate-600",
  },
  {
    company: "Boxhive Digital Solutions",
    role: "Frontend Developer Intern",
    period: "June 2026 – Present",
    location: "Remote",
    description: "Developed responsive web applications for client projects. Contributed to the company component library.",
    skills: ["TypeScript", "Docker", "React", "Figma", "Next.js"],
    color: "from-purple-500 to-pink-600",
  },
  {
    company: "KadaKareer",
    role: "Product Engineering Junior Mission Specialist",
    period: "June 2026 – Present",
    location: "Remote",
    description: "Identify and fix bug fixes, work on client projects",
    skills: ["Git", "Full Stack Development"],
    color: "from-orange-500 to-red-600",
  },
];

const skills = [
  { title: "Languages", items: ["JavaScript", "TypeScript", "Python", "HTML/CSS", "SQL", "Java"] },
  { title: "Frameworks", items: ["React", "Next.js", "Node.js", "Express"] },
  { title: "Databases", items: ["PostgreSQL", "Firebase"] },
  { title: "Data Science", items: ["Matplotlib", "Seaborn", "Numpy", "Pandas"] },
  { title: "Cloud & DevOps", items: ["AWS", "Docker", "Vercel", "CI/CD"] },
  { title: "Tools", items: ["Git", "Figma", "VS Code", "Postman", "Vite"] },
  { title: "Other", items: ["REST APIs", "GraphQL", "Jest", "Agile/Scrum"] },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

function useFadeIn() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { 
        el.style.opacity = "1"; 
        el.style.transform = "translateY(0)"; 
      }
    }, { threshold: 0.05 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

function ScrollPrompt({ text, targetId}: { text: string; targetId: string}) {
  return (
    <div
      onClick={() => scrollTo(targetId)}
      className={`h-[8vh] flex items-center justify-center cursor-pointer select-none backdrop-blur-none bg-slate-950/20 hover:bg-slate-950/30 text-white`}
    >
      <div className="flex flex-row items-center gap-2">
        <span className="text-sm">{text}</span>
        <ChevronDown className="w-6 h-6 animate-bounce translate-y-[3px]" />
      </div>
    </div>
  );
}

function FadeIn({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useFadeIn();
  return (
    <div
      ref={ref}
      className={className}
      style={{ opacity: 0, transform: "translateY(24px)", transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms` }}
    >
      {children}
    </div>
  );
}

function Hero() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setLoaded(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <section className="min-h-[92vh] text-white flex items-center justify-center p-8 overflow-hidden backdrop-blur-none">
      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
        {/* Intro */}
        <div
          className="flex flex-col justify-center space-y-6 transition-all duration-1000 ease-out max-w-md"
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateX(0)" : "translateX(-40px)",
          }}
        >
          <h1 className="text-4xl lg:text-4.5xl leading-tight font-space-grotesk break-words">
            I&apos;m{" "}
            <span className="font-bold bg-clip-text text-purple-600">Ishi</span>
            , and I like{" "}
            <span className="inline-block relative align-bottom">
              <Typewriter
                words={interests}
                typingSpeed={80}
                deletingSpeed={40}
                pauseDuration={2000}
                textColor="text-purple-600"
              />
            </span>
          </h1>
          <p className="text-lg text-purple-200 leading-relaxed font-inter-sans">
            I am a current CS student focused on web development and data
            science who loves to play sports on the side!
          </p>
        </div>

        {/* Photo */}
        <div
          className="flex items-center justify-center transition-all duration-1000 delay-200 ease-out"
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(30px)",
          }}
        >
          <Image
            src="/images/self-carousel/photo-of-me-1.jpg"
            alt="Ishi"
            width={200}
            height={200}
            className="w-[260px] sm:w-[300px] aspect-square object-cover rounded-2xl shadow-2xl ring-4 ring-white/10"
          />
        </div>

        {/* Contacts */}
        <div
          className="flex flex-col justify-center transition-all duration-1000 delay-400 ease-out"
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateX(0)" : "translateX(40px)",
          }}
        >
          <h2 className="text-2xl mb-6 font-bold font-space-grotesk">
            {" "}
            Let&apos;s connect!{" "}
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {contacts.map((c) => (
              <a
                key={c.label}
                href={c.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`${c.color} rounded-xl p-6 flex flex-col items-center gap-3 text-white hover:scale-105 hover:rotate-1 active:scale-95 transition-transform duration-200 shadow-lg`}
              >
                {c.isCustomLogo ? (
                  <Image
                    src={c.logoPath ?? ""}
                    alt={c.label}
                    width={32}
                    height={32}
                    className="w-8 h-8 object-contain invert"
                  />
                ) : (
                  c.icon && <c.icon className="w-8 h-8" />
                )}
                <span className="text-sm font-medium">{c.label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section
      id="projects"
      className="min-h-screen py-20 px-8 backdrop-blur-none"
    >
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

function Experiences() {
  const COPIES = 5;
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

      <div
        ref={scrollerRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        className="w-full overflow-x-auto cursor-grab active:cursor-grabbing select-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]"
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
                    className={`flex-none w-96 h-[400px] rounded-2xl bg-gradient-to-br ${e.color} shadow-2xl hover:scale-105 transition-transform duration-300 p-8 text-white flex flex-col justify-between`}
                  >
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

function Skills() {
  return (
    <section id="skills" className="min-h-screen py-20 px-8 backdrop-blur-none">
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

export default function App() {
  return (
    <div className="overflow-x-hidden">
      <SpaceBackground />
      <ScrollRocket />
      <Hero />
      <ScrollPrompt text="scroll to see my projects" targetId="projects"/>
      <Projects />
      <ScrollPrompt text="explore my experiences" targetId="experiences"/>
      <Experiences />
      <ScrollPrompt text="check out my skills" targetId="skills"/>
      <Skills />
      <footer className="text-white py-8 text-center backdrop-blur-none bg-slate-950/20">
        <p className="text-xl mb-2">Thanks for stopping by!</p>
        <p className="text-purple-300 text-sm">Built with React, TailwindCSS • © 2026 Ishi</p>
      </footer>
    </div>
  );
}