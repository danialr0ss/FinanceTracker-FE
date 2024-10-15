import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const purchaseApi = createApi({
  reducerPath: "purchaseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL,
    credentials: "include",
  }),
  tagTypes: ["Purchase"],
  endpoints: (build) => ({
    addPurchase: build.mutation({
      query: (body) => {
        return {
          url: "/purchase",
          method: "POST",
          body: body,
        };
      },
      invalidatesTags: ["Purchase"],
    }),
  }),
});

export const { useAddPurchaseMutation } = purchaseApi;
export default purchaseApi;
