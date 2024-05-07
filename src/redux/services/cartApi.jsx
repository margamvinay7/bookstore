import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const cartApi = createApi({
  reducerPath: "cartApi",
  baseQuery: fetchBaseQuery({
    baseUrl: " https://bookstore.3pixelsonline.in/api/cart/",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("auth");
      if (token) {
        headers.set("Authorization", "Bearer ${token}");
      }

      return headers;
    },
  }),
  tagTypes: ["cart"],
  endpoints: (builder) => ({
    getCartById: builder.query({
      query: (id) => `/getCartByStudentId?id=${id}`,
      providesTags: ["cart"],
    }),
    addToCart: builder.mutation({
      query: (cart) => ({
        url: "/addToCart",
        method: "POST",
        body: cart,
      }),
      invalidatesTags: ["cart"],
    }),
    update: builder.mutation({
      query: (cartData) => ({
        url: "/updateCart",
        method: "POST",
        body: cartData,
      }),
      invalidatesTags: ["cart"],
    }),
    delete: builder.mutation({
      query: (id) => ({
        url: "/removeFromCart",
        method: "POST",
        body: id,
      }),
      invalidatesTags: ["cart"],
    }),
  }),
});

export const {
  useGetCartByIdQuery,
  useAddToCartMutation,
  useDeleteMutation,
  useUpdateMutation,
} = cartApi;
