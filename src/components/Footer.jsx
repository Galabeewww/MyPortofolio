import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--border-color)] bg-[var(--bg-card)] py-8 mt-12 relative z-10 text-[var(--text-secondary)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs">
          &copy; {currentYear} Muhammad Abi Rafdi Pratama. All rights reserved.
        </p>

        <div className="flex items-center gap-6 text-xs font-medium">
          <a href="#home" className="hover:text-[var(--text-primary)] transition-colors">
            Home
          </a>
          <a href="#projects" className="hover:text-[var(--text-primary)] transition-colors">
            Projects
          </a>
          <Link to="/admin/login" className="hover:text-[var(--text-primary)] transition-colors">
            Admin Login
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
