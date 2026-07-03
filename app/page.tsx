"use client";

import { useState, useEffect, useRef } from "react";
import { 
  ChevronDown, 
  ExternalLink, 
  Mail, 
  FileText, 
  MessageCircle, 
  Building2, 
  Calendar, 
  MapPin,
  Globe
} from "lucide-react";

import Typewriter from "@/components/Typewriter";
import {BubbleBackground} from "@/components/AnimatedBackground"

// ── Data ──────────────────────────────────────────────────────────────────────

const photos = [
  "/images/self-carousel/photo-of-me-1.jpg",
  "/images/self-carousel/photo-of-me-2.JPG",
  "/images/self-carousel/photo-of-me-3.jpg",
  "/images/self-carousel/photo-of-me-4.jpg",
];

const interests = ["building software", "analyzing data", "playing video games", "learning new things", "creating impact"];

const contacts = [
  { isCustomLogo: true, logoPath: "/logos/linkedin-logo.svg", label: "LinkedIn", url: "https://linkedin.com/in/reysheildoromal", color: "bg-blue-800" },
  { isCustomLogo: true, logoPath: "/logos/github-logo.svg", label: "GitHub", url: "https://github.com/wiishiwaashi", color: "bg-gray-800" },
  { isCustomLogo: false, icon: Mail, label: "Email", url: "mailto:ishi@example.com", color: "bg-red-800" },
  { isCustomLogo: false, icon: FileText, label: "Resume", url: "#", color: "bg-green-800" },
];

