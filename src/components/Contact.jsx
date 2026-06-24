import React, { useState } from "react";
import { Mail, MapPin, Send, CheckCircle2, AlertCircle } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus("error");
      return;
    }

    setStatus("sending");

    // Simulasi pengiriman formulir kontak
    setTimeout(() => {
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    }, 2000);
  };

  return (
    <section id="contact" className="py-24 relative border-t border-white/5">
      {/* Judul Bagian */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <h2 className="text-3xl sm:text-4xl font-bold font-display text-white">
          Hubungi{" "}
          <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Saya
          </span>
        </h2>
        {/* <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          Punya pertanyaan, ide proyek menarik, atau ingin berdiskusi tentang
          peluang magang/kolaborasi? Silakan kirim pesan Anda di bawah ini!
        </p> */}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 text-left">
        {/* Informasi Kontak (Kiri) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-panel p-8 rounded-2xl border border-white/5 space-y-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-indigo-500/5 blur-[30px] pointer-events-none"></div>

            <h3 className="text-xl font-bold text-white font-display">
              Informasi Kontak
            </h3>

            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                <Mail size={20} />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
                  Email
                </p>
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=pratamaabi28@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-slate-200 hover:text-indigo-400 transition-colors duration-300 font-medium"
                  id="mail"
                >
                  pratamaabi28@gmail.com
                </a>
              </div>
            </div>

            {/* LinkedIn */}
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
                {/* Ikon LinkedIn SVG */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.049c.476-.9 1.637-1.852 3.37-1.852 3.602 0 4.263 2.37 4.263 5.455v6.288zM5.337 7.433a2.062 2.062 0 110-4.124 2.062 2.062 0 010 4.124zM6.995 20.452H3.675V9h3.32v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.226.792 24 1.771 24h20.451C23.2 24 24 23.226 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
                  LinkedIn
                </p>
                <a
                  href="https://www.linkedin.com/in/muhammad-abi-rafdi-pratama-436044290/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-slate-200 hover:text-blue-400 transition-colors duration-300 font-medium"
                >
                  Muhammad Abi Rafdi Pratama
                </a>
              </div>
            </div>

            {/* GitHub */}
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-gray-500/10 text-gray-400 border border-gray-500/20">
                {/* Ikon GitHub SVG */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 
      3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 
      0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.089-.744.083-.729.083-.729 
      1.205.084 1.84 1.236 1.84 1.236 1.07 1.835 2.809 1.305 
      3.495.998.108-.775.418-1.305.762-1.605-2.665-.305-5.466-1.335-5.466-5.93 
      0-1.31.468-2.38 1.236-3.22-.124-.303-.536-1.523.117-3.176 
      0 0 1.008-.322 3.3 1.23a11.52 11.52 0 013.003-.404c1.018.005 
      2.042.138 3.003.404 2.291-1.552 3.297-1.23 
      3.297-1.23.653 1.653.242 2.873.118 3.176.77.84 
      1.236 1.91 1.236 3.22 0 4.61-2.805 5.624-5.475 
      5.922.43.372.823 1.102.823 2.222 0 1.606-.014 
      2.896-.014 3.286 0 .317.218.687.825.57C20.565 
      22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
                  />
                </svg>
              </div>
              <div>
                <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
                  GitHub
                </p>
                <a
                  href="https://github.com/Galabeewww"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-slate-200 hover:text-gray-400 transition-colors duration-300 font-medium"
                >
                  Galabeewww
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-pink-500/10 text-pink-400 border border-pink-500/20">
                {/* Ikon Instagram bisa pakai lucide-react atau ganti dengan SVG */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M7 2C4.243 2 2 4.243 2 7v10c0 2.757 2.243 5 5 5h10c2.757 0 5-2.243 5-5V7c0-2.757-2.243-5-5-5H7zm10 2c1.654 0 3 1.346 3 3v10c0 1.654-1.346 3-3 3H7c-1.654 0-3-1.346-3-3V7c0-1.654 1.346-3 3-3h10zm-5 3a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6zm4.5-.75a1.25 1.25 0 11-2.5 0 1.25 1.25 0 012.5 0z" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
                  Instagram
                </p>
                <a
                  href="https://www.instagram.com/abi_wiraatmadja/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-slate-200 hover:text-pink-400 transition-colors duration-300 font-medium"
                >
                  abi_wiraatmadja
                </a>
              </div>
            </div>

            {/* <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-purple-500/10 text-green-400 border border-green-500/20">
                <MapPin size={20} />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
                  Lokasi
                </p>
                <p className="text-sm text-slate-200 font-medium">
                  Bandung, Indonesia
                </p>
              </div>
            </div> */}

            <div className="pt-4 border-t border-white/5">
              {/* <p className="text-xs text-slate-500 font-medium leading-relaxed">
                Saya biasanya membalas email dalam waktu 24 jam kerja. Mari
                terhubung dan diskusikan ide-ide kreatif Anda!
              </p> */}
            </div>
          </div>
        </div>

        {/* Formulir Kontak (Kanan) */}
        <div className="lg:col-span-7">
          <form
            onSubmit={handleSubmit}
            className="glow-card rounded-2xl p-8 space-y-5"
          >
            <div>
              <label
                htmlFor="name"
                className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2"
              >
                Nama
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                disabled={status === "sending"}
                placeholder="Masukkan nama Anda"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-300 disabled:opacity-50"
                required
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2"
              >
                Alamat Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={status === "sending"}
                placeholder="Masukkan alamat email Anda"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-300 disabled:opacity-50"
                required
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2"
              >
                Pesan
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                disabled={status === "sending"}
                rows="4"
                placeholder="Tuliskan pesan atau ide kolaborasi Anda..."
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-300 disabled:opacity-50 resize-none"
                required
              ></textarea>
            </div>

            {/* Tombol Kirim / Notifikasi Status */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
              <button
                type="submit"
                disabled={status === "sending"}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold text-sm shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/35 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:translate-y-0"
              >
                <span>
                  {status === "sending" ? "Mengirim..." : "Kirim Pesan"}
                </span>
                <Send
                  size={14}
                  className={status === "sending" ? "animate-pulse" : ""}
                />
              </button>

              {/* Status Sukses */}
              {status === "success" && (
                <div className="flex items-center gap-2 text-emerald-400 text-sm font-medium animate-fadeIn">
                  <CheckCircle2 size={16} />
                  <span>Pesan berhasil dikirim!</span>
                </div>
              )}

              {/* Status Error */}
              {status === "error" && (
                <div className="flex items-center gap-2 text-rose-400 text-sm font-medium animate-fadeIn">
                  <AlertCircle size={16} />
                  <span>Harap isi semua kolom dengan benar.</span>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
