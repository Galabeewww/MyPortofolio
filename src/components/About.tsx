import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import {
  MapPin,
  Briefcase,
  Download,
  CheckCircle2,
  Code2,
  Sparkles,
  Rotate3d,
  ShieldCheck,
} from "lucide-react";
import Swal from "sweetalert2";
import { useLanguage } from "../context/LanguageContext";
import { useScrollReveal } from "../hooks/useScrollReveal";

// ===== LAYOUT CONSTANTS =====
const CARD_WIDTH = 290;
const CARD_HEIGHT = 440;
const ANCHOR_Y = 0;
const CARD_REST_Y = 110;
const STRAP_WIDTH = 22;
const STRAP_SAMPLES = 26;

// ===== PHYSICS CONSTANTS (Slower, Smooth, Elegant) =====
const PENDULUM_STIFFNESS = 0.018; // Slower spring return
const PENDULUM_DAMPING = 0.982; // Natural oscillation decay
const ROTATION_SENSITIVITY = 0.32; // Slower, silky smooth 360 rotation
const ROTATION_DAMPING = 0.94; // Smooth angular deceleration

// Bezier helpers for strap curvature
const cubicBezier = (
  t: number,
  p0: { x: number; y: number },
  p1: { x: number; y: number },
  p2: { x: number; y: number },
  p3: { x: number; y: number },
) => {
  const u = 1 - t;
  return {
    x:
      u * u * u * p0.x +
      3 * u * u * t * p1.x +
      3 * u * t * t * p2.x +
      t * t * t * p3.x,
    y:
      u * u * u * p0.y +
      3 * u * u * t * p1.y +
      3 * u * t * t * p2.y +
      t * t * t * p3.y,
  };
};

const cubicBezierTangent = (
  t: number,
  p0: { x: number; y: number },
  p1: { x: number; y: number },
  p2: { x: number; y: number },
  p3: { x: number; y: number },
) => {
  const u = 1 - t;
  return {
    x:
      3 * u * u * (p1.x - p0.x) +
      6 * u * t * (p2.x - p1.x) +
      3 * t * t * (p3.x - p2.x),
    y:
      3 * u * u * (p1.y - p0.y) +
      6 * u * t * (p2.y - p1.y) +
      3 * t * t * (p3.y - p2.y),
  };
};

