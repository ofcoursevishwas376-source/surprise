import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { GlassCard } from "@/components/ui-ext/GlassCard";
import { ChapterHeading } from "@/components/ui-ext/ChapterHeading";
import { letter } from "@/content/letter";

export function LetterChapter() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-150px" });
  const [typed, setTyped] = useState("");
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (!inView) return;
    let i = 0;
    const t = setInterval(() => {
      i++;
      setTyped(letter.body.slice(0, i));
      if (i >= letter.body.length) clearInterval(t);
    }, 22);
    return () => clearInterval(t);
  }, [inView]);

  return (
    <section ref={ref} className="relative px-6 py-32 md:py-48">
      <ChapterHeading kicker="A letter" title="Words I've been carrying" />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1.2 }}
        className="mx-auto max-w-2xl"
      >
        <GlassCard rose className="relative">
          <div className="absolute -top-3 left-8 rounded-full bg-card px-4 py-1 text-xs tracking-[0.3em] uppercase text-foreground/50">
            {letter.date}
          </div>
          <p className="font-hand text-3xl md:text-4xl mb-6 text-foreground/95">{letter.greeting}</p>
          <p className="font-hand text-2xl md:text-3xl whitespace-pre-line leading-relaxed text-foreground/90 min-h-[12rem]">
            {typed}
            <span className="ml-1 inline-block h-6 w-0.5 animate-pulse bg-primary align-middle" />
          </p>
          <div className="mt-8 flex flex-wrap items-end justify-between gap-4">
            <p className="font-hand text-3xl text-primary text-glow">{letter.signature}</p>
            <button
              onClick={() => {
                const a = audioRef.current;
                if (!a) return;
                if (playing) { a.pause(); setPlaying(false); }
                else { a.play().then(() => setPlaying(true)).catch(() => {}); }
              }}
              className="glass rounded-full px-5 py-2 text-xs tracking-[0.2em] uppercase hover:scale-105 transition-transform"
            >
              {playing ? "❚❚ Pause voice note" : "▸ Play voice note"}
            </button>
            <audio ref={audioRef} src={letter.voiceNote} onEnded={() => setPlaying(false)} preload="none" />
          </div>
        </GlassCard>
      </motion.div>
    </section>
  );
}
