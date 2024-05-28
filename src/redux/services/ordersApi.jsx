import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { FaExplosion } from "react-icons/fa6";

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: " http://localhost:9000/api/order/",
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
    getOrdersByDate: builder.query({
      query: (date) => `/getOrdersByDate?date=${date}`,

      providesTags: ["order"],
    }),
    getOrdersByDateRange: builder.query({
      query: (args) => {
        const { startDate, endDate } = args;
        return `/getOrdersByDateRange?startDate=${startDate}&endDate=${endDate}`;
      },
      providesTags: ["order"],
    }),
    getOrdersByMonthYear: builder.query({
      query: (args) => {
        const { month, year } = args;
        return `/getOrdersByMonthYear?month=${month}&year=${year}`;
      },
      providesTags: ["order"],
    }),
    getOrderById: builder.query({
      query: (id) => `/getOrderById?id=${id}`,
      providesTags: ["order"],
    }),
    deliveryStatus: builder.mutation({
      query: (statusData) => ({
        url: "/deliveryStatus",
        method: "POST",
        body: statusData,
      }),
      onQueryStarted: async (arg, { queryFulfilled, dispatch }) => {
        try {
          const { data, meta } = await queryFulfilled;
          return { data, meta };
          // Handle success based on meta.response.status
          if (meta.response.status === 200) {
            console.log("Book added to cart:", data);

            // Dispatch a success notification or other logic here
          }
        } catch (error) {
          // Handle error based on error.originalStatus
          if (error.originalStatus === 400) {
            console.log("Bad Request:", error);
          } else {
            console.log("Error adding book to cart:", error);
          }
          // Dispatch an error notification or other logic here
        }
      },
      invalidatesTags: ["order"],
    }),
  }),
});

export const {
  useGetOrdersByStudentIdQuery,
  useDeliveryStatusMutation,
  useGetOrderByIdQuery,
  useGetOrdersByDateQuery,
  useGetOrdersByDateRangeQuery,
  useGetOrdersByMonthYearQuery,
} = orderApi;
