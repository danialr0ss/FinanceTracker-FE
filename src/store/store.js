"use client";
import { configureStore } from "@reduxjs/toolkit";
import historyReducer from "./slices/historySlice";

const store = configureStore({
  reducer: {
    history: historyReducer,
  },
});

export default store;
