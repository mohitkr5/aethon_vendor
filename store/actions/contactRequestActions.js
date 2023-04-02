import store from "@/store/store";
import { contactRequestsActions } from "../reducers/contactRequestsReducer";
import axios from "axios";

const { dispatch } = store;

export const getContactRequests = async () => {
  dispatch(contactRequestsActions.requestStart());
  try {
    const res = await axios.get(`/api/contactform`);
    dispatch(
      contactRequestsActions.getcontactRequests({
        requests: res.data.forms,
      })
    );
    return res.data;
  } catch (err) {
    dispatch(contactRequestsActions.requestFail({ error: err.message }));
  }
};

export const markAddressed = async (payload) => {
  try {
    dispatch(contactRequestsActions.requestStart());
    const res = await axios.patch(`/api/contactform`, payload);
    getContactRequests();
  } catch (err) {
    dispatch(contactRequestsActions.requestFail({ error: err.message }));
  }
};
