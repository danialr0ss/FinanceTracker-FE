import { createSlice } from "@reduxjs/toolkit";
const initState = {
  categories: [
    {
      name: "Leisure",
      purchases: [
        { id: 1, label: "Bowling", price: 24.5, date: "2021-01-15" },
        { id: 2, label: "Movies", price: 5.5, date: "2023-07-22" },
        { id: 3, label: "Outing", price: 31.42, date: "2020-12-31" },
        {
          id: 4,
          label: "Paintball",
          price: 24.5,
          date: "2022-04-05",
        },
        { id: 5, label: "Snooker", price: 24.5, date: "2024-11-10" },
      ],
    },
  ],
  currentCategory: { name: "", purchases: [] },
  date: { year: 2024, month: 8 },
};

const historySlice = createSlice({
  name: "history",
  initialState: initState,
  reducers: {
    addCategory: (state, action) => {
      state.categories.push(action.payload);
    },
    removeCategory: (state, action) => {
      const index = state.categories
        .map((item) => item.label)
        .indexOf(action.payload);
      state.categories.splice(index, 1);
    },
    editCategoryName: (state, action) => {
      state.categories.name = action.payload;
    },
    setCurrentCategory: (state, action) => {
      const category = state.categories.find(
        (item) => item.name === action.payload
      );
      state.currentCategory = category;
    },
    deletePurchase: (state, action) => {
      //get index of the item
      const itemIdIndex = state.currentCategory.purchases
        .map((item) => item.id)
        .indexOf(action.payload);
      const currentCategory = state.currentCategory;
      const currentCategoryPurchases = currentCategory.purchases;
      const currentCategoryName = currentCategory.name;
      const updatedCategory = state.categories.find(
        (item) => item.name === currentCategoryName
      );
      currentCategoryPurchases.splice(itemIdIndex, 1);
      updatedCategory.purchases = currentCategory.currentCategoryPurchases;
    },
    updatePurchase: (state, action) => {
      const purchases = state.currentCategory.purchases;
      const replacePurchaseIndex = purchases
        .map((item) => item.id)
        .indexOf(action.payload.id);
      purchases[replacePurchaseIndex] = action.payload;
      const replaceCategoryIndex = state.categories
        .map((item) => item.name)
        .indexOf(state.currentCategory.name);
      state.categories[replaceCategoryIndex] = state.currentCategory;
    },
    addPurchase: (state, action) => {
      state.currentCategory.purchases.push(action.payload);
      const currentName = state.currentCategory.name;
      const itemIndex = state.categories
        .map((item) => item.name)
        .indexOf(currentName);
      state.categories[itemIndex].purchases = state.currentCategory.purchases;
    },
  },
});

export const {
  addCategory,
  removeCategory,
  editCategoryName,
  setCurrentCategory,
  deletePurchase,
  updatePurchase,
  addPurchase,
} = historySlice.actions;

export default historySlice;
