import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: [],
    manualOrders: [],
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
    updateOrder(state, action) {
      const orderIndex = state.orders.findIndex(
        (order) => order._id === action.payload.order._id
      );
      state.orders[orderIndex] = action.payload.order;
      state.loading = false;
      state.error = null;
    },
    getManualOrders(state, action) {
      state.manualOrders = action.payload.manualOrders;
      state.loading = false;
      state.error = null;
    },
    createManualOrder(state, action) {
      state.manualOrders = [...state.manualOrders, action.payload.manualOrder];
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
