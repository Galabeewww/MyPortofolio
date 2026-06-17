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
                  href="pratamaabi28@gmail.com"
                  className="text-sm text-slate-200 hover:text-indigo-400 transition-colors duration-300 font-medium"
                  id="mail"
                >
                  pratamaabi28@gmail.com
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
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
            </div>

            <div className="pt-4 border-t border-white/5">
              <p className="text-xs text-slate-500 font-medium leading-relaxed">
                Saya biasanya membalas email dalam waktu 24 jam kerja. Mari
                terhubung dan diskusikan ide-ide kreatif Anda!
              </p>
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
                Nama Lengkap
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
