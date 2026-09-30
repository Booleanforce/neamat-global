import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@neamat/ui/components/ui/badge";
import { Button } from "@neamat/ui/components/ui/button";
import { Card, CardContent } from "@neamat/ui/components/ui/card";
import type { NavItem } from "@/config/navigation";
import { ROLE_HOME, type Role } from "@/lib/auth/roles";

/** Empty state for a module whose screens ship in a later build step. */
export async function ModulePlaceholder({ role, item }: { role: Role; item: NavItem }) {
  const t = await getTranslations("Placeholder");
  const tNav = await getTranslations("Nav");
  const locale = await getLocale();
  const Icon = item.icon;
  const moduleName = tNav(`items.${item.key}`);

  return (
    <div className="grid gap-6">
      <h1 className="text-2xl font-bold sm:text-3xl">{moduleName}</h1>
      <Card className="items-center bg-white py-14 text-center shadow-card ring-border">
        <CardContent className="grid max-w-lg justify-items-center gap-4 px-6">
          <span className="grid size-16 place-items-center rounded-2xl bg-surface text-navy">
            <Icon aria-hidden="true" className="size-8" />
          </span>
          <Badge className="bg-gold text-navy-deep">{t("badge", { phase: item.phase })}</Badge>
          <h2 className="text-xl font-bold">{t("title", { module: moduleName })}</h2>
          <p className="text-sm text-body">{t("description")}</p>
          <Button asChild variant="outline-navy" size="pill" className="mt-2">
            <Link href={`/${locale}${ROLE_HOME[role]}`}>
              <ArrowLeft aria-hidden="true" className="rtl:-scale-x-100" />
              {t("back")}
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
