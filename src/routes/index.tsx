import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CinematicLoader } from "@/components/loader/CinematicLoader";
import { Hero } from "@/components/hero/Hero";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "For You — A Birthday Letter" },
      { name: "description", content: "A private little world made just for you." },
    ],
  }),
  component: Index,
});

function Index() {
  const [loaded, setLoaded] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const navigate = useNavigate();

  const goJourney = () => {
    setLeaving(true);
    setTimeout(() => navigate({ to: "/journey" }), 1000);
  };

  return (
    <>
      {!loaded && <CinematicLoader onDone={() => setLoaded(true)} />}
      {loaded && <Hero onEnter={goJourney} />}
      <AnimatePresence>
        {leaving && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.9 }}
            className="fixed inset-0 z-[200] bg-[oklch(0.04_0.01_20)]"
          />
        )}
      </AnimatePresence>
    </>
  );
}
