import axios from "axios";


// After authentication happens, this sets the default headers for axios request so that we dont have to do it again and again.
export const accessTokenMiddleware =
  ({ dispatch }) =>
    (next) =>
      (action) => {
        if (action.type === "auth/loadUser") {
          const { idToken } = action.payload;
          axios.defaults.headers.common["auth"] = idToken;
        }
        return next(action);
      };
