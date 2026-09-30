import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { GoldPillButton } from "@neamat/ui/components/brand/gold-pill-button";
import { SectionEyebrow } from "@neamat/ui/components/brand/section-eyebrow";
import { placeholderPages, type PlaceholderPage } from "@/config/site";
import { routing } from "@/i18n/routing";

type PlaceholderPageProps = { params: Promise<{ locale: string; slug: string }> };

// Only the known secondary pages are generated; anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => placeholderPages.map((slug) => ({ locale, slug })));
}

function isPlaceholderPage(slug: string): slug is PlaceholderPage {
  return (placeholderPages as readonly string[]).includes(slug);
}

export async function generateMetadata({ params }: PlaceholderPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isPlaceholderPage(slug)) return {};
  const t = await getTranslations({ locale, namespace: "Placeholder" });
  return { title: t(slug) };
}

/** Secondary pages (Careers, Contact, legal…) — "coming soon" until content is supplied. */
export default async function PlaceholderPageRoute({ params }: PlaceholderPageProps) {
  const { locale, slug } = await params;
  if (!isPlaceholderPage(slug)) notFound();
  setRequestLocale(locale);

  const t = await getTranslations("Placeholder");
  const tCommon = await getTranslations("Common");

  return (
    <section className="bg-surface py-20 lg:py-28">
      <div className="container-site max-w-2xl text-center">
        <SectionEyebrow className="justify-center" trailingRule>
          {tCommon("comingSoon")}
        </SectionEyebrow>
        <h1 className="mt-4 text-3xl font-bold sm:text-4xl">{t(slug)}</h1>
        <p className="text-body mt-4">{t("description")}</p>
        <GoldPillButton href={`/${locale}`} className="mt-8">
          {tCommon("backHome")}
        </GoldPillButton>
      </div>
    </section>
  );
}
