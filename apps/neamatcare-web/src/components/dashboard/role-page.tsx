import { notFound, redirect } from "next/navigation";
import { findNavItem } from "@/config/navigation";
import { ROLE_HOME, type Role } from "@/lib/auth/roles";
import { getSession } from "@/lib/auth/session";
import { ModulePlaceholder } from "./module-placeholder";
import { RoleOverview } from "./role-overview";

type RolePageProps = {
  role: Role;
  locale: string;
  slug?: string[];
};

/**
 * Shared page body for `/admin`, `/dealer`, `/technician` and their modules. The module list is
 * config-driven (`config/navigation.ts`), so adding a module is one config entry + its screen.
 */
export async function RolePage({ role, locale, slug }: RolePageProps) {
  const session = await getSession();
  if (!session) redirect(`/${locale}/login`);
  if (session.user.role !== role) redirect(`/${locale}${ROLE_HOME[session.user.role]}`);

  const segment = slug?.join("/") ?? "";
  if (!segment) return <RoleOverview role={role} name={session.user.name ?? ""} />;

  const item = findNavItem(role, segment);
  if (!item) notFound();
  return <ModulePlaceholder role={role} item={item} />;
}
