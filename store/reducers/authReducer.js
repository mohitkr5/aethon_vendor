import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    tokens: {
      googleToken: null,
      phoneAuthToken: null,
      token: null,
      idToken: null,
    },
    user: {},
    loading: null,
    isAuthenticated: null,
    error: {
      didOccur: null,
      msg: null,
    },
  },
  reducers: {
    REQUEST_START(state, action) {
      state.loading = true;
      state.error.didOccur = false;
      state.error.msg = null;
    },
    REQUEST_FAIL(state, action) {
      state.loading = false;
      state.error.didOccur = true;
      state.error.msg = action.payload.msg;
    },
    LOAD_USER(auth, action) {
      auth.user = action.payload.user;
      auth.tokens.idToken = action.payload.idToken;
      auth.isAuthenticated = true;
      auth.loading = false;
    },
    CLEAR_AUTH(auth, action) {
      auth.loading = true;
      auth.isAuthenticated = null;
      auth.user = {};
      auth.tokens = {
        googleToken: null,
        phoneAuthToken: null,
        token: null,
      };
    },
  },
});

export default authSlice.reducer;
export const authActions = authSlice.actions;
