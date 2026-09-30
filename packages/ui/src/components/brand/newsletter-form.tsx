"use client";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Loader2 } from "lucide-react";
import { z } from "zod";
import { Field, FieldError, FieldLabel } from "@neamat/ui/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@neamat/ui/components/ui/input-group";
import { cn } from "@neamat/ui/lib/utils";

export type NewsletterFormMessages = {
  title: string;
  placeholder: string;
  submit: string;
  invalidEmail: string;
  success: string;
  error: string;
};

type NewsletterFormProps = {
  messages: NewsletterFormMessages;
  /** Persist the subscription (API call). Throw to show the error message. */
  onSubscribe?: (email: string) => Promise<void>;
  className?: string;
};

/**
 * "Subscribe to Our Newsletter" — shadcn Field + InputGroup, validated with React Hook Form + Zod.
 */
export function NewsletterForm({ messages, onSubscribe, className }: NewsletterFormProps) {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const schema = z.object({ email: z.email({ error: messages.invalidEmail }) });

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { email: "" },
  });

  async function onSubmit({ email }: z.infer<typeof schema>) {
    setStatus("idle");
    try {
      await onSubscribe?.(email);
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} noValidate className={cn("w-full", className)}>
      <Controller
        name="email"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid} className="gap-3">
            <FieldLabel htmlFor="newsletter-email" className="text-[13px] font-semibold text-white">
              {messages.title}
            </FieldLabel>
            <InputGroup className="h-11 rounded-full border-white/20 bg-white/5 has-[[data-slot=input-group-control]:focus-visible]:border-gold has-[[data-slot=input-group-control]:focus-visible]:ring-gold/30">
              <InputGroupInput
                {...field}
                id="newsletter-email"
                type="email"
                autoComplete="email"
                inputMode="email"
                placeholder={messages.placeholder}
                aria-invalid={fieldState.invalid}
                className="ps-4 text-sm text-white placeholder:text-on-navy/70"
              />
              <InputGroupAddon align="inline-end" className="pe-1">
                <InputGroupButton
                  type="submit"
                  size="icon-sm"
                  variant="gold"
                  aria-label={messages.submit}
                  disabled={form.formState.isSubmitting}
                  className="size-9 rounded-full"
                >
                  {form.formState.isSubmitting ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    <ArrowRight className="size-4 rtl:-scale-x-100" />
                  )}
                </InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
            {/* On deep navy, gold (8.2:1) replaces destructive red (which fails contrast here). */}
            {fieldState.invalid && (
              <FieldError errors={[fieldState.error]} className="text-xs text-gold" />
            )}
            <p role="status" aria-live="polite" className="min-h-4 text-xs text-on-navy">
              {status === "success" && messages.success}
              {status === "error" && <span className="text-gold">{messages.error}</span>}
            </p>
          </Field>
        )}
      />
    </form>
  );
}
