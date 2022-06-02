import { configureStore } from "@reduxjs/toolkit";
import changeProductsSliceReducer from "./changeProductsSlice";

export const store = configureStore({
  reducer: {
    changeProducts: changeProductsSliceReducer,
  },
});
