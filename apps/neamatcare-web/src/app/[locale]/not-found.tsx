import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { Button } from "@neamat/ui/components/ui/button";

/** Localized 404 (unknown module or route). */
export default function LocaleNotFound() {
  const t = useTranslations("NotFound");
  const locale = useLocale();

  return (
    <main className="grid min-h-[60dvh] place-items-center p-6 text-center">
      <div className="max-w-md">
        <p className="text-sm font-semibold tracking-[0.14em] text-gold uppercase">404</p>
        <h1 className="mt-2 text-3xl font-bold">{t("title")}</h1>
        <p className="mt-3 text-body">{t("description")}</p>
        <Button asChild variant="gold" size="pill" className="mt-6">
          <Link href={`/${locale}`}>{t("back")}</Link>
        </Button>
      </div>
    </main>
  );
}
