import { createSlice } from "@reduxjs/toolkit";

const couponSlice = createSlice({
  name: "coupon",
  initialState: {
    coupons: [],
    loading: null,
    error: null,
  },
  reducers: {
    requestStart(state, action) {
      state.loading = true;
      state.error = null;
    },
    requestFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    loadCoupons(state, action) {
      state.coupons = action.payload.coupons;
      state.loading = false;
      state.error = null;
    },
    createCoupon(state, action) {
      state.coupons.push(action.payload.coupon);
      state.loading = false;
      state.error = null;
    },
    deleteCoupon(state, action) {
      state.coupons.filter(coupon => coupon._id !== action.payload)
      state.loading = false
      state.error = null
    }
  },
});

export default couponSlice.reducer;
export const couponActions = couponSlice.actions;
