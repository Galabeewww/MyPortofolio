import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Sun, Moon, Lock, Code2 } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[var(--bg-card)]/90 backdrop-blur-md border-b border-[var(--border-color)] shadow-sm py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo Brand */}
          <a
            href="#home"
            className="flex items-center gap-2.5 group cursor-pointer"
          >
            <div className="w-9 h-9 rounded-xl bg-[var(--accent-btn)] text-[var(--accent-btn-text)] flex items-center justify-center font-bold text-lg font-display shadow-md transition-transform duration-300 group-hover:scale-105">
              A
            </div>
            <span className="font-bold text-lg font-display text-[var(--text-primary)] tracking-tight">
              Abi <span className="text-[var(--text-muted)] font-normal text-sm">/ Dev</span>
            </span>
          </a>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-200"
                >
                  {link.name}
                </a>
              ))}
            </div>

            <div className="h-4 w-[1px] bg-[var(--border-color)]" />

            <div className="flex items-center gap-3">
              {/* Dark / Light Mode Toggle Button */}
              <button
                onClick={toggleTheme}
                className="p-2.5 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-primary)] hover:border-[var(--border-color-hover)] transition-all duration-200 cursor-pointer"
                title={theme === 'dark' ? 'Ubah ke Mode Terang' : 'Ubah ke Mode Gelap'}
                aria-label="Toggle Dark/Light Mode"
              >
                {theme === 'dark' ? (
                  <Sun size={18} className="text-amber-400" />
                ) : (
                  <Moon size={18} className="text-slate-700" />
                )}
              </button>

              {/* Admin Button */}
              <Link
                to={isAuthenticated ? '/admin' : '/admin/login'}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[var(--accent-btn)] hover:bg-[var(--accent-btn-hover)] text-[var(--accent-btn-text)] text-xs font-semibold shadow-sm transition-all duration-200"
              >
                <Lock size={13} />
                {isAuthenticated ? 'Admin Dashboard' : 'Admin'}
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-3 md:hidden">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-primary)]"
              aria-label="Toggle Dark/Light Mode"
            >
              {theme === 'dark' ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} />}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-primary)] cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isOpen && (
        <div className="md:hidden border-b border-[var(--border-color)] bg-[var(--bg-card)] px-4 pt-3 pb-6 space-y-4 shadow-xl">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="px-3 py-2 rounded-lg text-sm font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-[var(--border-color)] flex items-center justify-between">
            <Link
              to={isAuthenticated ? '/admin' : '/admin/login'}
              onClick={() => setIsOpen(false)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[var(--accent-btn)] text-[var(--accent-btn-text)] text-xs font-semibold w-full justify-center"
            >
              <Lock size={14} />
              {isAuthenticated ? 'Admin Dashboard' : 'Admin Login'}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
