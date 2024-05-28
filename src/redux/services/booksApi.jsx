import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const booksApi = createApi({
  reducerPath: "booksApi",
  baseQuery: fetchBaseQuery({
    baseUrl: " http://localhost:9000/api/books/",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("auth");
      if (token) {
        headers.set("Authorization", "Bearer ${token}");
      }

      return headers;
    },
  }),
  tagTypes: ["books"],
  endpoints: (builder) => ({
    getBook: builder.query({
      query: (id) => `/getBookById?id=${id}`,
      providesTags: ["books"],
    }),
    getBooks: builder.query({
      query: () => "/getBooks",
      providesTags: ["books"],
    }),
    addBook: builder.mutation({
      query: (book) => ({
        url: "/addBook",
        method: "POST",
        body: book,
      }),
      invalidatesTags: ["books"],
    }),
    UpdateBook: builder.mutation({
      query: (book) => ({
        url: "/updateBooksstock",
        method: "POST",
        body: book,
      }),
      invalidatesTags: ["books"],
    }),
  }),
});

export const {
  useGetBookQuery,
  useGetBooksQuery,
  useAddBookMutation,
  useUpdateBookMutation,
} = booksApi;
