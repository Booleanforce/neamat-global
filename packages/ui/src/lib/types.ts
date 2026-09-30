/** Shared prop contracts for brand components. Apps pass already-localised strings and hrefs. */

export type NavLink = {
  label: string;
  href: string;
  /** Optional dropdown entries (e.g. "Our Businesses"). */
  children?: NavChild[];
};

export type NavChild = {
  label: string;
  href: string;
  description?: string;
};

export type LanguageOption = {
  /** BCP-47 code, e.g. "en", "ar", "bn". */
  code: string;
  /** Label in its own language, e.g. "EN", "العربية". */
  label: string;
  href: string;
  active: boolean;
};

export type CtaLink = {
  label: string;
  href: string;
};

export type FooterLinkGroup = {
  title: string;
  links: { label: string; href: string }[];
};

export type SocialPlatform = "linkedin" | "youtube" | "x" | "instagram";

export type SocialLink = {
  platform: SocialPlatform;
  href: string;
  label: string;
};
