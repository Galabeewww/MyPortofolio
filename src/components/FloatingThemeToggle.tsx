import React from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const FloatingThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={(e) => toggleTheme(e)}
      className="fixed bottom-6 right-6 z-50 p-3.5 rounded-full bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-slate-800 dark:text-zinc-100 shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer flex items-center justify-center group"
      title={theme === "dark" ? "Ubah ke Mode Terang" : "Ubah ke Mode Gelap"}
      aria-label="Toggle Dark/Light Mode"
    >
      {theme === "dark" ? (
        <Sun
          size={20}
          className="text-slate-700 group-hover:rotate-45 transition-transform duration-300"
        />
      ) : (
        <Moon
          size={20}
          className="text-slate-700 dark:text-zinc-200 group-hover:-rotate-12 transition-transform duration-300"
        />
      )}
    </button>
  );
};

export default FloatingThemeToggle;
