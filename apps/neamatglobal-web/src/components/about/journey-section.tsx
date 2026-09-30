import { getTranslations } from "next-intl/server";
import { SectionHeading } from "@/components/common/section-heading";
import { journeyKeys } from "@/content/about";
import { JourneyTimeline } from "./journey-timeline";

/** About page — Our Journey: dark chapter with the animated milestone timeline. */
export async function JourneySection() {
  const t = await getTranslations("AboutPage.journey");

  return (
    <section
      aria-labelledby="journey-title"
      className="bg-mesh-navy relative isolate overflow-hidden py-20 lg:py-28"
    >
      <div aria-hidden="true" className="bg-grid-light mask-fade-b absolute inset-0 -z-10" />
      <div className="container-site">
        <SectionHeading
          id="journey-title"
          tone="dark"
          align="center"
          eyebrow={t("eyebrow")}
          title={t("title")}
        />
        <JourneyTimeline
          items={journeyKeys.map((key) => ({
            key,
            label: t(`items.${key}.label`),
            title: t(`items.${key}.title`),
            text: t(`items.${key}.text`),
          }))}
        />
      </div>
    </section>
  );
}
