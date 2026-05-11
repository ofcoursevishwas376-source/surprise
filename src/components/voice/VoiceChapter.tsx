import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChapterHeading } from "@/components/ui-ext/ChapterHeading";
import { GlassCard } from "@/components/ui-ext/GlassCard";
import { voiceNotes } from "@/content/voiceNotes";
import { Pause, Play } from "lucide-react";

function Waveform({ active }: { active: boolean }) {
  return (
    <div className="flex h-8 items-end gap-[3px]">
      {Array.from({ length: 28 }).map((_, i) => (
        <span
          key={i}
          className="w-[3px] rounded-full bg-primary/70"
          style={{
            height: active ? `${20 + Math.sin(i) * 30 + Math.random() * 30}%` : "20%",
            transition: "height 0.18s ease",
            animation: active ? `flicker 0.${(i % 9) + 2}s ease-in-out infinite alternate` : "none",
          }}
        />
      ))}
    </div>
  );
}

function NoteCard({ note, idx }: { note: typeof voiceNotes[number]; idx: number }) {
  const ref = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const a = ref.current;
    if (!a) return;
    const onEnd = () => setPlaying(false);
    a.addEventListener("ended", onEnd);
    return () => a.removeEventListener("ended", onEnd);
  }, []);

  const toggle = () => {
    const a = ref.current;
    if (!a) return;
    if (playing) {
      a.pause();
      setPlaying(false);
    } else {
      a.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ duration: 0.8, delay: idx * 0.1 }}
    >
      <GlassCard rose className={playing ? "animate-pulse-glow" : ""}>
        <p className="text-xs tracking-[0.3em] uppercase text-primary/70">{note.category}</p>
        <h3 className="font-display text-2xl mt-2">{note.title}</h3>
        <div className="mt-5 flex items-center gap-4">
          <button
            onClick={toggle}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground hover:scale-110 transition-transform"
            aria-label={playing ? "Pause" : "Play"}
          >
            {playing ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 ml-0.5" />}
          </button>
          <div className="flex-1"><Waveform active={playing} /></div>
          <span className="text-xs text-foreground/50">{note.duration}</span>
        </div>
        <audio ref={ref} src={note.src} preload="none" />
      </GlassCard>
    </motion.div>
  );
}

export function VoiceChapter() {
  return (
    <section className="relative px-6 py-32 md:py-48">
      <ChapterHeading kicker="Your sweet melodies - AK COVER" title="Things I want you to hear" />
      <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2 lg:grid-cols-3">
        {voiceNotes.map((n, i) => <NoteCard key={i} note={n} idx={i} />)}
      </div>
    </section>
  );
}
