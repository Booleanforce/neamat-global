import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { brandHex } from "@neamat/ui/lib/tokens";
import { Providers } from "@/components/providers";
import { SiteChat } from "@/components/layout/site-chat";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteSearch } from "@/components/layout/site-search";
import { siteConfig } from "@/config/site";
import { getDirection, routing } from "@/i18n/routing";
import { fontVariables } from "@/lib/fonts";

type LocaleLayoutProps = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: Omit<LocaleLayoutProps, "children">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    metadataBase: new URL(siteConfig.url),
    title: { default: t("title"), template: `%s | ${siteConfig.name}` },
    description: t("description"),
    alternates: {
      canonical: `/${locale}`,
      languages: Object.fromEntries(routing.locales.map((code) => [code, `/${code}`])),
    },
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      title: t("title"),
      description: t("description"),
      locale,
      images: [{ url: "/images/hero/riyadh-skyline.webp", width: 1920, height: 1280 }],
    },
  };
}

export const viewport: Viewport = {
  themeColor: brandHex.navyDeep,
  colorScheme: "light",
};

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  // Enables static rendering for this locale.
  setRequestLocale(locale);
  const t = await getTranslations("Common");

  return (
    // suppressHydrationWarning: browser extensions add attributes to <html> (this element only).
    <html
      lang={locale}
      dir={getDirection(locale)}
      className={fontVariables}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body className="flex min-h-dvh flex-col">
        <NextIntlClientProvider>
          <Providers>
            <a
              href="#main"
              className="bg-gold text-navy-deep sr-only z-[60] rounded-full px-5 py-3 font-semibold focus:not-sr-only focus:fixed focus:start-4 focus:top-4"
            >
              {t("skipToContent")}
            </a>
            <SiteHeader />
            <main id="main" className="flex-1">
              {children}
            </main>
            <SiteFooter />
            <SiteChat />
            <SiteSearch />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
