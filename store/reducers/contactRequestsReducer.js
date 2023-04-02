import { createSlice } from "@reduxjs/toolkit";

const contactRequestsSlice = createSlice({
  name: "contactRequests",
  initialState: {
    requests: [],
    loading: null,
    error: null,
  },
  reducers: {
    requestStart(state, action) {
      state.loading = true;
      state.error = null;
    },
    getcontactRequests(state, action) {
      state.requests = action.payload.requests;
      state.loading = false;
      state.error = null;
    },
    // addcontactRequests(state, action) {
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

export default contactRequestsSlice.reducer;
export const contactRequestsActions = contactRequestsSlice.actions;
