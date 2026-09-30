import { getTranslations } from "next-intl/server";
import { Handshake, Leaf, Lightbulb, ShieldCheck, Trophy, UsersRound } from "lucide-react";
import { Stagger, StaggerItem } from "@neamat/ui/components/brand/reveal";
import { cn } from "@neamat/ui/lib/utils";
import { SectionHeading } from "@/components/common/section-heading";

const values = [
  { key: "trust", icon: Handshake, tile: "bg-navy/10 text-navy ring-navy/20" },
  { key: "innovation", icon: Lightbulb, tile: "bg-gold/20 text-gold-deep ring-gold/35" },
  {
    key: "people",
    icon: UsersRound,
    tile: "bg-unit-neopure/12 text-unit-neopure ring-unit-neopure/25",
  },
  {
    key: "excellence",
    icon: Trophy,
    tile: "bg-unit-booleanforce/12 text-unit-booleanforce ring-unit-booleanforce/25",
  },
  {
    key: "sustainability",
    icon: Leaf,
    tile: "bg-unit-neamatcare/12 text-unit-neamatcare ring-unit-neamatcare/25",
  },
  {
    key: "integrity",
    icon: ShieldCheck,
    tile: "bg-unit-propertyos/12 text-unit-propertyos ring-unit-propertyos/25",
  },
] as const;

/** About page — six values in a bento-style grid with tinted icon tiles. */
export async function ValuesSection() {
  const t = await getTranslations("AboutPage.values");

  return (
    <section
      aria-labelledby="values-title"
      className="bg-mesh-light relative isolate overflow-hidden py-20 lg:py-28"
    >
      <div
        aria-hidden="true"
        className="bg-dots-gold absolute -start-24 top-1/3 -z-10 size-72 rounded-full opacity-50"
      />
      <div className="container-site">
        <SectionHeading
          id="values-title"
          align="center"
          eyebrow={t("eyebrow")}
          title={t("title")}
        />

        <Stagger as="ul" className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {values.map(({ key, icon: Icon, tile }, index) => (
            <StaggerItem as="li" key={key}>
              <article className="group shadow-card ring-border hover:shadow-elevated relative h-full rounded-2xl bg-white p-7 ring-1 transition-[transform,box-shadow,background-color,color] duration-300 hover:-translate-y-1">
                <span
                  aria-hidden="true"
                  className="text-navy/5 absolute end-6 top-5 text-4xl font-black"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span
                  className={cn(
                    "grid size-12 place-items-center rounded-xl ring-1 transition-transform duration-300 group-hover:scale-110",
                    tile,
                  )}
                >
                  <Icon aria-hidden="true" className="size-6" />
                </span>
                <h3 className="text-navy-deep mt-5 text-lg font-bold">{t(`items.${key}.title`)}</h3>
                <p className="text-body mt-2 text-sm leading-relaxed">{t(`items.${key}.text`)}</p>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
