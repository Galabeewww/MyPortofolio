import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import Swal from "sweetalert2";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("portfolio_admin_auth") === "true";
  });

  const timerRef = useRef(null);
  const INACTIVITY_LIMIT = 3 * 60 * 1000; // 3 menit dalam milidetik

  const logout = () => {
    localStorage.removeItem("portfolio_admin_auth");
    setIsAuthenticated(false);
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  const login = (username, password) => {
    if (username === "admin" && password === "admin") {
      localStorage.setItem("portfolio_admin_auth", "true");
      setIsAuthenticated(true);
      return { success: true };
    }
    return {
      success: false,
      message: "Username or password incorrect! (Default: admin / admin)",
    };
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

    // Set initial timer
    resetInactivityTimer();

    // Event listeners untuk mendeteksi aktivitas pengguna
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
