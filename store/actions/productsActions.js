import axios from "axios";
import store from "@/store/store";
import { productsActions } from "@/store/reducers/productsReducer";

const { dispatch } = store;

export const getProducts = async () => {
  dispatch(productsActions.REQUEST_START());
  try {
    let res = await axios.get("/api/products");
    dispatch(productsActions.LOAD_PRODUCTS({ products: res.data.products }));

    res = await axios.get("/api/products/variation");
    dispatch(
      productsActions.LOAD_VARIATIONS({ variations: res.data.variations })
    );
  } catch (err) {
    dispatch(productsActions.REQUEST_FAIL({ msg: err.message }));
  }
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
