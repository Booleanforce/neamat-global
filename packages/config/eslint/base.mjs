import { globalIgnores } from "eslint/config";

/** Ignores shared by every workspace. */
export const baseIgnores = globalIgnores([
  "node_modules/**",
  ".next/**",
  ".turbo/**",
  "out/**",
  "build/**",
  "dist/**",
  "next-env.d.ts",
]);
