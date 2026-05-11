import type { ReactNode } from "react";
import { Lock } from "lucide-react";

export function LockedSection({ children, locked, hint = "Cut the cake to unlock the rest of our story" }: { children: ReactNode; locked: boolean; hint?: string }) {
  if (!locked) return <>{children}</>;
  return (
    <section className="px-6 py-32 md:py-48 flex justify-center">
      <div className="glass-rose rounded-2xl px-10 py-12 text-center max-w-md animate-pulse-glow">
        <Lock className="mx-auto h-7 w-7 text-primary" />
        <p className="mt-5 text-xs tracking-[0.4em] uppercase text-foreground/70">{hint}</p>
        <p className="font-display text-2xl mt-3 italic text-foreground/85">Eight chapters waiting.</p>
      </div>
    </section>
  );
}
