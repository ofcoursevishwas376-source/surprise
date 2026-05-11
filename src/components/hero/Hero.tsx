import { motion } from "framer-motion";
import { config } from "@/content/config";
import heroBg from "@/assets/images/hero-bg.jpg";
import { useAudio } from "@/components/audio/AudioProvider";

export function Hero({ onEnter }: { onEnter: () => void }) {
  const { start, play } = useAudio();
  const handle = () => {
    start();
    play(config.ambientTrack);
    onEnter();
  };

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <img src={heroBg} alt="" width={1920} height={1280} className="absolute inset-0 h-full w-full object-cover opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/30 to-background" />

      <div className="relative z-10 px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="mb-6 text-xs uppercase tracking-[0.5em] text-primary/80"
        >
          {config.heroTitle}
        </motion.p>

        <h1 className="font-display text-6xl md:text-8xl lg:text-9xl text-glow leading-none">
          {config.herName.split("").map((ch, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1.2, delay: 0.6 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="inline-block"
            >
              {ch === " " ? "\u00A0" : ch}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, delay: 1.6 }}
          className="font-display mt-6 text-2xl md:text-3xl text-foreground/80 italic"
        >
          {config.heroSubtitle}
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 2.2 }}
          onClick={handle}
          className="glass-rose animate-pulse-glow group relative mt-16 rounded-full px-10 py-4 text-sm tracking-[0.3em] uppercase transition-transform hover:scale-105"
        >
          <span className="relative z-10">{config.enterCta}</span>
        </motion.button>

        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} transition={{ delay: 3, duration: 2 }}
          className="mt-12 text-xs tracking-[0.3em] uppercase text-foreground/40"
        >
          ↓ scroll gently ↓
        </motion.p>
      </div>
    </section>
  );
}
