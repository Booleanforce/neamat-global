import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";
import { Building2, Droplet, Hotel, House } from "lucide-react";
import { Badge } from "@neamat/ui/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@neamat/ui/components/ui/card";
import { cn } from "@neamat/ui/lib/utils";
import { navigation } from "@/config/navigation";
import { ROLE_HOME, type Role } from "@/lib/auth/roles";

const categories = [
  { key: "water", icon: Droplet, className: "text-unit-neopure" },
  { key: "home", icon: House, className: "text-navy" },
  { key: "property", icon: Hotel, className: "text-navy" },
  { key: "facility", icon: Building2, className: "text-navy" },
] as const;

const stats = ["openJobs", "activeTechnicians", "completedToday", "avgRating"] as const;

/** Overview shell per role: KPI cards (empty until the API connects), categories and module shortcuts. */
export async function RoleOverview({ role, name }: { role: Role; name: string }) {
  const t = await getTranslations("Dashboard");
  const tNav = await getTranslations("Nav");
  const locale = await getLocale();
  const modules = navigation[role].flatMap((group) => group.items).filter((item) => item.slug);

  return (
    <div className="grid gap-8">
      <header>
        <h1 className="text-2xl font-bold sm:text-3xl">{t("welcome", { name })}</h1>
        <p className="mt-1 text-sm text-body">{t("overviewSubtitle")}</p>
      </header>

      <section aria-label={t("modulesTitle")} className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat} className="gap-2 bg-white py-5 shadow-card ring-border">
            <CardHeader className="px-5">
              <CardDescription className="text-body">{t(`stats.${stat}`)}</CardDescription>
              <CardTitle className="text-3xl font-bold text-navy-deep">—</CardTitle>
            </CardHeader>
            <CardContent className="px-5 text-xs text-muted-text">{t("noData")}</CardContent>
          </Card>
        ))}
      </section>

      <section aria-labelledby="categories-title">
        <h2 id="categories-title" className="text-lg font-bold">
          {t("categories.title")}
        </h2>
        <ul className="mt-3 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {categories.map(({ key, icon: Icon, className }) => (
            <li key={key}>
              <Card className="flex-row items-center gap-3 bg-white px-5 py-4 shadow-card ring-border">
                <Icon aria-hidden="true" className={cn("size-7", className)} />
                <span className="font-semibold text-navy-deep">{t(`categories.${key}`)}</span>
              </Card>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="modules-title">
        <h2 id="modules-title" className="text-lg font-bold">
          {t("modulesTitle")}
        </h2>
        <ul className="mt-3 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {modules.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.key}>
                <Link
                  href={`/${locale}${ROLE_HOME[role]}/${item.slug}`}
                  className="flex min-h-14 items-center gap-3 rounded-xl bg-white px-4 py-3 shadow-card ring-1 ring-border transition-shadow hover:shadow-card-hover"
                >
                  <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-surface text-navy">
                    <Icon aria-hidden="true" className="size-5" />
                  </span>
                  <span className="flex-1 font-medium text-navy-deep">{tNav(`items.${item.key}`)}</span>
                  <Badge variant="outline" className="border-border text-muted-text">
                    P{item.phase}
                  </Badge>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
