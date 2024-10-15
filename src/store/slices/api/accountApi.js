import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const accountApi = createApi({
  reducerPath: "accountApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL + "/account",
    credentials: "include",
  }),
  tagTypes: ["Account"],
  endpoints: (build) => ({
    breakdown: build.query({
      query: () => "/breakdown",
      invalidatesTags: ["Account"],
    }),
  }),
});

export const { useBreakdownQuery } = accountApi;

export default accountApi;
