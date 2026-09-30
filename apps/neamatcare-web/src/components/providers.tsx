"use client";

import { MotionConfig } from "framer-motion";
import { SessionProvider } from "next-auth/react";
import { useState, type ReactNode } from "react";
import { Provider } from "react-redux";
import { Toaster } from "@neamat/ui/components/ui/sonner";
import { TooltipProvider } from "@neamat/ui/components/ui/tooltip";
import { makeStore } from "@/store/store";

/** Client providers: NextAuth session, Redux store, Framer Motion (reduced-motion aware), tooltips, toasts. */
export function Providers({ children, dir }: { children: ReactNode; dir: "ltr" | "rtl" }) {
  const [store] = useState(makeStore);

  return (
    <SessionProvider>
      <Provider store={store}>
        <MotionConfig reducedMotion="user">
          <TooltipProvider>
            {children}
            {/* Light-only design: pin the toast theme so OS dark mode can't restyle it. */}
            <Toaster theme="light" position={dir === "rtl" ? "bottom-left" : "bottom-right"} />
          </TooltipProvider>
        </MotionConfig>
      </Provider>
    </SessionProvider>
  );
}
