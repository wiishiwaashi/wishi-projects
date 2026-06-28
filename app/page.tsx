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
  "/images/self-carousel/photo-of-me-4.jpg"
];

const interests = ["building software", "analyzing data", "playing video games", "learning new things", "creating impact"];

const contacts = [
  { isCustomLogo: true, logoPath: "/logos/linkedin-logo.svg", label: "LinkedIn", url: "https://linkedin.com", color: "bg-blue-600" },
  { isCustomLogo: true, logoPath: "/logos/github-logo.svg", label: "GitHub", url: "https://github.com", color: "bg-gray-800" },
  { isCustomLogo: false, icon: Mail, label: "Email", url: "mailto:ishi@example.com", color: "bg-red-500" },
  { isCustomLogo: false, icon: FileText, label: "Resume", url: "#", color: "bg-green-600" },
];

const projects = [
  {
    title: "Katha: The Network for Tech Work",
    description: "A full-stack e-commerce solution with real-time inventory management, payment processing, and personalized recommendations.",
    image: "images/project-photos/katha-photos/katha-main-photo.png",
    tech: ["React", "FastAPI", "PostgreSQL", "Railway", "Vercel"],
    color: "from-blue-500 to-purple-600",
    projectLink: "https://v0-katha-delta.vercel.app"
  },
  {
    title: "Cybersecurity Triage Data Generation & Analysis",
    description: "A collaborative task management application with team boards, real-time updates, and productivity analytics.",
    image: "images/project-photos/eif-photos/eif-main-photo.png",
    tech: ["Python", "Pandas", "Matplotlib", "Numpy", "Seaborn", "Tableau"],
    color: "from-pink-500 to-orange-500",
    projectLink: "#"
  },
  {
    title: "Bomberman Game Dupe",
    description: "To try my hand in game dev, and as a pro",
    image: "images/project-photos/bomberman-photos/bomberman-main-photo.png",
    tech: ["Java"],
    color: "from-blue-500 to-purple-600",
    projectLink: "#"
  },
  {
    title: "Aguhon: AI Disaster Management Assistant",
    description: "Interactive weather dashboard with detailed forecasts, interactive maps, and severe weather alerts.",
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&q=80",
    tech: ["React", "Next.js"],
    color: "from-pink-500 to-orange-500",
    projectLink: "https://aguhon-disaster-intelligence.vercel.app"
  },
  {
    title: "Fuse",
    description: "Interactive weather dashboard with detailed forecasts, interactive maps, and severe weather alerts.",
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&q=80",
    tech: ["React", "Next.js"],
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
    description: "Leading the frontend architecture team, implementing cutting-edge React solutions and mentoring junior developers.",
    skills: ["React", "TypeScript", "GraphQL", "AWS"],
    color: "from-emerald-500 to-teal-600",
  },
  {
    company: "Eskwelabs Cohort 9",
    role: "Data Modeling Fellow",
    period: "Feb 2026– Present",
    location: "Remote",
    description: "Built and scaled the core product from MVP to 100K+ users. Implemented real-time features and payment systems.",
    skills: ["Node.js", "React", "MongoDB", "Redis"],
    color: "from-blue-500 to-indigo-600",
  },
  {
    company: "Boxhive Digital Solutions",
    role: "Frontend Developer Intern",
    period: "June 2026 – Present",
    location: "Remote",
    description: "Developed responsive web applications for client projects. Contributed to the company component library.",
    skills: ["HTML", "CSS", "JavaScript", "Figma"],
    color: "from-purple-500 to-pink-600",
  },
  {
    company: "KadaKareer",
    role: "Product Engineering Junior Mission Specialist",
    period: "June 2026 – Present",
    location: "Remote",
    description: "Conducted research on web accessibility and developed tools to improve user experience for people with disabilities.",
    skills: ["Python", "Data Analysis", "UX Research"],
    color: "from-orange-500 to-red-600",
  },
];

