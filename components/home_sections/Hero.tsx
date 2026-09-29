"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Typewriter from "@/components/Typewriter";
import { contacts } from "@/data/contacts";
import { interests } from "@/data/interests";

export default function Hero() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setLoaded(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <section className="min-h-[92vh] text-white flex items-center justify-center p-8 overflow-hidden">
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
            Let&apos;s connect!
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
