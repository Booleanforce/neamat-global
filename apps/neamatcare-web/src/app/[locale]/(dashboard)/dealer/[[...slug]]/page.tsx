import { RolePage } from "@/components/dashboard/role-page";

type PageProps = { params: Promise<{ locale: string; slug?: string[] }> };

/** Dealer dashboard and modules (`/dealer`, `/dealer/team`, …). */
export default async function DealerPage({ params }: PageProps) {
  const { locale, slug } = await params;
  return <RolePage role="dealer" locale={locale} slug={slug} />;
}
