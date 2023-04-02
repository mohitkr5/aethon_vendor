import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#F6CD44",
    },
    secondary: {
      main: "#B57B11",
    },
    info: {
      main: "#333",
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: "#ebebeb",
          color: "black",
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          background: "#eee",
        },
      },
    },
  },
  typography: {
    color: "black",
  },
});
