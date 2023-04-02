import store from "@/store/store";
import { colorActions } from "../reducers/colorReducer";
import axios from "axios";

const { dispatch } = store;

export const getColors = async () => {
  dispatch(colorActions.requestStart());

  const res = await axios.get(`/api/color`);
  dispatch(colorActions.getColors({ colors: res.data.colors }));
  return res.data;
};

export const addColor = async (payload) => {
  dispatch(colorActions.requestStart());

  const res = await axios.post(`/api/color`, payload);
  getColors();
  return res.data;
};

export const updateColor = async (payload) => {
  dispatch(colorActions.requestStart());

  const res = await axios.patch(`/api/color`, payload);
  getColors();
  return res.data;
};

export const deleteColor = async (payload) => {
  dispatch(colorActions.requestStart());

  const res = await axios.delete(`/api/color?id=${payload.id}`);
  getColors();
  return res.data;
};
