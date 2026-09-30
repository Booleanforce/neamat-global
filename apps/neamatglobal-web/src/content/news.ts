/**
 * Latest News & Insights. Titles/alt text live in messages (`News.items.<key>`).
 * Replace with a CMS query (e.g. fetch in the page with ISR) when the marketing CMS is ready.
 */
export type NewsKey = "neopure" | "booleanforce" | "neamatcare" | "propertyos";

export type NewsItem = {
  key: NewsKey;
  /** ISO publication date. */
  date: string;
  image: string;
  slug: string;
};

export const newsItems: NewsItem[] = [
  {
    key: "neopure",
    date: "2026-08-15",
    image: "/images/news/neopure-purifier.webp",
    slug: "neapure-next-gen-purifier-series",
  },
  {
    key: "booleanforce",
    date: "2026-08-05",
    image: "/images/news/booleanforce-award.webp",
    slug: "booleanforce-digital-innovation-award",
  },
  {
    key: "neamatcare",
    date: "2026-07-28",
    image: "/images/news/neamat-care-riyadh.webp",
    slug: "neamat-care-riyadh-service-center",
  },
  {
    key: "propertyos",
    date: "2026-07-15",
    image: "/images/news/propertyos-partnership.webp",
    slug: "propertyos-strategic-partnership",
  },
];
