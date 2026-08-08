import React, { useState } from "react";
import { Mail, Send, X, MapPin, Briefcase, ArrowUpRight } from "lucide-react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useLanguage } from "../context/LanguageContext";

const MySwal = withReactContent(Swal);

const GithubIcon = (props) => (
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

const LinkedinIcon = (props) => (
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

const InstagramIcon = (props) => (
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
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const Contact = () => {
  const { t } = useLanguage();
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
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
      setIsFormModalOpen(false);

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
    <section
      id="contact"
      className="py-24 relative border-t border-[var(--border-color)]"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
        {/* Title & Subtitle */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h2 className="text-3xl sm:text-5xl font-extrabold font-display text-[var(--text-primary)] tracking-tight">
            Get In <span className="text-sky-500">Touch</span>
          </h2>
          <p className="text-[var(--text-secondary)] text-sm sm:text-base font-medium leading-relaxed">
            {t.contact.subtitle}
          </p>
        </div>

        {/* Main Contact Layout - Two Columns */}

        {/* Right: 3 Contact Cards + Send Message */}
        <div className="lg:col-span-3 space-y-6">
          {/* 3 Quick Action Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Email Card */}
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=pratamaabi28@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="glow-card p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] flex flex-col items-center justify-center space-y-3 hover:border-sky-500/50 transition-all duration-300 shadow-lg group cursor-pointer text-center"
            >
              <div className="p-3 rounded-2xl bg-sky-500/10 text-sky-500 border border-sky-500/20 group-hover:scale-110 transition-transform">
                <Mail size={22} />
              </div>
              <div className="space-y-0.5">
                <h3 className="text-sm font-bold font-display text-[var(--text-primary)]">
                  Email
                </h3>
                <p className="text-[11px] text-[var(--text-secondary)] font-medium">
                  pratamaabi28@gmail.com
                </p>
              </div>
              <ArrowUpRight
                size={14}
                className="text-[var(--text-muted)] group-hover:text-sky-500 transition-colors"
              />
            </a>

            {/* LinkedIn Card */}
            <a
              href="https://www.linkedin.com/in/muhammad-abi-rafdi-pratama-436044290/"
              target="_blank"
              rel="noopener noreferrer"
              className="glow-card p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] flex flex-col items-center justify-center space-y-3 hover:border-sky-500/50 transition-all duration-300 shadow-lg group cursor-pointer text-center"
            >
              <div className="p-3 rounded-2xl bg-sky-500/10 text-sky-500 border border-sky-500/20 group-hover:scale-110 transition-transform">
                <LinkedinIcon size={22} />
              </div>
              <div className="space-y-0.5">
                <h3 className="text-sm font-bold font-display text-[var(--text-primary)]">
                  LinkedIn
                </h3>
                <p className="text-[11px] text-[var(--text-secondary)] font-medium">
                  Muhammad Abi Rafdi P.
                </p>
              </div>
              <ArrowUpRight
                size={14}
                className="text-[var(--text-muted)] group-hover:text-sky-500 transition-colors"
              />
            </a>

            {/* GitHub Card */}
            <a
              href="https://github.com/Galabeewww"
              target="_blank"
              rel="noopener noreferrer"
              className="glow-card p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] flex flex-col items-center justify-center space-y-3 hover:border-sky-500/50 transition-all duration-300 shadow-lg group cursor-pointer text-center"
            >
              <div className="p-3 rounded-2xl bg-sky-500/10 text-sky-500 border border-sky-500/20 group-hover:scale-110 transition-transform">
                <GithubIcon size={22} />
              </div>
              <div className="space-y-0.5">
                <h3 className="text-sm font-bold font-display text-[var(--text-primary)]">
                  GitHub
                </h3>
                <p className="text-[11px] text-[var(--text-secondary)] font-medium">
                  @Galabeewww
                </p>
              </div>
              <ArrowUpRight
                size={14}
                className="text-[var(--text-muted)] group-hover:text-sky-500 transition-colors"
              />
            </a>
          </div>

          {/* CTA: Send Message Button */}
          <div className="rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] p-8 text-center space-y-5 shadow-lg">
            <div className="space-y-2">
              <h3 className="text-lg font-bold font-display text-[var(--text-primary)]">
                {t.contact.titlePrefix}
                {t.contact.titleSuffix}
              </h3>
              <p className="text-xs text-[var(--text-secondary)] max-w-md mx-auto">
                {t.contact.subtitle}
              </p>
            </div>
            <button
              onClick={() => setIsFormModalOpen(true)}
              className="inline-flex items-center gap-3 px-10 py-4 rounded-2xl bg-[var(--accent-btn)] hover:bg-[var(--accent-btn-hover)] text-[var(--accent-btn-text)] font-extrabold text-xs sm:text-sm tracking-widest uppercase shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer group"
            >
              <Send
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
              <span>{t.contact.sendBtn}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Modal Form */}
      {isFormModalOpen && (
        <div
          onClick={() => setIsFormModalOpen(false)}
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-[fadeIn_0.2s_ease-out]"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-2xl p-6 sm:p-8 space-y-6 text-left relative"
          >
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-zinc-800">
              <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white">
                {t.contact.sendBtn}
              </h3>
              <button
                onClick={() => setIsFormModalOpen(false)}
                className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-zinc-400 mb-2"
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
                  className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-slate-900 dark:text-white focus:outline-none focus:border-sky-500 transition-colors"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-zinc-400 mb-2"
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
                  className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-slate-900 dark:text-white focus:outline-none focus:border-sky-500 transition-colors"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-zinc-400 mb-2"
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
                  className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-slate-900 dark:text-white focus:outline-none focus:border-sky-500 transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full py-3.5 px-6 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-extrabold text-xs uppercase tracking-widest shadow-xl transition-all cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {status === "sending"
                  ? t.contact.sendingBtn
                  : t.contact.sendBtn}
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default Contact;
