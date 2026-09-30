import type { Role } from "./roles";

/**
 * Demo accounts for local development before the FastAPI `auth` module exists.
 * Only used when AUTH_DEMO_MODE=true; the shared password comes from AUTH_DEMO_PASSWORD
 * (see .env.example) so no credential is hard-coded here.
 */
export const demoUsers: { id: string; name: string; email: string; role: Role }[] = [
  { id: "demo-admin", name: "Super Admin", email: "admin@neamatcare.test", role: "super_admin" },
  { id: "demo-dealer", name: "Riyadh Dealer", email: "dealer@neamatcare.test", role: "dealer" },
  { id: "demo-tech", name: "Field Technician", email: "technician@neamatcare.test", role: "technician" },
];
