import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  // The shared design system is consumed as TypeScript source.
  transpilePackages: ["@neamat/ui"],
  poweredByHeader: false,
};

export default withNextIntl(nextConfig);
