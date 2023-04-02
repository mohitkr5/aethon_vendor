import store from "@/store/store";
import { stateCityActions } from "../reducers/stateCityReducer";
import axios from "axios";

const { dispatch } = store;

export const getStateCityData = async () => {
  dispatch(stateCityActions.requestStart());
  try {
    const res = await axios.get(`/api/city/all`);
    dispatch(
      stateCityActions.getStateCity({ stateCities: res.data.stateCities })
    );
    return res.data;
  } catch (err) {
    dispatch(stateCityActions.requestFail({ error: err.message }));
  }
};

export const createState = async (payload) => {
  try {
    dispatch(stateCityActions.requestStart());
    const res = await axios.post(`/api/city/state`, payload);
    getStateCityData();
  } catch (err) {
    dispatch(stateCityActions.requestFail({ error: err.message }));
  }
};

export const createCity = async (payload) => {
  try {
    dispatch(stateCityActions.requestStart());
    const res = await axios.post(`/api/city`, payload);
    getStateCityData();
  } catch (err) {
    dispatch(stateCityActions.requestFail({ error: err.message }));
  }
};

export const deleteCity = async (id) => {
  try {
    dispatch(stateCityActions.requestStart());
    const res = await axios.delete(`api/city/${id}`, payload);
    getStateCityData();
  } catch (err) {
    dispatch(stateCityActions.requestFail({ error: err.message }));
  }
};

export const deleteState = async (id) => {
  try {
    dispatch(stateCityActions.requestStart());
    const res = await axios.delete(`api/city/state/${id}`, payload);
    getStateCityData();
  } catch (err) {
    dispatch(stateCityActions.requestFail({ error: err.message }));
  }
};

// export const addColor = async (payload) => {
//   dispatch(stateCityActions.requestStart());
//   try {
//     const res = await axios.post(`/api/admin/colors`, payload);
//     dispatch(stateCityActions.addColor({ color: res.data }));
//     return res.data;
//   } catch (err) {
//     dispatch(stateCityActions.requestFail({ error: err.message }));
//   }
// };
