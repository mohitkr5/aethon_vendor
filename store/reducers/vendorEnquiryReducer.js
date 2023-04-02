import { createSlice } from "@reduxjs/toolkit";

const vendorEnquirySlice = createSlice({
  name: "vendorEnquiry",
  initialState: {
    enquiries: [],
    loading: null,
    error: null,
  },
  reducers: {
    requestStart(state, action) {
      state.loading = true;
      state.error = null;
    },
    getVendorEnquiries(state, action) {
      state.enquiries = action.payload.enquiries;
      state.loading = false;
      state.error = null;
    },
    requestFail(state, action) {
      state.loading = false;
    },
  },
});

export default vendorEnquirySlice.reducer;
export const vendorEnquiryActions = vendorEnquirySlice.actions;
