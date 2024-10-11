"use client";
import { configureStore } from "@reduxjs/toolkit";
import historySlice from "./slices/historySlice";
import budgetSlice from "./slices/budgetSlice";
import authApi from "./slices/api/authApi";
import accountApi from "./slices/api/accountApi";

const store = configureStore({
  reducer: {
    history: historySlice.reducer,
    budget: budgetSlice.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [accountApi.reducerPath]: accountApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, accountApi.middleware),
});

export default store;
