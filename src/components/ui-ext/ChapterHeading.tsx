import { motion } from "framer-motion";

export function ChapterHeading({ kicker, title }: { kicker?: string; title: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="mb-12 text-center"
    >
      {kicker && (
        <p className="mb-3 text-xs uppercase tracking-[0.4em] text-primary/70">{kicker}</p>
      )}
      <h2 className="font-display text-4xl md:text-6xl text-glow-soft">{title}</h2>
      <div className="mx-auto mt-6 h-px w-24 bg-gradient-to-r from-transparent via-primary to-transparent" />
    </motion.div>
  );
}
