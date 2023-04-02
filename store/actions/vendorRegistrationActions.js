import store from "@/store/store";
import { vendorRegistrationActions } from "../reducers/vendorRegistationReducer";
import axios from "axios";

const { dispatch } = store;

export const getVendorRegistrations = async () => {
  dispatch(vendorRegistrationActions.requestStart());

  const res = await axios.get(`/api/admin/vendorregistration`);
  dispatch(
    vendorRegistrationActions.getVendorRegistrations({
      registrations: res.data.registrations,
    })
  );
  return res.data;
};

export const approveRegistration = async (id) => {
  const res = await axios.post("api/admin/vendorregistration", { id });
  getVendorRegistrations();
  return res.data;
};

export const dispatchError = () => {
  dispatch(vendorRegistrationActions.requestFail());
};
