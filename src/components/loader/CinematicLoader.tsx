import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { config } from "@/content/config";

export function CinematicLoader({ onDone }: { onDone: () => void }) {
  const [pct, setPct] = useState(0);
  const [typed, setTyped] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    const text = config.loadingQuote;
    let i = 0;
    const t = setInterval(() => {
      i++;
      setTyped(text.slice(0, i));
      if (i >= text.length) clearInterval(t);
    }, 45);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const start = performance.now();
    const dur = 4200;
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / dur);
      setPct(Math.round(p * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setTimeout(() => { setDone(true); setTimeout(onDone, 900); }, 600);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onDone]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9 }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[oklch(0.04_0.01_20)]"
        >
          <div className="bloom-rose absolute inset-0 opacity-50" />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 1.2 }}
            className="font-display text-2xl md:text-3xl text-foreground/90 max-w-xl px-6 text-center leading-snug whitespace-pre-line min-h-[5rem]"
          >
            {typed}
            <span className="ml-1 inline-block h-6 w-px animate-pulse bg-primary align-middle" />
          </motion.p>
          <div className="mt-16 w-64 max-w-[70vw]">
            <div className="h-px w-full bg-foreground/10 overflow-hidden">
              <motion.div className="h-full bg-gradient-to-r from-primary/60 via-accent to-primary/60" style={{ width: `${pct}%` }} />
            </div>
            <p className="mt-3 text-center text-xs tracking-[0.4em] text-foreground/50">{pct.toString().padStart(3, "0")}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
