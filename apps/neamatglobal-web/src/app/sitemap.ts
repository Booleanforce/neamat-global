import type { MetadataRoute } from "next";
import { placeholderPages, siteConfig } from "@/config/site";
import { routing } from "@/i18n/routing";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/about", ...placeholderPages.map((slug) => `/${slug}`)];

  return paths.map((path) => ({
    url: `${siteConfig.url}/${routing.defaultLocale}${path}`,
    alternates: {
      languages: Object.fromEntries(
        routing.locales.map((locale) => [locale, `${siteConfig.url}/${locale}${path}`]),
      ),
    },
  }));
}
