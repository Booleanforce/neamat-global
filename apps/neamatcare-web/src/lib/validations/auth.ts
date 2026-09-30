import { z } from "zod";

/** Login form schema (messages are i18n keys resolved by the form). */
export const loginSchema = z.object({
  email: z.email({ error: "invalidEmail" }),
  password: z.string().min(8, { error: "passwordTooShort" }),
});

export type LoginInput = z.infer<typeof loginSchema>;
