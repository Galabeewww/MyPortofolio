import { ArrowRight, Mail, ArrowDown } from "lucide-react";

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

const Linkedin = (props) => (
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
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" rx="1" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const Hero = () => {
  return (
    <section
      id="home"
      className="min-h-screen flex flex-col justify-center pt-24 pb-12 relative overflow-hidden"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Konten Kiri (Teks & Tombol) */}

        <div className="lg:col-span-7 space-y-6 text-left relative z-10 order-2 lg:order-1">
          {/* Badge Status */}
          {/* <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 text-xs font-semibold tracking-wide uppercase">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Tersedia untuk Magang / Pekerjaan
          </div> */}

          {/* Judul Utama */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight font-display text-white leading-[1.1] break-words animate-fadeInUp">
            Halooo , <br />
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent animate-fadeInUp">
              Saya Muhammad Abi Rafdi Pratama
            </span>
          </h1>

          {/* Deskripsi */}
          {/* Deskripsi */}
          <h3 className="text-slate-400 text-2xl max-w-xl leading-relaxed opacity-0 animate-fadeInUp">
            Junior Web Developer & QA Tester
          </h3>

          {/* Tombol Aksi */}
          <div className="flex flex-wrap gap-4 pt-2 animate-fadeInUp">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold text-sm shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 group"
            >
              Lihat Proyek Saya
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform duration-300"
              />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white font-semibold text-sm border border-white/10 hover:border-white/20 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
            >
              Hubungi Saya
            </a>
          </div>

          {/* Link Media Sosial */}
          <div className="flex flex-wrap items-center gap-4 pt-6 text-slate-400 animate-fadeInUp">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Temukan saya:
            </span>
            <div className="h-[1px] w-8 bg-slate-700 hidden sm:block"></div>
            <a
              href="https://github.com/Galabeewww"
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-lg bg-white/5 hover:bg-indigo-500/10 hover:text-indigo-400 border border-white/5 hover:border-indigo-500/20 transition-all duration-300"
            >
              <Github size={18} />
            </a>
            <a
              href="https://www.linkedin.com/in/muhammad-abi-rafdi-pratama-436044290/"
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-lg bg-white/5 hover:bg-indigo-500/10 hover:text-indigo-400 border border-white/5 hover:border-indigo-500/20 transition-all duration-300"
            >
              <Linkedin size={18} />
            </a>
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=pratamaabi28@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-slate-200 hover:text-indigo-400 transition-colors duration-300 font-medium"
              id="mail"
              className="p-2.5 rounded-lg bg-white/5 hover:bg-indigo-500/10 hover:text-indigo-400 border border-white/5 hover:border-indigo-500/20 transition-all duration-300"
            >
              <Mail size={18} />
            </a>
          </div>
        </div>

        {/* Konten Kanan (Visual / Mockup Kartu Interaktif) */}
        {/* <div className="lg:col-span-5 relative flex justify-center items-center z-10 lg:mt-0 mt-8"> */}
        <div className="lg:col-span-5 relative flex justify-center items-center z-10 lg:mt-0 mt-8 order-1 lg:order-2">
          {/* Hiasan Cahaya Belakang */}
          <div className="absolute w-72 h-72 rounded-full bg-indigo-500/15 blur-[60px] animate-pulse"></div>

          {/* Kartu Profil Interaktif (Aset UI Premium) */}
          {/* <div className="w-full max-w-[380px] glow-card rounded-2xl p-6 relative overflow-hidden animate-float"> */}
          <div className="w-full max-w-[300px] sm:max-w-[380px] glow-card rounded-2xl p-6 relative overflow-hidden animate-float">
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-rose-500"></span>
                <span className="w-3 h-3 rounded-full bg-amber-500"></span>
                <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
              </div>
              <span className="text-xs text-slate-500 font-mono">image.js</span>
            </div>

            <div className="space-y-4 font-mono text-xs text-slate-300 text-left ">
              <img
                src="/foto.jpg" // ganti dengan path gambar kamu
                alt="Foto Profil"
                className="rounded-lg w-full h-auto aspect-square object-cover border border-slate-500"
              />
              {/* <div>
                <span className="text-purple-400">const</span>{" "}
                <span className="text-blue-400">developer</span> = &#123;
              </div>
              <div className="pl-4">
                <span className="text-slate-400">nama:</span>{" "}
                <span className="text-amber-300">'Nama Anda'</span>,
              </div>
              <div className="pl-4">
                <span className="text-slate-400">peran:</span>{" "}
                <span className="text-amber-300">'Web Developer'</span>,
              </div>
              <div className="pl-4">
                <span className="text-slate-400">keahlian:</span> [
                <span className="text-indigo-300">'React'</span>,{" "}
                <span className="text-indigo-300">'Tailwind'</span>,{" "}
                <span className="text-indigo-300">'JS'</span>],
              </div>
              <div className="pl-4">
                <span className="text-slate-400">semangat:</span>{" "}
                <span className="text-emerald-400">true</span>,
              </div>
              <div className="pl-4">
                <span className="text-slate-400">sukaKopi:</span>{" "}
                <span className="text-emerald-400">true</span>
              </div>
              <div>&#125;;</div>

              <div className="pt-4 border-t border-white/5 text-slate-500 text-[10px]">
                // Siap mengubah ide Anda menjadi kode nyata!
              </div> */}
            </div>
          </div>
        </div>
      </div>

      {/* Indikator Scroll Down */}
      {/* <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500 hover:text-indigo-400 transition-colors duration-300 z-10 cursor-pointer"> */}
      <div className="relative mt-10 sm:absolute sm:bottom-8 sm:left-1/2 sm:-translate-x-1/2 flex flex-col items-center gap-2 text-slate-500 hover:text-indigo-400 transition-colors duration-300 z-10 cursor-pointer">
        <span className="text-[10px] uppercase tracking-widest font-semibold">
          Scroll Down
        </span>
        <ArrowDown size={14} className="animate-bounce" />
      </div>
    </section>
  );
};

export default Hero;
