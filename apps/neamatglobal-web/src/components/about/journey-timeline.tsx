"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import { Reveal } from "@neamat/ui/components/brand/reveal";
import { cn } from "@neamat/ui/lib/utils";

export type JourneyItem = { key: string; label: string; title: string; text: string };

/**
 * Vertical milestone timeline. Desktop alternates sides; mobile keeps a single column.
 * The gold spine "draws" with scroll progress (static under reduced motion).
 */
export function JourneyTimeline({ items }: { items: JourneyItem[] }) {
  const ref = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <ol ref={ref} className="relative mx-auto mt-14 grid max-w-5xl gap-10">
      {/* Spine */}
      <span
        aria-hidden="true"
        className="absolute inset-y-0 start-5 w-px bg-white/15 lg:start-1/2"
      />
      <motion.span
        aria-hidden="true"
        style={{ scaleY: reduce ? 1 : scaleY }}
        className="from-gold via-gold-light to-navy-bright absolute inset-y-0 start-5 w-0.5 origin-top bg-linear-to-b lg:start-1/2 lg:-translate-x-1/2 rtl:lg:translate-x-1/2"
      />

      {items.map((item, index) => {
        const alignEnd = index % 2 === 1;
        return (
          <li key={item.key} className="relative grid ps-14 lg:grid-cols-2 lg:ps-0">
            {/* Node */}
            <span
              aria-hidden="true"
              className="absolute start-5 top-6 grid size-4 -translate-x-1/2 place-items-center lg:start-1/2 rtl:translate-x-1/2"
            >
              <span className="animate-pulse-ring bg-gold absolute inset-0 rounded-full motion-reduce:animate-none" />
              <span className="bg-gold ring-navy-deep relative size-4 rounded-full ring-4" />
            </span>

            <Reveal
              direction={alignEnd ? "end" : "start"}
              className={cn(alignEnd ? "lg:col-start-2 lg:ps-12" : "lg:pe-12 lg:text-end")}
            >
              <article className="group glass-dark rounded-2xl p-6 transition-colors hover:bg-white/10">
                <p className="text-gold text-xs font-bold tracking-[0.16em] uppercase">
                  {item.label}
                </p>
                <h3 className="mt-2 text-xl font-bold text-white">{item.title}</h3>
                <p className="text-on-navy mt-2 text-sm leading-relaxed">{item.text}</p>
              </article>
            </Reveal>
          </li>
        );
      })}
    </ol>
  );
}
