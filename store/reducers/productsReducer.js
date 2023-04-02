import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    loading: null,
    error: {
      didOccur: null,
      msg: null,
    },
  },
  reducers: {
    REQUEST_START(state, action) {
      state.loading = true;
      state.error.didOccur = false;
      state.error.msg = null;
    },
    REQUEST_FAIL(state, action) {
      state.loading = false;
      state.error.didOccur = true;
      state.error.msg = action.payload.msg;
    },
    LOAD_PRODUCTS(state, action) {
      state.products = action.payload.products;
      state.loading = false;
    },
    CREATE_PRODUCT(state, action) {
      state.products.push(action.payload.product);
      state.loading = false;
    },
  },
});

export default productsSlice.reducer;
export const productsActions = productsSlice.actions;
