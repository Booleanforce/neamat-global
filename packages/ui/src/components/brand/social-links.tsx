import type { SocialLink, SocialPlatform } from "@neamat/ui/lib/types";
import { cn } from "@neamat/ui/lib/utils";

/** Brand glyphs (lucide v1 no longer ships brand icons). Paths use currentColor. */
const icons: Record<SocialPlatform, React.ReactNode> = {
  linkedin: (
    <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4v11H3v-11Zm6.5 0h3.8v1.5h.05c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.78 2.55 4.78 5.87v5.58h-4v-4.95c0-1.18-.02-2.7-1.7-2.7-1.7 0-1.95 1.28-1.95 2.61v5.04h-4v-11Z" />
  ),
  youtube: (
    <path d="M21.6 7.2a2.5 2.5 0 0 0-1.76-1.77C18.3 5 12 5 12 5s-6.3 0-7.84.43A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.76 1.77C5.7 19 12 19 12 19s6.3 0 7.84-.43a2.5 2.5 0 0 0 1.76-1.77A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8ZM10 15V9l5.2 3L10 15Z" />
  ),
  x: (
    <path d="M17.75 3h3.07l-6.72 7.68L22 21h-6.19l-4.85-6.34L5.4 21H2.33l7.19-8.21L2 3h6.35l4.38 5.8L17.75 3Zm-1.08 16.18h1.7L7.4 4.73H5.57l11.1 14.45Z" />
  ),
  instagram: (
    <path d="M12 7.2a4.8 4.8 0 1 0 0 9.6 4.8 4.8 0 0 0 0-9.6Zm0 7.9a3.1 3.1 0 1 1 0-6.2 3.1 3.1 0 0 1 0 6.2Zm6.1-8.1a1.12 1.12 0 1 1-2.24 0 1.12 1.12 0 0 1 2.24 0ZM21.9 8.1c-.07-1.5-.41-2.83-1.51-3.92-1.09-1.1-2.42-1.44-3.92-1.51C14.93 2.58 9.07 2.58 7.53 2.67c-1.5.07-2.82.41-3.92 1.5C2.5 5.28 2.17 6.6 2.1 8.1c-.09 1.55-.09 6.2 0 7.8.07 1.5.41 2.83 1.51 3.92 1.1 1.1 2.42 1.44 3.92 1.51 1.54.09 7.4.09 8.94 0 1.5-.07 2.83-.41 3.92-1.51 1.1-1.09 1.44-2.42 1.51-3.92.09-1.55.09-6.24 0-7.8Z" />
  ),
};

type SocialLinksProps = {
  links: SocialLink[];
  className?: string;
};

/** Follow Us icon row — each icon is a labelled ≥44px link opening in a new tab. */
export function SocialLinks({ links, className }: SocialLinksProps) {
  return (
    <ul className={cn("flex items-center gap-1", className)}>
      {links.map((link) => (
        <li key={link.platform}>
          <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.label}
            className="grid size-11 place-items-center rounded-full text-white transition-colors hover:bg-white/10 hover:text-gold"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" className="size-[18px] fill-current">
              {icons[link.platform]}
            </svg>
          </a>
        </li>
      ))}
    </ul>
  );
}
