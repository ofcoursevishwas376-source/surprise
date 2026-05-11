import { motion } from "framer-motion";
import { ChapterHeading } from "@/components/ui-ext/ChapterHeading";
import { GlassCard } from "@/components/ui-ext/GlassCard";
import { timeline } from "@/content/timeline";

export function TimelineChapter() {
  return (
    <section className="relative px-6 py-32 md:py-48">
      <ChapterHeading kicker="Our story" title="Everything that led us here" />
      <div className="relative mx-auto max-w-5xl">
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/40 to-transparent" />
        <div className="space-y-20">
          {timeline.map((m, i) => {
            const left = i % 2 === 0;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, ease: "easeOut" }}
                className={`relative flex flex-col md:flex-row ${left ? "" : "md:flex-row-reverse"} items-center gap-6 md:gap-12`}
              >
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 z-10">
                  <div className="h-3 w-3 rounded-full bg-primary shadow-[0_0_20px_var(--rose-glow)]" />
                </div>
                <div className="md:w-1/2 pl-12 md:pl-0">
                  <GlassCard rose className="group hover:scale-[1.02] cursor-default">
                    <img src={m.image} alt="" loading="lazy" width={1280} height={1280} className="mb-4 aspect-[4/3] w-full rounded-lg object-cover transition-transform duration-700 group-hover:scale-105" />
                    <p className="text-xs tracking-[0.3em] uppercase text-primary/70">{m.date}</p>
                    <h3 className="font-display text-2xl mt-2">{m.title}</h3>
                    <p className="mt-2 text-foreground/70 italic">{m.caption}</p>
                  </GlassCard>
                </div>
                <div className="hidden md:block md:w-1/2" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
