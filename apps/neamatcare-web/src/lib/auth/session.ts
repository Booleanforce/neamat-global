import "server-only";
import { getServerSession } from "next-auth";
import { authOptions } from "./options";
import type { Role } from "./roles";

/** Server-side session helper for layouts/pages. */
export function getSession() {
  return getServerSession(authOptions);
}

/** Returns the session only if it belongs to `role`; callers redirect otherwise. */
export async function getRoleSession(role: Role) {
  const session = await getSession();
  return session?.user.role === role ? session : null;
}
