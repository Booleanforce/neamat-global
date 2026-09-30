import { IBM_Plex_Sans_Arabic, Inter } from "next/font/google";

/** Latin text — Inter (design system typeface). */
export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

/** Arabic wordmark and content — IBM Plex Sans Arabic pairs with Inter's proportions. */
export const plexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plex-arabic",
  display: "swap",
});

export const fontVariables = `${inter.variable} ${plexArabic.variable}`;
