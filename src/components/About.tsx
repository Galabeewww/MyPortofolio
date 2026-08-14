import React from "react";
import {
  Code2,
  CheckCircle2,
  Sparkles,
  MapPin,
  Briefcase,
  Download,
} from "lucide-react";
import Swal from "sweetalert2";
import { useLanguage } from "../context/LanguageContext";

const About = () => {
  const { t } = useLanguage();

  const handleDownloadCV = async () => {
    const { value: selectedCV } = await Swal.fire({
      title: "Pilih CV untuk diunduh",
      input: "select",
      inputOptions: {
        cv_fullstack: "CV Fullstack Developer",
        cv_qa: "CV Quality Assurance",
      },
      inputPlaceholder: "Pilih salah satu CV",
      showCancelButton: true,
      confirmButtonText: "Download",
      background: "var(--bg-card)",
      color: "var(--text-primary)",
    });

    if (selectedCV) {
      const link = document.createElement("a");
      link.href = `/${selectedCV}.pdf`; // pastikan file ada di folder public
      link.download = `${selectedCV}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      Swal.fire({
        icon: "success",
        title: "Downloading CV...",
        text: `${selectedCV} sedang diunduh.`,
        timer: 2500,
        showConfirmButton: false,
        background: "var(--bg-card)",
        color: "var(--text-primary)",
      });
    }
  };

  return (
    <section
      id="about"
      className="py-24 relative border-t border-[var(--border-color)] overflow-hidden space-y-16"
    >
      {/* ===== BAGIAN ABOUT ME ===== */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <h2 className="text-3xl sm:text-5xl font-extrabold font-display text-[var(--text-primary)] tracking-tight">
            {t.about.titlePrefix}
            <span className="text-sky-500">{t.about.titleSuffix}</span>
          </h2>
          <p className="text-[var(--text-secondary)] text-sm sm:text-base font-medium leading-relaxed">
            {t.about.subtitle}
          </p>
        </div>

        {/* Kartu Profil Bio & Fitur Utama */}
        <div className="glow-card p-6 sm:p-10 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-color)] shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
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
                <h4 className="font-bold text-sm text-[var(--text-primary)]">
                  {t.about.pillar1Title}
                </h4>
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
                <h4 className="font-bold text-sm text-[var(--text-primary)]">
                  {t.about.pillar2Title}
                </h4>
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
                <h4 className="font-bold text-sm text-[var(--text-primary)]">
                  {t.about.pillar3Title}
                </h4>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                  {t.about.pillar3Desc}
                </p>
              </div>
            </div>
          </div>

          {/* Tombol Download CV di bawah isi, rata tengah */}
          <div className="lg:col-span-12 flex justify-center pt-6">
            <button
              onClick={handleDownloadCV}
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-2xl bg-sky-500 hover:bg-sky-600 text-white font-extrabold text-xs sm:text-sm tracking-wider uppercase shadow-lg shadow-sky-500/20 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer group"
            >
              <Download
                size={17}
                className="group-hover:translate-y-0.5 transition-transform"
              />
              <span>{t.about.downloadCV || "DOWNLOAD CV"}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
