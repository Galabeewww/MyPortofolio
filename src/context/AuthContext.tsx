import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import Swal from "sweetalert2";
import api from "../lib/api";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  login: async () => ({ success: false }),
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem("portfolio_admin_auth") === "true";
  });

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const INACTIVITY_LIMIT = 3 * 60 * 1000; // 3 menit

  const logout = () => {
    localStorage.removeItem("portfolio_admin_auth");
    setIsAuthenticated(false);
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  const login = async (username: string, password: string) => {
    try {
      const { data, error } = await api.auth.login(username.trim(), password.trim());

      if (!error && data) {
        localStorage.setItem("portfolio_admin_auth", "true");
        setIsAuthenticated(true);
        return { success: true };
      }

      return {
        success: false,
        message: error ? error.message : "Username atau password salah!",
      };
    } catch (err: any) {
      console.error("Login exception:", err);
      return {
        success: false,
        message: err.message || "Gagal terhubung ke server database.",
      };
    }
  };

  // Inactivity Auto Logout Listener (3 Menit)
  useEffect(() => {
    if (!isAuthenticated) {
      if (timerRef.current) clearTimeout(timerRef.current);
      return;
    }

    const handleAutoLogout = () => {
      logout();
      const currentLang = localStorage.getItem("portfolio_lang") || "en";
      Swal.fire({
        icon: "warning",
        title: currentLang === "id" ? "Sesi Berakhir" : "Session Expired",
        text:
          currentLang === "id"
            ? "Anda telah otomatis terlogout karena tidak ada aktivitas selama 3 menit."
            : "You have been automatically logged out due to 3 minutes of inactivity.",
        confirmButtonColor: "#0284c7",
        background: document.documentElement.getAttribute("data-theme") === "dark" ? "#18181b" : "#ffffff",
        color: document.documentElement.getAttribute("data-theme") === "dark" ? "#fafafa" : "#0f172a",
      });
    };

    const resetInactivityTimer = () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(handleAutoLogout, INACTIVITY_LIMIT);
    };

    resetInactivityTimer();

    const events = ["mousemove", "keydown", "mousedown", "touchstart", "scroll", "click"];
    events.forEach((event) => {
      window.addEventListener(event, resetInactivityTimer);
    });

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      events.forEach((event) => {
        window.removeEventListener(event, resetInactivityTimer);
      });
    };
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