const projects = [
  {
    title: "Katha: The Network for Tech Work",
    description: "A B2B/B2C marketplace for tech services in the Philippines, including 3D Printing, Laser, and CAD.",
    image: "images/project-photos/katha-photos/katha-main-photo.png",
    tech: ["React", "FastAPI", "PostgreSQL", "Railway", "Vercel"],
    color: "from-neutral-400 to-slate-900",
    projectLink: "https://v0-katha-delta.vercel.app"
  },
  {
    title: "Cybersecurity Triage Data Generation & Analysis",
    description: "A data modeling project that simulates real-world cybersecurity data triage and performs Exploratory Data Analysis.",
    image: "images/project-photos/eif-photos/eif-main-photo.png",
    tech: ["Python", "Pandas", "Matplotlib", "Numpy", "Seaborn", "Tableau"],
    color: "from-slate-900 to-neutral-400",
    projectLink: "https://github.com/wiishiwaashi/cybersec-data-generator-analysis.git"
  },
  {
    title: "Bomberman Game Dupe",
    description: "To try my hand in game dev, and as a project for school. Includes Web Sockets",
    image: "images/project-photos/bomberman-photos/bomberman-main-photo.png",
    tech: ["Java"],
    color: "from-neutral-400 to-slate-900",
    projectLink: "https://github.com/wiishiwaashi/bombsaway-pvp-game.git"
  },
  {
    title: "Aguhon: AI Disaster Management Assistant",
    description: "AI assistant for pre-, during, and post-disaster scenarios.",
    image: "images/project-photos/aguhon-photos/aguhon-main-photo.png",
    tech: ["React", "Next.js"],
    color: "from-pink-500 to-orange-500",
    projectLink: "https://aguhon-disaster-intelligence.vercel.app"
  },
  {
    title: "Fuse",
    description: "Site to connect students with fellow students for hackathons teammates, hackathons, and connecting to internships.",
    image: "images/project-photos/fuse-photos/fuse-main-photo.png",
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

// ── Components ────────────────────────────────────────────────────────────────

function ScrollPrompt({ text, targetId}: { text: string; targetId: string}) {
  return (
    <div
      onClick={() => scrollTo(targetId)}
      className={`h-[8vh] flex items-center justify-center cursor-pointer select-none backdrop-blur-md bg-slate-950/20 hover:bg-slate-950/30 text-white`}
    >
      <div className="flex flex-row items-center gap-2">
        <span className="text-sm">{text}</span>
        <ChevronDown className="w-6 h-6 animate-bounce translate-y-[4px]" />
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

// ── Sections ──────────────────────────────────────────────────────────────────

function Hero() {
  const [photo, setPhoto] = useState(0);
  const [loaded, setLoaded] = useState(false);

  // ─── ADDED: Cyclical loop handlers for left and right buttons ───
  const handlePrev = () => {
    setPhoto((p) => (p === 0 ? photos.length - 1 : p - 1));
  };

  const handleNext = () => {
    setPhoto((p) => (p === photos.length - 1 ? 0 : p + 1));
  };

  useEffect(() => {
    setLoaded(true); // Triggers clean initial load transitions
  }, []);

  return (
    <section className="min-h-[92vh] text-white flex items-center justify-center p-8 overflow-hidden backdrop-blur-md">
      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">

        {/* Intro */}
        <div 
          className="flex flex-col justify-center space-y-6 transition-all duration-1000 ease-out max-w-md"
          style={{ opacity: loaded ? 1 : 0, transform: loaded ? "translateX(0)" : "translateX(-40px)" }}
        >
          <h1 className="text-4xl lg:text-4.5xl leading-tight font-press-start-2p break-words">
            I'm <span className="font-bold bg-clip-text text-purple-600">Ishi</span>, and I like{" "}
            <span className="inline-block relative align-bottom">
              <Typewriter
                words = {interests}
                typingSpeed = {80}
                deletingSpeed = {40}
                pauseDuration={2000}
                textColor = "text-purple-600"
              />
            </span>
          </h1>
          <p className="text-lg text-purple-200 leading-relaxed font-inter-sans">
            I am a current CS student focused on web development and data science who loves to play sports on the side!
          </p>
        </div>

        {/* Photo Carousel Area */}
        <div 
          className="relative flex items-center justify-center transition-all duration-1000 delay-200 ease-out h-[400px] w-full"
          style={{ opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(30px)" }}
        >
          {/* Left Arrow - Positioned completely outside the clipping window */}
          <button 
            onClick={handlePrev}
            className="absolute left-0 lg:-left-6 z-30 bg-slate-900/50 hover:bg-slate-900/70 text-white p-3 rounded-full border border-white/10 backdrop-blur-sm transition-all hover:scale-110 active:scale-95"
          >
            <ChevronDown className="w-6 h-6 rotate-90" />
          </button>

          {/* ─── NEW: CLIPPING MASK WINDOW ─── */}
          {/* This container defines exactly how much of the side photos can be seen before they vanish */}
          <div className="relative w-[460px] sm:w-[500px] h-full overflow-hidden flex items-center justify-center">
            
            {/* Inner viewport matching the size of the active center photo */}
            <div className="relative w-[260px] sm:w-[300px] aspect-square flex items-center justify-center">
              {photos.map((src, i) => {
                let offset = i - photo;
                
                if (offset < -1) offset += photos.length;
                if (offset > 1) offset -= photos.length;

                const isCenter = offset === 0;
                const isLeft = offset === -1;
                const isRight = offset === 1;
                const isHidden = !isCenter && !isLeft && !isRight;

                return (
                  <img
                    key={src}
                    src={src}
                    alt="Ishi"
                    className="absolute inset-0 w-full h-full object-cover rounded-2xl shadow-2xl ring-4 ring-white/10 transition-all duration-500 ease-in-out"
                    style={{
                      /* ─── CHANGED: Lowered translation from 112% to 100% ─── */
                      /* This moves them exactly to the edge of the center photo, keeping their inside halves 100% visible inside the window */
                      transform: isCenter 
                        ? "translateX(0) scale(1)" 
                        : isLeft 
                        ? "translateX(-100%) scale(0.85)" 
                        : isRight 
                        ? "translateX(100%) scale(0.85)" 
                        : "translateX(0) scale(0.5)",
                      opacity: isCenter ? 1 : isHidden ? 0 : 0.4, /* Kept slightly brighter at 40% */
                      zIndex: isCenter ? 20 : isHidden ? 0 : 10,
                      pointerEvents: isCenter ? "auto" : "none"
                    }}
                  />
                );
              })}
            </div>

          </div>

          {/* Right Arrow - Positioned completely outside the clipping window */}
          <button 
            onClick={handleNext}
            className="absolute right-0 lg:-right-6 z-30 bg-slate-900/50 hover:bg-slate-900/70 text-white p-3 rounded-full border border-white/10 backdrop-blur-sm transition-all hover:scale-110 active:scale-95"
          >
            <ChevronDown className="w-6 h-6 -rotate-90" />
          </button>
        </div>

        {/* Contacts */}
        <div 
          className="flex flex-col justify-center transition-all duration-1000 delay-400 ease-out"
          style={{ opacity: loaded ? 1 : 0, transform: loaded ? "translateX(0)" : "translateX(40px)" }}
        >
          <h2 className="text-2xl mb-6 font-bold font-press-start-2p"> Let's connect! </h2>
          <div className="grid grid-cols-2 gap-4">
            {contacts.map((c) => (
              <a key={c.label} href={c.url} target="_blank" rel="noopener noreferrer"
                className={`${c.color} rounded-xl p-6 flex flex-col items-center gap-3 text-white hover:scale-105 hover:rotate-1 active:scale-95 transition-transform duration-200 shadow-lg`}
              >
                {c.isCustomLogo ? (
                  <img src={c.logoPath} alt={c.label} className="w-8 h-8 object-contain invert" />
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
    <section id="projects" className="min-h-screen py-20 px-8 backdrop-blur-md">
      <div className="max-w-6xl mx-auto">
        <FadeIn className="mb-16 text-center">
          <h2 className="text-5xl text-white pb-4 mb-4 font-press-start-2p">My Projects</h2>
          <p className="text-white text-lg">{"A collection of things I've built and shipped"}</p>
        </FadeIn>
        <div className="space-y-12">
          {projects.map((p, i) => (
            <FadeIn key={p.title} delay={i * 100}>
              <div className={`rounded-2xl overflow-hidden shadow-xl md:h-[350px] bg-gradient-to-r flex flex-col md:flex-row ${i % 2 !== 0 ? "md:flex-row-reverse" : ""} ${i % 2 !== 0 ? "from-slate-900 to-neutral-600" : "from-neutral-600 to-slate-900"}`}>
                  <div className="h-[250px] md:h-full flex-none bg-black/10 flex items-center justify-center">
                  <img 
                    src={p.image} 
                    alt={p.title} 
                    className="h-full w-auto max-w-full object-contain" 
                  />
                </div>
                <div className="p-8 text-white flex flex-col justify-between flex-1 min-w-0">
                  <div className="space-y-4">
                    <h3 className="text-3xl font-bold">{p.title}</h3>
                    <p className="text-white/90 leading-relaxed whitespace-pre-line">{p.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {p.tech.map(t => <span key={t} className="bg-white/20 text-xs px-3 py-1 rounded-full">{t}</span>)}
                    </div>
                  </div>
                  <div className="flex gap-4 pt-6">
                    <a href={p.projectLink} className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors text-sm">
                      <ExternalLink className="w-4 h-4" /> Live Demo
                    </a>
                    <a href="#" className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors text-sm">
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
  return (
    <section id="experiences" className="min-h-[92vh] py-20 px-8 backdrop-blur-md">
      <div className="max-w-7xl mx-auto">
        <FadeIn className="mb-12 text-center">
          <h2 className="text-5xl text-white mb-4 font-press-start-2p">My Journey</h2>
          <p className="text-white text-lg">Scroll to explore my experiences</p>
        </FadeIn>
        <div className="overflow-x-auto pb-8" style={{ scrollbarWidth: "thin" }}>
          <div className="flex gap-8 min-w-max px-4 py-8 -my-6 pt-15 -mt-10">
            {experiences.map((e, i) => (
              <FadeIn key={e.company} delay={i * 100}>
                <div className={`w-96 h-[400px] rounded-2xl bg-gradient-to-br ${e.color} shadow-2xl hover:scale-105 transition-transform duration-300 p-8 text-white flex flex-col justify-between`}>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-white/80 text-sm"><Building2 className="w-4 h-4" /> {e.company}</div>
                    <h3 className="text-2xl font-bold">{e.role}</h3>
                    <div className="space-y-1 text-sm text-white/90">
                      <div className="flex items-center gap-2"><Calendar className="w-4 h-4" /> {e.period}</div>
                      <div className="flex items-center gap-2"><MapPin className="w-4 h-4" /> {e.location}</div>
                    </div>
                    <p className="text-white/90 leading-relaxed text-sm">{e.description}</p>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {e.skills.map(s => <span key={s} className="bg-white/20 text-xs px-3 py-1 rounded-full">{s}</span>)}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="min-h-screen py-20 px-8 backdrop-blur-md">
      <div className="max-w-7xl mx-auto">
        <FadeIn className="mb-16 text-center">
          <h2 className="text-5xl text-white mb-4 font-press-start-2p">Skills & Expertise</h2>
          <p className="text-white text-lg">My tech stack and other tools!</p>
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((cat, i) => (
            <FadeIn key={cat.title} delay={i * 50}>
              <div className="bg-white rounded-2xl shadow-xl p-6 hover:scale-105 transition-transform duration-300 h-full">
                <h3 className="text-lg font-bold text-slate-800 mb-4">{cat.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {cat.items.map(item => (
                    <span key={item} className="bg-slate-200 text-blue-700 text-sm px-3 py-1 rounded-full font-medium">{item}</span>
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
      <BubbleBackground />
      <Hero />
      <ScrollPrompt text="scroll to see my projects" targetId="projects"/>
      <Projects />
      <ScrollPrompt text="explore my experiences" targetId="experiences"/>
      <Experiences />
      <ScrollPrompt text="check out my skills" targetId="skills"/>
      <Skills />
      <footer className="text-white py-8 text-center backdrop-blur-md bg-slate-950/20">
        <p className="text-xl mb-2">Thanks for stopping by!</p>
        <p className="text-purple-300 text-sm">Built with React, TailwindCSS • © 2026 Ishi</p>
      </footer>
    </div>
  );
}