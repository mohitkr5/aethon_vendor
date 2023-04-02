import { createSlice } from "@reduxjs/toolkit";

const vendorRegistrationSlices = createSlice({
  name: "vendorRegistration",
  initialState: {
    registrations: [],
    loading: null,
    error: null,
  },
  reducers: {
    requestStart(state, action) {
      state.loading = true;
      state.error = null;
    },
    getVendorRegistrations(state, action) {
      state.registrations = action.payload.registrations;
      state.loading = false;
      state.error = null;
    },
    requestFail(state, action) {
      state.loading = false;
    },
  },
});

export default vendorRegistrationSlices.reducer;
export const vendorRegistrationActions = vendorRegistrationSlices.actions;
