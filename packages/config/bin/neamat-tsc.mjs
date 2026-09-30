#!/usr/bin/env node
/**
 * Runs the TypeScript 7 native compiler (`@typescript/native`, aliased from typescript@7).
 *
 * TypeScript 7.0 ships no programmatic API, so `typescript` itself is aliased to
 * `@typescript/typescript6` for Next.js and typescript-eslint (per the TS 7.0 release notes).
 * Both packages expose a `tsc` bin, so this wrapper guarantees type-checking uses TS 7.
 */
import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";

const require = createRequire(import.meta.url);
// `bin/tsc` is not in the package's "exports", so locate it via package.json.
const pkgJson = require.resolve("@typescript/native/package.json");
const { bin } = JSON.parse(readFileSync(pkgJson, "utf8"));
const tsc = join(dirname(pkgJson), typeof bin === "string" ? bin : bin.tsc);
const result = spawnSync(process.execPath, [tsc, ...process.argv.slice(2)], { stdio: "inherit" });
process.exit(result.status ?? 1);