const skills = [
  { title: "Languages", items: ["JavaScript", "TypeScript", "Python", "HTML/CSS", "SQL"] },
  { title: "Frameworks", items: ["React", "Next.js", "Node.js", "Express", "Vue.js"] },
  { title: "Databases", items: ["PostgreSQL", "MongoDB", "Redis", "Firebase"] },
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

function ScrollPrompt({ text, targetId, dark = true }: { text: string; targetId: string; dark?: boolean }) {
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

  useEffect(() => {
    setLoaded(true); // Triggers clean initial load transitions
    const t1 = setInterval(() => setPhoto(p => (p + 1) % photos.length), 3000);
    return () => { clearInterval(t1);};
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
            I'm <span className="font-bold bg-clip-text text-purple-400">Ishi</span>, and I like{" "}
            <span className="inline-block relative align-bottom">
              <Typewriter
                words = {interests}
                typingSpeed = {80}
                deletingSpeed = {40}
                pauseDuration={2000}
                textColor = "text-purple-400"
              />
            </span>
          </h1>
          <p className="text-lg text-purple-200 leading-relaxed font-inter-sans">
            I am a current CS student focused on web development and data science who loves to play sports on the side!
          </p>
        </div>

        {/* Photo Carousel */}
        <div 
          className="flex items-center justify-center transition-all duration-1000 delay-200 ease-out"
          style={{ opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(30px)" }}
        >
          <div className="relative w-full max-w-sm aspect-square">
            {photos.map((src, i) => (
              <img
                key={src}
                src={src}
                alt="Ishi"
                className="absolute inset-0 w-full h-full object-cover rounded-2xl shadow-2xl ring-4 ring-white/20 transition-opacity duration-700 ease-in-out"
                style={{ opacity: i === photo ? 1 : 0, zIndex: i === photo ? 1 : 0 }}
              />
            ))}
            <div className="absolute -bottom-4 -right-4 bg-white/10 rounded-full p-4 z-10">
              <div className="flex gap-2">
                {photos.map((_, i) => (
                  <button 
                    key={i} 
                    onClick={() => setPhoto(i)} 
                    className={`h-2 rounded-full transition-all duration-300 ${i === photo ? "bg-white w-8" : "bg-white/50 w-2"}`} 
                  />
                ))}
              </div>
            </div>
          </div>
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
                  <img src={c.logoPath} alt={c.label} className="w-8 h-8 object-contain" />
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
          <h2 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-pink-400 pb-4 mb-4 font-press-start-2p">My Projects</h2>
          <p className="text-white-600 text-lg">{"A collection of things I've built and shipped"}</p>
        </FadeIn>
        <div className="space-y-12">
          {projects.map((p, i) => (
            <FadeIn key={p.title} delay={i * 100}>
              <div className={`rounded-2xl overflow-hidden shadow-xl md:h-[350px] bg-gradient-to-r ${p.color} grid md:grid-cols-2 ${i % 2 !== 0 ? "md:[&>*:first-child]:order-2" : ""}`}>
                <img src={p.image} alt={p.title} className="w-full h-full object-cover min-h-[250px]" />
                <div className="p-8 text-white flex flex-col justify-between">
                  <div className="space-y-4">
                    <h3 className="text-3xl font-bold">{p.title}</h3>
                    <p className="text-white/90 leading-relaxed">{p.description}</p>
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
          <h2 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-pink-400 mb-4 font-press-start-2p">My Journey</h2>
          <p className="text-purple-300 text-lg">Scroll to explore my experiences</p>
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
          <h2 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-pink-600 mb-4 font-press-start-2p">Skills & Expertise</h2>
          <p className="text-white-600 text-lg">My tech stack and other tools!</p>
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((cat, i) => (
            <FadeIn key={cat.title} delay={i * 50}>
              <div className="bg-white rounded-2xl shadow-xl p-6 hover:scale-105 transition-transform duration-300 h-full">
                <h3 className="text-lg font-bold text-slate-800 mb-4">{cat.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {cat.items.map(item => (
                    <span key={item} className="bg-gradient-to-r from-orange-100 to-pink-100 text-orange-700 text-sm px-3 py-1 rounded-full font-medium">{item}</span>
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
      <footer className="text-white py-12 text-center backdrop-blur-md bg-slate-950/20">
        <p className="text-xl mb-2">Thanks for stopping by!</p>
        <p className="text-purple-300 text-sm">Built with React, TailwindCSS • © 2026 Ishi</p>
      </footer>
    </div>
  );
}