import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL + "/auth",
    credentials: "include",
  }),
  tagTypes: ["Auth"],
  endpoints: (build) => ({
    registerUser: build.mutation({
      query: (body) => {
        return {
          url: "/register",
          method: "POST",
          body: body,
        };
      },
      invalidatesTags: ["Auth"],
    }),
    login: build.mutation({
      query: (body) => {
        return {
          url: "/login",
          method: "POST",
          body: body,
        };
      },
      invalidatesTags: ["Auth"],
    }),
    changePassword: build.mutation({
      query: (body) => {
        return {
          url: "/change-password",
          method: "POST",
          body: body,
        };
      },
      invalidatesTags: ["Auth"],
    }),
    signout: build.mutation({
      query: () => {
        return {
          url: "/signout",
          method: "POST",
        };
      },
      invalidatesTags: ["Auth"],
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginMutation,
  useChangePasswordMutation,
  useSignoutMutation,
} = authApi;
export default authApi;
