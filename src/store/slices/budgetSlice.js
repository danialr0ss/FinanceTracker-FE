import { createSlice } from "@reduxjs/toolkit";
const initState = {
  value: 0.0,
};

const budgetSlice = createSlice({
  name: "budget",
  initialState: initState,
  reducers: {
    updateBudgetState: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { updateBudgetState } = budgetSlice.actions;

export default budgetSlice;
