import React from "react";
import { ArrowRight } from "lucide-react";

const GithubIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.size || 18}
    height={props.size || 18}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.size || 18}
    height={props.size || 18}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" rx="1" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const Hero = () => {
  const marqueeItems = [
    "JUNIOR WEB DEVELOPER",
    "/",
    "FRONTEND DEV",
    "/",
    "REACT & NEXT.JS",
    "/",
    "QUALITY ASSURANCE",
    "/",
    "QA TESTING",
    "/",
    "SOFTWARE TESTING",
    "/",
    "WEB DEVELOPMENT",
    "/",
    "FRONTEND DEV",
    "/",
  ];

  const fullMarquee = [
    ...marqueeItems,
    ...marqueeItems,
    ...marqueeItems,
    ...marqueeItems,
    ...marqueeItems,
    ...marqueeItems,
  ];

  return (
    <section
      id="home"
      className="min-h-screen flex flex-col justify-between pt-24 pb-8 relative select-none w-full overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-sky-500/10 dark:bg-sky-500/15 blur-[140px] pointer-events-none rounded-full" />

      {/* Top Tagline */}
      <div className="w-full text-center relative z-10 pt-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--badge-bg)] text-[var(--badge-text)] border border-[var(--badge-border)] text-xs font-bold tracking-wider uppercase shadow-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          MUHAMMAD ABI RAFDI PRATAMA
        </div>
      </div>

      {/* Main Banner: Giant Text + Diagonal Ribbon (Kiri Bawah → Kanan Atas) */}
      <div className="relative w-full my-auto flex flex-col items-center justify-center z-10 py-2">
        {/* Giant Name Typography — Ukuran besar seperti NANDA */}
        <div className="w-full flex justify-center items-center">
          <h1 className="hero-giant-text font-black font-display tracking-[-0.06em] leading-[0.85] uppercase text-[var(--text-primary)] text-center w-full px-0 select-none">
            GALABEEWW
          </h1>
        </div>

        {/* Diagonal Ribbon: Dari Pojok Kiri Bawah → Pojok Kanan Atas (Persis seperti NANDA) */}
        <div className="hero-ribbon absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
          <div className="hero-ribbon-band bg-sky-500 text-slate-950 font-black uppercase text-xs sm:text-sm md:text-base tracking-wider shadow-2xl border-y-2 border-slate-950/20 overflow-hidden flex items-center pointer-events-auto">
            {/* Semua Tulisan Bergerak SATU ARAH (Kanan ke Kiri) */}
            <div className="animate-marquee whitespace-nowrap flex items-center gap-5 sm:gap-8">
              {fullMarquee.map((item, idx) => (
                <span key={idx} className="shrink-0">
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Foto Profil Melingkar — Presisi Tengah Ribbon */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-auto group cursor-pointer">
            <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-full border-4 border-slate-950/80 overflow-hidden shadow-2xl bg-slate-900 group-hover:scale-110 transition-transform duration-300 ring-4 ring-sky-500/30">
              <img
                src="/foto.jpg"
                alt="Foto Profil"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80";
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Subtitle Bio & View Projects Button */}
      <div className="flex flex-col items-center text-center space-y-6 max-w-xl mx-auto px-4 relative z-10 pt-2">
        <p className="text-[var(--text-secondary)] text-sm sm:text-base font-medium leading-relaxed">
          I build modern web applications and quality software that deliver
          exceptional user experiences with precision and speed.
        </p>

        <a
          href="#projects"
          className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-[var(--accent-btn)] hover:bg-[var(--accent-btn-hover)] text-[var(--accent-btn-text)] font-extrabold text-xs sm:text-sm tracking-widest uppercase shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer group"
        >
          <span>VIEW PROJECTS</span>
          <ArrowRight
            size={16}
            className="group-hover:translate-x-1 transition-transform duration-300"
          />
        </a>
      </div>

      {/* Bottom Footer Bar */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 pt-6 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] relative z-10 flex-wrap gap-4">
        <div className="flex items-center gap-4 sm:gap-6">
          <a
            href="https://github.com/Galabeewww"
            target="_blank"
            rel="noreferrer"
            className="hover:text-[var(--text-primary)] transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <GithubIcon size={14} /> GITHUB
          </a>
          <a
            href="https://www.linkedin.com/in/muhammad-abi-rafdi-pratama-436044290/"
            target="_blank"
            rel="noreferrer"
            className="hover:text-[var(--text-primary)] transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <LinkedinIcon size={14} /> LINKEDIN
          </a>
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=pratamaabi28@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--text-primary)] transition-colors cursor-pointer hidden sm:inline-block"
          >
            EMAIL
          </a>
        </div>

        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <span className="text-[var(--text-secondary)]">
            AVAILABLE FOR WORK
          </span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
