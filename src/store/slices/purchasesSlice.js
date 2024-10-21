import { createSlice } from "@reduxjs/toolkit";
const initState = {
  purchases: [
    {
      id: 1,
      label: "Bowling",
      amount: 24.5,
      date: "2021-01-15",
      category: "Leisure",
    },
    {
      id: 2,
      label: "Movies",
      amount: 24.5,
      date: "2021-01-15",
      category: "Leisure",
    },
    {
      id: 3,
      label: "Dinner",
      amount: 24.5,
      date: "2021-01-15",
      category: "Necessities",
    },
    {
      id: 4,
      label: "Meeting ",
      amount: 24.5,
      date: "2021-01-15",
      category: "Work",
    },
    {
      id: 5,
      label: "Shoes",
      amount: 94.5,
      date: "2021-01-15",
      category: "Shopping",
    },
  ],
};

const purchasesSlice = createSlice({
  name: "purchases",
  initialState: initState,
  reducers: {
    addPurchase: (state, action) => {
      state.categories.push(action.payload);
    },
    removePurchase: (state, action) => {
      const index = state.categories
        .map((item) => item.label)
        .indexOf(action.payload);
      state.categories.splice(index, 1);
    },
    editPurchase: (state, action) => {
      for (const props of action.payload) {
        state.categories[props] = action.payload[props];
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
