import { createSlice } from "@reduxjs/toolkit";

const subCategorySlice = createSlice({
  name: "subcategory",
  initialState: {
    subCategories: [],
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
    LOAD_SUBCATEGORIES(state, action) {
      state.loading = false;
      state.subCategories = action.payload.subCategories;
    },
  },
});

export const { REQUEST_START, REQUEST_FAIL, LOAD_SUBCATEGORIES } =
  subCategorySlice.actions;
export default subCategorySlice.reducer;
