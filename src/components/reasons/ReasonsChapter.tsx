import { useState } from "react";
import { motion } from "framer-motion";
import { ChapterHeading } from "@/components/ui-ext/ChapterHeading";
import { reasons } from "@/content/reasons";

export function ReasonsChapter() {
  const [flipped, setFlipped] = useState<Set<number>>(new Set());
  const toggle = (i: number) => {
    setFlipped((s) => {
      const n = new Set(s);
      n.has(i) ? n.delete(i) : n.add(i);
      return n;
    });
  };
  return (
    <section className="relative px-6 py-32 md:py-48">
      <ChapterHeading kicker="Reasons" title="Why I love you" />
      <div className="mx-auto grid max-w-5xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {reasons.map((r, i) => {
          const isFlipped = flipped.has(i);
          return (
            <motion.button
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: (i % 3) * 0.1 }}
              onClick={() => toggle(i)}
              style={{ perspective: "1000px" }}
              className="block aspect-[4/5] text-left animate-float"
            >
              <div
                className="relative h-full w-full transition-transform duration-700"
                style={{ transformStyle: "preserve-3d", transform: isFlipped ? "rotateY(180deg)" : "rotateY(0)" }}
              >
                <div className="glass-rose absolute inset-0 flex flex-col items-center justify-center rounded-2xl p-8 text-center" style={{ backfaceVisibility: "hidden" }}>
                  <span className="text-xs tracking-[0.4em] uppercase text-primary/70">No. {String(i + 1).padStart(2, "0")}</span>
                  <p className="font-display text-2xl mt-6 text-glow-soft">{r.title}</p>
                  <p className="mt-auto text-xs tracking-[0.2em] uppercase text-foreground/50">tap to read</p>
                </div>
                <div className="glass absolute inset-0 flex items-center justify-center rounded-2xl p-8" style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
                  <p className="font-hand text-2xl leading-snug text-foreground/95">{r.body}</p>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>
    </section>
  );
}
