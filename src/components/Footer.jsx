import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 bg-[#080b12] py-8 mt-12 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo / Brand */}
          <div className="text-sm font-bold text-slate-300 font-display">
            MyPortofolio<span className="text-indigo-500">.</span>
          </div>

          {/* Hak Cipta */}
          <div className="text-xs text-slate-500">
            &copy; {currentYear} Galabeewww. All rights reserved.
          </div>

          {/* Link Cepat */}
          <div className="flex items-center gap-6">
            <a
              href="#home"
              className="text-xs text-slate-500 hover:text-slate-300 transition-colors duration-300"
            >
              Home
            </a>
            <a
              href="#about"
              className="text-xs text-slate-500 hover:text-slate-300 transition-colors duration-300"
            >
              About
            </a>
            <a
              href="#projects"
              className="text-xs text-slate-500 hover:text-slate-300 transition-colors duration-300"
            >
              Projects
            </a>
            <a
              href="#contact"
              className="text-xs text-slate-500 hover:text-slate-300 transition-colors duration-300"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
