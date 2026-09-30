"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useId } from "react";
import { cn } from "@neamat/ui/lib/utils";

export type MapMarker = {
  label: string;
  sublabel?: string;
  /** Position as a percentage of the map box (x from the left, y from the top). */
  x: number;
  y: number;
  /** Which side of the pin the label sits on (physical, map is never mirrored). */
  labelSide?: "left" | "right";
};

type WorldMapProps = {
  /** Land silhouette (white land on black) used as a luminance mask. */
  maskSrc: string;
  markers: MapMarker[];
  /** Draw animated gold routes between consecutive markers. */
  connect?: boolean;
  tone?: "light" | "dark";
  title: string;
  className?: string;
};

const W = 1357;
const H = 628;

/**
 * Dotted world map: a dot pattern clipped by a land mask (tinted via `currentColor`), pulsing
 * pins and an animated gold route between markers. Never mirrored in RTL — geography doesn't flip.
 */
export function WorldMap({ maskSrc, markers, connect = true, tone = "light", title, className }: WorldMapProps) {
  const id = useId();
  const reduce = useReducedMotion();
  const patternId = `${id}-dots`;
  const maskId = `${id}-land`;
  const gradientId = `${id}-route`;

  const points = markers.map((m) => ({ x: (m.x / 100) * W, y: (m.y / 100) * H }));
  const routes = connect
    ? points.slice(1).map((to, i) => {
        const from = points[i]!;
        const mx = (from.x + to.x) / 2;
        const lift = Math.max(60, Math.abs(to.x - from.x) * 0.55);
        return `M ${from.x} ${from.y} Q ${mx} ${Math.min(from.y, to.y) - lift} ${to.x} ${to.y}`;
      })
    : [];

  return (
    <figure
      dir="ltr"
      className={cn(
        "relative aspect-[1357/628] w-full",
        tone === "dark" ? "text-white/35" : "text-navy/25",
        className,
      )}
    >
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={title} className="size-full overflow-visible">
        <defs>
          <pattern id={patternId} width="10" height="10" patternUnits="userSpaceOnUse">
            <circle cx="5" cy="5" r="2.4" fill="currentColor" />
          </pattern>
          <mask id={maskId}>
            <image href={maskSrc} width={W} height={H} preserveAspectRatio="none" />
          </mask>
          <linearGradient id={gradientId} x1="0" x2="1">
            <stop offset="0%" stopColor="var(--brand-gold)" stopOpacity="0.2" />
            <stop offset="50%" stopColor="var(--brand-gold)" />
            <stop offset="100%" stopColor="var(--brand-gold-light)" stopOpacity="0.4" />
          </linearGradient>
        </defs>
        <rect width={W} height={H} fill={`url(#${patternId})`} mask={`url(#${maskId})`} />

        {routes.map((d) => (
          <g key={d}>
            <motion.path
              d={d}
              fill="none"
              stroke={`url(#${gradientId})`}
              strokeWidth="3"
              strokeLinecap="round"
              initial={reduce ? false : { pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
            />
            <path
              d={d}
              fill="none"
              className="animate-dash stroke-gold-light motion-reduce:animate-none"
              strokeWidth="1.5"
              strokeDasharray="4 8"
              opacity="0.8"
            />
          </g>
        ))}
      </svg>

      {markers.map((marker) => (
        <div
          key={marker.label}
          className="absolute flex -translate-x-1/2 -translate-y-1/2 items-center"
          style={{ left: `${marker.x}%`, top: `${marker.y}%` }}
        >
          <span className="relative grid size-4 place-items-center">
            <span
              aria-hidden="true"
              className="absolute inset-0 animate-pulse-ring rounded-full bg-gold motion-reduce:animate-none"
            />
            <span className="relative size-3 rounded-full bg-gold ring-4 ring-gold/30" />
          </span>
          <span
            className={cn(
              "absolute top-1/2 -translate-y-1/2 rounded-lg px-2.5 py-1.5 leading-tight whitespace-nowrap shadow-card",
              marker.labelSide === "left" ? "right-6 text-right" : "left-6",
              tone === "dark" ? "glass-dark" : "bg-white/95",
            )}
          >
            <span className={cn("block text-[11px] font-bold", tone === "dark" ? "text-white" : "text-navy-deep")}>
              {marker.label}
            </span>
            {marker.sublabel && (
              <span className={cn("block text-[10px]", tone === "dark" ? "text-gold" : "text-muted-text")}>
                {marker.sublabel}
              </span>
            )}
          </span>
        </div>
      ))}
    </figure>
  );
}
