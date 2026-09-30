/**
 * Theme lock — colours may only come from the design tokens in
 * `packages/ui/src/styles/globals.css`. This rule rejects, in any TS/TSX/JS file:
 *   1. Arbitrary Tailwind colour values:  bg-[#fff], text-[rgb(0,0,0)], border-[hsl(...)] …
 *   2. Raw colour literals:               "#06284A", "rgb(…)", "hsl(…)", "oklch(…)" in code/inline styles
 *   3. Tailwind default-palette classes:  bg-red-500, text-slate-600 … (they don't exist here anyway)
 * Use token utilities instead: bg-navy-deep, bg-navy, bg-gold, text-body, text-muted-text,
 * bg-surface, bg-primary, text-destructive, bg-success, border-border …
 */
const ARBITRARY_COLOR = String.raw`-\[(#|rgba?\(|hsla?\(|oklch\(|oklab\(|lab\(|lch\(|color-mix\()`;
const RAW_COLOR = String.raw`(^|[\s:,(])(#[0-9a-fA-F]{3,8}\b|rgba?\(|hsla?\(|oklch\(|oklab\()`;
const PALETTES =
  "slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose";
const DEFAULT_PALETTE = String.raw`\b(bg|text|border|ring|fill|stroke|from|via|to|outline|shadow|divide|decoration|caret|accent|placeholder)-(${PALETTES})-\d{2,3}\b`;

const arbitraryMsg =
  "Theme lock: arbitrary colour values are not allowed. Use a design token utility (bg-navy, text-gold, bg-surface …) from @neamat/ui globals.css.";
const rawMsg =
  "Theme lock: raw colour literals are not allowed in components. Add/derive a token in packages/ui/src/styles/globals.css and use its utility or CSS variable.";
const paletteMsg =
  "Theme lock: Tailwind's default palette is disabled. Use brand tokens (navy-deep, navy, gold, body, muted-text, surface, destructive, success).";

const selectors = [
  [ARBITRARY_COLOR, arbitraryMsg],
  [RAW_COLOR, rawMsg],
  [DEFAULT_PALETTE, paletteMsg],
].flatMap(([pattern, message]) => [
  { selector: `Literal[value=/${pattern}/]`, message },
  { selector: `TemplateElement[value.raw=/${pattern}/]`, message },
]);

/** Flat-config entry enforcing the theme lock. */
export const themeLock = {
  name: "neamat/theme-lock",
  files: ["**/*.{js,jsx,mjs,ts,tsx}"],
  // lib/tokens.ts is the single sanctioned mirror of globals.css for non-CSS contexts.
  ignores: ["**/eslint/theme-lock.mjs", "**/*.config.{js,mjs,ts}", "**/src/lib/tokens.ts"],
  rules: {
    "no-restricted-syntax": ["error", ...selectors],
  },
};

export default themeLock;
