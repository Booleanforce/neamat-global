import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import { Card } from "@neamat/ui/components/ui/card";
import { HoverLift } from "@neamat/ui/components/brand/hover-lift";
import { cn } from "@neamat/ui/lib/utils";

export type BusinessCardProps = {
  /** Wordmark split in two tones, e.g. { base: "Nea", accent: "Pure" }. */
  name: { base: string; accent?: string };
  /** Plain-text name for accessibility (e.g. "NeaPure"). */
  plainName: string;
  category: string;
  description: string;
  icon: ReactNode;
  /**
   * Static token utilities for the unit's logo colour (static strings so Tailwind can see them),
   * e.g. { tile: "bg-unit-neopure", text: "text-unit-neopure", hoverTile: "group-hover:bg-unit-neopure" }.
   */
  accent: { tile: string; text: string; hoverTile: string };
  image: { src: string; alt: string };
  href: string;
  linkLabel: string;
  /** Position in the grid ("01"…), shown as a large watermark numeral. */
  index?: string;
};

/**
 * Our Businesses card (shadcn Card): unit-coloured accent bar, glowing icon tile, two-tone name,
 * copy, arrow link and a photo that zooms on hover. The whole card is one link target.
 */
export function BusinessCard({
  name,
  plainName,
  category,
  description,
  icon,
  accent,
  image,
  href,
  linkLabel,
  index,
}: BusinessCardProps) {
  return (
    <HoverLift className="group">
      <Card className="relative h-full gap-0 overflow-hidden rounded-2xl bg-white py-0 shadow-card ring-border transition-shadow duration-300 group-hover:shadow-elevated">
        {/* Accent bar in the unit colour */}
        <span aria-hidden="true" className={cn("absolute inset-x-0 top-0 z-20 h-1", accent.tile)} />

        {index && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute end-4 top-3 z-10 text-5xl font-black text-navy/5 transition-colors group-hover:text-navy/10"
          >
            {index}
          </span>
        )}

        <div className="relative z-10 flex items-center gap-3 px-5 pt-6 pb-3">
          <span
            aria-hidden="true"
            className={cn(
              "relative grid size-12 shrink-0 place-items-center rounded-xl text-white shadow-card transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3 [&_svg]:size-6",
              accent.tile,
            )}
          >
            <span className={cn("absolute inset-0 -z-10 rounded-xl opacity-40 blur-md", accent.tile)} />
            {icon}
          </span>
          <div className="min-w-0">
            <h3 className="text-lg leading-tight font-bold text-navy-deep">
              <span className="sr-only">{plainName}</span>
              <span aria-hidden="true" dir="ltr">
                {name.base}
                {name.accent && <span className={accent.text}>{name.accent}</span>}
              </span>
            </h3>
            <p className="mt-0.5 text-xs leading-snug font-medium text-muted-text">{category}</p>
          </div>
        </div>

        <div className="relative z-10 flex flex-1 flex-col px-5 pb-5">
          <p className="text-[13px] leading-relaxed text-body">{description}</p>
          <Link
            href={href}
            className="mt-4 inline-flex min-h-11 w-fit items-center gap-2 text-[13px] font-semibold text-navy-deep after:absolute after:inset-0 after:z-30 after:content-[''] focus-visible:outline-none focus-visible:after:rounded-2xl focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-gold"
          >
            {linkLabel}
            <span className="sr-only"> — {plainName}</span>
            <span
              aria-hidden="true"
              className={cn(
                "grid size-7 place-items-center rounded-full bg-surface text-navy-deep transition-[transform,box-shadow,background-color,color] duration-300 group-hover:text-white rtl:-scale-x-100",
                accent.hoverTile,
              )}
            >
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:rotate-45" />
            </span>
          </Link>
        </div>

        <div className="relative aspect-[16/10] w-full overflow-hidden">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(min-width: 1280px) 300px, (min-width: 640px) 45vw, 100vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-linear-to-b from-white via-transparent to-navy-deep/30"
          />
        </div>
      </Card>
    </HoverLift>
  );
}
