import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: " https://bookstore.3pixelsonline.in/api/order/",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("auth");
      if (token) {
        headers.set("Authorization", "Bearer ${token}");
      }

      return headers;
    },
  }),
  tagTypes: ["order"],
  endpoints: (builder) => ({
    getOrdersByStudentId: builder.query({
      query: (id) => `/getOrdersByStudentId?id=${id}`,
      providesTags: ["order"],
    }),
    placeOrder: builder.mutation({
      query: (order) => ({
        url: "/order",
        method: "POST",
        body: order,
      }),
    }),
    deliveryStatus: builder.mutation({
      query: (statusData) => ({
        url: "/deliveryStatus",
        method: "POST",
        body: statusData,
      }),
    }),
  }),
});

export const {
  useGetOrdersByStudentIdQuery,
  useDeliveryStatusMutation,
  usePlaceOrderMutation,
} = orderApi;
