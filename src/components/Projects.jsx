import React, { useState, useEffect } from "react";
import {
  Share2,
  X,
  Maximize2,
  ArrowUpRight,
} from "lucide-react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { supabase, isSupabaseConfigured } from "../lib/supabaseClient";
import { useLanguage } from "../context/LanguageContext";
import ProjectDetailModal from "./ProjectDetailModal";

const MySwal = withReactContent(Swal);

const GithubIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.size || 20}
    height={props.size || 20}
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

const MOCK_PROJECTS = [
  {
    id: "1",
    title: "RT Administration System",
    description:
      "A Modern Residential Administration and Financial Management Platform for Neighborhood Communities. Features resident data management, financial tracking, monthly dues collection, and automated reports.",
    category: "Web Development",
    tech: ["Next.js", "Laravel API", "SSO", "TanStack Query", "Full Stack Development"],
    features: ["Real-time Payment Status", "Citizen Management", "Financial Reports"],
    live_link: "",
    github_link: "",
    cover_image: "/project/py.png",
    images: ["/project/py.png", "/project/cc.png", "/project/lf.png"],
    created_at: "2026-07-15T00:00:00Z",
  },
  {
    id: "2",
    title: "Rice Stock Management System – Berkah Lumbung Pangan",
    description:
      "Web-based rice stock management and wholesale ordering information system. Built to streamline inventory tracking, wholesale transactions, and sales analytics.",
    category: "Web Development",
    tech: ["React", "Tailwind CSS", "Supabase", "PostgreSQL", "Frontend"],
    features: ["Inventory Tracking", "Wholesale Order System", "Sales Analytics"],
    live_link: "https://coreculture.vercel.app/",
    github_link: "https://github.com/Galabeewww/coreculture",
    cover_image: "/project/cc.png",
    images: ["/project/cc.png", "/project/py.png", "/project/mp.png"],
    created_at: "2026-06-20T00:00:00Z",
  },
  {
    id: "3",
    title: "Lensfolio – Photography Showcase Platform",
    description:
      "Photography and videography portfolio platform with modern visual layout, high-performance media management, and custom album filtering.",
    category: "Web Design",
    tech: ["TypeScript", "Next.js", "Tailwind", "Cloudinary", "UI/UX"],
    features: ["Photo & Video Upload", "Interactive Gallery", "Category Filtering"],
    live_link: "https://photofolio-azure.vercel.app/",
    github_link: "https://github.com/Galabeewww/photofolio",
    cover_image: "/project/lf.png",
    images: ["/project/lf.png", "/project/mp.png", "/project/cc.png"],
    created_at: "2026-05-10T00:00:00Z",
  },
  {
    id: "4",
    title: "MyPortofolio Digital Showcase",
    description:
      "Interactive personal portfolio web application featuring liquid dark/light mode, CRUD admin panel, and dynamic content management.",
    category: "Web Development",
    tech: ["React", "Tailwind", "Supabase", "Vercel", "Full Stack"],
    features: ["Interactive Showcase", "CRUD Admin Panel", "Dark/Light Theme"],
    live_link: "https://my-portofolio-omega-lemon.vercel.app/",
    github_link: "https://github.com/Galabeewww/MyPortofolio",
    cover_image: "/project/mp.png",
    images: ["/project/mp.png", "/project/lf.png", "/project/py.png"],
    created_at: "2026-08-01T00:00:00Z",
  },
];

