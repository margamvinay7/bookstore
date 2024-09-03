import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const itemsApi = createApi({
  reducerPath: "itemsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: " http://localhost:9000/api/item/",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("auth");
      if (token) {
        headers.set("Authorization", "Bearer ${token}");
      }

      return headers;
    },
  }),
  tagTypes: ["items"],
  endpoints: (builder) => ({
    getItemById: builder.query({
      query: (id) => `/getItemById?id=${id}`,
      providesTags: ["items"],
    }),
    getItems: builder.query({
      query: () => "/getItems",
      providesTags: ["items"],
    }),
    getItemsBycollegeAndCourse: builder.query({
      query: (args) => {
        const { college, course } = args;
        return `/getItemsBycollegeAndCourse?college=${college}&course=${course}`;
      },
      providesTags: ["items"],
    }),
    addItem: builder.mutation({
      query: (item) => ({
        url: "/addItem",
        method: "POST",
        body: item,
      }),
      invalidatesTags: ["items"],
    }),
    updateItem: builder.mutation({
      query: (item) => ({
        url: "/updateItemsStock",
        method: "POST",
        body: item,
      }),
      invalidatesTags: ["items"],
    }),
  }),
});

export const {
  useAddItemMutation,
  useUpdateItemMutation,
  useGetItemByIdQuery,
  useGetItemsQuery,
  useGetItemsBycollegeAndCourseQuery,
} = itemsApi;
