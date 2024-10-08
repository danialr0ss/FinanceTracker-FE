import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL }),
  tagTypes: ["Auth"],
  endpoints: (build) => ({
    registerUser: build.mutation({
      query: (body) => {
        return {
          url: "/user/register",
          method: "POST",
          body: body,
        };
      },
      invalidatesTags: ["Auth"],
    }),
  }),
});

export const { useRegisterUserMutation } = authApi;
export default authApi;
