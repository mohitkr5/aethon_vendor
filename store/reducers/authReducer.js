import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
    loading: true,
    isAuthenticated: false,
    error: null
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
    loadUser(auth, action) {
      auth.user = action.payload.user;
      auth.token = action.payload.idToken;
      auth.isAuthenticated = true;
      auth.loading = false;
    },
    logOut(auth, action) {
      auth.loading = false;
      auth.isAuthenticated = false;
      auth.user = null;
      auth.token = null;
    },
    clearAuth(auth, action) {
      auth.loading = false;
      auth.isAuthenticated = false;
      auth.user = null;
      auth.token = null;
    },
  },
});

export default authSlice.reducer;
export const authActions = authSlice.actions;
