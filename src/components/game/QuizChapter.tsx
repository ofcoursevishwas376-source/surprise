import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChapterHeading } from "@/components/ui-ext/ChapterHeading";
import { GlassCard } from "@/components/ui-ext/GlassCard";
import { quiz } from "@/content/quiz";

export function QuizChapter() {
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const done = step >= quiz.length;

  const choose = (i: number) => {
    if (picked !== null) return;
    setPicked(i);
    if (step === 1 || i === quiz[step].answer) setScore((s) => s + 1); // Question 2: any answer is correct
    setTimeout(() => { setPicked(null); setStep((s) => s + 1); }, 1100);
  };

  const reset = () => { setStep(0); setScore(0); setPicked(null); };

  return (
    <section className="relative px-6 py-32 md:py-48">
      <ChapterHeading kicker="A little game" title="How well do you know us?" />
      <div className="mx-auto max-w-2xl">
        <AnimatePresence mode="wait">
          {!done ? (
            <motion.div key={step} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.5 }}>
              <GlassCard rose>
                <p className="text-xs tracking-[0.3em] uppercase text-primary/70">Question {step + 1} of {quiz.length}</p>
                <h3 className="font-display text-2xl md:text-3xl mt-3">{quiz[step].q}</h3>
                <div className="mt-6 grid gap-3">
                  {quiz[step].options.map((o, i) => {
                    const correct = picked !== null && i === quiz[step].answer;
                    const wrong = picked === i && i !== quiz[step].answer;
                    return (
                      <button key={i} onClick={() => choose(i)}
                        className={`glass rounded-xl px-5 py-3 text-left transition-all hover:scale-[1.02] ${correct ? "!border-emerald-400/60 !bg-emerald-400/10" : ""} ${wrong ? "!border-rose-400/60 !bg-rose-400/10" : ""}`}>
                        {o}
                      </button>
                    );
                  })}
                </div>
              </GlassCard>
            </motion.div>
          ) : (
            <motion.div key="done" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
              <GlassCard rose className="text-center">
                <p className="text-xs tracking-[0.3em] uppercase text-primary/70">Result</p>
                <p className="font-display text-5xl mt-4 text-glow">{score}/{quiz.length}</p>
                <p className="font-hand text-2xl mt-4 text-foreground/85">
                  {score === quiz.length ? "Of course you got them all. You're you." : "Close enough. I'll teach you the rest in person."}
                </p>
                <button onClick={reset} className="mt-6 glass rounded-full px-6 py-2 text-xs tracking-[0.3em] uppercase hover:scale-105 transition-transform">Try again</button>
              </GlassCard>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
