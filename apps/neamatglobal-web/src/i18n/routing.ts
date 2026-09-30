import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "ar"],
  defaultLocale: "en",
  localePrefix: "always",
});

export type Locale = (typeof routing.locales)[number];

/** Locales rendered right-to-left. */
const RTL_LOCALES: ReadonlySet<Locale> = new Set(["ar"]);

export function getDirection(locale: Locale): "ltr" | "rtl" {
  return RTL_LOCALES.has(locale) ? "rtl" : "ltr";
}

/** Labels shown in the EN | العربية toggle, each in its own language. */
export const localeLabels: Record<Locale, string> = {
  en: "EN",
  ar: "العربية",
};
