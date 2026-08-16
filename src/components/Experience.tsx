import React, { useState, useEffect } from "react";
import { Briefcase, Calendar, MapPin, CheckCircle2 } from "lucide-react";
import { supabase, isSupabaseConfigured } from "../lib/supabaseClient";
import { useLanguage } from "../context/LanguageContext";
import { ExperienceSkeleton } from "./Skeletons";
import { useScrollReveal } from "../hooks/useScrollReveal";

const Experience = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t } = useLanguage();
  const { ref: sectionRef, isVisible } = useScrollReveal();

  useEffect(() => {
    fetchExperiences();
  }, []);

  // Sort experiences: PRESENT items first, then newest start_date / date descending
  const sortExperiences = (list) => {
    return [...list].sort((a, b) => {
      if (a.is_present && !b.is_present) return -1;
      if (!a.is_present && b.is_present) return 1;

      const dateA = a.start_date || a.created_at || a.period || "";
      const dateB = b.start_date || b.created_at || b.period || "";
      return dateB.localeCompare(dateA);
    });
  };

  const fetchExperiences = async () => {
    setLoading(true);
    const local = localStorage.getItem("portfolio_crud_experiences");

    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from("experiences")
          .select("*")
          .order("created_at", { ascending: false });

        if (!error && data && data.length > 0) {
          setExperiences(sortExperiences(data));
          setLoading(false);
          return;
        }
      } catch (err) {
        console.error("Supabase fetch experiences error:", err);
      }
    }

    if (local) {
      setExperiences(sortExperiences(JSON.parse(local)));
    }
    setLoading(false);
  };

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="py-24 relative border-t border-[var(--border-color)] overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-16">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <h2 className="text-3xl sm:text-5xl font-extrabold font-display text-[var(--text-primary)] tracking-tight">
            {t.experience.titlePrefix}
            <span className="text-sky-500">{t.experience.titleSuffix}</span>
          </h2>
          <p className="text-[var(--text-secondary)] text-sm sm:text-base font-medium leading-relaxed">
            {t.experience.subtitle}
          </p>
        </div>

        {/* Timeline Container */}
        {loading ? (
          <ExperienceSkeleton />
        ) : experiences.length === 0 ? (
          <div className="text-center py-16 p-8 rounded-3xl border border-[var(--border-color)] bg-[var(--bg-card)] space-y-3 max-w-lg mx-auto">
            <div className="p-4 rounded-2xl bg-sky-500/10 text-sky-500 w-fit mx-auto border border-sky-500/20">
              <Briefcase size={28} />
            </div>
            <p className="text-sm text-[var(--text-muted)] font-medium">
              {t.experience.noExperience}
            </p>
          </div>
        ) : (
          <div className="relative pt-6">
            {/* Vertical Line Timeline in Center */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-sky-500 via-sky-500/50 to-transparent -translate-x-1/2" />

            <div className="space-y-12 relative">
              {experiences.map((exp, index) => {
                const isEven = index % 2 === 0;
                const techArray = Array.isArray(exp.tech)
                  ? exp.tech
                  : (exp.tech || "")
                      .split(",")
                      .map((item) => item.trim())
                      .filter(Boolean);

                const respArray = Array.isArray(exp.responsibilities)
                  ? exp.responsibilities
                  : (exp.responsibilities || "")
                      .split("\n")
                      .map((item) => item.trim())
                      .filter(Boolean);

                return (
                  <div
                    key={exp.id || index}
                    style={{ transitionDelay: `${index * 0.15}s` }}
                    className={`relative flex flex-col md:flex-row items-center w-full anim-exp-card ${
                      isVisible ? "is-visible" : ""
                    }`}
                  >
                    {/* Glowing Center Node Circle */}
                    <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-[var(--bg-primary)] border-4 border-sky-500 shadow-[0_0_15px_rgba(14,165,233,0.6)] z-20 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-ping" />
                    </div>

                    {/* Timeline Card Container */}
                    <div
                      className={`w-full md:w-1/2 ${
                        isEven
                          ? "md:mr-auto pl-12 md:pl-0 md:pr-10"
                          : "md:ml-auto pl-12 md:pl-10"
                      }`}
                    >
                      <div className="glow-card p-6 sm:p-8 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-color)] shadow-xl space-y-6 text-left hover:border-sky-500/40 transition-all duration-300">
                        {/* Period & Present Badge */}
                        <div className="flex flex-wrap items-center gap-3">
                          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-color)] text-xs font-extrabold text-[var(--text-secondary)]">
                            <Calendar size={13} className="text-sky-500" />
                            <span>{exp.period || "2025 - Present"}</span>
                          </div>

                          {(exp.is_present ||
                            exp.period?.toLowerCase().includes("present")) && (
                            <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-black uppercase tracking-wider animate-pulse">
                              {t.experience.present || "PRESENT"}
                            </span>
                          )}
                        </div>

                        {/* Title, Company & Location */}
                        <div className="space-y-1.5">
                          <h3 className="text-xl sm:text-2xl font-extrabold font-display text-[var(--text-primary)] tracking-tight">
                            {exp.title}
                          </h3>
                          <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm font-semibold text-sky-500">
                            <span>{exp.company}</span>
                            {exp.location && (
                              <div className="flex items-center gap-1 text-[var(--text-muted)]">
                                <MapPin size={13} />
                                <span>{exp.location}</span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Responsibilities List */}
                        {respArray.length > 0 && (
                          <div className="space-y-2.5 pt-2 border-t border-[var(--border-color)]">
                            {respArray.map((resp, rIdx) => (
                              <div
                                key={rIdx}
                                className="flex items-start gap-3 text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed"
                              >
                                <CheckCircle2
                                  size={16}
                                  className="text-sky-500 shrink-0 mt-0.5"
                                />
                                <span>{resp}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Tech Stack Pills */}
                        {techArray.length > 0 && (
                          <div className="flex flex-wrap gap-2 pt-2">
                            {techArray.map((tItem, tIdx) => (
                              <span
                                key={tIdx}
                                className="px-3 py-1 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-primary)] text-[11px] font-semibold"
                              >
                                {tItem}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Experience;
