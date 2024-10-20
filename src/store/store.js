import { configureStore } from "@reduxjs/toolkit";
import authApi from "./slices/api/authApi";
import accountApi from "./slices/api/accountApi";
import purchaseApi from "./slices/api/purchaseApi";
import purchasesSlice from "./slices/purchasesSlice";

const store = configureStore({
  reducer: {
    purchases: purchasesSlice.reducer,
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
