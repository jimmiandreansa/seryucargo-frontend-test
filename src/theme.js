// src/theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#0EA5E9",
    },
    secondary: {
      main: "#D9D9D9",
    },
    background: {
      main: "#000000",
    },
  },
  typography: {
    fontFamily: "Poppins, Arial, sans-serif",
    h1: {
      fontSize: "2rem",
    },
    body1: {
      fontSize: "1rem",
    },
    title: {
      fontWeight: 900,
      fontSize: "2rem"
    },
    subtitle: {
      fontWeight: 600,
      fontSize: "2rem",
      color: "#fff",
    },
    movieTitle: {
      fontWeight: 700,
      fontSize: "2rem",
      color: "#fff",
    },
    movieDesc: {
      fontSize: "0.8rem",
      color: "#fff",
    }
  },
});

export default theme;
