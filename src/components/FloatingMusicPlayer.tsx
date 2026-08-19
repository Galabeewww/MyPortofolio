import React from "react";
import { VolumeX, Music } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { useMusic } from "../context/MusicContext";

const FloatingMusicPlayer: React.FC = () => {
  const { isPlaying, togglePlay } = useMusic();
  const { lang } = useLanguage();

  return (
    <button
      onClick={togglePlay}
      className={`fixed bottom-20 right-6 z-50 p-3.5 rounded-full border shadow-2xl transition-all duration-300 cursor-pointer flex items-center justify-center group ${
        isPlaying
          ? "bg-sky-500 text-white border-sky-400 shadow-sky-500/40 hover:scale-110 active:scale-95"
          : "bg-white dark:bg-zinc-900 border-slate-200 dark:border-zinc-800 text-slate-800 dark:text-zinc-100 hover:scale-110 active:scale-95"
      }`}
      title={
        isPlaying
          ? lang === "id"
            ? "Jeda Musik (Bink's Sake)"
            : "Pause Music (Bink's Sake)"
          : lang === "id"
          ? "Putar Musik (Bink's Sake)"
          : "Play Music (Bink's Sake)"
      }
      aria-label="Toggle Background Music"
    >
      {isPlaying ? (
        <div className="relative flex items-center justify-center">
          <Music size={20} className="text-white animate-bounce" />
          <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-200 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
          </span>
        </div>
      ) : (
        <VolumeX
          size={20}
          className="text-slate-500 dark:text-zinc-400 group-hover:scale-110 transition-transform duration-200"
        />
      )}
    </button>
  );
};

export default FloatingMusicPlayer;
