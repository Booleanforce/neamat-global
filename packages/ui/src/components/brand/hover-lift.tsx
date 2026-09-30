"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@neamat/ui/lib/utils";
import { cardHover, hoverTransition } from "@neamat/ui/motion/presets";

/** Wraps a card with the design's optional 2–4px hover elevation. */
export function HoverLift({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div className={cn("h-full", className)} whileHover={cardHover} transition={hoverTransition}>
      {children}
    </motion.div>
  );
}
