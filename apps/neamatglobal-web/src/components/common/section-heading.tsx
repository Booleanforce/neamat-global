import type { ReactNode } from "react";
import { SectionEyebrow } from "@neamat/ui/components/brand/section-eyebrow";
import { Reveal } from "@neamat/ui/components/brand/reveal";
import { cn } from "@neamat/ui/lib/utils";

type SectionHeadingProps = {
  id: string;
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  tone?: "light" | "dark";
  align?: "start" | "center";
  /** Rendered beside the heading on large screens (e.g. a CTA). */
  aside?: ReactNode;
  className?: string;
};

/** Consistent section header: eyebrow pill, bold title, supporting copy, optional aside. */
export function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  tone = "light",
  align = "start",
  aside,
  className,
}: SectionHeadingProps) {
  const centered = align === "center";
  return (
    <div
      className={cn(
        "flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between",
        centered && "items-center text-center lg:flex-col lg:items-center",
        className,
      )}
    >
      <Reveal className={cn("max-w-2xl", centered && "flex flex-col items-center")}>
        <SectionEyebrow tone={tone}>{eyebrow}</SectionEyebrow>
        <h2
          id={id}
          className={cn(
            "mt-4 text-3xl leading-[1.12] font-extrabold tracking-tight sm:text-4xl lg:text-[44px]",
            tone === "dark" ? "text-white" : "text-navy-deep",
          )}
        >
          {title}
        </h2>
        {description && (
          <p
            className={cn(
              "mt-4 max-w-xl text-base leading-relaxed",
              tone === "dark" ? "text-on-navy" : "text-body",
            )}
          >
            {description}
          </p>
        )}
      </Reveal>
      {aside && <Reveal delay={0.1}>{aside}</Reveal>}
    </div>
  );
}
