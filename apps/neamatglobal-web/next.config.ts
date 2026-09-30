import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  // The shared design system is consumed as TypeScript source.
  transpilePackages: ["@neamat/ui"],
  images: {
    formats: ["image/avif", "image/webp"],
    // 75 = Next default; 85 for large photo panels where compression artefacts show.
    qualities: [75, 85],
  },
  poweredByHeader: false,
};

export default withNextIntl(nextConfig);
