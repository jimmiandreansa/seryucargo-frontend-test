import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Box } from "@mui/material";

const Callback = () => {
  const navigate = useNavigate();
  const API_KEY = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    const handleCallback = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const requestToken = urlParams.get("request_token");

      if (requestToken) {
        try {
          const response = await axios.post(
            `https://api.themoviedb.org/3/authentication/session/new?api_key=${API_KEY}`,
            {
              request_token: requestToken,
            }
          );

          if (response.data.success) {
            const sessionId = response.data.session_id;

            const responseAccount = await axios.get(
              `https://api.themoviedb.org/3/account?api_key=${API_KEY}&session_id=${sessionId}`
            );

            const accountId = responseAccount.data.id;

            localStorage.setItem("tmdb_session_id", sessionId);
            localStorage.setItem("tmdb_account_id", accountId);

            navigate("/");
          } else {
            console.error(
              "Failed to create session:",
              response.data.status_message
            );
            navigate("/login");
          }
        } catch (error) {
          console.error("Error creating session:", error);
        }
      }
    };

    handleCallback();
  }, [navigate]);

  return <Box>Processing...</Box>;
};

export default Callback;
