"use client";
import { configureStore } from "@reduxjs/toolkit";
import historyReducer from "./slices/historySlice";
import authApi from "./slices/authApi";

const store = configureStore({
  reducer: {
    history: historyReducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

export default store;
