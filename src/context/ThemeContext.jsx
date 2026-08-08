import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('portfolio_theme') || 'light';
  });

  useEffect(() => {
    localStorage.setItem('portfolio_theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = (e) => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';

    // Ambil posisi titik koordinat klik tombol
    const x = e?.clientX ?? window.innerWidth / 2;
    const y = e?.clientY ?? 60;

    // Buat elemen animasi air tumpah
    const overlay = document.createElement('div');
    overlay.className = 'liquid-theme-spill';

    // Tentukan warna tumpahan air sesuai tema tujuan
    if (nextTheme === 'dark') {
      overlay.style.backgroundColor = '#09090b';
    } else {
      overlay.style.backgroundColor = '#f0f7ff';
    }

    // Set titik pusat tumpahan di koordinat klik
    overlay.style.left = `${x}px`;
    overlay.style.top = `${y}px`;

    document.body.appendChild(overlay);

    // Jalankan pergantian tema di pertengahan animasi air tumpah
    setTimeout(() => {
      setTheme(nextTheme);
    }, 250);

    // Hapus elemen overlay setelah animasi selesai
    setTimeout(() => {
      if (document.body.contains(overlay)) {
        document.body.removeChild(overlay);
      }
    }, 700);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
