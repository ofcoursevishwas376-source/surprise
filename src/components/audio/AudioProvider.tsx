import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";

type Ctx = {
  muted: boolean;
  toggleMute: () => void;
  play: (src: string) => void;
  started: boolean;
  start: () => void;
};

export const AudioCtx = createContext<Ctx | null>(null);

export function AudioProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [muted, setMuted] = useState(true);
  const [started, setStarted] = useState(false);
  const [src, setSrc] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const a = new Audio();
    a.loop = true;
    a.volume = 0;
    audioRef.current = a;
    return () => { a.pause(); };
  }, []);

  const play = useCallback((newSrc: string) => {
    setSrc((prev) => {
      if (prev === newSrc) return prev;
      const a = audioRef.current;
      if (a) {
        a.src = newSrc;
        console.log('Playing audio:', newSrc);
        a.play().then(() => console.log('Audio started')).catch((e) => console.log('Audio play failed:', e));
      }
      return newSrc;
    });
  }, []);

  const start = useCallback(() => {
    setStarted(true);
    setMuted(false);
    const a = audioRef.current;
    if (a) {
      a.volume = 1.0;
      console.log('Starting audio with volume 0.4');
      a.play().then(() => console.log('Audio started in start')).catch((e) => console.log('Audio start failed:', e));
    }
  }, []);

  const toggleMute = useCallback(() => {
    setMuted((m) => {
      const next = !m;
      const a = audioRef.current;
      if (a) {
        a.volume = next ? 0 : 0.4;
        if (!next) a.play().catch(() => {});
      }
      return next;
    });
  }, []);

  return (
    <AudioCtx.Provider value={{ muted, toggleMute, play, started, start }}>
      {children}
    </AudioCtx.Provider>
  );
}

export function useAudio() {
  const ctx = useContext(AudioCtx);
  if (!ctx) throw new Error("useAudio must be inside AudioProvider");
  return ctx;
}
