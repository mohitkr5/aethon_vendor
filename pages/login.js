import { Box, Button, TextField, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { login } from "@/store/actions/authActions";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) router.push("/");
  }, [isAuthenticated]);

  const handleLogin = () => {
    // Validate email and password
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    login(email, password);
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          padding: "3rem",
          width: "600px",
          border: "1px solid #e9e9e9",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <Typography variant={"h3"} color={"primary"} textAlign={"center"}>
          Login as a vendor
        </Typography>
        <TextField
          label={"Enter Email"}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label={"Enter Password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />{" "}
        {/* <Typography
          sx={{ fontSize: "14px", cursor: "pointer" }}
          color={"primary"}
          onClick={() => router.push("/register")}
        >
          Don&apos;t have an account yet? Register here
        </Typography> */}
        <Button
          variant={"contained"}
          sx={{ marginTop: "2rem" }}
          onClick={handleLogin}
        >
          Login
        </Button>
      </Box>
    </Box>
  );
}
