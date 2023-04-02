import store from "../store";
import { couponActions } from "../reducers/couponReducer";
import axios from "axios";
import toastMessage from "utils/toastMessage";

const { dispatch } = store;

export const getMyCoupons = async () => {
  dispatch(couponActions.requestStart());

  const res = await axios.get("api/coupons");
  dispatch(couponActions.loadCoupons({ coupons: res.data }));
};

export const addCoupon = async (payload) => {
  dispatch(couponActions.requestStart());

  const res = await axios[payload._id ? "patch" : "post"](
    "api/coupons",
    payload
  );
  toastMessage(payload._id ? "Coupon Updated" : "Coupon Created", "success");
  // dispatch(couponActions.createCoupon({ coupon: res.data }));
  getMyCoupons();
};

export const updateCoupon = async (payload) => {
  dispatch(couponActions.requestStart());

  const res = await axios.patch("api/coupons", payload);
  // dispatch(couponActions.createCoupon({ coupon: res.data }));
  getMyCoupons();
};

export const deleteCoupon = async (id) => {
  const res = await axios.delete(`api/coupons?id=${id}`);
  // dispatch(couponActions.createCoupon({ coupon: res.data }));
  toastMessage("Coupon Deleted", "success");
  getMyCoupons();
};
