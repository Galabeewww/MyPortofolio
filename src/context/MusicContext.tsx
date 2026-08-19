import React, { createContext, useContext, useState, useEffect, useRef } from "react";

interface MusicContextType {
  isPlaying: boolean;
  togglePlay: () => void;
  play: () => void;
  pause: () => void;
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

export const MusicProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.45;

    // Attempt autoplay
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          setIsPlaying(false);
          const handleFirstGesture = () => {
            if (audioRef.current) {
              audioRef.current
                .play()
                .then(() => {
                  setIsPlaying(true);
                })
                .catch(() => {});
            }
            window.removeEventListener("click", handleFirstGesture);
            window.removeEventListener("keydown", handleFirstGesture);
            window.removeEventListener("touchstart", handleFirstGesture);
          };

          window.addEventListener("click", handleFirstGesture, { once: true });
          window.addEventListener("keydown", handleFirstGesture, { once: true });
          window.addEventListener("touchstart", handleFirstGesture, { once: true });
        });
    }
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.warn("Audio playback not allowed:", err);
        });
    }
  };

  const play = () => {
    if (audioRef.current) {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <MusicContext.Provider value={{ isPlaying, togglePlay, play, pause }}>
      <audio
        ref={audioRef}
        src="/music/binksake.mp3"
        loop
        preload="auto"
      />
      {children}
    </MusicContext.Provider>
  );
};

export const useMusic = () => {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error("useMusic must be used within a MusicProvider");
  }
  return context;
};
