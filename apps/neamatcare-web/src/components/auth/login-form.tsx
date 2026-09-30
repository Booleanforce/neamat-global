"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { useLocale, useTranslations } from "next-intl";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleAlert, Loader2 } from "lucide-react";
import { Button } from "@neamat/ui/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@neamat/ui/components/ui/field";
import { Input } from "@neamat/ui/components/ui/input";
import { loginSchema, type LoginInput } from "@/lib/validations/auth";

/** Email + password sign-in (NextAuth Credentials) with React Hook Form + Zod on shadcn Field. */
export function LoginForm() {
  const t = useTranslations("Auth");
  const locale = useLocale();
  const searchParams = useSearchParams();
  const [formError, setFormError] = useState<string | null>(
    searchParams.get("error") ? t("invalidCredentials") : null,
  );

  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  async function onSubmit(values: LoginInput) {
    setFormError(null);
    const callbackUrl = searchParams.get("callbackUrl") ?? `/${locale}`;
    try {
      const result = await signIn("credentials", { ...values, redirect: false, callbackUrl });
      if (!result || result.error) {
        setFormError(t("invalidCredentials"));
        return;
      }
      // Full navigation so the proxy routes the new session to the right role dashboard.
      window.location.assign(result.url ?? callbackUrl);
    } catch {
      setFormError(t("genericError"));
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} noValidate className="grid gap-5">
      {formError && (
        <p
          role="alert"
          className="flex items-center gap-2 rounded-md bg-destructive/10 px-3 py-2.5 text-sm text-destructive"
        >
          <CircleAlert aria-hidden="true" className="size-4 shrink-0" />
          {formError}
        </p>
      )}

      <FieldGroup>
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="login-email">{t("email")}</FieldLabel>
              <Input
                {...field}
                id="login-email"
                type="email"
                autoComplete="username"
                inputMode="email"
                placeholder={t("emailPlaceholder")}
                aria-invalid={fieldState.invalid}
                className="h-11 bg-white"
              />
              {fieldState.error?.message && (
                <FieldError>{t(fieldState.error.message as "invalidEmail")}</FieldError>
              )}
            </Field>
          )}
        />
        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="login-password">{t("password")}</FieldLabel>
              <Input
                {...field}
                id="login-password"
                type="password"
                autoComplete="current-password"
                aria-invalid={fieldState.invalid}
                className="h-11 bg-white"
              />
              {fieldState.error?.message && (
                <FieldError>{t(fieldState.error.message as "passwordTooShort")}</FieldError>
              )}
            </Field>
          )}
        />
      </FieldGroup>

      <Button type="submit" variant="gold" size="pill-lg" disabled={form.formState.isSubmitting} className="w-full">
        {form.formState.isSubmitting && <Loader2 className="animate-spin" />}
        {form.formState.isSubmitting ? t("submitting") : t("submit")}
      </Button>
    </form>
  );
}
