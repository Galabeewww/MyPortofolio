import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Home,
  User,
  Zap,
  Briefcase,
  Folder,
  Mail,
  Shield,
  Globe,
  Menu,
  X,
  LogOut,
  LayoutDashboard,
} from "lucide-react";
import Swal from "sweetalert2";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";

const Navbar = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isAdminDropdownOpen, setIsAdminDropdownOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const { lang, toggleLanguage, t } = useLanguage();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  // Scroll Spy untuk mendeteksi section aktif (Home, About, Skills, Experience, Projects, Contact)
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "skills", "experience", "projects", "contact"];
      const scrollPosition = window.scrollY + 220;

      let current = "home";
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            current = section;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Trigger initial position check
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Menutup dropdown saat klik di luar
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsAdminDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    setIsAdminDropdownOpen(false);
    Swal.fire({
      title: lang === "id" ? "Konfirmasi Logout" : "Logout Confirmation",
      text:
        lang === "id"
          ? "Apakah Anda yakin ingin keluar dari admin?"
          : "Are you sure you want to log out from admin?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#64748b",
      confirmButtonText: lang === "id" ? "Ya, Keluar" : "Yes, Logout",
      cancelButtonText: lang === "id" ? "Batal" : "Cancel",
      background:
        document.documentElement.getAttribute("data-theme") === "dark"
          ? "#18181b"
          : "#ffffff",
      color:
        document.documentElement.getAttribute("data-theme") === "dark"
          ? "#fafafa"
          : "#0f172a",
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
        Swal.fire({
          icon: "success",
          title: t.nav.logoutSuccessTitle,
          text: t.nav.logoutSuccessText,
          timer: 1500,
          showConfirmButton: false,
          background:
            document.documentElement.getAttribute("data-theme") === "dark"
              ? "#18181b"
              : "#ffffff",
          color:
            document.documentElement.getAttribute("data-theme") === "dark"
              ? "#fafafa"
              : "#0f172a",
        });
      }
    });
  };

  const navItems = [
    { id: "home", label: t.nav.home, icon: Home, href: "#home" },
    { id: "about", label: t.nav.about, icon: User, href: "#about" },
    { id: "skills", label: t.nav.skills, icon: Zap, href: "#skills" },
    { id: "experience", label: t.nav.experience, icon: Briefcase, href: "#experience" },
    { id: "projects", label: t.nav.projects, icon: Folder, href: "#projects" },
    { id: "contact", label: t.nav.contact, icon: Mail, href: "#contact" },
  ];

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-5xl">
      <div className="rounded-full bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl border border-slate-200/90 dark:border-zinc-800 shadow-xl px-3 py-2 sm:px-4 flex items-center justify-between gap-1 sm:gap-2 transition-all duration-300">
        {/* Brand / Logo Sesuai Gambar Referensi */}
        <a
          href="#home"
          className="flex items-center gap-1.5 sm:gap-2 pl-2 pr-1 py-1 cursor-pointer group"
        >
          <span className="font-extrabold text-base sm:text-lg text-sky-500 font-display tracking-tight group-hover:scale-105 transition-transform">
            GLBW.
          </span>
          <div className="h-4 sm:h-5 w-[1px] bg-slate-300 dark:bg-zinc-700" />
        </a>

        {/* Desktop Nav Items */}
        <div className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;

            return (
              <a
                key={item.id}
                href={item.href}
                onClick={() => setActiveSection(item.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-sky-500 text-white shadow-md shadow-sky-500/25 scale-[1.02]"
                    : "text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-800/60"
                }`}
              >
                <Icon size={15} />
                <span>{item.label}</span>
              </a>
            );
          })}
        </div>

        {/* Right Section: EN/ID Language Toggle & Admin Badge Dropdown (Saat Logged In) */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Tombol Opsi Bahasa EN / ID */}
          <button
            onClick={toggleLanguage}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-1.5 rounded-full border border-slate-300 dark:border-zinc-700 hover:border-sky-500 dark:hover:border-sky-500 text-slate-700 dark:text-zinc-200 hover:bg-sky-500/10 text-xs font-bold transition-all duration-200 shadow-sm cursor-pointer"
            title={
              lang === "en" ? "Ubah ke Bahasa Indonesia" : "Switch to English"
            }
          >
            <Globe size={14} className="text-sky-500" />
            <span className="uppercase font-mono">
              {lang === "en" ? "EN" : "ID"}
            </span>
          </button>

          {/* Logo Admin HANYA Tampil jika Admin Berhasil Login */}
          {isAuthenticated && (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsAdminDropdownOpen(!isAdminDropdownOpen)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20 text-xs font-bold transition-all duration-200 cursor-pointer shadow-sm animate-pulse"
                title="Admin Account"
              >
                <Shield size={14} className="text-emerald-500" />
                <span>Admin</span>
              </button>

              {/* Dropdown Menu Admin dengan Opsi Logout */}
              {isAdminDropdownOpen && (
                <div className="absolute right-0 mt-2 w-44 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-2xl p-1.5 z-50 space-y-1 animate-[fadeIn_0.15s_ease-out]">
                  <Link
                    to="/admin"
                    onClick={() => setIsAdminDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-zinc-200 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors"
                  >
                    <LayoutDashboard size={15} className="text-sky-500" />
                    <span>{t.nav.dashboard}</span>
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors cursor-pointer"
                  >
                    <LogOut size={15} />
                    <span>{t.nav.logout}</span>
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="p-2 rounded-full lg:hidden hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-700 dark:text-zinc-300 cursor-pointer ml-1"
            aria-label="Toggle Mobile Menu"
          >
            {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {isMobileOpen && (
        <div className="lg:hidden mt-2 p-3 rounded-3xl bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl border border-slate-200 dark:border-zinc-800 shadow-2xl space-y-1 animate-[fadeIn_0.2s_ease-out]">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;

            return (
              <a
                key={item.id}
                href={item.href}
                onClick={() => {
                  setActiveSection(item.id);
                  setIsMobileOpen(false);
                }}
                className={`px-4 py-2.5 rounded-2xl text-sm font-semibold flex items-center gap-3 transition-colors duration-200 cursor-pointer ${
                  isActive
                    ? "bg-sky-500 text-white"
                    : "text-slate-600 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-zinc-800"
                }`}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </a>
            );
          })}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
