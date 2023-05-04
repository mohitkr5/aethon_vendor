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

export const updateOrder = async (orderId, payload) => {
  dispatch(orderActions.requestStart());
  try {
    const res = await axios.put(`api/orders/${orderId}`, payload);
    dispatch(orderActions.updateOrder({ order: res.data }));
    return res.data;
  }
  catch (err) {
    dispatch(orderActions.requestFail({ error: err.message }));
  }
}


export const getManualOrders = async () => {
  dispatch(orderActions.requestStart());
  try {
    const res = await axios.get(`api/orders/manual`);
    dispatch(orderActions.getManualOrders({ manualOrders: res.data }));
    return res.data;
  } catch (err) {
    dispatch(orderActions.requestFail({ error: err.message }));
  }
}

export const createManualOrder = async (formData) => {
  dispatch(orderActions.requestStart());
  try {
    const res = await axios.post(`api/orders/manual`, formData);
    dispatch(orderActions.createManualOrder({ manualOrder: res.data }));
    return res.data;
  }
  catch (err) {
    dispatch(orderActions.requestFail({ error: err.message }));
  }
}