const Projects = () => {
  const { t } = useLanguage();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchProjects();
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const localCategories = localStorage.getItem("portfolio_crud_categories");
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase.from("categories").select("*");
        if (!error && data && data.length > 0) {
          setCategories(data);
          return;
        }
      } catch (err) {
        console.error("Supabase categories fetch error:", err);
      }
    }
    if (localCategories) {
      setCategories(JSON.parse(localCategories));
    }
  };

  const fetchProjects = async () => {
    setLoading(true);
    const localProjects = localStorage.getItem("portfolio_crud_projects");

    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from("projects")
          .select("*")
          .order("created_at", { ascending: false });

        if (!error && data && data.length > 0) {
          setProjects(data);
          setLoading(false);
          return;
        }
      } catch (err) {
        console.error("Supabase fetch error:", err);
      }
    }

    if (localProjects) {
      setProjects(JSON.parse(localProjects));
    } else {
      setProjects(MOCK_PROJECTS);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (selectedProject !== null || previewImage !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedProject, previewImage]);

  const handleLiveDemoClick = (e, link) => {
    e.stopPropagation();
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

  const handleGithubClick = (e, link) => {
    e.stopPropagation();
    if (!link || link === "#" || link.trim() === "") {
      MySwal.fire({
        title: t.projects.noGithubTitle,
        text: t.projects.noGithubText,
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

  const handleShareClick = (e, project) => {
    e.stopPropagation();
    const url = project.live_link || window.location.href;
    navigator.clipboard.writeText(url);
    MySwal.fire({
      title: t.projects.copiedTitle,
      text: t.projects.copiedText,
      icon: "success",
      timer: 2000,
      showConfirmButton: false,
      background: "var(--bg-card)",
      color: "var(--text-primary)",
    });
  };

  const filteredProjects =
    activeCategory === "ALL"
      ? projects
      : projects.filter(
          (p) => (p.category || "").toUpperCase() === activeCategory.toUpperCase()
        );

  return (
    <section id="projects" className="py-24 relative border-t border-[var(--border-color)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <h2 className="text-3xl sm:text-5xl font-extrabold font-display text-[var(--text-primary)] tracking-tight">
            {t.projects.titlePrefix}<span className="text-sky-500">{t.projects.titleSuffix}</span>
          </h2>
          <p className="text-[var(--text-secondary)] text-sm sm:text-base font-medium leading-relaxed">
            {t.projects.subtitle}
          </p>
        </div>

        {/* Filter Kategori */}
        {categories.length > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            <button
              onClick={() => setActiveCategory("ALL")}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer ${
                activeCategory === "ALL"
                  ? "bg-sky-500 text-white shadow-md shadow-sky-500/25"
                  : "bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`}
            >
              {t.projects.allCategories}
            </button>

            {categories.map((cat) => (
              <button
                key={cat.id || cat.name}
                onClick={() => setActiveCategory(cat.name)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer ${
                  activeCategory.toUpperCase() === cat.name.toUpperCase()
                    ? "bg-sky-500 text-white shadow-md shadow-sky-500/25"
                    : "bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        )}

        {/* Grid Proyek */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="glow-card group rounded-3xl bg-[var(--bg-card)] border border-[var(--border-color)] overflow-hidden flex flex-col justify-between transition-all duration-300 hover:border-sky-500/50 cursor-pointer shadow-xl"
            >
              {/* Gambar Cover Proyek */}
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-900 border-b border-[var(--border-color)]">
                <img
                  src={project.cover_image || project.image_url || "/project/py.png"}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/project/py.png";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedProject(project);
                  }}
                  className="absolute top-4 right-4 p-2.5 rounded-full bg-slate-950/70 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:scale-110 cursor-pointer backdrop-blur-md"
                  title="View Details"
                >
                  <Maximize2 size={16} />
                </button>
              </div>

              {/* Detail Konten Proyek */}
              <div className="p-6 sm:p-8 space-y-6 flex-1 flex flex-col justify-between text-left">
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-sky-500 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20">
                      {project.category || "WEB"}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold font-display text-[var(--text-primary)] group-hover:text-sky-500 transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-[var(--text-secondary)] text-xs sm:text-sm leading-relaxed line-clamp-3">
                    {project.description}
                  </p>
                </div>

                {/* Tech Pills */}
                {project.tech && project.tech.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-2">
                    {(Array.isArray(project.tech)
                      ? project.tech
                      : (project.tech || "").split(",")
                    ).map((tItem, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-muted)] text-[11px] font-semibold"
                      >
                        {typeof tItem === "string" ? tItem.trim() : tItem}
                      </span>
                    ))}
                  </div>
                )}

                {/* Action Buttons: Share, Live Demo, GitHub */}
                <div className="flex items-center gap-3 pt-4 border-t border-[var(--border-color)]">
                  <button
                    onClick={(e) => handleShareClick(e, project)}
                    className="p-2.5 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-sky-500 hover:border-sky-500/50 transition-all cursor-pointer"
                    title={t.projects.share}
                  >
                    <Share2 size={16} />
                  </button>

                  <button
                    onClick={(e) => handleLiveDemoClick(e, project.live_link)}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-sky-500/20 cursor-pointer"
                  >
                    <span>{t.projects.liveDemo}</span>
                    <ArrowUpRight size={15} />
                  </button>

                  <button
                    onClick={(e) => handleGithubClick(e, project.github_link)}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-[var(--bg-secondary)] hover:bg-[var(--border-color)] text-[var(--text-primary)] font-bold text-xs border border-[var(--border-color)] flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <GithubIcon size={15} />
                    <span>{t.projects.github}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && !loading && (
          <div className="text-center py-12 text-[var(--text-muted)]">
            <p>{t.projects.noProjects}</p>
          </div>
        )}
      </div>

      {/* Pop-Up Modal Detail Proyek Sesuai Referensi Gambar */}
      {selectedProject && (
        <ProjectDetailModal
          project={selectedProject}
          projectsList={filteredProjects}
          onClose={() => setSelectedProject(null)}
          onSelectProject={(newProject) => setSelectedProject(newProject)}
        />
      )}

      {/* Image Preview Modal */}
      {previewImage && (
        <div
          onClick={() => setPreviewImage(null)}
          className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out animate-[fadeIn_0.2s_ease-out]"
        >
          <div className="relative max-w-5xl max-h-[90vh] overflow-hidden rounded-2xl border border-slate-700 shadow-2xl">
            <img
              src={previewImage}
              alt="Preview"
              className="w-full h-full object-contain"
            />
            <button
              onClick={() => setPreviewImage(null)}
              className="absolute top-4 right-4 p-3 rounded-full bg-slate-900/80 text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;
