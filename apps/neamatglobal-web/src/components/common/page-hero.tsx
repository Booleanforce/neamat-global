import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Reveal } from "@neamat/ui/components/brand/reveal";
import { SectionEyebrow } from "@neamat/ui/components/brand/section-eyebrow";

type PageHeroProps = {
  homeHref: string;
  homeLabel: string;
  breadcrumbLabel: string;
  breadcrumb: string;
  eyebrow: string;
  title: string;
  titleHighlight: string;
  subtitle: string;
  image: { src: string; alt: string };
};

/** Inner-page hero: navy mesh, photo fading in from the end side, breadcrumb and gradient title. */
export function PageHero({
  homeHref,
  homeLabel,
  breadcrumbLabel,
  breadcrumb,
  eyebrow,
  title,
  titleHighlight,
  subtitle,
  image,
}: PageHeroProps) {
  return (
    <section aria-labelledby="page-title" className="bg-mesh-navy relative isolate overflow-hidden">
      <div className="absolute inset-y-0 end-0 -z-20 w-full lg:w-3/5">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          priority
          sizes="60vw"
          className="object-cover"
        />
        <div
          aria-hidden="true"
          className="from-navy-deep/90 to-navy-deep/70 lg:from-navy-deep lg:via-navy-deep/60 lg:to-navy-deep/20 absolute inset-0 bg-linear-to-b lg:bg-linear-to-r rtl:lg:bg-linear-to-l"
        />
      </div>
      <div aria-hidden="true" className="bg-grid-light mask-fade-b absolute inset-0 -z-10" />
      <div
        aria-hidden="true"
        className="bg-gold/25 absolute -start-32 bottom-0 -z-10 size-[420px] rounded-full blur-[110px]"
      />

      <div className="container-site py-20 lg:py-28">
        <Reveal>
          <nav aria-label={breadcrumbLabel}>
            <ol className="text-on-navy flex items-center gap-1.5 text-sm">
              <li>
                <Link href={homeHref} className="hover:text-gold">
                  {homeLabel}
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight className="size-4 rtl:-scale-x-100" />
              </li>
              <li aria-current="page" className="font-semibold text-white">
                {breadcrumb}
              </li>
            </ol>
          </nav>
        </Reveal>
        <div className="mt-8 max-w-2xl">
          <Reveal delay={0.08}>
            <SectionEyebrow tone="dark">{eyebrow}</SectionEyebrow>
          </Reveal>
          <Reveal delay={0.16}>
            <h1
              id="page-title"
              className="mt-5 text-4xl leading-[1.06] font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl"
            >
              {title} <span className="text-gradient-gold">{titleHighlight}</span>
            </h1>
          </Reveal>
          <Reveal delay={0.24}>
            <p className="text-on-navy mt-6 max-w-xl text-lg leading-relaxed">{subtitle}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
