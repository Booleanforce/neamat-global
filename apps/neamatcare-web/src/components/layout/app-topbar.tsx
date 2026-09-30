"use client";

import { signOut } from "next-auth/react";
import { useLocale, useTranslations } from "next-intl";
import { ExternalLink, LogOut, MapPin } from "lucide-react";
import { LanguageToggle } from "@neamat/ui/components/brand/language-toggle";
import { Avatar, AvatarFallback } from "@neamat/ui/components/ui/avatar";
import { Button } from "@neamat/ui/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@neamat/ui/components/ui/dropdown-menu";
import { Separator } from "@neamat/ui/components/ui/separator";
import { SidebarTrigger } from "@neamat/ui/components/ui/sidebar";
import { env } from "@/config/env";
import { usePathname } from "@/i18n/navigation";
import { localeLabels, routing } from "@/i18n/routing";
import type { Role } from "@/lib/auth/roles";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setOnDuty, setShareLocation } from "@/store/slices/preferences-slice";

type AppTopbarProps = {
  user: { name?: string | null; email?: string | null; role: Role };
};

function initials(name?: string | null) {
  return (name ?? "NC")
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

/** Dashboard top bar: sidebar toggle, duty/location toggles (technicians), language switch, account menu. */
export function AppTopbar({ user }: AppTopbarProps) {
  const t = useTranslations("Topbar");
  const tCommon = useTranslations("Common");
  const tRoles = useTranslations("Roles");
  const locale = useLocale();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const { onDuty, shareLocation } = useAppSelector((state) => state.preferences);

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-2 border-b border-border bg-white/95 px-3 backdrop-blur-sm sm:px-5">
      <SidebarTrigger aria-label={t("toggleSidebar")} className="size-10 text-navy-deep" />
      <Separator orientation="vertical" className="mx-1 h-6" />

      {user.role === "technician" && (
        <div className="flex items-center gap-1.5">
          <Button
            variant={onDuty ? "gold" : "outline"}
            size="sm"
            aria-pressed={onDuty}
            onClick={() => dispatch(setOnDuty(!onDuty))}
            className="h-9 rounded-full px-3"
          >
            <span aria-hidden="true" className={onDuty ? "size-2 rounded-full bg-success" : "size-2 rounded-full bg-muted-text"} />
            {onDuty ? t("onDuty") : t("offDuty")}
          </Button>
          <Button
            variant={shareLocation ? "secondary" : "ghost"}
            size="icon"
            aria-pressed={shareLocation}
            aria-label={t("locationSharing")}
            disabled={!onDuty}
            onClick={() => dispatch(setShareLocation(!shareLocation))}
            className="size-9 rounded-full"
          >
            <MapPin />
          </Button>
        </div>
      )}

      <div className="ms-auto flex items-center gap-2">
        <LanguageToggle
          tone="dark"
          label={tCommon("language")}
          className="hidden sm:flex"
          options={routing.locales.map((code) => ({
            code,
            label: localeLabels[code],
            href: `/${code}${pathname}`,
            active: code === locale,
          }))}
        />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-11 gap-2 rounded-full px-1.5 sm:pe-3" aria-label={t("account")}>
              <Avatar className="size-8">
                <AvatarFallback className="bg-navy text-xs font-semibold text-white">
                  {initials(user.name)}
                </AvatarFallback>
              </Avatar>
              <span className="hidden text-start leading-tight sm:block">
                <span className="block text-sm font-semibold text-navy-deep">{user.name}</span>
                <span className="block text-[11px] text-muted-text">{tRoles(user.role)}</span>
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-60">
            <DropdownMenuLabel className="font-normal">
              <span className="block text-sm font-semibold text-navy-deep">{user.name}</span>
              <span className="block truncate text-xs text-muted-text">{user.email}</span>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup className="sm:hidden">
              {routing.locales.map((code) => (
                <DropdownMenuItem key={code} asChild>
                  <a href={`/${code}${pathname}`} lang={code} aria-current={code === locale ? "true" : undefined}>
                    {localeLabels[code]}
                  </a>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
            </DropdownMenuGroup>
            <DropdownMenuItem asChild>
              <a href={env.globalSiteUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink />
                {t("visitGlobal")}
              </a>
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => signOut({ callbackUrl: `/${locale}/login` })}>
              <LogOut />
              {t("signOut")}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
