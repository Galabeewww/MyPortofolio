import React, { useState, useEffect } from "react";
import { supabase, isSupabaseConfigured } from "../lib/supabaseClient";
import { useLanguage } from "../context/LanguageContext";

const Skills = () => {
  const [skillsList, setSkillsList] = useState([]);
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
      id="skills"
      className="py-24 relative border-t border-[var(--border-color)] overflow-hidden space-y-12"
    >
      <div className="text-center max-w-3xl mx-auto space-y-3 px-4">
        <h2 className="text-3xl sm:text-5xl font-extrabold font-display text-[var(--text-primary)] tracking-tight">
          {t.about.skillsTitlePrefix}
          <span className="text-sky-500">{t.about.skillsTitleSuffix}</span>
        </h2>
        <p className="text-[var(--text-secondary)] text-sm sm:text-base font-medium leading-relaxed max-w-xl mx-auto">
          {t.about.skillsSubtitle}
        </p>
      </div>

      {/* Marquee Interaktif Bergerak Dinamis */}
      {skillsList.length > 0 ? (
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
      ) : (
        <div className="text-center py-12 text-[var(--text-muted)] text-sm">
          No skills added yet.
        </div>
      )}
    </section>
  );
};

export default Skills;
