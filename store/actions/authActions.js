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

const { requestStart, requestFail, loadUser } = authActions;

export const register = async (email, password, name) => {
  const auth = getAuth();

  dispatch(requestStart());
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

    dispatch(loadUser({ user, idToken }));
  } catch (err) {
    dispatch(requestFail({ msg: err.message }));
  }
};

export const login = async (email, password) => {
  const auth = getAuth();

  dispatch(requestStart());
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

    dispatch(loadUser({ user, idToken }));
  } catch (err) {
    dispatch(requestFail({ msg: err.message }));
  }
};

export const generatePasswordResetLink = async (email) => {
  const auth = getAuth();

  dispatch(requestStart());
  try {
    sendPasswordResetEmail(auth, email);
  } catch (err) {
    dispatch(requestFail({ msg: err.message }));
  }
};

export const loadAppUser = async (user, idToken) => {
  if (!user || !idToken) dispatch(requestFail("Not Logged In."));
  else dispatch(loadUser({ user, idToken }));
};

export const logOut = async () => {
  const auth = getAuth();
  await auth.signOut();
  localStorage.removeItem("token");
  dispatch(authActions.logOut());
}