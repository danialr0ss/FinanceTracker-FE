import { createSlice } from "@reduxjs/toolkit";
const initState = {
  purchases: [],
  total: 0,
};

const purchasesSlice = createSlice({
  name: "purchases",
  initialState: initState,
  reducers: {
    addPurchase: (state, action) => {
      state.purchases.push(action.payload);
    },
    removePurchase: (state, action) => {
      const index = state.purchases
        .map((item) => item.label)
        .indexOf(action.payload);
      state.purchases.splice(index, 1);
    },
    editPurchase: (state, action) => {
      for (const props of action.payload) {
        state.purchases[props] = action.payload[props];
      }
    },

    getPurchase: (state, action) => {
      return state.purchases.find(item.id === action.payload.id);
    },
  },
});

export const { editPurchase, deletePurchase, updatePurchase, addPurchase } =
  purchasesSlice.actions;

export default purchasesSlice;
