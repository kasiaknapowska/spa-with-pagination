import { createSlice } from "@reduxjs/toolkit";

export const changeProductsSlice = createSlice({
  name: "changeProducts",
  initialState: {
    products: [],
    productsToDisplay: [],
  },
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setProductsToDisplay: (state, action) => {
      state.productsToDisplay = action.payload;
    },
  },
});

export const { setProducts, setProductsToDisplay } =
  changeProductsSlice.actions;
export default changeProductsSlice.reducer;
