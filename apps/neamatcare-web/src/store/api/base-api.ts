import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";

/**
 * RTK Query base API for the FastAPI backend. Feature modules extend it with
 * `baseApi.injectEndpoints(...)` (jobs, dealers, technicians, catalog…).
 */
export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api/v1",
    prepareHeaders: async (headers) => {
      const session = await getSession();
      if (session?.accessToken) headers.set("Authorization", `Bearer ${session.accessToken}`);
      return headers;
    },
  }),
  tagTypes: ["Job", "Dealer", "Technician", "Customer", "Catalog", "Payout"],
  endpoints: () => ({}),
});
