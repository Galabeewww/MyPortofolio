import React, { useState, useEffect } from "react";
import {
  X,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Calendar,
  Folder,
  Mail,
} from "lucide-react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useLanguage } from "../context/LanguageContext";

const MySwal = withReactContent(Swal);

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

const ProjectDetailModal = ({
  project,
  projectsList = [],
  onClose,
  onSelectProject,
}) => {
  const { t, lang } = useLanguage();
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const getGalleryImages = () => {
    if (!project) return [];
    if (Array.isArray(project.images) && project.images.length > 0) {
      return project.images.map((img) => (typeof img === "string" ? img : img.url));
    }
    const fallbackImage =
      project.cover_image || project.image_url || project.image || "/project/py.png";
    return [fallbackImage];
  };

  const galleryImages = getGalleryImages();

  useEffect(() => {
    setActiveImageIndex(0);
  }, [project]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") handlePrevProject();
      if (e.key === "ArrowRight") handleNextProject();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [project, projectsList]);

  if (!project) return null;

  const currentIndex = projectsList.findIndex((p) => p.id === project.id);
  const handlePrevProject = () => {
    if (projectsList.length <= 1) return;
    const prevIdx = (currentIndex - 1 + projectsList.length) % projectsList.length;
    onSelectProject(projectsList[prevIdx]);
  };

  const handleNextProject = () => {
    if (projectsList.length <= 1) return;
    const nextIdx = (currentIndex + 1) % projectsList.length;
    onSelectProject(projectsList[nextIdx]);
  };

  const handleLiveDemoClick = () => {
    const link = project.live_link || project.liveLink;
    if (!link || link === "#" || link.trim() === "") {
      MySwal.fire({
        title: t.projects.noDemoTitle,
        text: t.projects.noDemoText,
        icon: "info",
        confirmButtonText: "OK",
        confirmButtonColor: "#0284c7",
        background: "var(--bg-card)",
        color: "var(--text-primary)",
      });
    } else {
      window.open(link, "_blank", "noreferrer");
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "July 2026";
    try {
      const d = new Date(dateString);
      return d.toLocaleDateString(lang === "id" ? "id-ID" : "en-US", {
        month: "long",
        year: "numeric",
      });
    } catch {
      return "July 2026";
    }
  };

  const techList = Array.isArray(project.tech)
    ? project.tech
    : typeof project.tech === "string"
    ? project.tech.split(",").map((t) => t.trim())
    : [];

  const featuresList = Array.isArray(project.features)
    ? project.features.filter((f) => f && f.trim() !== "")
    : typeof project.features === "string"
    ? project.features.split(",").map((f) => f.trim()).filter((f) => f.length > 0)
    : [];

  const longDescription = project.full_description || project.description;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-[fadeIn_0.2s_ease-out] overflow-y-auto"
    >
      {/* Container Modal Utama Sesuai Referensi Gambar Baru */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-5xl rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-2xl overflow-hidden flex flex-col my-auto max-h-[92vh]"
      >
        {/* Header Modal */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-zinc-800 shrink-0">
          <span className="text-xs font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-wider font-mono">
            {project.title}
          </span>

          <div className="flex items-center gap-3">
            {projectsList.length > 1 && (
              <div className="flex items-center gap-1.5 mr-2">
                <button
                  onClick={handlePrevProject}
                  className="px-3.5 py-1.5 rounded-full border border-slate-200 dark:border-zinc-700 text-slate-700 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-800 text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
                  title="Proyek Sebelumnya"
                >
                  <ChevronLeft size={14} />
                  <span>Prev</span>
                </button>
                <button
                  onClick={handleNextProject}
                  className="px-3.5 py-1.5 rounded-full border border-slate-200 dark:border-zinc-700 text-slate-700 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-800 text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
                  title="Proyek Selanjutnya"
                >
                  <span>Next</span>
                  <ChevronRight size={14} />
                </button>
              </div>
            )}

            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Body Modal Grid */}
        <div className="p-6 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Galeri Gambar & Deskripsi Panjang (Kiri Sesuai Referensi Gambar) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Display Gambar Utama */}
            <div className="relative aspect-[16/10] rounded-2xl bg-slate-950 border border-slate-200 dark:border-zinc-800 overflow-hidden group shadow-lg flex items-center justify-center">
              <img
                src={galleryImages[activeImageIndex] || "/project/py.png"}
                alt={project.title}
                className="w-full h-full object-cover transition-all duration-300"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/project/py.png";
                }}
              />

              {/* Counter Badge Indikator 1/5 */}
              <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-slate-950/80 text-white text-xs font-extrabold backdrop-blur-md border border-white/10 shadow-md">
                {activeImageIndex + 1} / {galleryImages.length}
              </div>

              {galleryImages.length > 1 && (
                <>
                  <button
                    onClick={() =>
                      setActiveImageIndex(
                        (prev) => (prev - 1 + galleryImages.length) % galleryImages.length
                      )
                    }
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-slate-950/70 text-white hover:bg-slate-900 transition-all opacity-0 group-hover:opacity-100 cursor-pointer backdrop-blur-sm"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    onClick={() =>
                      setActiveImageIndex((prev) => (prev + 1) % galleryImages.length)
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-slate-950/70 text-white hover:bg-slate-900 transition-all opacity-0 group-hover:opacity-100 cursor-pointer backdrop-blur-sm"
                  >
                    <ChevronRight size={18} />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail Strip */}
            {galleryImages.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2 pt-1 scrollbar-thin">
                {galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-20 h-14 rounded-xl overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                      activeImageIndex === idx
                        ? "border-sky-500 scale-105 shadow-md ring-2 ring-sky-500/20"
                        : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Section Description (Sesuai Referensi Gambar di Sisi Kiri Bawah Galeri) */}
            <div className="space-y-3 pt-2 text-left border-t border-slate-100 dark:border-zinc-800">
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white font-display">
                Description
              </h3>
              <div className="text-sm text-slate-600 dark:text-zinc-300 leading-relaxed whitespace-pre-line space-y-3">
                {longDescription}
              </div>
            </div>
          </div>

          {/* Metadata Informasi (Kanan Sesuai Referensi Gambar) */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <div className="flex items-start justify-between gap-4">
              <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900 dark:text-white leading-tight">
                {project.title}
              </h2>
              <button
                onClick={handleLiveDemoClick}
                className="p-3 rounded-full bg-slate-950 text-white dark:bg-white dark:text-slate-950 hover:scale-110 active:scale-95 transition-transform shrink-0 cursor-pointer shadow-md"
                title="Buka Live Demo"
              >
                <ExternalLink size={18} />
              </button>
            </div>

            <p className="text-sm text-slate-600 dark:text-zinc-300 leading-relaxed line-clamp-3">
              {project.description}
            </p>

            <hr className="border-slate-100 dark:border-zinc-800" />

            {/* Created at & Category */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-full bg-slate-100 dark:bg-zinc-800 text-slate-800 dark:text-zinc-200">
                  <Calendar size={18} />
                </div>
                <div>
                  <p className="text-[11px] font-semibold text-slate-400 dark:text-zinc-500 uppercase tracking-wider">
                    Created at
                  </p>
                  <p className="text-sm font-bold text-slate-800 dark:text-zinc-200">
                    {formatDate(project.created_at)}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-full bg-slate-100 dark:bg-zinc-800 text-slate-800 dark:text-zinc-200">
                  <Folder size={18} />
                </div>
                <div>
                  <p className="text-[11px] font-semibold text-slate-400 dark:text-zinc-500 uppercase tracking-wider">
                    Category
                  </p>
                  <p className="text-sm font-bold text-slate-800 dark:text-zinc-200 uppercase">
                    {project.category || "Web Development"}
                  </p>
                </div>
              </div>
            </div>

            {/* Tags (Tech Stack) */}
            <div className="space-y-2.5 pt-2">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-800 dark:text-zinc-200">
                Tags
              </h4>
              <div className="flex flex-wrap gap-2">
                {techList.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3.5 py-1.5 rounded-full bg-slate-100 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-slate-700 dark:text-zinc-300 text-xs font-semibold"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Features (from CRUD) */}
            {featuresList.length > 0 && (
              <div className="space-y-2.5 pt-2">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-800 dark:text-zinc-200">
                  Key Features
                </h4>
                <ul className="space-y-2">
                  {featuresList.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2.5 text-sm text-slate-600 dark:text-zinc-300"
                    >
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-sky-500 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Live Demo & GitHub Links */}
            {(project.live_link || project.github_link) && (
              <div className="space-y-2.5 pt-2">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-800 dark:text-zinc-200">
                  Links
                </h4>
                <div className="space-y-2">
                  {project.live_link && project.live_link.trim() !== "" && (
                    <a
                      href={project.live_link}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 text-sm text-sky-500 hover:text-sky-400 font-medium transition-colors break-all"
                    >
                      <ExternalLink size={14} className="shrink-0" />
                      <span>{project.live_link}</span>
                    </a>
                  )}
                  {project.github_link && project.github_link.trim() !== "" && (
                    <a
                      href={project.github_link}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 text-sm text-sky-500 hover:text-sky-400 font-medium transition-colors break-all"
                    >
                      <GithubIcon size={14} className="shrink-0" />
                      <span>{project.github_link}</span>
                    </a>
                  )}
                </div>
              </div>
            )}

            <hr className="border-slate-100 dark:border-zinc-800" />

            {/* Connect With Me */}
            <div className="space-y-3 pt-1 text-center">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-zinc-500">
                Connect With Me
              </p>
              <div className="flex items-center justify-center gap-3">
                <a
                  href="https://github.com/Galabeewww"
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-full bg-slate-100 dark:bg-zinc-800 hover:bg-slate-200 dark:hover:bg-zinc-700 text-slate-700 dark:text-zinc-200 transition-all hover:scale-110 cursor-pointer"
                  title="GitHub"
                >
                  <GithubIcon size={18} />
                </a>
                <a
                  href="https://www.linkedin.com/in/muhammad-abi-rafdi-pratama-436044290/"
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-full bg-slate-100 dark:bg-zinc-800 hover:bg-slate-200 dark:hover:bg-zinc-700 text-slate-700 dark:text-zinc-200 transition-all hover:scale-110 cursor-pointer"
                  title="LinkedIn"
                >
                  <LinkedinIcon size={18} />
                </a>
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=pratamaabi28@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-slate-100 dark:bg-zinc-800 hover:bg-slate-200 dark:hover:bg-zinc-700 text-slate-700 dark:text-zinc-200 transition-all hover:scale-110 cursor-pointer"
                  title="Email"
                >
                  <Mail size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailModal;
