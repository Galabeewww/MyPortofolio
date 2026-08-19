import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FloatingThemeToggle from './components/FloatingThemeToggle';
import FloatingMusicPlayer from './components/FloatingMusicPlayer';
import RasenganIntro from './components/RasenganIntro';

import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';

function MainPortfolio() {
  const [showIntro, setShowIntro] = useState(() => {
    // Check if navigated from admin/login/logout (skip once)
    const skipOnce = sessionStorage.getItem("skipIntroOnce");
    if (skipOnce) {
      sessionStorage.removeItem("skipIntroOnce");
      return false;
    }
    // On page refresh or first visit, show loading
    return true;
  });

  const handleComplete = () => {
    setShowIntro(false);
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] relative bg-grid-pattern overflow-x-hidden transition-colors duration-250">
      {showIntro && <RasenganIntro onComplete={handleComplete} />}
      <div className="relative z-10">
        <Navbar />
        <Hero onReplayIntro={() => setShowIntro(true)} />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <About />
          <Skills />
          <Experience />
          <Projects />
          <Contact />
        </main>
        <Footer />
        <FloatingMusicPlayer />
        <FloatingThemeToggle />
      </div>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <LanguageProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<MainPortfolio />} />
              <Route path="/admin/login" element={<Login />} />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </BrowserRouter>
        </LanguageProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
