import { setRequestLocale } from "next-intl/server";
import { About } from "@/components/sections/about";
import { CtaBand } from "@/components/sections/cta-band";
import { FeaturedCare } from "@/components/sections/featured-care";
import { GlobalPresence } from "@/components/sections/global-presence";
import { Hero } from "@/components/sections/hero";
import { LatestNews } from "@/components/sections/latest-news";
import { OurBusinesses } from "@/components/sections/our-businesses";

type HomePageProps = { params: Promise<{ locale: string }> };

/** neamatglobal.com home — the 8-section page from the supplied design (header/footer in layout). */
export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <OurBusinesses />
      <About />
      <FeaturedCare />
      <GlobalPresence />
      <LatestNews />
      <CtaBand />
    </>
  );
}
