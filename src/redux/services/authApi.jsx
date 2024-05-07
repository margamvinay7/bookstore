import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import SignIn from "../../pages/customer/SignIn";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: " https://bookstore.3pixelsonline.in/api/auth/",
  }),
  tagTypes: ["auth"],
  endpoints: (builder) => ({
    getStudent: builder.query({
      query: (id) => `/getStudent?id=${id}`,
      providesTags: ["auth"],
    }),
    getAccessToken: builder.query({
      query: () => "/getAccessToken",
    }),
    signIn: builder.mutation({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["auth"],
    }),
    signUp: builder.mutation({
      query: (credentials) => ({
        url: "/signUp",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["auth"],
    }),
  }),
});

export const {
  useGetStudentQuery,
  useSignInMutation,
  useSignUpMutation,
  useGetAccessTokenQuery,
} = authApi;
