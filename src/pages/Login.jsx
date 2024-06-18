import { Box } from "@mui/material";
import { useEffect } from "react";

const Login = () => {
  useEffect(() => {
    const API_KEY = import.meta.env.VITE_API_KEY;
    const getRequestToken = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/authentication/token/new?api_key=${API_KEY}`
        );
        const data = await response.json();

        console.log("INI DATA", data)

        if (data.success) {
          window.location.href = `https://www.themoviedb.org/authenticate/${data.request_token}?redirect_to=http://localhost:5173/callback`;
        } else {
          console.error("Failed to get request token:", data.status_message);
        }
      } catch (error) {
        console.error("Error fetching request token:", error);
      }
    };

    getRequestToken();
  }, []);

  return <Box>Redirecting to login...</Box>;
};

export default Login;
