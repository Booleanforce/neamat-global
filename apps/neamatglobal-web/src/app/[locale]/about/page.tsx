import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { JourneySection } from "@/components/about/journey-section";
import { PillarsSection } from "@/components/about/pillars-section";
import { StorySection } from "@/components/about/story-section";
import { ValuesSection } from "@/components/about/values-section";
import { PageHero } from "@/components/common/page-hero";
import { CtaBand } from "@/components/sections/cta-band";
import { GlobalPresence } from "@/components/sections/global-presence";
import { OurBusinesses } from "@/components/sections/our-businesses";
import { routing } from "@/i18n/routing";

type AboutPageProps = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: AboutPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "AboutPage" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      canonical: `/${locale}/about`,
      languages: Object.fromEntries(routing.locales.map((code) => [code, `/${code}/about`])),
    },
  };
}

/** About Us — story, mission/vision/promise, values, journey, companies, presence, CTA. */
export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("AboutPage");
  const tCommon = await getTranslations("Common");
  const tAbout = await getTranslations("About");

  return (
    <>
      <PageHero
        homeHref={`/${locale}`}
        homeLabel={tCommon("home")}
        breadcrumbLabel={tCommon("breadcrumb")}
        breadcrumb={t("breadcrumb")}
        eyebrow={t("eyebrow")}
        title={t("title")}
        titleHighlight={t("titleHighlight")}
        subtitle={t("subtitle")}
        image={{ src: "/images/about/headquarters.webp", alt: tAbout("imageAlt") }}
      />
      <StorySection />
      <PillarsSection />
      <ValuesSection />
      <JourneySection />
      <OurBusinesses id="companies" eyebrow={t("units.eyebrow")} title={t("units.title")} />
      <GlobalPresence />
      <CtaBand />
    </>
  );
}
