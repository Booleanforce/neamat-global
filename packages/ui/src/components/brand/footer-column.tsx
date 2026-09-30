import Link from "next/link";
import type { FooterLinkGroup } from "@neamat/ui/lib/types";
import { cn } from "@neamat/ui/lib/utils";

/** Footer link column: small white heading + muted links. */
export function FooterColumn({ title, links, className }: FooterLinkGroup & { className?: string }) {
  return (
    <nav aria-label={title} className={cn("min-w-0", className)}>
      <h2 className="text-[13px] font-semibold text-white">{title}</h2>
      <ul className="mt-3 grid gap-0.5">
        {links.map((link) => (
          <li key={link.href + link.label}>
            <Link
              href={link.href}
              className="inline-flex min-h-8 items-center text-xs text-on-navy transition-colors hover:text-gold"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
