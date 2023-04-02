import store from "@/store/store";
import { orderActions } from "../reducers/orderReducer";
import axios from "axios";

const { dispatch } = store;

export const getOrders = async () => {
  dispatch(orderActions.requestStart());
  try {
    const res = await axios.get(`api/orders`);
    dispatch(orderActions.getOrders({ orders: res.data }));
    return res.data;
  } catch (err) {
    dispatch(orderActions.requestFail({ error: err.message }));
  }
};
