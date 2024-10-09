import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL,
    credentials: "include",
  }),
  tagTypes: ["Auth"],
  endpoints: (build) => ({
    registerUser: build.mutation({
      query: (body) => {
        return {
          url: "/auth/register",
          method: "POST",
          body: body,
        };
      },
      invalidatesTags: ["Auth"],
    }),
    login: build.mutation({
      query: (body) => {
        return {
          url: "/auth/login",
          method: "POST",
          body: body,
        };
      },
      invalidatesTags: ["Auth"],
    }),
  }),
});

export const { useRegisterUserMutation, useLoginMutation, useVerifyMutation } =
  authApi;
export default authApi;
