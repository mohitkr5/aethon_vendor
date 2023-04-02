import { createSlice } from "@reduxjs/toolkit";

const sizeSlice = createSlice({
  name: "size",
  initialState: {
    sizes: [],
    loading: null,
    error: null,
  },
  reducers: {
    requestStart(state, action) {
      state.loading = true;
      state.error = null;
    },
    getSizes(state, action) {
      state.sizes = action.payload.sizes;
      state.loading = false;
      state.error = null;
    },
    requestFail(state, action) {
      state.loading = false;
      state.error = action.payload.error;
    },
  },
});

export default sizeSlice.reducer;
export const sizeActions = sizeSlice.actions;
