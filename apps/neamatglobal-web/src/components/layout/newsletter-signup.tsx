"use client";

import { useTranslations } from "next-intl";
import { NewsletterForm } from "@neamat/ui/components/brand/newsletter-form";
import { subscribeToNewsletter } from "@/lib/api/newsletter";

/** Footer newsletter form with localized messages and the subscribe API call. */
export function NewsletterSignup() {
  const t = useTranslations("Footer.newsletter");

  return (
    <NewsletterForm
      onSubscribe={subscribeToNewsletter}
      messages={{
        title: t("title"),
        placeholder: t("placeholder"),
        submit: t("submit"),
        invalidEmail: t("invalidEmail"),
        success: t("success"),
        error: t("error"),
      }}
    />
  );
}
