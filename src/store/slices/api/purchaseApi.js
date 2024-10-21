import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const purchaseApi = createApi({
  reducerPath: "purchaseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL + "/purchase",
    credentials: "include",
  }),
  tagTypes: ["Purchase"],
  endpoints: (build) => ({
    addPurchase: build.mutation({
      query: (body) => {
        return {
          url: "",
          method: "POST",
          body: body,
        };
      },
      invalidatesTags: ["Purchase"],
    }),
    getPurchaseByMonth: build.query({
      query: ({ month, year }) => `/${month}/${year}`,
      transformResponse: (response) => {
        const transformedPurchases = response.purchases.map((purchase) => ({
          ...purchase,
          amount: parseFloat(purchase.amount),
        }));

        return {
          purchases: transformedPurchases,
          total: parseFloat(response.total),
        };
      },
      invalidatesTags: ["Purchase"],
    }),
  }),
});

export const { useAddPurchaseMutation, useGetPurchaseByMonthQuery } =
  purchaseApi;
export default purchaseApi;
