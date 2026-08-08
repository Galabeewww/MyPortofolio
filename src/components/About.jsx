import React, { useState, useEffect } from "react";
import { Code2, CheckCircle2, Sparkles, MapPin, Briefcase } from "lucide-react";
import { supabase, isSupabaseConfigured } from "../lib/supabaseClient";
import { useLanguage } from "../context/LanguageContext";

const INITIAL_SKILLS = [];

const About = () => {
  const [skillsList, setSkillsList] = useState(INITIAL_SKILLS);
  const { t } = useLanguage();

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    const savedSkills = localStorage.getItem("portfolio_crud_skills");

    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase.from("skills").select("*");
        if (!error && data && data.length > 0) {
          setSkillsList(
            data.map((item) => ({
              name: item.name,
              logo: item.logo_url || item.logo,
              category: item.category || "Skills",
            }))
          );
          return;
        }
      } catch (err) {
        console.error("Supabase skills fetch error:", err);
      }
    }

    if (savedSkills) {
      const parsed = JSON.parse(savedSkills);
      setSkillsList(
        parsed.map((item) => ({
          name: item.name,
          logo: item.logo_url || item.logo,
          category: item.category || "Skills",
        }))
      );
    }
  };

  const halfLength = Math.ceil(skillsList.length / 2);
  const row1 = skillsList.slice(0, halfLength);
  const row2 = skillsList.slice(halfLength);

  const marqueeRow1 = [...row1, ...row1, ...row1, ...row1];
  const marqueeRow2 = [...row2, ...row2, ...row2, ...row2];

  return (
    <section
      id="about"
      className="py-24 relative border-t border-[var(--border-color)] overflow-hidden space-y-24"
    >
      {/* ===== BAGIAN ABOUT ME ===== */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <h2 className="text-3xl sm:text-5xl font-extrabold font-display text-[var(--text-primary)] tracking-tight">
            {t.about.titlePrefix}<span className="text-sky-500">{t.about.titleSuffix}</span>
          </h2>
          <p className="text-[var(--text-secondary)] text-sm sm:text-base font-medium leading-relaxed">
            {t.about.subtitle}
          </p>
        </div>

        {/* Kartu Profil Bio & Fitur Utama */}
        <div className="glow-card p-6 sm:p-10 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-color)] shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Kolom Kiri: Deskripsi & Informasi */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="space-y-3">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-sky-500/10 text-sky-500 border border-sky-500/30">
                {t.about.badge}
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold font-display text-[var(--text-primary)] leading-snug">
                {t.about.greeting}
              </h3>
            </div>

            <p className="text-[var(--text-secondary)] text-sm sm:text-base leading-relaxed">
              {t.about.para1}
            </p>

            <p className="text-[var(--text-secondary)] text-sm sm:text-base leading-relaxed">
              {t.about.para2}
            </p>

            {/* List Detail Singkat */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-[var(--text-primary)]">
                <div className="p-2 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)]">
                  <MapPin size={16} className="text-sky-500" />
                </div>
                <span>{t.about.location}</span>
              </div>

              <div className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-[var(--text-primary)]">
                <div className="p-2 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)]">
                  <Briefcase size={16} className="text-emerald-500" />
                </div>
                <span>{t.about.role}</span>
              </div>
            </div>
          </div>

          {/* Kolom Kanan: 3 Kartu Keunggulan / Pilar Utama */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-5 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-color)] flex items-start gap-4 hover:border-[var(--border-color-hover)] transition-all duration-300">
              <div className="p-3 rounded-xl bg-sky-500/10 text-sky-500 border border-sky-500/20 shrink-0">
                <Code2 size={22} />
              </div>
              <div className="text-left space-y-1">
                <h4 className="font-bold text-sm text-[var(--text-primary)]">{t.about.pillar1Title}</h4>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                  {t.about.pillar1Desc}
                </p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-color)] flex items-start gap-4 hover:border-[var(--border-color-hover)] transition-all duration-300">
              <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 shrink-0">
                <CheckCircle2 size={22} />
              </div>
              <div className="text-left space-y-1">
                <h4 className="font-bold text-sm text-[var(--text-primary)]">{t.about.pillar2Title}</h4>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                  {t.about.pillar2Desc}
                </p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-color)] flex items-start gap-4 hover:border-[var(--border-color-hover)] transition-all duration-300">
              <div className="p-3 rounded-xl bg-purple-500/10 text-purple-500 border border-purple-500/20 shrink-0">
                <Sparkles size={22} />
              </div>
              <div className="text-left space-y-1">
                <h4 className="font-bold text-sm text-[var(--text-primary)]">{t.about.pillar3Title}</h4>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                  {t.about.pillar3Desc}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== BAGIAN TECHNICAL SKILLS (DIBAWAH ABOUT ME DENGAN ID="SKILLS") ===== */}
      <div id="skills" className="space-y-8 pt-6 scroll-mt-28">
        <div className="text-center max-w-3xl mx-auto space-y-3 px-4">
          <h3 className="text-2xl sm:text-4xl font-extrabold font-display text-[var(--text-primary)] tracking-tight">
            {t.about.skillsTitlePrefix}<span className="text-sky-500">{t.about.skillsTitleSuffix}</span>
          </h3>
          <p className="text-[var(--text-secondary)] text-sm sm:text-base font-medium leading-relaxed max-w-xl mx-auto">
            {t.about.skillsSubtitle}
          </p>
        </div>

        {/* Marquee Interaktif Bergerak Dinamis */}
        <div className="relative max-w-7xl mx-auto marquee-container py-4">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-20 sm:w-36 bg-gradient-to-r from-[var(--bg-primary)] via-[var(--bg-primary)]/80 to-transparent z-20" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-20 sm:w-36 bg-gradient-to-l from-[var(--bg-primary)] via-[var(--bg-primary)]/80 to-transparent z-20" />

          <div className="space-y-6 overflow-hidden">
            <div className="animate-marquee flex gap-4 sm:gap-6 items-center">
              {marqueeRow1.map((skill, idx) => (
                <div
                  key={`r1_${idx}`}
                  className="flex-shrink-0 flex items-center gap-3.5 px-6 py-4 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-primary)] shadow-sm hover:border-[var(--border-color-hover)] hover:scale-105 transition-all duration-300 cursor-pointer select-none group"
                >
                  <img
                    src={skill.logo}
                    alt={skill.name}
                    className="w-7 h-7 sm:w-8 sm:h-8 object-contain transition-transform duration-300 group-hover:scale-110"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/icon/react.png";
                    }}
                  />
                  <span className="font-bold text-sm sm:text-base tracking-tight font-sans">
                    {skill.name}
                  </span>
                </div>
              ))}
            </div>

            <div className="animate-marquee-reverse flex gap-4 sm:gap-6 items-center">
              {marqueeRow2.map((skill, idx) => (
                <div
                  key={`r2_${idx}`}
                  className="flex-shrink-0 flex items-center gap-3.5 px-6 py-4 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-primary)] shadow-sm hover:border-[var(--border-color-hover)] hover:scale-105 transition-all duration-300 cursor-pointer select-none group"
                >
                  <img
                    src={skill.logo}
                    alt={skill.name}
                    className="w-7 h-7 sm:w-8 sm:h-8 object-contain transition-transform duration-300 group-hover:scale-110"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/icon/react.png";
                    }}
                  />
                  <span className="font-bold text-sm sm:text-base tracking-tight font-sans">
                    {skill.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
