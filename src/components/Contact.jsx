import React, { useState } from "react";
import { Mail, Send } from "lucide-react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useLanguage } from "../context/LanguageContext";

const MySwal = withReactContent(Swal);

const Contact = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("idle");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      MySwal.fire({
        icon: "error",
        title: t.contact.errorTitle,
        text: t.contact.errorText,
        confirmButtonColor: "#0284c7",
        background: "var(--bg-card)",
        color: "var(--text-primary)",
      });
      return;
    }

    setStatus("sending");

    setTimeout(() => {
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });

      MySwal.fire({
        icon: "success",
        title: t.contact.successTitle,
        text: t.contact.successText,
        timer: 3000,
        showConfirmButton: false,
        background: "var(--bg-card)",
        color: "var(--text-primary)",
      });

      setTimeout(() => setStatus("idle"), 3000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 relative border-t border-[var(--border-color)]">
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <h2 className="text-3xl sm:text-5xl font-extrabold font-display text-[var(--text-primary)]">
          {t.contact.titlePrefix}<span className="text-sky-500">{t.contact.titleSuffix}</span>
        </h2>
        <p className="text-[var(--text-secondary)] text-sm sm:text-base font-medium leading-relaxed">
          {t.contact.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 text-left">
        {/* Informasi Kontak */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glow-card p-8 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] space-y-8 shadow-xl">
            <h3 className="text-xl font-bold text-[var(--text-primary)] font-display">
              {t.contact.infoTitle}
            </h3>

            {/* Email */}
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-[var(--bg-secondary)] text-[var(--text-primary)] border border-[var(--border-color)]">
                <Mail size={20} className="text-sky-500" />
              </div>
              <div>
                <p className="text-xs text-[var(--text-muted)] font-semibold uppercase tracking-wider">
                  {t.contact.emailTitle}
                </p>
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=pratamaabi28@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[var(--text-primary)] hover:underline font-medium"
                >
                  pratamaabi28@gmail.com
                </a>
              </div>
            </div>

            {/* LinkedIn */}
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-[var(--bg-secondary)] text-[var(--text-primary)] border border-[var(--border-color)]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="text-sky-500"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.049c.476-.9 1.637-1.852 3.37-1.852 3.602 0 4.263 2.37 4.263 5.455v6.288zM5.337 7.433a2.062 2.062 0 110-4.124 2.062 2.062 0 010 4.124zM6.995 20.452H3.675V9h3.32v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.226.792 24 1.771 24h20.451C23.2 24 24 23.226 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-[var(--text-muted)] font-semibold uppercase tracking-wider">
                  LinkedIn
                </p>
                <a
                  href="https://www.linkedin.com/in/muhammad-abi-rafdi-pratama-436044290/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[var(--text-primary)] hover:underline font-medium"
                >
                  Muhammad Abi Rafdi Pratama
                </a>
              </div>
            </div>

            {/* GitHub */}
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-[var(--bg-secondary)] text-[var(--text-primary)] border border-[var(--border-color)]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="text-sky-500"
                >
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.089-.744.083-.729.083-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.775.418-1.305.762-1.605-2.665-.305-5.466-1.335-5.466-5.93 0-1.31.468-2.38 1.236-3.22-.124-.303-.536-1.523.117-3.176 0 0 1.008-.322 3.3 1.23a11.52 11.52 0 013.003-.404c1.018.005 2.042.138 3.003.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.873.118 3.176.77.84 1.236 1.91 1.236 3.22 0 4.61-2.805 5.624-5.475 5.922.43.372.823 1.102.823 2.222 0 1.606-.014 2.896-.014 3.286 0 .317.218.687.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-[var(--text-muted)] font-semibold uppercase tracking-wider">
                  GitHub
                </p>
                <a
                  href="https://github.com/Galabeewww"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[var(--text-primary)] hover:underline font-medium"
                >
                  Galabeewww
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Formulir Pesan */}
        <div className="lg:col-span-7">
          <form
            onSubmit={handleSubmit}
            className="glow-card rounded-2xl p-8 space-y-5 bg-[var(--bg-card)] border border-[var(--border-color)] shadow-xl"
          >
            <div>
              <label
                htmlFor="name"
                className="block text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-2"
              >
                {t.contact.nameLabel}
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder={t.contact.namePlaceholder}
                className="w-full px-4 py-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-primary)] focus:outline-none focus:border-sky-500 transition-colors duration-200"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-2"
              >
                {t.contact.emailLabel}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={t.contact.emailPlaceholder}
                className="w-full px-4 py-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-primary)] focus:outline-none focus:border-sky-500 transition-colors duration-200"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-2"
              >
                {t.contact.messageLabel}
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                placeholder={t.contact.messagePlaceholder}
                className="w-full px-4 py-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-primary)] focus:outline-none focus:border-sky-500 transition-colors duration-200"
              />
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[var(--accent-btn)] hover:bg-[var(--accent-btn-hover)] text-[var(--accent-btn-text)] font-extrabold text-xs uppercase tracking-widest shadow-xl transition-all duration-200 cursor-pointer disabled:opacity-50"
            >
              {status === "sending" ? (
                t.contact.sendingBtn
              ) : (
                <>
                  <Send size={16} /> {t.contact.sendBtn}
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
