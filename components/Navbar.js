import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { Button, Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { FaRegBell } from "react-icons/fa";
import { AiOutlineSearch } from "react-icons/ai";
import { useRouter } from "next/router";
import { logOut } from "@/store/actions/authActions";

export default function Navbar() {
  const {
    user,
  } = useSelector((state) => state.auth);
  const router = useRouter();

  const logoutHandler = () => {
    logOut()
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
          Welcome Back, {user?.name}
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
