"use client";
import { configureStore } from "@reduxjs/toolkit";
import historySlice from "./slices/historySlice";
import authApi from "./slices/api/authApi";
import accountApi from "./slices/api/accountApi";
import purchaseApi from "./slices/api/purchaseApi";

const store = configureStore({
  reducer: {
    history: historySlice.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [accountApi.reducerPath]: accountApi.reducer,
    [purchaseApi.reducerPath]: purchaseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      accountApi.middleware,
      purchaseApi.middleware
    ),
});

export default store;
