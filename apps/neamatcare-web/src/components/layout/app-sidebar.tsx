"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { CareLogo } from "@neamat/ui/components/brand/care-logo";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@neamat/ui/components/ui/sidebar";
import { navigation } from "@/config/navigation";
import { usePathname } from "@/i18n/navigation";
import { ROLE_HOME, type Role } from "@/lib/auth/roles";

/** Role-aware navy sidebar (shadcn Sidebar): groups and items come from `config/navigation`. */
export function AppSidebar({ role, dir }: { role: Role; dir: "ltr" | "rtl" }) {
  const t = useTranslations("Nav");
  const tCommon = useTranslations("Common");
  const tRoles = useTranslations("Roles");
  const locale = useLocale();
  const pathname = usePathname();
  const { isMobile, setOpenMobile } = useSidebar();
  const base = ROLE_HOME[role];

  return (
    <Sidebar side={dir === "rtl" ? "right" : "left"} collapsible="icon" aria-label={t("label")}>
      <SidebarHeader className="border-b border-sidebar-border px-3 py-4">
        <CareLogo href={`/${locale}${base}`} tone="light" className="group-data-[collapsible=icon]:hidden" />
        <span className="mt-2 w-fit rounded-full bg-sidebar-accent px-2.5 py-0.5 text-[11px] font-semibold text-gold group-data-[collapsible=icon]:hidden">
          {tRoles(role)}
        </span>
      </SidebarHeader>

      <SidebarContent>
        {navigation[role].map((group) => (
          <SidebarGroup key={group.key}>
            <SidebarGroupLabel className="text-on-navy/70">{t(`groups.${group.key}`)}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => {
                    const href = item.slug ? `${base}/${item.slug}` : base;
                    const active = pathname === href;
                    const Icon = item.icon;
                    return (
                      <SidebarMenuItem key={item.key}>
                        <SidebarMenuButton
                          asChild
                          isActive={active}
                          tooltip={t(`items.${item.key}`)}
                          className="min-h-10 data-[active=true]:bg-sidebar-accent data-[active=true]:text-white data-[active=true]:shadow-[inset_3px_0_0_var(--sidebar-primary)] rtl:data-[active=true]:shadow-[inset_-3px_0_0_var(--sidebar-primary)]"
                        >
                          <Link
                            href={`/${locale}${href}`}
                            aria-current={active ? "page" : undefined}
                            onClick={() => isMobile && setOpenMobile(false)}
                          >
                            <Icon />
                            <span>{t(`items.${item.key}`)}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border px-4 py-3 text-[11px] text-on-navy/70 group-data-[collapsible=icon]:hidden">
        {tCommon("partOf")}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
