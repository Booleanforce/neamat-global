import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@neamat/ui/lib/utils";

type TextLinkProps = {
  href: string;
  children: ReactNode;
  /** Extra context for screen readers, e.g. the card title ("Learn more about NeoPure"). */
  srContext?: string;
  tone?: "dark" | "light";
  className?: string;
};

/** "Learn More →" / "Read More →" inline link with a right-aligned arrow that flips in RTL. */
export function TextLink({ href, children, srContext, tone = "dark", className }: TextLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group/link inline-flex min-h-11 items-center gap-2 text-[13px] font-semibold",
        tone === "dark" ? "text-navy-deep hover:text-navy" : "text-white hover:text-gold",
        className,
      )}
    >
      <span>
        {children}
        {srContext && <span className="sr-only"> — {srContext}</span>}
      </span>
      <ArrowRight
        aria-hidden="true"
        className="size-4 transition-transform group-hover/link:translate-x-0.5 rtl:-scale-x-100 rtl:group-hover/link:-translate-x-0.5"
      />
    </Link>
  );
}
