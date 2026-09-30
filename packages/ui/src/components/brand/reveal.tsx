"use client";

import { animate, motion, useInView, useReducedMotion, type Variants } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@neamat/ui/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

type Direction = "up" | "down" | "start" | "end" | "none";

function offset(direction: Direction, distance: number) {
  switch (direction) {
    case "up":
      return { y: distance };
    case "down":
      return { y: -distance };
    case "start":
      return { x: -distance };
    case "end":
      return { x: distance };
    default:
      return {};
  }
}

type RevealProps = {
  children: ReactNode;
  className?: string;
  direction?: Direction;
  delay?: number;
  distance?: number;
  as?: "div" | "li" | "section" | "span";
};

/** Fades + slides content in once it scrolls into view (transform/opacity only). */
export function Reveal({ children, className, direction = "up", delay = 0, distance = 24, as = "div" }: RevealProps) {
  const Component = motion[as];
  return (
    <Component
      className={className}
      initial={{ opacity: 0, ...offset(direction, distance) }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay, ease: EASE }}
    >
      {children}
    </Component>
  );
}

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 22, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: EASE } },
};

/** Staggered reveal container — pair with `StaggerItem` children. */
export function Stagger({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "ul" | "ol";
}) {
  const Component = motion[as];
  return (
    <Component
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
    >
      {children}
    </Component>
  );
}

export function StaggerItem({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "li";
}) {
  const Component = motion[as];
  return (
    <Component className={cn("h-full", className)} variants={itemVariants}>
      {children}
    </Component>
  );
}

type CountUpProps = {
  /** Target number, e.g. 1000. */
  to: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  locale?: string;
  className?: string;
};

/** Counts from 0 to `to` when scrolled into view; shows the final value immediately under reduced motion. */
export function CountUp({ to, prefix = "", suffix = "", duration = 1.8, locale = "en", className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const [value, setValue] = useState(0);
  const format = (n: number) => new Intl.NumberFormat(locale).format(Math.round(n));

  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(0, to, { duration, ease: EASE, onUpdate: setValue });
    return () => controls.stop();
  }, [inView, reduce, to, duration]);

  const shown = reduce ? to : value;

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {/* Screen readers get the final value, not every animation frame. */}
      <span aria-hidden="true">
        {prefix}
        {format(shown)}
        {suffix}
      </span>
      <span className="sr-only">
        {prefix}
        {format(to)}
        {suffix}
      </span>
    </span>
  );
}
