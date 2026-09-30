/** Typed access to environment variables (server-side unless prefixed NEXT_PUBLIC_). */
export const env = {
  apiUrl: process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api/v1",
  authSecret: process.env.NEXTAUTH_SECRET,
  demoMode: process.env.AUTH_DEMO_MODE === "true",
  demoPassword: process.env.AUTH_DEMO_PASSWORD,
  globalSiteUrl: process.env.NEXT_PUBLIC_GLOBAL_URL ?? "https://neamatglobal.com",
} as const;
