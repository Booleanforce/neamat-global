"use client";

import { MotionConfig } from "framer-motion";
import { useState, type ReactNode } from "react";
import { Provider } from "react-redux";
import { TooltipProvider } from "@neamat/ui/components/ui/tooltip";
import { makeStore } from "@/store/store";

/** Client providers: Redux store, reduced-motion-aware Framer Motion, shadcn tooltips. */
export function Providers({ children }: { children: ReactNode }) {
  const [store] = useState(makeStore);

  return (
    <Provider store={store}>
      <MotionConfig reducedMotion="user">
        <TooltipProvider>{children}</TooltipProvider>
      </MotionConfig>
    </Provider>
  );
}
