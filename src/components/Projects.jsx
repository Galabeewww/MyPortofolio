import React, { useState, useEffect } from 'react';
import {
  ExternalLink,
  Share2,
  X,
  Code2,
  Layers,
  Maximize2,
  ArrowUpRight,
} from 'lucide-react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';

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

// Fallback initial projects list
const MOCK_PROJECTS = [
  {
    id: '1',
    title: 'RT Administration System',
    description:
      'Aplikasi manajemen administrasi RT terintegrasi untuk pengelolaan data warga, keuangan, dan iuran bulanan.',
    category: 'WEB',
    tech: ['Next.js', 'Laravel API', 'SSO', 'TanStack Query'],
    features: ['Real-time Payment Status', 'Citizen Management', 'Financial Reports'],
    live_link: '',
    github_link: '',
    cover_image: '/project/py.png',
  },
  {
    id: '2',
    title: 'Rice Stock Management System – Berkah Lumbung Pangan',
    description:
      'Sistem informasi manajemen stok beras dan pemesanan grosir beras premium berbasis web.',
    category: 'WEB',
    tech: ['React', 'Tailwind CSS', 'Supabase', 'PostgreSQL'],
    features: ['Inventory Tracking', 'Wholesale Order System', 'Sales Analytics'],
    live_link: 'https://coreculture.vercel.app/',
    github_link: 'https://github.com/Galabeewww/coreculture',
    cover_image: '/project/cc.png',
  },
  {
    id: '3',
    title: 'Lensfolio – Photography Showcase Platform',
    description:
      'Platform portofolio fotografi dan videografi dengan tata letak visual modern dan manajemen media.',
    category: 'WEB',
    tech: ['TypeScript', 'Next.js', 'Tailwind', 'Cloudinary'],
    features: ['Photo & Video Upload', 'Interactive Gallery', 'Category Filtering'],
    live_link: 'https://photofolio-azure.vercel.app/',
    github_link: 'https://github.com/Galabeewww/photofolio',
    cover_image: '/project/lf.png',
  },
  {
    id: '4',
    title: 'MyPortofolio Digital Showcase',
    description:
      'Aplikasi web portofolio personal interaktif dengan mode gelap/terang dan fitur CRUD admin.',
    category: 'WEB',
    tech: ['React', 'Tailwind', 'Supabase', 'Vercel'],
    features: ['Interactive Showcase', 'CRUD Admin Panel', 'Dark/Light Theme'],
    live_link: 'https://my-portofolio-omega-lemon.vercel.app/',
    github_link: 'https://github.com/Galabeewww/MyPortofolio',
    cover_image: '/project/mp.png',
  },
];

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);

    // Try fetching from localStorage first (for CRUD updates in demo mode)
    const localProjects = localStorage.getItem('portfolio_crud_projects');

    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .order('created_at', { ascending: false });

        if (!error && data && data.length > 0) {
          setProjects(data);
          setLoading(false);
          return;
        }
      } catch (err) {
        console.error('Supabase fetch error:', err);
      }
    }

    if (localProjects) {
      setProjects(JSON.parse(localProjects));
    } else {
      setProjects(MOCK_PROJECTS);
    }
    setLoading(false);
  };

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedProject !== null || previewImage !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedProject, previewImage]);

  // SweetAlert Handler for Live Demo
  const handleLiveDemoClick = (e, link) => {
    e.stopPropagation();
    if (!link || link === '#' || link.trim() === '') {
      MySwal.fire({
        title: 'Informasi Demo',
        text: 'Live demo tidak tersedia',
        icon: 'info',
        confirmButtonText: 'Tutup',
        confirmButtonColor: 'var(--accent-btn)',
        background: 'var(--bg-card)',
        color: 'var(--text-primary)',
      });
    } else {
      window.open(link, '_blank', 'noreferrer');
    }
  };

  // SweetAlert Handler for GitHub
  const handleGithubClick = (e, link) => {
    e.stopPropagation();
    if (!link || link === '#' || link.trim() === '') {
      MySwal.fire({
        title: 'Informasi Repositori',
        text: 'GitHub tidak tersedia',
        icon: 'info',
        confirmButtonText: 'Tutup',
        confirmButtonColor: 'var(--accent-btn)',
        background: 'var(--bg-card)',
        color: 'var(--text-primary)',
      });
    } else {
      window.open(link, '_blank', 'noreferrer');
    }
  };

  // SweetAlert Handler for Share
  const handleShareClick = (e, project) => {
    e.stopPropagation();
    MySwal.fire({
      title: 'Bagikan Proyek',
      html: `<strong>${project.title}</strong><br/><span style="font-size:12px; opacity:0.8;">Tautan proyek berhasil dicopy ke clipboard!</span>`,
      icon: 'success',
      timer: 2000,
      showConfirmButton: false,
      background: 'var(--bg-card)',
      color: 'var(--text-primary)',
    });
    if (navigator.clipboard) {
      navigator.clipboard.writeText(project.live_link || window.location.href);
    }
  };

  return (
    <section id="projects" className="py-24 relative border-t border-[var(--border-color)]">
      {/* Header Section Sesuai Referensi Gambar */}
      <div className="max-w-4xl mx-auto mb-16 text-center space-y-3 px-4">
        <h2 className="text-3xl sm:text-5xl font-extrabold font-display text-[var(--text-primary)] tracking-tight">
          Selected Work
        </h2>
        <p className="text-[var(--text-secondary)] text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
          A showcase of my recent projects highlighting creativity, detail, and innovation.
        </p>
      </div>

      {/* Grid Proyek 2 Kolom (Sesuai Referensi Gambar) */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {loading ? (
          <div className="text-center py-12 text-[var(--text-muted)]">Memuat daftar proyek...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {projects.map((project) => {
              const coverImg = project.cover_image || project.image || '/project/py.png';
              const techList = Array.isArray(project.tech)
                ? project.tech
                : typeof project.tech === 'string'
                ? project.tech.split(',')
                : [];

              const liveUrl = project.live_link || project.liveLink || '';
              const githubUrl = project.github_link || project.githubLink || '';

              return (
                <div
                  key={project.id}
                  onClick={() => setSelectedProject(project)}
                  className="group cursor-pointer flex flex-col justify-between space-y-4"
                >
                  {/* Container Gambar Cover Atas Sesuai Gambar Referensi */}
                  <div className="relative w-full h-[260px] sm:h-[300px] rounded-3xl overflow-hidden bg-[var(--bg-secondary)] border border-[var(--border-color)] transition-all duration-300 group-hover:border-[var(--border-color-hover)] group-hover:shadow-xl">
                    <img
                      src={coverImg}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/project/py.png';
                      }}
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                  </div>

                  {/* Bagian Bawah: Judul & Action Buttons Sesuai Referensi */}
                  <div className="space-y-3 px-1">
                    <div className="flex items-start justify-between gap-4">
                      {/* Judul Proyek Besar & Tebal */}
                      <h3
                        className="text-xl sm:text-2xl font-bold font-display text-[var(--text-primary)] group-hover:opacity-90 transition-opacity leading-snug"
                        title={project.title}
                      >
                        {project.title}
                      </h3>

                      {/* Action Buttons (Share & External Link Icons Bulat Sesuai Referensi) */}
                      <div className="flex items-center gap-2 flex-shrink-0 pt-0.5">
                        <button
                          type="button"
                          onClick={(e) => handleShareClick(e, project)}
                          className="w-10 h-10 rounded-full bg-[var(--bg-card)] hover:bg-[var(--bg-card-hover)] text-[var(--text-primary)] border border-[var(--border-color)] flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 shadow-sm"
                          title="Share Project"
                        >
                          <Share2 size={16} />
                        </button>

                        <button
                          type="button"
                          onClick={(e) => handleLiveDemoClick(e, liveUrl)}
                          className="w-10 h-10 rounded-full bg-[var(--accent-btn)] hover:bg-[var(--accent-btn-hover)] text-[var(--accent-btn-text)] border border-transparent flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 shadow-sm"
                          title="Live Demo"
                        >
                          <ArrowUpRight size={18} />
                        </button>

                        {githubUrl && (
                          <button
                            type="button"
                            onClick={(e) => handleGithubClick(e, githubUrl)}
                            className="w-10 h-10 rounded-full bg-[var(--bg-card)] hover:bg-[var(--bg-card-hover)] text-[var(--text-primary)] border border-[var(--border-color)] flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 shadow-sm"
                            title="GitHub Repository"
                          >
                            <GithubIcon size={16} />
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Tech Badges / Pills Under Title (Outlined Style Sesuai Gambar) */}
                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      {techList.map((t, idx) => (
                        <span
                          key={idx}
                          className="px-3.5 py-1 rounded-full text-xs font-semibold bg-[var(--badge-bg)] text-[var(--badge-text)] border border-[var(--badge-border)]"
                        >
                          {t.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ===== MODAL DETAIL PROYEK ===== */}
      {selectedProject !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedProject(null)}
        >
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]" />

          <div
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[var(--bg-card)] border border-[var(--border-color)] shadow-2xl z-10 animate-[slideUp_0.3s_ease-out]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 z-30 p-2.5 rounded-full bg-black/60 hover:bg-black text-white transition-all duration-200 cursor-pointer"
              aria-label="Close"
            >
              <X size={20} />
            </button>

            {/* Modal Image Header */}
            <div
              className="relative w-full h-64 sm:h-72 overflow-hidden rounded-t-3xl cursor-pointer group/img bg-[var(--bg-secondary)]"
              onClick={() => setPreviewImage(selectedProject.cover_image || selectedProject.image)}
            >
              <img
                src={selectedProject.cover_image || selectedProject.image || '/project/py.png'}
                alt={selectedProject.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover/img:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-card)] via-transparent to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity duration-300">
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/70 backdrop-blur-md text-white text-xs font-semibold">
                  <Maximize2 size={14} /> Klik untuk perbesar gambar
                </div>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-6">
              <div>
                <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[var(--badge-bg)] text-[var(--badge-text)] border border-[var(--badge-border)] mb-3">
                  {selectedProject.category || 'WEB'}
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] font-display leading-snug">
                  {selectedProject.title}
                </h2>
              </div>

              <p className="text-[var(--text-secondary)] text-sm sm:text-base leading-relaxed">
                {selectedProject.description}
              </p>

              {/* Technologies */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Code2 size={18} className="text-[var(--text-primary)]" />
                  <h3 className="text-[var(--text-primary)] font-semibold text-xs uppercase tracking-wider">
                    Teknologi yang Digunakan
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {(Array.isArray(selectedProject.tech)
                    ? selectedProject.tech
                    : typeof selectedProject.tech === 'string'
                    ? selectedProject.tech.split(',')
                    : []
                  ).map((t, idx) => (
                    <span
                      key={idx}
                      className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[var(--badge-bg)] text-[var(--badge-text)] border border-[var(--badge-border)]"
                    >
                      {t.trim()}
                    </span>
                  ))}
                </div>
              </div>

              {/* Features List */}
              {selectedProject.features && selectedProject.features.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Layers size={18} className="text-[var(--text-primary)]" />
                    <h3 className="text-[var(--text-primary)] font-semibold text-xs uppercase tracking-wider">
                      Fitur Utama
                    </h3>
                  </div>
                  <ul className="space-y-2">
                    {selectedProject.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2.5 text-[var(--text-secondary)] text-sm">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[var(--text-primary)] flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Modal Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-[var(--border-color)]">
                <button
                  type="button"
                  onClick={(e) => handleLiveDemoClick(e, selectedProject.live_link || selectedProject.liveLink)}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[var(--accent-btn)] hover:bg-[var(--accent-btn-hover)] text-[var(--accent-btn-text)] text-sm font-semibold shadow-md transition-all duration-200 active:scale-[0.98]"
                >
                  <ExternalLink size={16} /> Live Demo
                </button>
                <button
                  type="button"
                  onClick={(e) => handleGithubClick(e, selectedProject.github_link || selectedProject.githubLink)}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[var(--bg-secondary)] hover:bg-[var(--border-color)] text-[var(--text-primary)] text-sm font-semibold border border-[var(--border-color)] transition-all duration-200 active:scale-[0.98]"
                >
                  <GithubIcon size={16} /> GitHub Source Code
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===== IMAGE PREVIEW POPUP ===== */}
      {previewImage && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          onClick={() => setPreviewImage(null)}
        >
          <div className="absolute inset-0 bg-black/90 backdrop-blur-md animate-[fadeIn_0.2s_ease-out]" />

          <div
            className="relative z-10 max-w-5xl w-full flex flex-col items-center animate-[slideUp_0.3s_ease-out]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full flex justify-end mb-3">
              <button
                onClick={() => setPreviewImage(null)}
                className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-200 cursor-pointer"
                aria-label="Close Preview"
              >
                <X size={20} />
              </button>
            </div>

            <div className="relative w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black">
              <img
                src={previewImage}
                alt="Preview Full"
                className="w-full h-auto max-h-[80vh] object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;
