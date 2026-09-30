import Link from "next/link";
import { Fragment } from "react";
import { Separator } from "@neamat/ui/components/ui/separator";
import type { LanguageOption } from "@neamat/ui/lib/types";
import { cn } from "@neamat/ui/lib/utils";

type LanguageToggleProps = {
  options: LanguageOption[];
  /** Accessible name for the group, e.g. "Language". */
  label: string;
  tone?: "light" | "dark";
  className?: string;
};

/**
 * EN | العربية switch. Each option is a real link to the same page in the other locale, so the
 * locale and the document direction (`dir`) switch together on navigation.
 */
export function LanguageToggle({ options, label, tone = "light", className }: LanguageToggleProps) {
  const idle = tone === "light" ? "text-on-navy hover:text-white" : "text-muted-text hover:text-navy";
  const current = tone === "light" ? "text-white" : "text-navy-deep";

  return (
    <nav aria-label={label} className={cn("flex items-center gap-1 text-[13px]", className)}>
      {options.map((option, index) => (
        <Fragment key={option.code}>
          {index > 0 && (
            <Separator
              orientation="vertical"
              className={cn("h-3.5", tone === "light" ? "bg-white/30" : "bg-border")}
            />
          )}
          <Link
            href={option.href}
            hrefLang={option.code}
            lang={option.code}
            aria-current={option.active ? "true" : undefined}
            className={cn(
              "inline-flex min-h-11 min-w-9 items-center justify-center rounded-sm px-1.5 font-medium transition-colors",
              option.active ? cn(current, "font-semibold") : idle,
            )}
          >
            {option.label}
          </Link>
        </Fragment>
      ))}
    </nav>
  );
}
