import store from "@/store/store";
import { sizeActions } from "../reducers/sizeReducer";
import axios from "axios";

const { dispatch } = store;

export const getSizes = async () => {
  dispatch(sizeActions.requestStart());

  const res = await axios.get(`/api/size`);
  dispatch(sizeActions.getSizes({ sizes: res.data.sizes }));
  return res.data;
};

export const addSize = async (payload) => {
  dispatch(sizeActions.requestStart());

  const res = await axios.post(`/api/size`, payload);
  getSizes();
  return res.data;
};

export const updateSize = async (payload) => {
  dispatch(sizeActions.requestStart());

  const res = await axios.patch(`/api/size`, payload);
  getSizes();
  return res.data;
};

export const deleteSize = async (payload) => {
  dispatch(sizeActions.requestStart());

  const res = await axios.delete(`/api/size?id=${payload.id}`);
  getSizes();
  return res.data;
};
