import React, { useState, useEffect, useRef } from "react";

interface LanguangeTextIntroProps {
  onComplete: () => void;
}

const words = [
  "Welcome",
  "Bienvenido",
  "Bienvenue",
  "Willkommen",
  "Benvenuto",
  "ようこそ",
  "欢迎",
  "Добро пожаловать",
  "환영합니다",
  "Selamat Datang",
];

const letterStyles = [
  "text-sky-500 font-bold tracking-widest",
  "text-purple-500 font-semibold italic",
  "text-pink-500 font-extrabold",
];

const LanguangeTextIntro: React.FC<LanguangeTextIntroProps> = ({
  onComplete,
}) => {
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"words" | "expand" | "fade">("words");
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Total duration to cycle all words
  const wordIntervalDuration = 320;
  const totalDuration = wordIntervalDuration * (words.length - 1);

  useEffect(() => {
    const startTime = Date.now();

    // 1. Smooth percentage counter from 0 to 100%
    progressIntervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const currentPct = Math.min(
        100,
        Math.floor((elapsed / totalDuration) * 100),
      );
      setProgress(currentPct);

      if (currentPct >= 100) {
        if (progressIntervalRef.current)
          clearInterval(progressIntervalRef.current);
      }
    }, 25);

    // 2. Cycle words through languages
    const wordInterval = setInterval(() => {
      setIndex((prev) => {
        if (prev + 1 >= words.length - 1) {
          clearInterval(wordInterval);
          setProgress(100);
          // Pause slightly on "Selamat Datang" at 100%
          setTimeout(() => setPhase("expand"), 400);
          setTimeout(() => setPhase("fade"), 1000);
          setTimeout(onComplete, 1800);
          return words.length - 1;
        }
        return prev + 1;
      });
    }, wordIntervalDuration);

    return () => {
      clearInterval(wordInterval);
      if (progressIntervalRef.current)
        clearInterval(progressIntervalRef.current);
    };
  }, [onComplete]);

  const currentWord = words[index];

  return (
    <div
      className={`fixed inset-0 flex flex-col items-center justify-center bg-[var(--bg-primary)] z-[200] transition-opacity duration-800 ${
        phase === "fade" ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Background Subtle Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-15 pointer-events-none" />

      {/* Center Multilingual Words */}
      <div
        className={`flex gap-2 text-3xl sm:text-5xl md:text-7xl tracking-[0.2em] sm:tracking-[0.35em] transition-all duration-500 ease-out text-center px-4 select-none ${
          phase === "expand" ? "scale-110 opacity-90" : "scale-100 opacity-100"
        }`}
      >
        {currentWord.split("").map((letter, i) => (
          <span
            key={`${currentWord}_${i}`}
            className={`${letterStyles[i % letterStyles.length]} transition-all duration-300 drop-shadow-sm`}
          >
            {letter}
          </span>
        ))}
      </div>

      {/* Bottom Center Progress Bar & Percentage Counter */}
      <div
        className={`absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 w-64 sm:w-80 flex flex-col items-center gap-2.5 z-10 px-4 transition-all duration-500 ${
          phase === "fade"
            ? "opacity-0 translate-y-4"
            : "opacity-100 translate-y-0"
        }`}
      >
        {/* Progress Bar Track */}
        {/* <div className="w-full h-1.5 sm:h-2 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-color)] overflow-hidden p-0.5 shadow-inner">
          <div
            className="h-full rounded-full bg-gradient-to-r from-sky-500 via-purple-500 to-pink-500 transition-all duration-100 ease-out shadow-[0_0_10px_rgba(14,165,233,0.5)]"
            style={{ width: `${progress}%` }}
          />
        </div> */}
        {/* Progress Bar Gelombang Laut */}
        <div className="relative w-full h-24 sm:h-28 overflow-hidden">
          {/* SVG Gelombang bergerak */}
          <svg
            className="absolute inset-0 w-full h-full animate-[waveMove_4s_linear_infinite]"
            viewBox="0 0 1200 200"
            preserveAspectRatio="none"
          >
            <path
              d="M0 100 Q 300 50 600 100 T 1200 100 V200 H0 Z"
              fill="url(#waveGradient)"
            />
            <defs>
              <linearGradient id="waveGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#0ea5e9" />
                <stop offset="50%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
            </defs>
          </svg>

          {/* Kapal mengikuti gelombang */}
          <div
            className="absolute transition-all duration-100 ease-out text-3xl"
            style={{
              left: `calc(${progress}% - 16px)`,
              top: `${50 + Math.sin((progress / 100) * Math.PI * 2) * 20}%`, // naik-turun sesuai gelombang
            }}
          >
            🚢
          </div>
        </div>

        {/* Loading Label & Percentage Display */}
        <div className="flex items-center justify-between w-full text-xs font-extrabold tracking-widest font-mono text-[var(--text-secondary)]">
          <span className="uppercase text-[10px] sm:text-xs font-sans tracking-widest text-[var(--text-muted)]">
            Loading
          </span>
          <span className="text-sky-500 font-bold font-mono text-xs sm:text-sm">
            {progress}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default LanguangeTextIntro;
