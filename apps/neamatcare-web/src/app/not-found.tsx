import Link from "next/link";
import { routing } from "@/i18n/routing";
import { fontVariables } from "@/lib/fonts";

/** Fallback 404 for paths outside any locale segment (renders its own document). */
export default function GlobalNotFound() {
  return (
    <html lang={routing.defaultLocale} className={fontVariables}>
      <body className="grid min-h-dvh place-items-center bg-surface p-6 text-center">
        <main>
          <p className="text-sm font-semibold tracking-[0.14em] text-gold uppercase">404</p>
          <h1 className="mt-2 text-3xl font-bold">Page not found</h1>
          <Link
            href={`/${routing.defaultLocale}`}
            className="mt-6 inline-flex min-h-11 items-center rounded-full bg-gold px-6 font-semibold text-navy-deep"
          >
            Go to NEAMAT CARE
          </Link>
        </main>
      </body>
    </html>
  );
}
