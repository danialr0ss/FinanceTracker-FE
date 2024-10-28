import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const purchaseApi = createApi({
  reducerPath: "purchaseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL + "/purchase",
    credentials: "include",
  }),
  tagTypes: ["Purchase"],
  endpoints: (build) => ({
    editPurchase: build.mutation({
      query: (body) => {
        const { id, ...rest } = body;
        return {
          url: `/${id}`,
          method: "PATCH",
          body: rest,
        };
      },
      invalidatesTags: ({ id }) => [{ id, type: "Purchase" }],
    }),
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
    deletePurchase: build.mutation({
      query: (body) => {
        return {
          url: `/${body.id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ({ id }) => [{ id, type: "Purchase" }],
    }),
    getPurchases: build.query({
      query: (params) => {
        console.log(params);
        const filteredParams = {};
        for (const param of Object.keys(params)) {
          if (params[param] !== "") {
            filteredParams[param] = params[param];
          }
        }
        console.log(filteredParams);

        const queryString = new URLSearchParams(filteredParams).toString();
        return { url: `?${queryString}`, method: "GET" };
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
      providesTags: (result) =>
        result
          ? [...result.purchases.map(({ id }) => ({ id, type: "Purchase" }))]
          : ["Purchase"],
    }),
  }),
});

export const {
  useAddPurchaseMutation,
  useGetPurchasesQuery,
  useEditPurchaseMutation,
  useDeletePurchaseMutation,
} = purchaseApi;
export default purchaseApi;
