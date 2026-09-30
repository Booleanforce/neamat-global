import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./api/base-api";
import { preferencesSlice } from "./slices/preferences-slice";

/** A new store per client tree (App Router guidance — no module-level singleton). */
export function makeStore() {
  return configureStore({
    reducer: {
      [baseApi.reducerPath]: baseApi.reducer,
      preferences: preferencesSlice.reducer,
    },
    middleware: (getDefault) => getDefault().concat(baseApi.middleware),
  });
}

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
