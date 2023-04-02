import { createSlice } from "@reduxjs/toolkit";

const colorSlice = createSlice({
  name: "color",
  initialState: {
    colors: [],
    loading: null,
    error: null,
  },
  reducers: {
    requestStart(state, action) {
      state.loading = true;
      state.error = null;
    },
    getColors(state, action) {
      state.colors = action.payload.colors;
      state.loading = false;
      state.error = null;
    },
    requestFail(state, action) {
      state.loading = false;
      state.error = action.payload.error;
    },
  },
});

export default colorSlice.reducer;
export const colorActions = colorSlice.actions;
