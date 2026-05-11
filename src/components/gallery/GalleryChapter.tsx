import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChapterHeading } from "@/components/ui-ext/ChapterHeading";
import { gallery } from "@/content/gallery";
import { X } from "lucide-react";

export function GalleryChapter() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="relative px-6 py-32 md:py-48">
      <ChapterHeading kicker="Frames" title="Polaroids of us" />
      <div className="mx-auto max-w-6xl columns-1 sm:columns-2 lg:columns-3 gap-6 [column-fill:_balance]">
        {gallery.map((p, i) => (
          <motion.button
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: (i % 3) * 0.1 }}
            onClick={() => setOpen(i)}
            className="mb-6 block w-full break-inside-avoid bg-white p-3 pb-4 shadow-[0_15px_40px_rgba(0,0,0,0.4)] hover:scale-105 transition-transform duration-500"
            style={{ transform: `rotate(${(i % 2 === 0 ? -1 : 1) * (1 + (i % 3))}deg)` }}
          >
            <div className="overflow-hidden">
              {p.type === "image" ? (
                <img src={p.src} alt={p.caption} loading="lazy" className="aspect-square w-full object-cover transition-transform duration-700 hover:scale-110" />
              ) : (
                <video
                  src={p.src}
                  muted
                  loop
                  autoPlay
                  playsInline
                  className="aspect-square w-full object-cover transition-transform duration-700 hover:scale-110"
                />
              )}
            </div>
            <p className="font-hand text-2xl text-zinc-900 mt-3 text-center">{p.caption}</p>
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-500 text-center mt-1">{p.date}</p>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {open !== null && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-black/90 backdrop-blur-sm p-6"
          >
            <button className="absolute top-6 right-6 text-white" aria-label="Close"><X /></button>
            <motion.div
              initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
              className="max-w-3xl"
              onClick={(e) => e.stopPropagation()}
            >
              {gallery[open].type === "image" ? (
                <img src={gallery[open].src} alt="" className="max-h-[80vh] w-auto rounded-lg" />
              ) : (
                <video
                  src={gallery[open].src}
                  controls
                  autoPlay
                  loop
                  className="max-h-[80vh] w-auto rounded-lg"
                />
              )}
              <p className="font-hand text-3xl text-white text-center mt-4">{gallery[open].caption}</p>
              <p className="text-sm uppercase tracking-[0.3em] text-white/60 text-center mt-1">{gallery[open].date}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
