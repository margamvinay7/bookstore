import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { booksApi } from "./services/booksApi";
import { authApi } from "./services/authApi";
import { cartApi } from "./services/cartApi";
import { orderApi } from "./services/ordersApi";

// Create the Redux store
export const store = configureStore({
  reducer: {
    [booksApi.reducerPath]: booksApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [cartApi.reducerPath]: cartApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      booksApi.middleware,
      authApi.middleware,
      cartApi.middleware,
      orderApi.middleware,
    ]),
});
setupListeners(store.dispatch);
export default store;
