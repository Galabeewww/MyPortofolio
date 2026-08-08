import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('portfolio_admin_auth') === 'true';
  });

  const login = (username, password) => {
    if (username === 'admin' && password === 'admin') {
      localStorage.setItem('portfolio_admin_auth', 'true');
      setIsAuthenticated(true);
      return { success: true };
    }
    return { success: false, message: 'Username atau password salah! (Gunakan: admin / admin)' };
  };

  const logout = () => {
    localStorage.removeItem('portfolio_admin_auth');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
