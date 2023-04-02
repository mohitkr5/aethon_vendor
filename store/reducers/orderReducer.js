import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: [],
    loading: null,
    error: null,
  },
  reducers: {
    requestStart(state, action) {
      state.loading = true;
      state.error = null;
    },
    getOrders(state, action) {
      state.orders = action.payload.orders;
      state.loading = false;
      state.error = null;
    },
    requestFail(state, action) {
      state.loading = false;
      state.error = action.payload.error;
    },
  },
});

export default orderSlice.reducer;
export const orderActions = orderSlice.actions;
