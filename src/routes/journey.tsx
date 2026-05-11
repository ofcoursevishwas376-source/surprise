import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { LetterChapter } from "@/components/letter/LetterChapter";
import { CakeChapter } from "@/components/cake/CakeChapter";
import { GalleryChapter } from "@/components/gallery/GalleryChapter";
import { ReasonsChapter } from "@/components/reasons/ReasonsChapter";
import { VoiceChapter } from "@/components/voice/VoiceChapter";
import { QuizChapter } from "@/components/game/QuizChapter";
import { DreamsChapter } from "@/components/dreams/DreamsChapter";
import { OpenWhenChapter } from "@/components/openwhen/OpenWhenChapter";
import { Finale } from "@/components/ending/Finale";
import { LockedSection } from "@/components/ui-ext/LockedSection";
import { useUnlock } from "@/hooks-ext/useUnlock";

export const Route = createFileRoute("/journey")({
  head: () => ({
    meta: [
      { title: "Our Story — For You" },
      { name: "description", content: "A short journey, written for you." },
    ],
  }),
  component: Journey,
});

function Journey() {
  const { unlocked } = useUnlock();
  return (
    <motion.main
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.4 }}
      className="relative"
    >
      <LetterChapter />
      <CakeChapter />
      <LockedSection locked={!unlocked}>
        <GalleryChapter />
        <ReasonsChapter />
        <VoiceChapter />
        <QuizChapter />
        <DreamsChapter />
        <OpenWhenChapter />
        <Finale />
      </LockedSection>
    </motion.main>
  );
}
