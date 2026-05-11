import { motion } from "framer-motion";
import { ChapterHeading } from "@/components/ui-ext/ChapterHeading";
import { dreams } from "@/content/dreams";

export function DreamsChapter() {
  return (
    <section className="relative px-6 py-32 md:py-48 overflow-hidden">
      <div className="absolute inset-0" style={{ background: "var(--gradient-aurora)", opacity: 0.18 }} />
      {/* stars */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 50 }).map((_, i) => (
          <span key={i} className="absolute h-[2px] w-[2px] rounded-full bg-white" style={{
            top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%`,
            opacity: 0.3 + Math.random() * 0.6,
            animation: `flicker ${1 + Math.random() * 3}s ease-in-out infinite alternate`,
          }} />
        ))}
      </div>
      <div className="relative">
        <ChapterHeading kicker="Future" title="Where we still have to go" />
        <div className="mx-auto grid max-w-5xl gap-5 md:grid-cols-2">
          {dreams.map((d, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.8, delay: i * 0.08 }}
              className="glass-rose rounded-xl p-0 overflow-hidden flex"
            >
              <div className="bg-primary/15 px-5 py-6 flex items-center justify-center min-w-[100px] border-r border-white/10">
                <span className="font-display text-3xl text-glow">{d.code}</span>
              </div>
              <div className="p-5 flex-1">
                <p className="text-[10px] tracking-[0.4em] uppercase text-primary/60">Boarding pass · open</p>
                <h3 className="font-display text-2xl mt-1">{d.place}</h3>
                <p className="font-hand text-xl text-foreground/80 mt-1">{d.note}</p>
              </div>
            </motion.div>
          ))}
        </div>
        <p className="mt-12 text-center font-display text-xl md:text-2xl italic text-foreground/70">
          We still have so much left to live.
        </p>
      </div>
    </section>
  );
}
