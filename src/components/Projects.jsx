import { ExternalLink, ShoppingBag, CheckSquare, CloudSun } from 'lucide-react'

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
)

const Projects = () => {
  const projects = [
    {
      title: 'E-Commerce Minimalis',
      description: 'Aplikasi toko online responsif dengan fitur keranjang belanja interaktif, filter kategori produk, dan kalkulasi total harga belanjaan secara otomatis.',
      icon: <ShoppingBag className="text-cyan-400" size={32} />,
      tech: ['React JS', 'Tailwind CSS', 'Context API'],
      liveLink: 'https://example.com',
      githubLink: 'https://github.com',
      color: 'from-cyan-500/10 to-blue-500/10 border-cyan-500/20 hover:border-cyan-500/40',
      badgeColor: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20'
    },
    {
      title: 'Task Management App',
      description: 'Aplikasi produktivitas untuk mengelola tugas harian. Memiliki fitur tambah tugas, coret tugas selesai, filter status (Aktif/Selesai), dan penyimpanan data lokal (LocalStorage).',
      icon: <CheckSquare className="text-indigo-400" size={32} />,
      tech: ['React JS', 'Tailwind CSS', 'LocalStorage'],
      liveLink: 'https://example.com',
      githubLink: 'https://github.com',
      color: 'from-indigo-500/10 to-purple-500/10 border-indigo-500/20 hover:border-indigo-500/40',
      badgeColor: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20'
    },
    {
      title: 'Weather Dashboard',
      description: 'Dasbor cuaca interaktif yang menampilkan data cuaca real-time berdasarkan pencarian lokasi kota menggunakan OpenWeatherMap API, lengkap dengan perkiraan suhu harian.',
      icon: <CloudSun className="text-purple-400" size={32} />,
      tech: ['React JS', 'Tailwind CSS', 'Fetch API', 'Weather API'],
      liveLink: 'https://example.com',
      githubLink: 'https://github.com',
      color: 'from-purple-500/10 to-rose-500/10 border-purple-500/20 hover:border-purple-500/40',
      badgeColor: 'bg-purple-500/10 text-purple-400 border-purple-500/20'
    },
  ]

  return (
    <section id="projects" className="py-24 relative border-t border-white/5">
      {/* Judul Bagian */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <h2 className="text-3xl sm:text-4xl font-bold font-display text-white">
          Proyek <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">Pilihan</span>
        </h2>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          Berikut adalah beberapa proyek web sederhana yang telah saya rancang dan bangun untuk melatih logika pemrograman, pemisahan komponen, dan penerapan desain responsif.
        </p>
      </div>

      {/* Grid Proyek */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
        {projects.map((project, index) => (
          <div
            key={index}
            className={`glow-card rounded-2xl p-6 flex flex-col justify-between border bg-gradient-to-br ${project.color}`}
          >
            <div>
              {/* Header Kartu Proyek */}
              <div className="flex items-center justify-between mb-6">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  {project.icon}
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all duration-300 border border-white/5"
                    title="Source Code GitHub"
                  >
                    <Github size={16} />
                  </a>
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all duration-300 border border-white/5"
                    title="Live Demo"
                  >
                    <ExternalLink size={16} />
                  </a>
                </div>
              </div>

              {/* Judul & Deskripsi */}
              <h3 className="text-xl font-bold text-white mb-3 font-display">
                {project.title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                {project.description}
              </p>
            </div>

            {/* Tech Stack Badges */}
            <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
              {project.tech.map((t, tIdx) => (
                <span
                  key={tIdx}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-semibold tracking-wide border ${project.badgeColor}`}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Projects
