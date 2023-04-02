import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    loading: true,
    error: null
  },
  reducers: {
    requestStart(state, action) {
      state.loading = true;
      state.error = null
    },
    requestFail(state, action) {
      state.loading = false;
      state.error = action.payload.error;
    },
    loadUsers(state, action) {
      state.users = action.payload.users;
      state.loading = false;
      state.error = null
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;