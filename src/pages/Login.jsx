// src/pages/Login.jsx
import { useEffect } from "react";

const Login = () => {
  useEffect(() => {
    const API_KEY = "ca3fedf8135600641335f54c5eb6e536";
    const getRequestToken = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/authentication/token/new?api_key=${API_KEY}`
        );
        const data = await response.json();

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

  return <div>Redirecting to login...</div>;
};

export default Login;
