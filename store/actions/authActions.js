import store from "@/store/store";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
  sendPasswordResetEmail,
} from "firebase/auth";
import { authActions } from "@/store/reducers/authReducer";
import axios from "axios";
const { dispatch } = store;

const { REQUEST_START, REQUEST_FAIL, LOAD_USER } = authActions;

export const register = async (email, password, name) => {
  const auth = getAuth();

  dispatch(REQUEST_START());
  try {
    await setPersistence(auth, browserLocalPersistence);
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    let user = userCredential.user;
    console.log(user);
    const idToken = await auth.currentUser.getIdToken();

    localStorage.setItem("token", idToken);

    const payload = { email, name };
    const res = await axios.post("api/users/vendor", payload, {
      headers: {
        auth: idToken,
      },
    });
    user = res.data;

    dispatch(LOAD_USER({ user, idToken }));
  } catch (err) {
    dispatch(REQUEST_FAIL({ msg: err.message }));
  }
};

export const login = async (email, password) => {
  const auth = getAuth();

  dispatch(REQUEST_START());
  try {
    await setPersistence(auth, browserLocalPersistence);
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    const idToken = await auth.currentUser.getIdToken();
    localStorage.setItem("token", idToken);

    console.log({ user });

    dispatch(LOAD_USER({ user, idToken }));
  } catch (err) {
    dispatch(REQUEST_FAIL({ msg: err.message }));
  }
};

export const generatePasswordResetLink = async (email) => {
  const auth = getAuth();

  dispatch(REQUEST_START());
  try {
    sendPasswordResetEmail(auth, email);
  } catch (err) {
    dispatch(REQUEST_FAIL({ msg: err.message }));
  }
};

export const loadUser = async (user, idToken) => {
  dispatch(LOAD_USER({ user, idToken }));
};
