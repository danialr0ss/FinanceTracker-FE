import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";

const accountApi = createApi({
  reducerPath: "accountApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL + "/account",
    credentials: "include",
  }),
  tagTypes: ["Account"],
  endpoints: (build) => ({
    dailyLimit: build.query({
      query: () => "/get-daily-budget",
      invalidatesTags: ["Account"],
    }),
    breakdown: build.query({
      query: () => "/breakdown",
      invalidatesTags: ["Account"],
    }),
    updateBalance: build.mutation({
      query: (body) => {
        return {
          url: "/update-balance",
          method: "PATCH",
          body: body,
        };
      },
      invalidatesTags: ["Auth"],
    }),
  }),
});

export const {
  useDailyLimitQuery,
  useBreakdownQuery,
  useUpdateBalanceMutation,
} = accountApi;

export default accountApi;
