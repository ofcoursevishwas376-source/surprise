import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { ChapterHeading } from "@/components/ui-ext/ChapterHeading";
import { GlassCard } from "@/components/ui-ext/GlassCard";
import { useUnlock } from "@/hooks-ext/useUnlock";

export function CakeChapter() {
  const [candleLit, setCandleLit] = useState(true);
  const [cut, setCut] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const { unlock } = useUnlock();
  const sectionRef = useRef<HTMLElement>(null);

  const blowOut = () => setCandleLit(false);

  const cutCake = () => {
    if (cut) return;
    setCut(true);
    const rect = sectionRef.current?.getBoundingClientRect();
    const y = rect ? (rect.top + rect.height / 2) / window.innerHeight : 0.5;
    confetti({ particleCount: 140, spread: 90, origin: { y }, colors: ["#ff6b8a", "#ffb3c1", "#ffd6a5", "#ffffff"] });
    setTimeout(() => confetti({ particleCount: 80, angle: 60, spread: 70, origin: { x: 0, y } }), 200);
    setTimeout(() => confetti({ particleCount: 80, angle: 120, spread: 70, origin: { x: 1, y } }), 350);
    setTimeout(() => { setRevealed(true); unlock(); }, 1100);
  };

  return (
    <section ref={sectionRef} className="relative px-6 py-32 md:py-48">
      <ChapterHeading kicker="Make a wish" title="Your cake, just for you" />

      <div className="mx-auto flex max-w-3xl flex-col items-center gap-12">
        <div className="relative h-[360px] w-full max-w-md">
          {/* candle flame */}
          <AnimatePresence>
            {candleLit && (
              <motion.div
                exit={{ opacity: 0, scale: 0, y: -20 }}
                transition={{ duration: 0.6 }}
                className="absolute left-1/2 top-2 -translate-x-1/2"
              >
                <div className="bloom-rose absolute -inset-8 opacity-80" />
                <div
                  className="animate-flicker rounded-full"
                  style={{
                    width: "16px",
                    height: "28px",
                    background: "radial-gradient(circle at 50% 70%, #fff8c0 0%, #ffb347 50%, #ff5e3a 90%)",
                    filter: "blur(0.6px)",
                    boxShadow: "0 0 30px #ffb347, 0 0 60px #ff5e3a",
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* candle stick */}
          <div className="absolute left-1/2 top-9 -translate-x-1/2 h-14 w-2 rounded-sm bg-gradient-to-b from-pink-100 to-pink-300 shadow-md z-10" />

          {/* cake — three tiers in SVG */}
          <svg viewBox="0 0 400 320" className="absolute inset-0 mt-16">
            <defs>
              <linearGradient id="frosting1" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0" stopColor="#ffd1dc" />
                <stop offset="1" stopColor="#e57396" />
              </linearGradient>
              <linearGradient id="frosting2" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0" stopColor="#ffe5ec" />
                <stop offset="1" stopColor="#d96b8e" />
              </linearGradient>
              <linearGradient id="plate" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0" stopColor="#3a2030" />
                <stop offset="1" stopColor="#1a0d18" />
              </linearGradient>
              <filter id="glow"><feGaussianBlur stdDeviation="6" /></filter>
            </defs>
            {/* glow under cake */}
            <ellipse cx="200" cy="280" rx="170" ry="14" fill="#e57396" opacity="0.4" filter="url(#glow)" />
            {/* tier 3 (top) */}
            <rect x="150" y="40" width="100" height="50" rx="6" fill="url(#frosting2)" />
            {/* tier 2 */}
            <rect x="120" y="100" width="160" height="70" rx="8" fill="url(#frosting1)" />
            {/* drips */}
            {[140, 170, 200, 230, 260].map((x) => (
              <ellipse key={x} cx={x} cy="170" rx="6" ry="10" fill="url(#frosting2)" />
            ))}
            {/* tier 1 */}
            <rect x="80" y="180" width="240" height="90" rx="10" fill="url(#frosting1)" />
            {/* plate */}
            <ellipse cx="200" cy="280" rx="170" ry="12" fill="url(#plate)" />
            {/* sprinkles */}
            {Array.from({ length: 18 }).map((_, i) => (
              <circle key={i} cx={90 + Math.random() * 220} cy={195 + Math.random() * 70} r="1.6" fill={["#fff","#ffd1dc","#ffb3c1","#ffe5ec"][i%4]} />
            ))}
            {/* slice cut */}
            {cut && (
              <motion.polygon
                initial={{ x: 0 }} animate={{ x: 80, opacity: 0 }} transition={{ duration: 1 }}
                points="200,180 230,180 215,270" fill="#2a141d"
              />
            )}
          </svg>

          {/* knife */}
          <AnimatePresence>
            {!revealed && cut && (
              <motion.div
                initial={{ x: -200, y: -100, rotate: -30, opacity: 0 }}
                animate={{ x: 0, y: 0, rotate: 0, opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, ease: "easeIn" }}
                className="absolute left-1/2 top-1/2 -translate-x-1/2"
              >
                <div className="h-2 w-32 rounded bg-gradient-to-r from-zinc-300 to-zinc-500 shadow-lg" />
                <div className="mx-auto h-3 w-10 rounded bg-amber-900" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          {candleLit && (
            <button onClick={blowOut} className="glass-rose rounded-full px-6 py-3 text-sm tracking-[0.2em] uppercase hover:scale-105 transition-transform">
              ✦ Blow the candle
            </button>
          )}
          {!candleLit && !cut && (
            <motion.button
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              onClick={cutCake}
              className="glass-rose animate-pulse-glow rounded-full px-6 py-3 text-sm tracking-[0.2em] uppercase hover:scale-105 transition-transform"
            >
              ✦ Cut the cake
            </motion.button>
          )}
        </div>

        <AnimatePresence>
          {revealed && (
            <motion.div
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2 }}
              className="w-full max-w-xl"
            >
              <GlassCard rose className="text-center">
                <p className="text-xs tracking-[0.4em] uppercase text-primary/80 mb-3">A small wish, between us</p>
                <p className="font-display text-2xl md:text-3xl text-foreground/95 italic leading-relaxed">
                  "I hope every year of yours feels softer, slower, and more loved than the last —<br className="hidden md:block" /> and I hope I'm somewhere in all of them."
                </p>
                <p className="mt-6 text-sm text-foreground/60">↓ The rest of the journey is unlocked ↓</p>
              </GlassCard>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
