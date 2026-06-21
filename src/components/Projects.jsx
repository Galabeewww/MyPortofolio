import {
  ExternalLink,
  ShoppingBag,
  CheckSquare,
  CloudSun,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState, useEffect } from "react";

const Github = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.size || 24}
    height={props.size || 24}
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

const Projects = () => {
  const projects = [
    {
      title: "E-Commerce Minimalis",
      description: "Aplikasi toko online responsif dengan fitur keranjang belanja interaktif, filter kategori produk, dan kalkulasi total harga belanjaan secara otomatis.",
      category: "Frontend",
      tech: ["React JS", "Tailwind CSS", "Context API"],
      liveLink: "https://example.com",
      githubLink: "https://github.com",
      image: "/icon/css.png",
      icon: <ShoppingBag className="text-cyan-400" size={32} />,
    },
    {
      title: "Task Management App",
      description: "Aplikasi produktivitas untuk mengelola tugas harian. Memiliki fitur tambah tugas, coret tugas selesai, filter status (Aktif/Selesai), dan penyimpanan data lokal (LocalStorage).",
      category: "Frontend",
      tech: ["React JS", "Tailwind CSS", "LocalStorage"],
      liveLink: "https://example.com",
      githubLink: "https://github.com",
      image: "/icon/react.png",
      icon: <CheckSquare className="text-indigo-400" size={32} />,
    },
    {
      title: "Weather Dashboard",
      description: "Dasbor cuaca interaktif yang menampilkan data cuaca real-time berdasarkan pencarian lokasi kota menggunakan OpenWeatherMap API, lengkap dengan perkiraan suhu harian.",
      category: "API Integration",
      tech: ["React JS", "Tailwind CSS", "Fetch API"],
      liveLink: "https://example.com",
      githubLink: "https://github.com",
      image: "/icon/tailwind.png",
      icon: <CloudSun className="text-purple-400" size={32} />,
    },
    {
      title: "tes1",
      description: "Dasbor tes1 untuk verifikasi fitur pagination dan pergeseran slide proyek baru.",
      category: "Testing",
      tech: ["React JS", "Tailwind CSS", "Fetch API"],
      liveLink: "https://example.com",
      githubLink: "https://github.com",
      image: "/icon/js.png",
      icon: <CloudSun className="text-purple-400" size={32} />,
    },
  ];

  const [startIndex, setStartIndex] = useState(0);
  const [viewAll, setViewAll] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Hook untuk memantau ukuran layar browser
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Jumlah proyek yang ditampilkan: 1 di mobile, 3 di desktop
  const itemsPerPage = isMobile ? 1 : 3;

  const visibleProjects = viewAll
    ? projects
    : projects.slice(startIndex, startIndex + itemsPerPage);

  const handleNext = () => {
    if (startIndex + itemsPerPage < projects.length) {
      setStartIndex(startIndex + 1);
    }
  };

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  return (
    <section id="projects" className="py-24 relative border-t border-white/5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center max-w-6xl mx-auto mb-16 gap-6 px-4">
        <div className="text-center sm:text-left space-y-4">
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-white">
            Proyek{" "}
            <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              Pilihan
            </span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Berikut adalah beberapa proyek web yang telah saya rancang dan bangun.
          </p>
        </div>
        <button
          onClick={() => {
            setViewAll(!viewAll);
            setStartIndex(0);
          }}
          className="px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 text-cyan-400 hover:text-cyan-300 border border-white/10 text-sm font-semibold transition cursor-pointer active:scale-95 duration-200"
        >
          {viewAll ? "Hide Slider" : "View All"}
        </button>
      </div>

      {/* Kontainer Slider Utama dengan Panah di Kiri dan Kanan */}
      <div className="relative max-w-7xl mx-auto px-12 md:px-16 flex items-center justify-center">
        {/* Panah Kiri (Floats on Left) */}
        {!viewAll && projects.length > itemsPerPage && (
          <button
            onClick={handlePrev}
            disabled={startIndex === 0}
            className="absolute left-1 md:left-2 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white border border-white/10 disabled:opacity-0 disabled:pointer-events-none transition-all duration-300 cursor-pointer active:scale-90 z-30 shadow-2xl backdrop-blur-md"
            aria-label="Previous Project"
          >
            <ChevronLeft size={24} />
          </button>
        )}

        {/* Grid Kartu Proyek */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left w-full">
          {visibleProjects.map((project, index) => (
            <div
              key={index}
              className="glow-card rounded-2xl flex flex-col justify-between border border-white/10 bg-[#1e293b] overflow-hidden transition-all duration-300 group min-h-[440px]"
            >
              {/* Bagian Atas: Gambar/Placeholder dengan Overlay Judul & Kategori */}
              {project.image ? (
                <div className="relative h-48 w-full overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Efek gradasi gelap di bagian bawah gambar */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1e293b] via-[#1e293b]/40 to-transparent z-10"></div>
                  
                  {/* Judul & Kategori di atas gambar */}
                  <div className="absolute bottom-4 left-6 right-6 z-20">
                    <span className="inline-block px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-purple-600 text-white mb-2 shadow-lg">
                      {project.category || "Project"}
                    </span>
                    <h3 className="text-xl font-bold text-white font-display leading-snug drop-shadow-md">
                      {project.title}
                    </h3>
                  </div>
                </div>
              ) : (
                <div className="relative h-48 w-full overflow-hidden flex items-center justify-center bg-gradient-to-br from-indigo-950/40 to-purple-950/40">
                  <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
                  <div className="p-4 rounded-full bg-white/5 border border-white/10 relative z-10">
                    {project.icon}
                  </div>
                  {/* Efek gradasi gelap */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1e293b] to-transparent z-10"></div>
                  
                  {/* Judul & Kategori */}
                  <div className="absolute bottom-4 left-6 right-6 z-20">
                    <span className="inline-block px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-purple-600 text-white mb-2">
                      {project.category || "Project"}
                    </span>
                    <h3 className="text-xl font-bold text-white font-display leading-snug">
                      {project.title}
                    </h3>
                  </div>
                </div>
              )}

              {/* Bagian Bawah: Konten, Tech Stack, & Tautan Aksi */}
              <div className="p-6 flex flex-col justify-between grow">
                <p className="text-slate-300 text-sm leading-relaxed mb-6">
                  {project.description}
                </p>

                <div>
                  {/* Tech Stack Badges */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((t, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-white/5 border border-white/10 text-slate-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Footer Kartu (Aksi) */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <a
                      href={project.liveLink}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-400 hover:text-indigo-300 transition-colors duration-200"
                    >
                      View Details &rarr;
                    </a>
                    <div className="flex items-center gap-3">
                      <a
                        href={project.liveLink}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1 text-slate-400 hover:text-white transition-colors duration-200"
                        title="Live Demo"
                      >
                        <ExternalLink size={18} />
                      </a>
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1 text-slate-400 hover:text-white transition-colors duration-200"
                        title="Source Code"
                      >
                        <Github size={18} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Panah Kanan (Floats on Right) */}
        {!viewAll && projects.length > itemsPerPage && (
          <button
            onClick={handleNext}
            disabled={startIndex + itemsPerPage >= projects.length}
            className="absolute right-1 md:right-2 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white border border-white/10 disabled:opacity-0 disabled:pointer-events-none transition-all duration-300 cursor-pointer active:scale-90 z-30 shadow-2xl backdrop-blur-md"
            aria-label="Next Project"
          >
            <ChevronRight size={24} />
          </button>
        )}
      </div>
    </section>
  );
};

export default Projects;
