import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { Button, Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { authActions } from "@/store/reducers/authReducer";
import { FaRegBell } from "react-icons/fa";
import { AiOutlineSearch } from "react-icons/ai";
import store from "@/store/store";
import { useRouter } from "next/router";

export default function Navbar() {
  const {
    user: { name },
  } = useSelector((state) => state.auth);
  const router = useRouter();
  const { dispatch } = store;
  const { CLEAR_AUTH } = authActions;

  const logoutHandler = () => {
    dispatch(CLEAR_AUTH());
    router.push("/login");
  };

  return (
    <AppBar
      position="fixed"
      // sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, boxShadow: "none" }}
      sx={{ boxShadow: "none" }}
    >
      <Toolbar sx={{ backgroundColor: "white" }}>
        {/* <Logo /> */}
        <Typography variant="h5" marginLeft={"22vw"}>
          Welcome Back, {name}
        </Typography>
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center ",
              marginRight: "15px",
            }}
          >
            <AiOutlineSearch />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center ",
              marginRight: "15px",
            }}
          >
            <FaRegBell />
          </Box>
          <Button variant="contained" onClick={logoutHandler}>
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
