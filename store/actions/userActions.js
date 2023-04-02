import axios from "axios";
import store from "@/store/store";
import { userActions } from "@/store/reducers/usersReducer";

const { dispatch } = store;

export const getUsers = (queries) => {
  dispatch(userActions.requestStart());
  axios
    .get("/api/admin/get-users", { params: queries || {} })
    .then((res) => {
      dispatch(userActions.loadUsers({ users: res.data }));
    })
    .catch((err) => {
      dispatch(userActions.requestFail({ error: err.message }));
    });
};
