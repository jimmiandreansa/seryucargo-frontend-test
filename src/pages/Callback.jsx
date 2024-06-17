// src/pages/Callback.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Callback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const API_KEY = "ca3fedf8135600641335f54c5eb6e536";
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
            localStorage.setItem("tmdb_session_id", response.data.session_id);
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
          navigate("/login");
        }
      }
    };

    handleCallback();
  }, [navigate]);

  return <div>Processing...</div>;
};

export default Callback;
