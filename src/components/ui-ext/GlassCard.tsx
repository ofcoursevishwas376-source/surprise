import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

export function GlassCard({ className, rose, children, ...props }: HTMLAttributes<HTMLDivElement> & { rose?: boolean }) {
  return (
    <div
      className={cn(
        rose ? "glass-rose" : "glass",
        "rounded-2xl p-6 md:p-8 transition-all duration-500",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
