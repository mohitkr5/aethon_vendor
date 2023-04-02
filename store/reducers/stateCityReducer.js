import { createSlice } from "@reduxjs/toolkit";

const stateCitySlice = createSlice({
  name: "stateCity",
  initialState: {
    stateCities: [],
    loading: null,
    error: null,
  },
  reducers: {
    requestStart(state, action) {
      state.loading = true;
      state.error = null;
    },
    getStateCity(state, action) {
      state.stateCities = action.payload.stateCities;
      state.loading = false;
      state.error = null;
    },
    // addStateCity(state, action) {
    //   state.employees.push(action.payload.employee);
    //   state.loading = false;
    //   state.error = null;
    // },
    requestFail(state, action) {
      state.loading = false;
      state.error = action.payload.error;
    },
  },
});

export default stateCitySlice.reducer;
export const stateCityActions = stateCitySlice.actions;
