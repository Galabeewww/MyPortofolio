import React, { useState, useEffect } from "react";

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
  "Selamat Datang", // terakhir
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
  const [phase, setPhase] = useState<"words" | "expand" | "fade">("words");

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => {
        if (prev + 1 === words.length - 1) {
          clearInterval(interval);
          setTimeout(() => setPhase("expand"), 1000);
          setTimeout(() => setPhase("fade"), 2500);
          setTimeout(onComplete, 3500);
        }
        return prev + 1;
      });
    }, 700);

    return () => clearInterval(interval);
  }, [onComplete]);

  const currentWord = words[index];

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-white z-[200] transition-opacity duration-1000 ${
        phase === "fade" ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="flex gap-2 text-2xl sm:text-5xl md:text-7xl tracking-[0.2em] sm:tracking-[0.35em] transition-all duration-700 ease-out text-center px-4">
        {currentWord.split("").map((letter, i) => (
          <span
            key={i}
            className={`${letterStyles[i % letterStyles.length]} transition-all duration-300`}
          >
            {letter}
          </span>
        ))}
      </div>
    </div>
  );
};

export default LanguangeTextIntro;
