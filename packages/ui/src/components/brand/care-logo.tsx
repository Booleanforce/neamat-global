import Link from "next/link";
import { House } from "lucide-react";
import { cn } from "@neamat/ui/lib/utils";

type CareLogoProps = {
  href?: string;
  label?: string;
  /** Optional line under the wordmark, e.g. "Home, Facility & Maintenance Services". */
  tagline?: string;
  /** `light` for navy backgrounds (sidebar), `dark` for light surfaces. */
  tone?: "light" | "dark";
  className?: string;
};

/** NEAMAT CARE lockup: green house tile + two-tone wordmark (as on the Featured Business section). */
export function CareLogo({ href = "/", label = "NEAMAT CARE", tagline, tone = "dark", className }: CareLogoProps) {
  return (
    <Link href={href} aria-label={label} className={cn("inline-flex items-center gap-2.5 rounded-sm", className)}>
      <span
        aria-hidden="true"
        className="grid size-9 shrink-0 place-items-center rounded-full bg-unit-neamatcare text-white"
      >
        <House className="size-[18px]" />
      </span>
      <span className="flex flex-col leading-tight" dir="ltr">
        <span className={cn("text-[15px] font-bold", tone === "light" ? "text-white" : "text-navy-deep")}>
          NEAMAT <span className={tone === "light" ? "text-gold" : "text-unit-neamatcare"}>CARE</span>
        </span>
        {tagline && (
          <span className={cn("text-[10px]", tone === "light" ? "text-on-navy" : "text-muted-text")}>{tagline}</span>
        )}
      </span>
    </Link>
  );
}
