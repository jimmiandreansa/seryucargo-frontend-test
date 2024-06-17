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
            const sessionId = response.data.session_id;

            // 2. Mendapatkan informasi akun pengguna
            const responseAccount = await axios.get(
              `https://api.themoviedb.org/3/account?api_key=${API_KEY}&session_id=${sessionId}`
            );

            const accountId = responseAccount.data.id;

            // 3. Menyimpan session_id dan account_id di local storage
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
          // navigate("/login");
        }
      }
    };

    handleCallback();
  }, [navigate]);

  return <div>Processing...</div>;
};

export default Callback;
