import type { Metadata } from "next";
import { Suspense } from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CircleCheck, Info } from "lucide-react";
import { CareLogo } from "@neamat/ui/components/brand/care-logo";
import { LanguageToggle } from "@neamat/ui/components/brand/language-toggle";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@neamat/ui/components/ui/card";
import { LoginForm } from "@/components/auth/login-form";
import { env } from "@/config/env";
import { localeLabels, routing } from "@/i18n/routing";

type LoginPageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: LoginPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Auth" });
  return { title: t("submit") };
}

const trustItems = ["scheduled", "verified", "warranty", "history"] as const;

/** Sign-in — split layout: brand panel (navy) + form card on the light surface. */
export default async function LoginPage({ params }: LoginPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Auth");
  const tCommon = await getTranslations("Common");

  return (
    <div className="grid min-h-dvh lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
      {/* Brand panel */}
      <aside className="relative hidden flex-col justify-between overflow-hidden bg-navy-deep p-10 text-white lg:flex">
        <CareLogo href={`/${locale}/login`} tone="light" tagline={tCommon("brandTagline")} />
        <div>
          <p className="text-sm font-medium text-gold">{tCommon("partOf")}</p>
          <p className="mt-3 text-4xl leading-tight font-bold text-white">{tCommon("tagline")}</p>
          <ul className="mt-8 grid gap-3">
            {trustItems.map((item) => (
              <li key={item} className="flex items-center gap-2.5 text-sm text-on-navy">
                <CircleCheck aria-hidden="true" className="size-5 fill-success text-navy-deep" />
                {t(`trust.${item}`)}
              </li>
            ))}
          </ul>
        </div>
        <p className="text-xs text-on-navy">© {new Date().getFullYear()} NEAMAT GLOBAL</p>
        <span aria-hidden="true" className="absolute -end-24 -bottom-24 size-72 rounded-full border-[40px] border-white/5" />
      </aside>

      {/* Form */}
      <main className="flex flex-col px-4 py-6 sm:px-8">
        <div className="flex items-center justify-between gap-4">
          <CareLogo href={`/${locale}/login`} className="lg:invisible" />
          <LanguageToggle
            tone="dark"
            label={tCommon("language")}
            options={routing.locales.map((code) => ({
              code,
              label: localeLabels[code],
              href: `/${code}/login`,
              active: code === locale,
            }))}
          />
        </div>

        <div className="flex flex-1 items-center justify-center py-10">
          <Card className="w-full max-w-md gap-6 bg-white py-8 shadow-card ring-border">
            <CardHeader className="px-6 sm:px-8">
              <CardTitle className="text-2xl font-bold text-navy-deep">{t("title")}</CardTitle>
              <CardDescription className="text-body">{t("subtitle")}</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-5 px-6 sm:px-8">
              {env.demoMode && (
                <p className="flex items-start gap-2 rounded-md bg-surface px-3 py-2.5 text-xs text-body">
                  <Info aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-navy" />
                  {t("demoNotice")}
                </p>
              )}
              <Suspense>
                <LoginForm />
              </Suspense>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
