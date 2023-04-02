import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";

export default function Loading({
  width = "100%",
  height = "100vh",
  text = "Loading",
}) {
  return (
    <Box
      sx={{
        display: "flex",
        background: "none",
        width,
        height,
        justifyContent: "center",
        alignItems: "center",
        flexFlow: "column",
        gap: "1rem",
      }}
    >
      <CircularProgress />
      <Typography color={"primary"} textAlign={"center"}>
        {text}
      </Typography>
    </Box>
  );
}
