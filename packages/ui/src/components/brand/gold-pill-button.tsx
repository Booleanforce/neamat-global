"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";
import { Button } from "@neamat/ui/components/ui/button";
import { cn } from "@neamat/ui/lib/utils";
import {
  darkButtonHover,
  goldButtonHover,
  hoverTransition,
  pressTap,
} from "@neamat/ui/motion/presets";

type Tone = "gold" | "navy" | "outline";
type Size = "sm" | "md" | "lg";

const variantMap = { gold: "gold", navy: "navy", outline: "outline-navy" } as const;
const sizeMap = { sm: "pill-sm", md: "pill", lg: "pill-lg" } as const;

type GoldPillButtonProps = {
  children: ReactNode;
  /** `gold` = primary CTA, `navy` = "Explore NEAMAT CARE", `outline` = secondary on light surfaces. */
  variant?: Tone;
  size?: Size;
  /** Trailing arrow; flips automatically in RTL. */
  withArrow?: boolean;
  /** Layout classes (visibility, margins, width) — applied to the outer wrapper. */
  className?: string;
  /** Renders a Next.js link when provided, otherwise a button. */
  href?: string;
  external?: boolean;
} & Omit<ComponentProps<"button">, "children" | "className">;

/**
 * GoldPillButton — the design's pill CTA, built on the shadcn `Button` (brand variants live in
 * `components/ui/button.tsx`). A thin Framer Motion wrapper adds the subtle hover lift/shift
 * required by the interaction rules — nothing stronger.
 */
export function GoldPillButton({
  children,
  variant = "gold",
  size = "md",
  withArrow = true,
  className,
  href,
  external,
  onClick,
  ...buttonProps
}: GoldPillButtonProps) {
  const content = (
    <>
      <span>{children}</span>
      {withArrow && <ArrowRight aria-hidden="true" className="size-4 rtl:-scale-x-100" />}
    </>
  );

  return (
    <motion.span
      className={cn("inline-flex rounded-full", className)}
      whileHover={variant === "navy" ? darkButtonHover : goldButtonHover}
      whileTap={pressTap}
      transition={hoverTransition}
    >
      {href ? (
        <Button asChild variant={variantMap[variant]} size={sizeMap[size]} className="w-full">
          <Link
            href={href}
            onClick={onClick as ComponentProps<typeof Link>["onClick"]}
            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          >
            {content}
          </Link>
        </Button>
      ) : (
        <Button
          variant={variantMap[variant]}
          size={sizeMap[size]}
          className="w-full"
          type="button"
          onClick={onClick}
          {...buttonProps}
        >
          {content}
        </Button>
      )}
    </motion.span>
  );
}
