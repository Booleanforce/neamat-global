import type { ReactNode } from "react";
import "./globals.css";

/**
 * The real root layout (with <html lang dir>) is `app/[locale]/layout.tsx` so direction follows the
 * locale. This pass-through gives `app/not-found.tsx` a parent.
 */
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
