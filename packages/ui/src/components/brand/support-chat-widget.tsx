"use client";

import { useState } from "react";
import { MessageCircle, Send, X } from "lucide-react";
import { Button } from "@neamat/ui/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@neamat/ui/components/ui/card";
import { Textarea } from "@neamat/ui/components/ui/textarea";

export type SupportChatMessages = {
  open: string;
  close: string;
  title: string;
  greeting: string;
  placeholder: string;
  send: string;
  offline: string;
};

type SupportChatWidgetProps = {
  messages: SupportChatMessages;
  /** "neamat_global" | "neamatcare" — tags threads for the Super Admin support inbox. */
  businessUnit: "neamat_global" | "neamatcare";
};

/**
 * In-house support chat launcher shared by neamatglobal.com and neamatcare.com.
 * UI shell only: the Socket.IO transport is wired when the FastAPI `support` module exists.
 */
export function SupportChatWidget({ messages, businessUnit }: SupportChatWidgetProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed end-4 bottom-4 z-40 flex flex-col items-end gap-3 sm:end-6 sm:bottom-6">
      {open && (
        <Card
          role="dialog"
          aria-label={messages.title}
          data-business-unit={businessUnit}
          className="w-[min(22rem,calc(100vw-2rem))] gap-0 bg-white py-0 shadow-card-hover ring-border"
        >
          <CardHeader className="flex items-center justify-between rounded-t-xl bg-navy-deep px-4 py-3">
            <CardTitle className="text-sm font-semibold text-white">{messages.title}</CardTitle>
            <Button
              variant="ghost"
              size="icon-sm"
              aria-label={messages.close}
              onClick={() => setOpen(false)}
              className="text-white hover:bg-white/10 hover:text-white"
            >
              <X />
            </Button>
          </CardHeader>
          <CardContent className="grid gap-2 px-4 py-4 text-sm">
            <p className="w-fit max-w-[85%] rounded-lg rounded-ss-none bg-surface px-3 py-2 text-body">
              {messages.greeting}
            </p>
            <p className="text-xs text-muted-text">{messages.offline}</p>
          </CardContent>
          <CardFooter className="gap-2 bg-surface px-3 py-3">
            <Textarea
              aria-label={messages.placeholder}
              placeholder={messages.placeholder}
              rows={1}
              className="min-h-10 resize-none bg-white"
              disabled
            />
            <Button size="icon-lg" variant="gold" aria-label={messages.send} disabled className="size-10">
              <Send className="rtl:-scale-x-100" />
            </Button>
          </CardFooter>
        </Card>
      )}
      <Button
        size="icon-lg"
        variant="gold"
        aria-label={open ? messages.close : messages.open}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className="size-14 rounded-full shadow-card-hover"
      >
        {open ? <X className="size-6" /> : <MessageCircle className="size-6" />}
      </Button>
    </div>
  );
}
