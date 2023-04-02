import { Box, Button, TextField, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { register } from "@/store/actions/authActions";
import { useSelector } from "react-redux";

export default function RegisterPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) router.push("/");
  }, [isAuthenticated]);

  const handleRegister = () => {
    // Validate email and password
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    register(email, password, name);
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
          Register as a vendor
        </Typography>
        <TextField
          label={"Enter Name"}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label={"Enter Email"}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label={"Enter Password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Typography
          sx={{ fontSize: "14px", cursor: "pointer" }}
          color={"primary"}
          onClick={() => router.push("/login")}
        >
          Already have an account? Login here
        </Typography>
        <Button
          variant={"contained"}
          sx={{ marginTop: "2rem" }}
          onClick={handleRegister}
        >
          Register
        </Button>
      </Box>
    </Box>
  );
}
