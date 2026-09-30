import type { ReactNode } from "react";
import { cn } from "@neamat/ui/lib/utils";

type StatItemProps = {
  icon: ReactNode;
  /** Headline figure ("4", "1000+"). Omit for text-only stats ("Presence in Saudi Arabia & Bangladesh"). */
  value?: string;
  label: string;
  className?: string;
};

/** About-section stat on deep navy: gold line icon, large figure, small label. */
export function StatItem({ icon, value, label, className }: StatItemProps) {
  return (
    <div className={cn("flex flex-col items-center gap-2 px-3 py-4 text-center", className)}>
      <span aria-hidden="true" className="text-gold [&_svg]:size-7 [&_svg]:stroke-[1.5]">
        {icon}
      </span>
      {value && <span className="text-2xl leading-none font-bold text-white sm:text-[28px]">{value}</span>}
      <span className={cn("text-xs leading-snug text-on-navy", !value && "text-[13px] text-white")}>
        {label}
      </span>
    </div>
  );
}
