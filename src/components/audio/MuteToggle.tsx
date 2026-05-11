import { Volume2, VolumeX } from "lucide-react";
import { useAudio } from "./AudioProvider";

export function MuteToggle() {
  const { muted, toggleMute, started } = useAudio();
  if (!started) return null;
  return (
    <button
      onClick={toggleMute}
      className="glass fixed top-5 right-5 z-50 flex h-11 w-11 items-center justify-center rounded-full transition-transform hover:scale-110"
      aria-label={muted ? "Unmute music" : "Mute music"}
    >
      {muted ? <VolumeX className="h-5 w-5 text-foreground/80" /> : <Volume2 className="h-5 w-5 text-foreground/80" />}
    </button>
  );
}
