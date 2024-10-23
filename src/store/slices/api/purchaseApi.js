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
    getPurchases: build.query({
      query: ({ category, month, year }) => {
        let query = "?";
        if (category) {
          query += "category=" + category + "&";
        }
        if (month) {
          query += "month=" + month + "&";
        }
        if (year) {
          query += "year=" + year;
        }

        if (query.length > 1) {
          return query;
        }

        return "";
      },
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

export const { useAddPurchaseMutation, useGetPurchasesQuery } = purchaseApi;
export default purchaseApi;
