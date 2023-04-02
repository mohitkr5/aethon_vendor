import store from "@/store/store";
import { brandActons } from "../reducers/brandReducer";
import axios from "axios";

const { dispatch } = store;

export const getBrands = async () => {
  dispatch(brandActons.requestStart());

  const res = await axios.get(`/api/brand`);
  dispatch(brandActons.getBrands({ brands: res.data.brands }));
  return res.data;
};

export const addBrand = async (payload) => {
  dispatch(brandActons.requestStart());

  const res = await axios.post(`/api/brand`, payload);
  getBrands();
  return res.data;
};

export const updateBrand = async (payload) => {
  dispatch(brandActons.requestStart());

  const res = await axios.patch(`/api/brand`, payload);
  getBrands();
  return res.data;
};

export const deleteBrand = async (payload) => {
  dispatch(brandActons.requestStart());

  const res = await axios.delete(`/api/brand?id=${payload.id}`);
  getBrands();
  return res.data;
};
