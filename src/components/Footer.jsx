import React from "react";
import { useLanguage } from "../context/LanguageContext";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();

  return (
    <footer className="border-t border-[var(--border-color)] bg-[var(--bg-card)] py-8 mt-12 relative z-10 text-[var(--text-secondary)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs">
          &copy; {currentYear} Muhammad Abi Rafdi Pratama. {t.footer.rights}
        </p>

        <div className="flex items-center gap-6 text-xs font-medium">
          <a href="#home" className="hover:text-[var(--text-primary)] transition-colors">
            {t.nav.home}
          </a>
          <a href="#about" className="hover:text-[var(--text-primary)] transition-colors">
            {t.nav.about}
          </a>
          <a href="#skills" className="hover:text-[var(--text-primary)] transition-colors">
            {t.nav.skills}
          </a>
          <a href="#projects" className="hover:text-[var(--text-primary)] transition-colors">
            {t.nav.projects}
          </a>
          <a href="#contact" className="hover:text-[var(--text-primary)] transition-colors">
            {t.nav.contact}
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
