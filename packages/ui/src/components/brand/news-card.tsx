import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CalendarDays } from "lucide-react";
import { Card } from "@neamat/ui/components/ui/card";
import { HoverLift } from "@neamat/ui/components/brand/hover-lift";
import { cn } from "@neamat/ui/lib/utils";

export type NewsCardProps = {
  image: { src: string; alt: string };
  /** ISO date for <time dateTime>. */
  date: string;
  /** Localised, human-readable date. */
  dateLabel: string;
  title: string;
  summary?: string;
  /** Business unit label shown as a badge, tinted with `categoryClassName` (a token bg utility). */
  category?: string;
  categoryClassName?: string;
  href: string;
  linkLabel: string;
  /** Large lead story: image fills the card with the copy overlaid. */
  featured?: boolean;
};

/** Latest News card (shadcn Card) — standard or featured (overlay) layout, image zoom on hover. */
export function NewsCard({
  image,
  date,
  dateLabel,
  title,
  summary,
  category,
  categoryClassName = "bg-navy",
  href,
  linkLabel,
  featured = false,
}: NewsCardProps) {
  const badge = category && (
    <span className={cn("rounded-full px-2.5 py-1 text-[10px] font-bold tracking-wide text-white uppercase", categoryClassName)}>
      {category}
    </span>
  );

  if (featured) {
    return (
      <HoverLift className="group">
        <Card className="relative isolate h-full min-h-[360px] justify-end gap-0 overflow-hidden rounded-2xl py-0 ring-0 shadow-elevated">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(min-width: 1280px) 560px, 100vw"
            className="-z-10 object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-linear-to-t from-navy-ink via-navy-deep/60 to-transparent" />
          <div className="grid gap-3 p-6 sm:p-7">
            <div className="flex flex-wrap items-center gap-2">
              {badge}
              <time dateTime={date} className="flex items-center gap-1.5 text-xs text-on-navy">
                <CalendarDays aria-hidden="true" className="size-3.5" />
                {dateLabel}
              </time>
            </div>
            <h3 className="text-xl leading-snug font-bold text-white sm:text-2xl">{title}</h3>
            {summary && <p className="line-clamp-2 text-sm text-on-navy">{summary}</p>}
            <Link
              href={href}
              className="mt-1 inline-flex min-h-11 w-fit items-center gap-2 text-sm font-semibold text-gold after:absolute after:inset-0 after:content-['']"
            >
              {linkLabel}
              <span className="sr-only"> — {title}</span>
              <ArrowUpRight aria-hidden="true" className="size-4 transition-transform group-hover:rotate-45 rtl:-scale-x-100" />
            </Link>
          </div>
        </Card>
      </HoverLift>
    );
  }

  return (
    <HoverLift className="group">
      <Card className="relative h-full flex-row gap-0 overflow-hidden rounded-2xl bg-white py-0 shadow-card ring-border transition-shadow group-hover:shadow-elevated">
        <div className="relative w-32 shrink-0 overflow-hidden sm:w-40">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="160px"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
          />
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-2 p-4">
          <div className="flex flex-wrap items-center gap-2">
            {badge}
            <time dateTime={date} className="text-[11px] text-muted-text">
              {dateLabel}
            </time>
          </div>
          <h3 className="line-clamp-2 text-sm leading-snug font-bold text-navy-deep">{title}</h3>
          <Link
            href={href}
            className="mt-auto inline-flex min-h-9 w-fit items-center gap-1.5 text-xs font-semibold text-navy after:absolute after:inset-0 after:content-['']"
          >
            {linkLabel}
            <span className="sr-only"> — {title}</span>
            <ArrowUpRight aria-hidden="true" className="size-3.5 transition-transform group-hover:rotate-45 rtl:-scale-x-100" />
          </Link>
        </div>
      </Card>
    </HoverLift>
  );
}
