import { RolePage } from "@/components/dashboard/role-page";

type PageProps = { params: Promise<{ locale: string; slug?: string[] }> };

/** Technician workspace (mobile-first; `/technician`, `/technician/jobs`, …). */
export default async function TechnicianPage({ params }: PageProps) {
  const { locale, slug } = await params;
  return <RolePage role="technician" locale={locale} slug={slug} />;
}
