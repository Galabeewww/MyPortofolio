import React, { useState, useEffect } from "react";

interface RasenganIntroProps {
  onComplete: () => void;
}

const RasenganIntro: React.FC<RasenganIntroProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<"forming" | "expanding" | "fading">(
    "forming",
  );

  useEffect(() => {
    // Phase 1: Form & Swirl Chakra Orb (0ms -> 1700ms)
    const expandTimer = setTimeout(() => {
      setPhase("expanding");
    }, 1700);

    // Phase 2: Shockwave Expansion across full screen (1700ms -> 2400ms)
    const fadeTimer = setTimeout(() => {
      setPhase("fading");
    }, 2400);

    // Phase 3: Finish & Unmount (2700ms)
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 2700);

    return () => {
      clearTimeout(expandTimer);
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center overflow-hidden transition-opacity duration-300 pointer-events-auto ${
        phase === "fading" ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      // style={{ backgroundColor: "#040914" }}
      style={{ backgroundColor: "#ffffff" }}
    >
      {/* Background Energy Lines & Subtle Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10" />

      {/* Radial Background Glow centered on screen */}
      <div
        className={`absolute w-[600px] h-[600px] rounded-full bg-white blur-[120px] transition-transform duration-700 ${
          phase === "expanding" ? "scale-[8]" : "scale-100 animate-pulse"
        }`}
      />

      {/* ===== RASENGAN SPHERICAL CORE ===== */}
      <div className="relative flex items-center justify-center">
        {/* Shockwave Expanding Ring (Phase 2) */}
        {phase === "expanding" && (
          <div className="absolute w-32 h-32 rounded-full border-4 border-sky-400/80 animate-[rasenganExpandWipe_0.8s_ease-out_forwards] pointer-events-none" />
        )}

        {/* Main Rasengan Energy Orb */}
        <div
          className={`relative w-24 h-24 sm:w-32 sm:h-32 rounded-full flex items-center justify-center transition-transform duration-700 ${
            phase === "expanding"
              ? "scale-[50] opacity-0"
              : "scale-100 animate-rasengan-pulse"
          }`}
          style={{
            background:
              "radial-gradient(circle, #ffffff 0%, #7dd3fc 25%, #38bdf8 55%, #0284c7 80%, rgba(14,165,233,0.4) 100%)",
            boxShadow:
              "0 0 50px #38bdf8, 0 0 100px #0284c7, inset 0 0 35px #ffffff",
          }}
        >
          {/* Outer Swirling Energy Spirals (Clockwise) */}
          <div className="absolute inset-0 rounded-full animate-rasengan-spin-fast opacity-90">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <path
                d="M 50,50 Q 75,25 90,50 Q 75,75 50,50 Q 25,25 10,50 Q 25,75 50,50"
                fill="none"
                stroke="#ffffff"
                strokeWidth="2.5"
                strokeDasharray="12 6"
              />
              <path
                d="M 50,50 Q 25,75 50,90 Q 75,75 50,50 Q 25,25 50,10 Q 75,25 50,50"
                fill="none"
                stroke="#bae6fd"
                strokeWidth="2"
                strokeDasharray="16 8"
              />
            </svg>
          </div>

          {/* Inner Dense Energy Spirals (Counter-Clockwise) */}
          <div className="absolute inset-1 rounded-full animate-rasengan-spin-reverse opacity-95">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <circle
                cx="50"
                cy="50"
                r="35"
                fill="none"
                stroke="#ffffff"
                strokeWidth="1.5"
                strokeDasharray="8 4"
              />
              <path
                d="M 50,15 A 35,35 0 0 1 85,50 A 35,35 0 0 1 50,85 A 35,35 0 0 1 15,50 A 35,35 0 0 1 50,15"
                fill="none"
                stroke="#38bdf8"
                strokeWidth="3"
                strokeDasharray="20 10"
              />
            </svg>
          </div>

          {/* Core Energy Swirl Arms */}
          <div className="absolute inset-3 rounded-full animate-rasengan-spin opacity-100">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <path
                d="M 50,50 C 60,30 80,40 85,50 C 75,70 60,60 50,50 C 40,70 20,60 15,50 C 25,30 40,40 50,50 Z"
                fill="none"
                stroke="#ffffff"
                strokeWidth="3"
              />
            </svg>
          </div>

          {/* Bright White Center Heartbeat */}
          <div className="w-8 h-8 rounded-full bg-white shadow-[0_0_30px_#ffffff] animate-ping opacity-75" />
        </div>

        {/* Orbiting Chakra Arc 1 */}
        <div
          className={`absolute w-36 h-36 sm:w-44 sm:h-44 rounded-full border border-sky-400/60 animate-rasengan-spin transition-transform duration-700 ${
            phase === "expanding" ? "scale-[30] opacity-0" : "scale-100"
          }`}
          style={{
            borderTopColor: "transparent",
            borderBottomColor: "transparent",
          }}
        />

        {/* Orbiting Chakra Arc 2 */}
        <div
          className={`absolute w-44 h-44 sm:w-56 sm:h-56 rounded-full border border-sky-300/40 animate-rasengan-spin-reverse transition-transform duration-700 ${
            phase === "expanding" ? "scale-[35] opacity-0" : "scale-100"
          }`}
          style={{
            borderLeftColor: "transparent",
            borderRightColor: "transparent",
          }}
        />

        {/* Floating Energy Particles */}
        <div className="absolute inset-0 pointer-events-none">
          <span className="absolute top-[-20px] left-1/2 w-2 h-2 rounded-full bg-sky-300 shadow-[0_0_10px_#38bdf8] animate-bounce" />
          <span className="absolute bottom-[-20px] right-1/2 w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_12px_#ffffff] animate-ping" />
          <span className="absolute left-[-20px] top-1/2 w-1.5 h-1.5 rounded-full bg-sky-200 shadow-[0_0_8px_#7dd3fc] animate-pulse" />
        </div>
      </div>

      {/* Loading Tagline */}
      <div
        className={`absolute bottom-12 text-center transition-opacity duration-300 ${
          phase === "forming" ? "opacity-100" : "opacity-0"
        }`}
      >
        <p className="text-xs font-black tracking-[0.25em] uppercase text-sky-400 font-display animate-pulse">
          Loading Portfolio...
        </p>
      </div>
    </div>
  );
};

export default RasenganIntro;
