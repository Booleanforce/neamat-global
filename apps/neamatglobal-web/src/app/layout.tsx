import type { ReactNode } from "react";
import "./globals.css";

/**
 * The real root layout (with <html lang dir>) is `app/[locale]/layout.tsx`, so the document
 * direction can follow the locale. This pass-through exists so `app/not-found.tsx` has a parent.
 */
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
