"use client";

import { useTranslations } from "next-intl";
import { SupportChatWidget } from "@neamat/ui/components/brand/support-chat-widget";

/** Shared in-house support chat launcher, tagged for the Neamat Global business unit. */
export function SiteChat() {
  const t = useTranslations("Chat");

  return (
    <SupportChatWidget
      businessUnit="neamat_global"
      messages={{
        open: t("open"),
        close: t("close"),
        title: t("title"),
        greeting: t("greeting"),
        placeholder: t("placeholder"),
        send: t("send"),
        offline: t("offline"),
      }}
    />
  );
}
