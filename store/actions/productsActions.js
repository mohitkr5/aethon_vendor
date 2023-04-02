import axios from "axios";
import store from "@/store/store";
import { productsActions } from "@/store/reducers/productsReducer";

const { dispatch } = store;

export const getProducts = () => {
  dispatch(productsActions.REQUEST_START());
  axios
    .get("/api/products")
    .then((res) => {
      dispatch(productsActions.LOAD_PRODUCTS({ products: res.data.products }));
    })
    .catch((err) => {
      dispatch(productsActions.REQUEST_FAIL({ msg: err.message }));
    });
};

export const createProduct = async (apiPayload) => {
  return await axios.post("/api/products/main", apiPayload);
};

export const createVariant = async (apiPayload) => {
  return await axios.post("/api/products/variation", apiPayload);
};

export const addVendor = async (apiPayload) => {
  return await axios.post("/api/products/vendor", apiPayload);
};
