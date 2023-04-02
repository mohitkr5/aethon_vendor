import store from "@/store/store";
import { vendorEnquiryActions } from "../reducers/vendorEnquiryReducer";
import axios from "axios";

const { dispatch } = store;

export const getEnquiries = async () => {
  dispatch(vendorEnquiryActions.requestStart());

  const res = await axios.get(`/api/admin/vendorenquiry`);
  dispatch(
    vendorEnquiryActions.getVendorEnquiries({ enquiries: res.data.enquiries })
  );
  return res.data;
};

export const markEnquiryAsContacted = async (id) => {
  const res = await axios.patch("api/admin/vendorenquiry", { id });
  getEnquiries();
  return res.data;
};

export const verifyAndSendVerificationEmail = async (id) => {
  const res = await axios.post("api/admin/vendorenquiry", { id });
  getEnquiries();
  return res.data;
};

export const dispatchError = () => {
  dispatch(vendorEnquiryActions.requestFail());
};
