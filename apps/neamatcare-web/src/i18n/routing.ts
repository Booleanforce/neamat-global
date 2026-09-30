import { defineRouting } from "next-intl/routing";

/** English, Arabic (RTL) and Bangla — the three languages the plan requires for NeamatCare. */
export const routing = defineRouting({
  locales: ["en", "ar", "bn"],
  defaultLocale: "en",
  localePrefix: "always",
});

export type Locale = (typeof routing.locales)[number];

export function getDirection(locale: Locale): "ltr" | "rtl" {
  return locale === "ar" ? "rtl" : "ltr";
}

export const localeLabels: Record<Locale, string> = {
  en: "EN",
  ar: "العربية",
  bn: "বাংলা",
};
