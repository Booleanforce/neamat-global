import { configureStore } from "@reduxjs/toolkit";
import { uiSlice } from "./slices/ui-slice";

/** A new store per request/render tree (App Router guidance — no module-level singleton). */
export function makeStore() {
  return configureStore({
    reducer: {
      ui: uiSlice.reducer,
    },
  });
}

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
