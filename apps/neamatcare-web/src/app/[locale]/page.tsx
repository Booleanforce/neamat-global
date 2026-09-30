import { redirect } from "next/navigation";
import { ROLE_HOME } from "@/lib/auth/roles";
import { getSession } from "@/lib/auth/session";

type PageProps = { params: Promise<{ locale: string }> };

/** `/[locale]` → the signed-in user's dashboard, or the login page (proxy.ts does the same earlier). */
export default async function LocaleRoot({ params }: PageProps) {
  const { locale } = await params;
  const session = await getSession();
  redirect(session ? `/${locale}${ROLE_HOME[session.user.role]}` : `/${locale}/login`);
}
