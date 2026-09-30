import { RolePage } from "@/components/dashboard/role-page";

type PageProps = { params: Promise<{ locale: string; slug?: string[] }> };

/** Super Admin dashboard and modules (`/admin`, `/admin/dealers`, …). */
export default async function AdminPage({ params }: PageProps) {
  const { locale, slug } = await params;
  return <RolePage role="super_admin" locale={locale} slug={slug} />;
}
