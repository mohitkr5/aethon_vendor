import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
  name: "category",
  initialState: {
    categories: [],
    loading: true,
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
    LOAD_CATEGORIES(state, action) {
      state.loading = false;
      state.categories = action.payload.categories
    }
  }

}
)

export const { REQUEST_START, REQUEST_FAIL, LOAD_CATEGORIES } = categorySlice.actions;
export default categorySlice.reducer;


