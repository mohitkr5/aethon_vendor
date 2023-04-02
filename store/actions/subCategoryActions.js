import store from "@/store/store";
import {
  REQUEST_FAIL,
  REQUEST_START,
  LOAD_SUBCATEGORIES,
} from "@/store/reducers/subCategoryReducer";
const { dispatch } = store;
import axios from "axios";

export const getSubCategories = async () => {
  dispatch(REQUEST_START());

  const res = await axios.get("api/subcategory");
  dispatch(LOAD_SUBCATEGORIES({ subCategories: res.data }));
  return res.data;
};
export const createSubCategory = async (payload) => {
  dispatch(REQUEST_START());

  const res = await axios.post("api/subcategory", payload);
  getSubCategories();
  return res.data;
};
export const updateSubCategory = async (payload) => {
  dispatch(REQUEST_START());

  const res = await axios.patch("api/subcategory", payload);
  getSubCategories();
  return res.data;
};
export const deleteSubCategory = async (payload) => {
  dispatch(REQUEST_START());

  const res = await axios.delete(`api/subcategory?id=${payload.id}`);
  getSubCategories();
  return res.data;
};
