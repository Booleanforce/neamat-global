import Link from "next/link";
import { cn } from "@neamat/ui/lib/utils";

type LogoProps = {
  href?: string;
  /** `light` = white wordmark for navy backgrounds, `dark` = navy wordmark for light backgrounds. */
  tone?: "light" | "dark";
  /** Show the Arabic wordmark line under the Latin name. */
  showArabic?: boolean;
  /** Highlight "GLOBAL" in gold (footer variant of the lockup). */
  goldAccent?: boolean;
  className?: string;
  label?: string;
};

/** The Neamat "N" monogram — navy/white strokes with a gold diagonal. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" className={cn("size-10 shrink-0", className)}>
      <path d="M6 42V8l10 6v28H6Z" fill="currentColor" />
      <path d="M16 14 32 36V42L16 20Z" className="fill-gold" />
      <path d="M32 6h10v36l-10-6V6Z" fill="currentColor" opacity="0.9" />
    </svg>
  );
}

/** Neamat Global lockup: monogram + "NEAMAT GLOBAL" + Arabic wordmark "نعمات العالمية". */
export function Logo({
  href = "/",
  tone = "light",
  showArabic = true,
  goldAccent = false,
  className,
  label = "Neamat Global — home",
}: LogoProps) {
  const text = tone === "light" ? "text-white" : "text-navy-deep";
  return (
    <Link
      href={href}
      aria-label={label}
      className={cn("inline-flex items-center gap-2.5 rounded-sm", text, className)}
    >
      <LogoMark className="size-9 sm:size-10" />
      <span className="flex flex-col leading-none" dir="ltr">
        <span className="text-[15px] font-bold tracking-[0.08em] sm:text-base">
          NEAMAT <span className={goldAccent ? "text-gold" : undefined}>GLOBAL</span>
        </span>
        {showArabic && (
          <span
            lang="ar"
            className="mt-1 font-arabic text-[15px] font-semibold leading-none sm:text-base"
          >
            نعمات العالمية
          </span>
        )}
      </span>
    </Link>
  );
}
