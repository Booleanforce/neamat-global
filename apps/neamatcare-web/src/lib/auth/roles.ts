/** Platform roles (PDF: Super Admin, Dealer, Technician; Customer arrives in Phase 3). */
export const ROLES = ["super_admin", "dealer", "technician"] as const;
export type Role = (typeof ROLES)[number];

/** Each role's dashboard lives under its own route prefix. */
export const ROLE_HOME: Record<Role, string> = {
  super_admin: "/admin",
  dealer: "/dealer",
  technician: "/technician",
};

export const PROTECTED_PREFIXES = Object.values(ROLE_HOME);

export function isRole(value: unknown): value is Role {
  return typeof value === "string" && (ROLES as readonly string[]).includes(value);
}

/** The role allowed to see a (locale-less) pathname, or null for public paths. */
export function roleForPath(pathname: string): Role | null {
  const entry = (Object.entries(ROLE_HOME) as [Role, string][]).find(
    ([, prefix]) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
  return entry ? entry[0] : null;
}
