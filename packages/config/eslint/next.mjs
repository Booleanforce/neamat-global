import { defineConfig } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import { baseIgnores } from "./base.mjs";
import { themeLock } from "./theme-lock.mjs";

/** ESLint flat config for the Next.js apps and the shared UI package. */
export const nextConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  themeLock,
  {
    // eslint-plugin-react's "detect" uses context.getFilename(), removed in ESLint 10.
    settings: { react: { version: "19.3" } },
    rules: {
      // App Router only — there is no pages/ directory in any workspace.
      "@next/next/no-html-link-for-pages": "off",
      // Destructured-away props (`variant: _v`) are intentional.
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_", ignoreRestSiblings: true },
      ],
    },
  },
  baseIgnores,
]);

export default nextConfig;
