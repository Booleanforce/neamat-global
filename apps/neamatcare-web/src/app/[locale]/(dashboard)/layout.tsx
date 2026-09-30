import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import { getTranslations } from "next-intl/server";
import { SidebarInset, SidebarProvider } from "@neamat/ui/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { AppTopbar } from "@/components/layout/app-topbar";
import { getDirection, type Locale } from "@/i18n/routing";
import { getSession } from "@/lib/auth/session";

type DashboardLayoutProps = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

/** Authenticated shell shared by all three roles (proxy.ts already enforces role prefixes). */
export default async function DashboardLayout({ children, params }: DashboardLayoutProps) {
  const { locale } = await params;
  const session = await getSession();
  if (!session) redirect(`/${locale}/login`);

  const t = await getTranslations("Common");
  const dir = getDirection(locale as Locale);

  return (
    <SidebarProvider>
      <a
        href="#dashboard-main"
        className="sr-only z-[60] rounded-full bg-gold px-5 py-3 font-semibold text-navy-deep focus:not-sr-only focus:fixed focus:start-4 focus:top-4"
      >
        {t("skipToContent")}
      </a>
      <AppSidebar role={session.user.role} dir={dir} />
      <SidebarInset className="bg-surface">
        <AppTopbar user={session.user} />
        <main id="dashboard-main" className="flex-1 p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
