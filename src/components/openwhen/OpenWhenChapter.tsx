import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChapterHeading } from "@/components/ui-ext/ChapterHeading";
import { envelopes } from "@/content/openWhen";

export function OpenWhenChapter() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section className="relative px-6 py-32 md:py-48">
      <ChapterHeading kicker="For later" title="Open when…" />
      <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-2">
        {envelopes.map((e, i) => (
          <motion.button
            key={i}
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.8, delay: i * 0.08 }}
            onClick={() => setOpen(i)}
            className="group relative aspect-[3/2] overflow-hidden rounded-lg shadow-2xl"
            style={{ background: "linear-gradient(160deg, #f4e4d3, #e9cdb6)" }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="absolute inset-x-0 top-0 h-1/2 origin-bottom"
                style={{ background: "linear-gradient(160deg, #ead0b8, #d8b393)", clipPath: "polygon(0 0, 100% 0, 50% 100%)" }} />
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-12 w-12 rounded-full"
                style={{ background: "radial-gradient(circle, oklch(0.5 0.2 18), oklch(0.3 0.16 15))", boxShadow: "0 0 20px oklch(0.6 0.2 18 / 0.6)" }}>
                <span className="absolute inset-0 flex items-center justify-center font-display text-amber-100 text-xl">♥</span>
              </div>
              <p className="absolute bottom-4 left-0 right-0 text-center font-hand text-2xl text-zinc-800 px-3 group-hover:opacity-100 opacity-90">
                {e.label}
              </p>
            </div>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {open !== null && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-black/85 backdrop-blur p-6"
          >
            <motion.div
              initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 100, opacity: 0 }}
              transition={{ type: "spring", damping: 22 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-rose max-w-xl rounded-2xl p-8 md:p-12"
            >
              <p className="text-xs tracking-[0.3em] uppercase text-primary/70">{envelopes[open].label}</p>
              <h3 className="font-display text-3xl md:text-4xl mt-3 text-glow-soft">{envelopes[open].title}</h3>
              <p className="font-hand text-2xl md:text-3xl mt-6 text-foreground/90 leading-snug whitespace-pre-line">
                {envelopes[open].letter}
              </p>
              <button onClick={() => setOpen(null)} className="mt-8 glass rounded-full px-5 py-2 text-xs tracking-[0.3em] uppercase">Close gently</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
