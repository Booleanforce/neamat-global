import type { ReactNode } from "react";
import { cn } from "@neamat/ui/lib/utils";

type SectionEyebrowProps = {
  children: ReactNode;
  /** `light` = on white/surface backgrounds, `dark` = on navy. */
  tone?: "light" | "dark";
  /** Kept for API compatibility with the original ruled style. */
  trailingRule?: boolean;
  className?: string;
};

/**
 * Section label — uppercase pill with a gold dot. On light backgrounds the text is navy on a gold
 * tint (gold text on white fails WCAG AA at 1.8:1); on navy it is gold on a translucent white.
 */
export function SectionEyebrow({ children, tone = "light", className }: SectionEyebrowProps) {
  return (
    <p
      className={cn(
        "inline-flex w-fit items-center gap-2 rounded-full px-3.5 py-1.5 text-[11px] font-bold tracking-[0.16em] uppercase",
        tone === "light" ? "bg-gold/15 text-navy-deep ring-1 ring-gold/30" : "bg-white/8 text-gold ring-1 ring-white/12",
        className,
      )}
    >
      <span aria-hidden="true" className="size-1.5 rounded-full bg-gold shadow-glow-gold" />
      {children}
    </p>
  );
}
