import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Reveal } from "@neamat/ui/components/brand/reveal";
import { SectionEyebrow } from "@neamat/ui/components/brand/section-eyebrow";

/** About page — Our Story: image collage with floating stat badge + narrative copy. */
export async function StorySection() {
  const t = await getTranslations("AboutPage.story");
  const tHero = await getTranslations("Hero");
  const tPresence = await getTranslations("Presence.markets");

  return (
    <section
      aria-labelledby="story-title"
      className="bg-mesh-light relative isolate overflow-hidden py-20 lg:py-28"
    >
      <div
        aria-hidden="true"
        className="bg-grid-navy mask-fade-b absolute inset-0 -z-10 opacity-50"
      />
      <div className="container-site grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <Reveal direction="start" className="relative">
          <div className="grid grid-cols-5 gap-4">
            <div className="shadow-elevated relative col-span-3 aspect-[3/4] overflow-hidden rounded-[1.75rem]">
              <Image
                src="/images/hero/riyadh-skyline.webp"
                alt={tHero("imageAlt")}
                fill
                sizes="(min-width: 1024px) 30vw, 60vw"
                className="object-cover object-[65%_50%]"
              />
            </div>
            <div className="col-span-2 flex flex-col gap-4 pt-12">
              <div className="shadow-elevated relative aspect-[3/4] overflow-hidden rounded-[1.75rem]">
                <Image
                  src="/images/presence/bangladesh.webp"
                  alt={tPresence("bangladesh.imageAlt")}
                  fill
                  sizes="(min-width: 1024px) 20vw, 40vw"
                  className="object-cover"
                />
              </div>
              <div aria-hidden="true" className="bg-dots-gold h-24 rounded-[1.75rem]" />
            </div>
          </div>

          <div className="animate-float-slow shadow-elevated ring-border absolute start-6 -bottom-6 flex items-center gap-4 rounded-2xl bg-white p-4 pe-6 ring-1 motion-reduce:animate-none">
            <span className="bg-gold text-navy-deep shadow-glow-gold grid size-14 place-items-center rounded-xl text-3xl font-extrabold">
              {t("badgeValue")}
            </span>
            <span className="text-navy-deep max-w-40 text-sm leading-snug font-semibold">
              {t("badgeLabel")}
            </span>
          </div>
        </Reveal>

        <Reveal direction="end">
          <SectionEyebrow>{t("eyebrow")}</SectionEyebrow>
          <h2
            id="story-title"
            className="text-navy-deep mt-4 text-3xl leading-[1.12] font-extrabold tracking-tight sm:text-4xl lg:text-[44px]"
          >
            {t("title")}
          </h2>
          <div className="text-body mt-6 grid gap-4 text-base leading-relaxed">
            <p>{t("p1")}</p>
            <p>{t("p2")}</p>
          </div>
          <div
            aria-hidden="true"
            className="from-gold to-navy-bright mt-8 h-1 w-24 rounded-full bg-linear-to-r"
          />
        </Reveal>
      </div>
    </section>
  );
}
