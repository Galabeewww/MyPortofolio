import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Home,
  User,
  Zap,
  Folder,
  Mail,
  Sun,
  Moon,
  Lock,
  Globe,
  Menu,
  X,
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "projects", "contact"];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "home", label: "Home", icon: Home, href: "#home" },
    { id: "about", label: "About", icon: User, href: "#about" },
    { id: "skills", label: "Skills", icon: Zap, href: "#about" },
    { id: "projects", label: "Projects", icon: Folder, href: "#projects" },
    { id: "contact", label: "Contact", icon: Mail, href: "#contact" },
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

        {/* Desktop Nav Items Sesuai Gambar Referensi */}
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

        {/* Right Section: Theme Toggle & Admin / EN Pill */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Dark / Light Mode Toggle Button dengan Animasi Air Tumpah */}
          <button
            onClick={(e) => toggleTheme(e)}
            className="p-2 sm:p-2.5 rounded-full hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-700 dark:text-zinc-300 transition-colors duration-200 cursor-pointer"
            title={
              theme === "dark" ? "Ubah ke Mode Terang" : "Ubah ke Mode Gelap"
            }
            aria-label="Toggle Theme"
          >
            {theme === "dark" ? (
              <Sun size={18} className="text-amber-400 animate-spin-slow" />
            ) : (
              <Moon size={18} className="text-slate-700" />
            )}
          </button>

          {/* Admin / EN Pill Button Sesuai Gambar Referensi */}
          <Link
            to={isAuthenticated ? "/admin" : "/admin/login"}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border border-slate-300 dark:border-zinc-700 hover:border-slate-400 dark:hover:border-zinc-500 text-slate-700 dark:text-zinc-200 hover:bg-slate-100 dark:hover:bg-zinc-800 text-xs font-bold transition-all duration-200 shadow-sm"
          >
            <Globe size={14} className="text-slate-500 dark:text-zinc-400" />
            <span>{isAuthenticated ? "Admin" : "EN"}</span>
          </Link>

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