const About = () => {
  const { t, lang } = useLanguage();
  const { ref: sectionRef, isVisible } = useScrollReveal();

  // ===== PHYSICS STATES =====
  const [cardOffset, setCardOffset] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState({ x: 0, y: 0 }); // 360 degree rotation
  const [isDragging, setIsDragging] = useState(false);
  const [hasFallen, setHasFallen] = useState(false);

  const dragStartRef = useRef({
    mouseX: 0,
    mouseY: 0,
    offsetX: 0,
    offsetY: 0,
    rotX: 0,
    rotY: 0,
  });

  const velocityRef = useRef({ x: 0, y: 0, rotX: 0, rotY: 0 });
  const prevOffsetRef = useRef({ x: 0, y: 0, rotY: 0 });
  const animFrameRef = useRef<number>(0);

  // Trigger fall-in on reveal
  useEffect(() => {
    if (isVisible && !hasFallen) {
      const timer = setTimeout(() => setHasFallen(true), 1400);
      return () => clearTimeout(timer);
    }
  }, [isVisible, hasFallen]);

  // ===== PENDULUM & 360 ROTATION PHYSICS =====
  const animatePhysics = useCallback(() => {
    if (isDragging) return;

    const loop = () => {
      // 1. Position Spring (Always returns to center offset 0, 0)
      setCardOffset((prev) => {
        const fx = -PENDULUM_STIFFNESS * prev.x;
        const fy = -PENDULUM_STIFFNESS * prev.y;

        velocityRef.current.x = (velocityRef.current.x + fx) * PENDULUM_DAMPING;
        velocityRef.current.y = (velocityRef.current.y + fy) * PENDULUM_DAMPING;

        const newX = prev.x + velocityRef.current.x;
        const newY = prev.y + velocityRef.current.y;

        if (
          Math.abs(newX) < 0.1 &&
          Math.abs(newY) < 0.1 &&
          Math.abs(velocityRef.current.x) < 0.03 &&
          Math.abs(velocityRef.current.y) < 0.03
        ) {
          velocityRef.current.x = 0;
          velocityRef.current.y = 0;
          return { x: 0, y: 0 };
        }

        return { x: newX, y: newY };
      });

      // 2. Rotation Spring (ALWAYS smoothly restores to front face rotX=0, rotY=0)
      setRotation((prev) => {
        const springX = -0.035 * prev.x;
        const springY = -0.035 * prev.y;

        velocityRef.current.rotX = (velocityRef.current.rotX + springX) * 0.93;
        velocityRef.current.rotY = (velocityRef.current.rotY + springY) * 0.93;

        const newRotX = prev.x + velocityRef.current.rotX;
        const newRotY = prev.y + velocityRef.current.rotY;

        if (
          Math.abs(newRotX) < 0.1 &&
          Math.abs(newRotY) < 0.1 &&
          Math.abs(velocityRef.current.rotX) < 0.03 &&
          Math.abs(velocityRef.current.rotY) < 0.03
        ) {
          velocityRef.current.rotX = 0;
          velocityRef.current.rotY = 0;
          return { x: 0, y: 0 };
        }

        return { x: newRotX, y: newRotY };
      });

      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);
  }, [isDragging]);

  useEffect(() => {
    if (
      !isDragging &&
      (cardOffset.x !== 0 ||
        cardOffset.y !== 0 ||
        rotation.x !== 0 ||
        rotation.y !== 0 ||
        Math.abs(velocityRef.current.x) > 0.01 ||
        Math.abs(velocityRef.current.y) > 0.01 ||
        Math.abs(velocityRef.current.rotY) > 0.01)
    ) {
      animatePhysics();
    }
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isDragging, animatePhysics, cardOffset, rotation]);

  // Track velocity
  useEffect(() => {
    prevOffsetRef.current = {
      x: cardOffset.x,
      y: cardOffset.y,
      rotY: rotation.y,
    };
  }, [cardOffset, rotation.y]);

  // ===== DRAG HANDLERS =====
  const handlePointerDown = useCallback(
    (clientX: number, clientY: number) => {
      if (!hasFallen) return;
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      setIsDragging(true);

      dragStartRef.current = {
        mouseX: clientX,
        mouseY: clientY,
        offsetX: cardOffset.x,
        offsetY: cardOffset.y,
        rotX: rotation.x,
        rotY: rotation.y,
      };
    },
    [hasFallen, cardOffset, rotation],
  );

  useEffect(() => {
    if (!isDragging) return;

    const handleMove = (clientX: number, clientY: number) => {
      const dx = clientX - dragStartRef.current.mouseX;
      const dy = clientY - dragStartRef.current.mouseY;

      // Position translation
      setCardOffset({
        x: dragStartRef.current.offsetX + dx,
        y: dragStartRef.current.offsetY + dy,
      });

      // 360 Smooth Rotation while dragging
      const targetRotY = dragStartRef.current.rotY + dx * ROTATION_SENSITIVITY;
      const targetRotX = Math.max(
        -20,
        Math.min(
          20,
          dragStartRef.current.rotX - dy * (ROTATION_SENSITIVITY * 0.5),
        ),
      );

      velocityRef.current.rotY = (targetRotY - rotation.y) * 0.3;
      velocityRef.current.rotX = (targetRotX - rotation.x) * 0.3;

      setRotation({
        x: targetRotX,
        y: targetRotY,
      });
    };

    const onMouseMove = (e: MouseEvent) => handleMove(e.clientX, e.clientY);
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) {
        e.preventDefault();
        handleMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };
    const onUp = () => {
      setIsDragging(false);
      // Impart release momentum
      velocityRef.current.x = (cardOffset.x - prevOffsetRef.current.x) * 0.4;
      velocityRef.current.y = (cardOffset.y - prevOffsetRef.current.y) * 0.4;
      velocityRef.current.rotY =
        (rotation.y - prevOffsetRef.current.rotY) * 0.5;
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onUp);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onUp);
    };
  }, [isDragging, rotation.y, rotation.x, cardOffset.x, cardOffset.y]);

  // Full 360 degree spin button that always returns cleanly to front
  const handleFlipCard = () => {
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    let startTime: number | null = null;
    const duration = 1500; // ms smooth spin

    const spin = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const ease =
        progress < 0.5
          ? 4 * progress * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      setRotation({ x: 0, y: ease * 360 });

      if (progress < 1) {
        requestAnimationFrame(spin);
      } else {
        setRotation({ x: 0, y: 0 });
      }
    };

    requestAnimationFrame(spin);
  };

  // ===== STRAP GEOMETRY =====
  const getStrapBezierPoints = useCallback(() => {
    const anchorX = CARD_WIDTH / 2;
    const anchorY = ANCHOR_Y;
    const cardTopX = CARD_WIDTH / 2 + cardOffset.x;
    const cardTopY = CARD_REST_Y + cardOffset.y;

    const midY = (anchorY + cardTopY) / 2;
    const horizontalDist = Math.abs(cardOffset.x);
    const sag = 16 + horizontalDist * 0.12 + Math.max(0, -cardOffset.y * 0.12);

    const p0 = { x: anchorX, y: anchorY };
    const p1 = { x: anchorX + (cardTopX - anchorX) * 0.2, y: midY + sag };
    const p2 = { x: anchorX + (cardTopX - anchorX) * 0.8, y: midY + sag };
    const p3 = { x: cardTopX, y: cardTopY };

    return { p0, p1, p2, p3 };
  }, [cardOffset]);

  const strapPolygonPath = useMemo(() => {
    const { p0, p1, p2, p3 } = getStrapBezierPoints();
    const halfW = STRAP_WIDTH / 2;

    const leftPoints: string[] = [];
    const rightPoints: string[] = [];

    for (let i = 0; i <= STRAP_SAMPLES; i++) {
      const tVal = i / STRAP_SAMPLES;
      const pt = cubicBezier(tVal, p0, p1, p2, p3);
      const tan = cubicBezierTangent(tVal, p0, p1, p2, p3);

      const len = Math.sqrt(tan.x * tan.x + tan.y * tan.y) || 1;
      const nx = tan.x / len;
      const ny = tan.y / len;

      const px = -ny;
      const py = nx;

      let widthMul = 1;
      if (tVal < 0.06) widthMul = 0.6 + (tVal / 0.06) * 0.4;
      if (tVal > 0.94) widthMul = 0.6 + ((1 - tVal) / 0.06) * 0.4;

      const w = halfW * widthMul;

      leftPoints.push(`${pt.x + px * w},${pt.y + py * w}`);
      rightPoints.push(`${pt.x - px * w},${pt.y - py * w}`);
    }

    rightPoints.reverse();
    return `M ${leftPoints[0]} L ${leftPoints.join(" L ")} L ${rightPoints.join(" L ")} Z`;
  }, [getStrapBezierPoints]);

  const strapCenterPath = useMemo(() => {
    const { p0, p1, p2, p3 } = getStrapBezierPoints();
    return `M ${p0.x} ${p0.y} C ${p1.x} ${p1.y}, ${p2.x} ${p2.y}, ${p3.x} ${p3.y}`;
  }, [getStrapBezierPoints]);

  const handleDownloadCV = async () => {
    const { value: selectedCV } = await Swal.fire({
      title: lang === "id" ? "Pilih CV untuk diunduh" : "Choose CV to download",
      input: "select",
      inputOptions: {
        cv_fullstack: "CV Fullstack Developer",
        cv_qa: "CV Quality Assurance",
      },
      inputPlaceholder: lang === "id" ? "Pilih salah satu CV" : "Select a CV",
      showCancelButton: true,
      confirmButtonText: "Download",
      background: "var(--bg-card)",
      color: "var(--text-primary)",
    });

    if (selectedCV) {
      const link = document.createElement("a");
      link.href = `/${selectedCV}.pdf`;
      link.download = `${selectedCV}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      Swal.fire({
        icon: "success",
        title: "Downloading CV...",
        text: `${selectedCV} ${lang === "id" ? "sedang diunduh." : "is being downloaded."}`,
        timer: 2500,
        showConfirmButton: false,
        background: "var(--bg-card)",
        color: "var(--text-primary)",
      });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-24 relative border-t border-[var(--border-color)] overflow-hidden space-y-16"
    >
      <style>{`
        @keyframes idCardFall {
          0% { transform: translate(-50%, -420px) rotate(-18deg); opacity: 0; }
          55% { transform: translate(-50%, 15px) rotate(6deg); opacity: 1; }
          75% { transform: translate(-50%, -8px) rotate(-3deg); }
          100% { transform: translate(-50%, 0) rotate(0deg); opacity: 1; }
        }
        .animate-id-card-fall {
          animation: idCardFall 1.4s cubic-bezier(0.22, 1.5, 0.36, 1) forwards;
        }
      `}</style>

      {/* ===== SECTION HEADER ===== */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <h2 className="text-3xl sm:text-5xl font-extrabold font-display text-[var(--text-primary)] tracking-tight">
            {t.about.titlePrefix}
            <span className="text-sky-500">{t.about.titleSuffix}</span>
          </h2>
          <p className="text-[var(--text-secondary)] text-sm sm:text-base font-medium leading-relaxed">
            {t.about.subtitle}
          </p>
        </div>

        {/* ===== MAIN CONTENT ===== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* ===== LEFT COLUMN: SLEEK, SIMPLE & BALANCED ===== */}
          <div
            className={`lg:col-span-7 space-y-6 text-left anim-about-left ${
              isVisible ? "is-visible" : ""
            }`}
          >
            {/* Top Status & Role Pill */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-sky-500/10 dark:bg-sky-500/15 border border-sky-500/30 text-sky-500 shadow-sm backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="text-emerald-500 uppercase tracking-wider text-[11px] font-extrabold">
                  {lang === "id" ? "Siap Bekerja" : "Available for Work"}
                </span>
                <span className="text-slate-300 dark:text-zinc-700">•</span>
                <span className="text-sky-600 dark:text-sky-400 font-semibold tracking-wide text-[11px]">
                  Web Dev & QA Tester
                </span>
              </div>
            </div>

            {/* Main Greeting Typography */}
            <div className="space-y-1">
              <p className="text-xs uppercase font-mono tracking-widest text-[var(--text-muted)] font-semibold">
                {lang === "id" ? "— Perkenalan Diri" : "— Get to know me"}
              </p>
              <h3 className="text-2xl sm:text-4xl font-extrabold font-display text-[var(--text-primary)] leading-[1.2] tracking-tight">
                {lang === "id" ? "Halo, Saya " : "Hello, I'm "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-sky-500 to-indigo-500">
                  Muhammad Abi Rafdi Pratama
                </span>
              </h3>
            </div>

            {/* Bio Paragraphs with subtle accent bar */}
            <div className="border-l-2 border-sky-500/40 pl-4 py-1 space-y-3">
              <p className="text-[var(--text-secondary)] text-sm sm:text-[15px] leading-relaxed">
                {t.about.para1}
              </p>
              <p className="text-[var(--text-secondary)] text-sm sm:text-[15px] leading-relaxed">
                {t.about.para2}
              </p>
            </div>

            {/* 2 Modern Capability Bento Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
              {/* Card 1: Web Development */}
              <div className="p-4 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] hover:border-sky-500/40 transition-all duration-300 shadow-sm space-y-2 group">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-sky-500/10 text-sky-500 group-hover:scale-110 transition-transform">
                    <Code2 size={16} />
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-[var(--text-primary)]">
                    {lang === "id" ? "Pengembangan Web" : "Web Development"}
                  </h4>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {["React", "Next.js", "Tailwind", "Node.js"].map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-0.5 rounded-md text-[10px] font-mono font-semibold bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-secondary)]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card 2: Quality Assurance */}
              <div className="p-4 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] hover:border-emerald-500/40 transition-all duration-300 shadow-sm space-y-2 group">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500 group-hover:scale-110 transition-transform">
                    <ShieldCheck size={16} />
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-[var(--text-primary)]">
                    {lang === "id"
                      ? "Jaminan Kualitas (QA)"
                      : "Quality Assurance"}
                  </h4>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {["Manual Testing", "Bug Tracking"].map((tool) => (
                    <span
                      key={tool}
                      className="px-2 py-0.5 rounded-md text-[10px] font-mono font-semibold bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-secondary)]"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Meta & Action Area */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-[var(--border-color)]/60">
              {/* Location Badge */}
              <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)] font-medium">
                <MapPin size={14} className="text-sky-500 shrink-0" />
                <span>Bandung, Indonesia</span>
              </div>

              {/* CTA Action Buttons */}
              <div className="flex items-center gap-3">
                <button
                  onClick={handleDownloadCV}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 text-white font-extrabold text-xs tracking-wider uppercase shadow-lg shadow-sky-500/25 hover:shadow-sky-500/40 hover:scale-[1.02] active:scale-95 transition-all duration-300 cursor-pointer group"
                >
                  <Download
                    size={15}
                    className="group-hover:translate-y-0.5 transition-transform"
                  />
                  <span>{t.about.downloadCV || "DOWNLOAD CV"}</span>
                </button>
              </div>
            </div>
          </div>

          {/* ===== RIGHT COLUMN: 360 INTERACTIVE LANYARD CARD ===== */}
          <div
            className={`lg:col-span-5 anim-about-right ${isVisible ? "is-visible" : ""}`}
          >
            <div
              className="relative select-none"
              style={{
                width: `${CARD_WIDTH}px`,
                height: "640px",
                margin: "0 auto",
                perspective: "1400px",
              }}
            >
              {/* ===== SVG LANYARD STRAP ===== */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none z-10"
                style={{ overflow: "visible" }}
              >
                <defs>
                  {/* Sky Blue & Deep Cyan Texture Gradient */}
                  <linearGradient id="lanyardFill" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#0284c7" />
                    <stop offset="25%" stopColor="#0ea5e9" />
                    <stop offset="50%" stopColor="#38bdf8" />
                    <stop offset="75%" stopColor="#0ea5e9" />
                    <stop offset="100%" stopColor="#0369a1" />
                  </linearGradient>

                  {/* Satin Sheen Line */}
                  <linearGradient id="lanyardShine" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="rgba(255,255,255,0)" />
                    <stop offset="45%" stopColor="rgba(255,255,255,0.4)" />
                    <stop offset="55%" stopColor="rgba(255,255,255,0.4)" />
                    <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                  </linearGradient>
                </defs>

                {/* Strap Shadow */}
                <path
                  d={strapPolygonPath}
                  fill="rgba(0,0,0,0.12)"
                  style={{ transform: "translate(3px, 4px)" }}
                />

                {/* Main Satin Ribbon Strap */}
                <path d={strapPolygonPath} fill="url(#lanyardFill)" />

                {/* Outer Border Stroke for depth */}
                <path
                  d={strapCenterPath}
                  fill="none"
                  stroke="rgba(3,105,161,0.5)"
                  strokeWidth={STRAP_WIDTH + 1}
                  strokeLinecap="round"
                  opacity="0.35"
                />

                {/* Center Satin Highlight */}
                <path
                  d={strapCenterPath}
                  fill="none"
                  stroke="url(#lanyardShine)"
                  strokeWidth={STRAP_WIDTH * 0.35}
                  strokeLinecap="round"
                />

                {/* Anchor Top Ring */}
                <circle
                  cx={CARD_WIDTH / 2}
                  cy={ANCHOR_Y}
                  r="7"
                  fill="none"
                  stroke="#94a3b8"
                  strokeWidth="3.5"
                />
                <circle
                  cx={CARD_WIDTH / 2}
                  cy={ANCHOR_Y}
                  r="3"
                  fill="#475569"
                />
              </svg>

              {/* ===== 3D CARD WRAPPER ===== */}
              <div
                className={`absolute z-20 ${
                  isVisible ? "animate-id-card-fall" : "opacity-0"
                }`}
                style={{
                  width: `${CARD_WIDTH}px`,
                  left: "50%",
                  top: `${CARD_REST_Y}px`,
                  ...(hasFallen
                    ? {
                        animation: "none",
                        opacity: 1,
                        transform: `translate(calc(-50% + ${cardOffset.x}px), ${cardOffset.y}px)`,
                        transformStyle: "preserve-3d",
                        transition: isDragging ? "none" : undefined,
                      }
                    : {
                        transformStyle: "preserve-3d",
                      }),
                }}
              >
                <div
                  onMouseDown={(e) => {
                    e.preventDefault();
                    handlePointerDown(e.clientX, e.clientY);
                  }}
                  onTouchStart={(e) => {
                    if (e.touches[0]) {
                      handlePointerDown(
                        e.touches[0].clientX,
                        e.touches[0].clientY,
                      );
                    }
                  }}
                  className={`relative ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
                  style={{
                    transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
                    transformStyle: "preserve-3d",
                    transition: isDragging
                      ? "none"
                      : "transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)",
                  }}
                >
                  {/* Metal Carabiner Clip Hooking into the Card Slot */}
                  <div className="flex justify-center -mb-2 relative z-30 pointer-events-none">
                    <div className="w-9 h-7 rounded-t-lg bg-gradient-to-b from-zinc-300 via-zinc-400 to-zinc-600 border border-zinc-500 shadow-md flex items-end justify-center pb-1">
                      <div className="w-3.5 h-3.5 rounded-full border-2 border-zinc-800 bg-zinc-400" />
                    </div>
                  </div>

                  {/* ===== CARD MAIN CONTAINER (3D FLIP) ===== */}
                  <div
                    className="relative w-full rounded-3xl shadow-2xl"
                    style={{
                      height: `${CARD_HEIGHT}px`,
                      transformStyle: "preserve-3d",
                    }}
                  >
                    {/* ==================================================== */}
                    {/* ===== SISI DEPAN (FRONT FACE - EXACT REFERENSI) ===== */}
                    {/* ==================================================== */}
                    <div
                      className="absolute inset-0 rounded-3xl overflow-hidden border border-zinc-700/60 dark:border-zinc-700/80 bg-zinc-950 text-white shadow-2xl flex flex-col justify-between"
                      style={{
                        backfaceVisibility: "hidden",
                        WebkitBackfaceVisibility: "hidden",
                        transform: "rotateY(0deg)",
                      }}
                    >
                      {/* Top Slot Hole (Pill Punch Hole) */}
                      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-8 h-2.5 rounded-full bg-zinc-950 border border-zinc-700/80 shadow-inner z-30" />

                      {/* Futuristic Curved Panel Background Overlay (Reference style) */}
                      <div className="absolute inset-0 pointer-events-none overflow-hidden">
                        {/* Top Curved Dark Metallic Layer */}
                        <div className="absolute -top-10 -left-10 w-48 h-48 rounded-full bg-gradient-to-br from-zinc-700/40 to-transparent blur-md" />
                        {/* Futuristic Geometric Arc/Polygon matching reference */}
                        <svg
                          className="absolute inset-0 w-full h-full opacity-40"
                          viewBox="0 0 290 440"
                          fill="none"
                        >
                          <path
                            d="M0 0 L140 0 C160 40, 160 70, 140 100 L0 180 Z"
                            fill="url(#frontPanelGrad1)"
                          />
                          <path
                            d="M290 0 L160 0 C180 50, 180 110, 290 140 Z"
                            fill="url(#frontPanelGrad2)"
                          />
                          <path
                            d="M0 240 C90 260, 110 320, 0 380 Z"
                            fill="url(#frontPanelGrad3)"
                          />
                          <defs>
                            <linearGradient
                              id="frontPanelGrad1"
                              x1="0"
                              y1="0"
                              x2="1"
                              y2="1"
                            >
                              <stop
                                offset="0%"
                                stopColor="#52525b"
                                stopOpacity="0.8"
                              />
                              <stop
                                offset="100%"
                                stopColor="#27272a"
                                stopOpacity="0.2"
                              />
                            </linearGradient>
                            <linearGradient
                              id="frontPanelGrad2"
                              x1="0"
                              y1="0"
                              x2="1"
                              y2="1"
                            >
                              <stop
                                offset="0%"
                                stopColor="#3f3f46"
                                stopOpacity="0.7"
                              />
                              <stop
                                offset="100%"
                                stopColor="#18181b"
                                stopOpacity="0.3"
                              />
                            </linearGradient>
                            <linearGradient
                              id="frontPanelGrad3"
                              x1="0"
                              y1="0"
                              x2="1"
                              y2="1"
                            >
                              <stop
                                offset="0%"
                                stopColor="#0ea5e9"
                                stopOpacity="0.3"
                              />
                              <stop
                                offset="100%"
                                stopColor="#000000"
                                stopOpacity="0"
                              />
                            </linearGradient>
                          </defs>
                        </svg>

                        {/* Diagonal Gloss / Specular Sheen */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-80" />
                      </div>

                      {/* Foreground Portrait Photo */}
                      <div className="relative w-full h-full flex items-center justify-center pt-6 overflow-hidden">
                        <img
                          src="/img/abi.jpg"
                          alt="Muhammad Abi Rafdi Pratama"
                          className="w-full h-full object-cover object-top scale-105 pointer-events-none select-none contrast-[1.08] brightness-[0.98]"
                          draggable="false"
                        />

                        {/* Smooth bottom gradient vignette */}
                        <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black via-black/85 to-transparent z-10" />
                      </div>

                      {/* Bottom Typography (Sesuai Referensi Gambar) */}
                      <div className="absolute bottom-0 inset-x-0 p-5 z-20 text-left">
                        {/* Name in Bold White Typography */}
                        <h4 className="text-1xl font-black font-display text-white tracking-tight leading-tight drop-shadow-md">
                          Muhammad Abi Rafdi Pratama
                        </h4>

                        {/* Subtitle Role */}
                        <p className="text-xs font-semibold text-zinc-300 mt-0.5 tracking-wide flex items-center gap-1.5">
                          <span>Web Dev & QA Tester</span>
                        </p>
                      </div>
                    </div>

                    {/* ==================================================== */}
                    {/* ===== SISI BELAKANG (BACK FACE - SLEEK CYBER BADGE) ===== */}
                    {/* ==================================================== */}
                    <div
                      className="absolute inset-0 rounded-3xl overflow-hidden border border-zinc-700/80 bg-zinc-950 text-white shadow-2xl p-6 flex flex-col justify-between"
                      style={{
                        backfaceVisibility: "hidden",
                        WebkitBackfaceVisibility: "hidden",
                        transform: "rotateY(180deg)",
                      }}
                    >
                      {/* Top Slot Hole */}
                      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-8 h-2.5 rounded-full bg-zinc-950 border border-zinc-700/80 shadow-inner z-30" />

                      {/* Header Back Side */}
                      <div className="pt-3 flex justify-between items-center border-b border-zinc-800 pb-3">
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-lg text-sky-400 font-display tracking-tight">
                            GLBW.
                          </span>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 font-mono font-bold">
                            VERIFIED
                          </span>
                        </div>
                        <ShieldCheck size={18} className="text-emerald-400" />
                      </div>

                      {/* Credentials & Details */}
                      <div className="space-y-3.5 my-auto text-left">
                        {/* Profile Info */}
                        <div>
                          <p className="text-[10px] uppercase font-mono text-zinc-400 tracking-wider">
                            FULL NAME
                          </p>
                          <p className="text-xs font-bold text-white tracking-wide">
                            Muhammad Abi Rafdi Pratama
                          </p>
                        </div>

                        {/* Verified Stack */}
                        <div className="space-y-2">
                          <p className="text-[10px] uppercase font-mono text-zinc-400 tracking-wider">
                            CORE CAPABILITIES
                          </p>

                          <div className="flex items-center gap-2 text-xs bg-zinc-900/80 p-2 rounded-xl border border-zinc-800">
                            <Code2
                              size={14}
                              className="text-sky-400 shrink-0"
                            />
                            <span className="text-[11px] font-semibold text-zinc-200">
                              React • Next.js • Tailwind CSS
                            </span>
                          </div>

                          <div className="flex items-center gap-2 text-xs bg-zinc-900/80 p-2 rounded-xl border border-zinc-800">
                            <Sparkles
                              size={14}
                              className="text-purple-400 shrink-0"
                            />
                            <span className="text-[11px] font-semibold text-zinc-200">
                              Node.js • Express • PostgreSQL
                            </span>
                          </div>

                          <div className="flex items-center gap-2 text-xs bg-zinc-900/80 p-2 rounded-xl border border-zinc-800">
                            <CheckCircle2
                              size={14}
                              className="text-emerald-400 shrink-0"
                            />
                            <span className="text-[11px] font-semibold text-zinc-200">
                              QA Testing
                            </span>
                          </div>
                        </div>

                        {/* Location */}
                        <div className="flex items-center justify-between text-[11px] text-zinc-400 pt-1">
                          <span className="flex items-center gap-1.5">
                            <MapPin size={12} className="text-sky-400" />{" "}
                            Bandung, Indonesia
                          </span>
                          <span className="text-emerald-400 font-bold uppercase text-[10px] flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                            Available
                          </span>
                        </div>
                      </div>

                      {/* Barcode & Security Hologram Footer */}
                      <div className="pt-2 border-t border-zinc-800/80 flex flex-col items-center gap-1">
                        {/* Barcode */}
                        <div className="flex gap-[1.5px] justify-center w-full">
                          {[...Array(44)].map((_, i) => (
                            <div
                              key={i}
                              className="bg-zinc-200"
                              style={{
                                height: "22px",
                                width: [0, 4, 9, 15, 22, 28, 35, 41].includes(i)
                                  ? "2.5px"
                                  : i % 2 === 0
                                    ? "1.8px"
                                    : "1px",
                                opacity: 0.85,
                              }}
                            />
                          ))}
                        </div>
                        <p className="text-[8px] font-mono text-zinc-400 tracking-[0.25em]">
                          DEV — 2024 — ID — 024
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
