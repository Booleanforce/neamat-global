import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { brandHex } from "@neamat/ui/lib/tokens";
import { Providers } from "@/components/providers";
import { getDirection, routing } from "@/i18n/routing";
import { fontVariables } from "@/lib/fonts";

type LocaleLayoutProps = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Omit<LocaleLayoutProps, "children">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  return {
    title: { default: t("title"), template: "%s | NEAMAT CARE" },
    description: t("description"),
    // The admin panel is private — keep it out of search indexes.
    robots: { index: false, follow: false },
  };
}

export const viewport: Viewport = {
  themeColor: brandHex.navyDeep,
  colorScheme: "light",
};

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const dir = getDirection(locale);

  return (
    // suppressHydrationWarning: browser extensions add attributes to <html> (this element only).
    <html lang={locale} dir={dir} className={fontVariables} suppressHydrationWarning>
      <body className="min-h-dvh bg-surface">
        <NextIntlClientProvider>
          <Providers dir={dir}>{children}</Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
