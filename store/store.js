import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import authReducer from "./reducers/authReducer";
import productReducer from "./reducers/productsReducer";
import categoryReducer from "./reducers/categoryReducer";
import employeesReducer from "./reducers/employeesReducer";
import orderReducer from "./reducers/orderReducer";
import stateCityReducer from "./reducers/stateCityReducer";
import contactRequestsReducer from "./reducers/contactRequestsReducer";
import subCategoryReducer from "./reducers/subCategoryReducer";
import usersReducer from "./reducers/usersReducer";
import colorReducer from "./reducers/colorReducer";
import brandReducer from "./reducers/brandReducer";
import sizeReducer from "./reducers/sizeReducer";
import couponReducer from "./reducers/couponReducer";
import vendorEnquiryReducer from "./reducers/vendorEnquiryReducer";

import { accessTokenMiddleware } from "@/store/middleware/accessTokenMiddleware";
import { getUserFromBackend } from "@/store/middleware/getUserFromBackend";
import vendorRegistationReducer from "./reducers/vendorRegistationReducer";

const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    category: categoryReducer,
    employee: employeesReducer,
    order: orderReducer,
    users: usersReducer,
    stateCity: stateCityReducer,
    contactRequests: contactRequestsReducer,
    subCategory: subCategoryReducer,
    color: colorReducer,
    brand: brandReducer,
    size: sizeReducer,
    coupon: couponReducer,
    vendorEnquiry: vendorEnquiryReducer,
    vendorRegistration: vendorRegistationReducer,
  },
  middleware: [
    ...getDefaultMiddleware(),
    accessTokenMiddleware,
    getUserFromBackend,
  ],
});

export default store;
