import axios from "axios";

export const getUserFromBackend =
  ({ dispatch }) =>
    (next) =>
      async (action) => {
        if (action.type === "auth/LOAD_USER") {
          try {
            // Here what i want to do is just get the data of the user from the backend and store that in the state.
            const res = await axios.get("api/users/me");
            action.payload.user = res.data;
          } catch (err) {
            console.error(err.message);
          }
        }
        return next(action);
      };
