import { NextResponse, type NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import createMiddleware from "next-intl/middleware";
import { ROLE_HOME, isRole, roleForPath } from "@/lib/auth/roles";
import { routing, type Locale } from "@/i18n/routing";

const intlMiddleware = createMiddleware(routing);

function splitLocale(pathname: string): { locale: Locale | null; path: string } {
  const [, first, ...rest] = pathname.split("/");
  if (first && (routing.locales as readonly string[]).includes(first)) {
    return { locale: first as Locale, path: `/${rest.join("/")}`.replace(/\/$/, "") || "/" };
  }
  return { locale: null, path: pathname };
}

/**
 * Next.js 16 proxy: locale negotiation (next-intl) + authentication and role-based routing.
 * RBAC is still enforced server-side by the FastAPI backend — this only shapes navigation.
 */
export default async function proxy(request: NextRequest) {
  const { locale, path } = splitLocale(request.nextUrl.pathname);
  if (!locale) return intlMiddleware(request);

  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
  const role = isRole(token?.role) ? token.role : null;
  const toUrl = (target: string) => new URL(`/${locale}${target}`, request.url);

  // Signed-in users skip the login page and the bare locale root.
  if (role && (path === "/" || path === "/login")) {
    return NextResponse.redirect(toUrl(ROLE_HOME[role]));
  }
  if (!role && path === "/") {
    return NextResponse.redirect(toUrl("/login"));
  }

  const requiredRole = roleForPath(path);
  if (requiredRole) {
    if (!role) {
      const login = toUrl("/login");
      login.searchParams.set("callbackUrl", request.nextUrl.pathname);
      return NextResponse.redirect(login);
    }
    if (role !== requiredRole) {
      return NextResponse.redirect(toUrl(ROLE_HOME[role]));
    }
  }

  return intlMiddleware(request);
}

export const config = {
  // Skip API routes (incl. /api/auth), Next internals and files with an extension.
  matcher: "/((?!api|_next|_vercel|.*\\..*).*)",
};
