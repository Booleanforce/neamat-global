import Link from "next/link";
import { fontVariables } from "@/lib/fonts";
import { routing } from "@/i18n/routing";

/** Fallback 404 for paths outside any locale segment (renders its own document). */
export default function GlobalNotFound() {
  return (
    <html lang={routing.defaultLocale} className={fontVariables}>
      <body className="bg-surface grid min-h-dvh place-items-center p-6 text-center">
        <main>
          <p className="text-gold text-sm font-semibold tracking-[0.14em] uppercase">404</p>
          <h1 className="mt-2 text-3xl font-bold">Page not found</h1>
          <p className="text-body mt-2">
            The page you are looking for doesn&apos;t exist or has moved.
          </p>
          <Link
            href={`/${routing.defaultLocale}`}
            className="bg-gold text-navy-deep mt-6 inline-flex min-h-11 items-center rounded-full px-6 font-semibold"
          >
            Back to home
          </Link>
        </main>
      </body>
    </html>
  );
}
