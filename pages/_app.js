import "../styles/globals.css";
import { Provider } from "react-redux";
import store from "../store/store";
import Loading from "@/components/Loading";

// Firebase
import { firebaseConfig } from "../firebase/firebaseConfig";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { loadUser } from "@/store/actions/authActions";
import { ThemeProvider } from "@mui/material";
import { theme } from "../theme";
import { useEffect } from "react";
import axios from "axios";
import { Toaster } from "react-hot-toast";

function MyApp({ Component, pageProps }) {
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  axios.defaults.baseURL = "http://localhost:5000/";
  // axios.defaults.baseURL = "https://zqpcayfa3b.us-east-1.awsapprunner.com/";

  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    axios.defaults.headers.common["auth"] = localStorage.getItem("token");
  }, []);

  useEffect(() => {
    const loadPersistentUser = async () => {
      if (user) {
        const idToken = await auth.currentUser.getIdToken();

        await loadUser(user, idToken);
      }
    };
    loadPersistentUser();
  }, [user]);

  if (loading) return <Loading text={"Loading application."} />;
  return (
    <Provider store={store}>
      <Toaster />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;
