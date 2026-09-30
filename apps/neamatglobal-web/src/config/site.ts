/** Site-wide constants. Public URLs come from env so staging/prod can differ. */
export const siteConfig = {
  name: "NEAMAT GLOBAL",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://neamatglobal.com",
  careUrl: process.env.NEXT_PUBLIC_CARE_URL ?? "https://neamatcare.com",
} as const;

/** In-page section anchors (ids on the home page). */
export const sections = {
  businesses: "businesses",
  about: "about",
  care: "neamat-care",
  presence: "presence",
  news: "news",
} as const;

/**
 * Pages that render the "coming soon" template until the client signs off on their content.
 * Only Home and About are published. The home-page sections for businesses / presence / news stay
 * in place; to publish a dedicated page, build its route and drop its slug from this list.
 */
export const placeholderPages = [
  "businesses",
  "global-presence",
  "news",
  "neamat-care",
  "careers",
  "contact",
  "help",
  "support",
  "privacy",
  "terms",
] as const;
export type PlaceholderPage = (typeof placeholderPages)[number];

/**
 * Where NEAMAT CARE links go: its "coming soon" page while `neamat-care` is a placeholder, and the
 * product site (`siteConfig.careUrl`, opened in a new tab) once that slug is removed.
 */
export const careComingSoon = (placeholderPages as readonly string[]).includes("neamat-care");

export function careHref(locale: string) {
  return careComingSoon ? `/${locale}/neamat-care` : siteConfig.careUrl;
}
