import store from "@/store/store";
import {
  REQUEST_FAIL,
  REQUEST_START,
  LOAD_CATEGORIES,
} from "@/store/reducers/categoryReducer";
const { dispatch } = store;
import axios from "axios";

export const getCategories = async () => {
  dispatch(REQUEST_START());

  const res = await axios.get("api/category");
  dispatch(LOAD_CATEGORIES({ categories: res.data }));
  return res.data;
};
export const createCategory = async (payload) => {
  dispatch(REQUEST_START());

  const res = await axios.post("api/category", payload);
  getCategories();
  return res.data;
};
export const updateCategory = async (payload) => {
  dispatch(REQUEST_START());

  const res = await axios.patch("api/category", payload);
  getCategories();
  return res.data;
};
export const deleteCategory = async (payload) => {
  dispatch(REQUEST_START());

  const res = await axios.delete(`api/category/${payload.id}`);
  getCategories();
  return res.data;
};
