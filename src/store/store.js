import { configureStore } from "@reduxjs/toolkit";
import authApi from "./slices/api/authApi";
import purchaseApi from "./slices/api/purchaseApi";

const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [purchaseApi.reducerPath]: purchaseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, purchaseApi.middleware),
});

export default store;
