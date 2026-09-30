import { useLocale, useTranslations } from "next-intl";
import { GoldPillButton } from "@neamat/ui/components/brand/gold-pill-button";

/** Localized 404 inside the site chrome. */
export default function LocaleNotFound() {
  const t = useTranslations("NotFound");
  const tCommon = useTranslations("Common");
  const locale = useLocale();

  return (
    <section className="bg-surface py-20 lg:py-28">
      <div className="container-site max-w-2xl text-center">
        <p className="text-gold text-sm font-semibold tracking-[0.14em] uppercase">404</p>
        <h1 className="mt-3 text-3xl font-bold sm:text-4xl">{t("title")}</h1>
        <p className="text-body mt-4">{t("description")}</p>
        <GoldPillButton href={`/${locale}`} className="mt-8">
          {tCommon("backHome")}
        </GoldPillButton>
      </div>
    </section>
  );
}
