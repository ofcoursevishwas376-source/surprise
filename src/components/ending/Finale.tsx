import { motion } from "framer-motion";
import finaleSky from "@/assets/images/finale-sky.jpg";
import { useUnlock } from "@/hooks-ext/useUnlock";
import { useNavigate } from "@tanstack/react-router";

export function Finale() {
  const { reset } = useUnlock();
  const navigate = useNavigate();
  const replay = () => { reset(); navigate({ to: "/" }); };

  return (
    <section className="relative min-h-screen overflow-hidden flex items-center justify-center px-6 py-32">
      <img src={finaleSky} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-50" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/30 to-background" />

      {/* drifting lanterns */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 12 }).map((_, i) => (
          <span key={i} className="absolute h-3 w-3 rounded-full"
            style={{
              left: `${5 + Math.random() * 90}%`,
              bottom: `-30px`,
              background: "radial-gradient(circle, #ffd089, #b86a2f)",
              boxShadow: "0 0 30px #ffb347, 0 0 60px #ff7e3a",
              animation: `drift-up ${12 + Math.random() * 12}s linear ${Math.random() * 8}s infinite`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-2xl text-center">
        <motion.p
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          transition={{ duration: 2 }}
          className="text-xs tracking-[0.5em] uppercase text-primary/80 mb-6"
        >
          The end (kind of)
        </motion.p>
        {[
          "This website may end here…",
          "but I hope we never do.",
          "Happy birthday, my love.",
        ].map((line, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.4 + i * 0.8 }}
            className={`font-display ${i === 2 ? "text-3xl md:text-5xl text-glow mt-8" : "text-2xl md:text-4xl text-foreground/85"} italic leading-snug`}
          >
            {line}
          </motion.p>
        ))}
        <motion.button
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 3 }}
          onClick={replay}
          className="glass-rose mt-16 rounded-full px-8 py-3 text-sm tracking-[0.3em] uppercase hover:scale-105 transition-transform"
        >
          ↺ Replay our story
        </motion.button>
      </div>
    </section>
  );
}
