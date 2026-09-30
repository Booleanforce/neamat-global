/**
 * Brand colours for NON-CSS contexts only (e.g. <meta name="theme-color">, OG image generation,
 * emails). This file must mirror `src/styles/globals.css` and is the only TS file exempt from
 * the theme-lock lint rule. In components, always use token utilities instead.
 */
export const brandHex = {
  navyDeep: "#06284a",
  navy: "#0b4778",
  gold: "#e3bc62",
  white: "#ffffff",
  text: "#17344e",
  muted: "#64788b",
  surface: "#f5f8fb",
} as const;
