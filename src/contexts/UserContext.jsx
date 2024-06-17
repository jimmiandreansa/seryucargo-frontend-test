/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [sessionId, setSessionId] = useState(
    localStorage.getItem("tmdb_session_id")
  );
  const [favorites, setFavorites] = useState([]);
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    const API_KEY = "ca3fedf8135600641335f54c5eb6e536";

    if (sessionId) {
      const fetchUserData = async () => {
        try {
          const response = await axios.get(
            `https://api.themoviedb.org/3/account?api_key=${API_KEY}&session_id=${sessionId}`
          );
          setUser(response.data);

          const favResponse = await axios.get(
            `https://api.themoviedb.org/3/account/${response.data.id}/favorite/movies?api_key=${API_KEY}&session_id=${sessionId}`
          );
          setFavorites(favResponse.data.results);

          const watchResponse = await axios.get(
            `https://api.themoviedb.org/3/account/${response.data.id}/watchlist/movies?api_key=${API_KEY}&session_id=${sessionId}`
          );
          setWatchlist(watchResponse.data.results);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };

      fetchUserData();
    }
  }, [sessionId]);

  const logout = () => {
    localStorage.removeItem("tmdb_session_id");
    setSessionId(null);
    setUser(null);
    setFavorites([]);
    setWatchlist([]);
  };

  const addToFavorites = async (movie) => {
    try {
      const response = await axios.post(
        `https://api.themoviedb.org/3/account/${user.id}/favorite?api_key=ca3fedf8135600641335f54c5eb6e536&session_id=${sessionId}`,
        {
          media_type: "movie",
          media_id: movie.id,
          favorite: true,
        }
      );
      if (response.data.status_code === 1 || response.data.status_code === 12) {
        setFavorites((prev) => [...prev, movie]);
      }
    } catch (error) {
      console.error("Error adding to favorites:", error);
    }
  };

  const addToWatchlist = async (movie) => {
    try {
      const response = await axios.post(
        `https://api.themoviedb.org/3/account/${user.id}/watchlist?api_key=ca3fedf8135600641335f54c5eb6e536&session_id=${sessionId}`,
        {
          media_type: "movie",
          media_id: movie.id,
          watchlist: true,
        }
      );
      if (response.data.status_code === 1 || response.data.status_code === 12) {
        setWatchlist((prev) => [...prev, movie]);
      }
    } catch (error) {
      console.error("Error adding to watchlist:", error);
    }
  };

  const removeFromFavorites = async (movie) => {
    try {
      const response = await axios.post(
        `https://api.themoviedb.org/3/account/${user.id}/favorite?api_key=ca3fedf8135600641335f54c5eb6e536&session_id=${sessionId}`,
        {
          media_type: "movie",
          media_id: movie.id,
          favorite: false,
        }
      );
      if (response.data.status_code === 13) {
        setFavorites((prev) => prev.filter((m) => m.id !== movie.id));
      }
    } catch (error) {
      console.error("Error removing from favorites:", error);
    }
  };

  const removeFromWatchlist = async (movie) => {
    try {
      const response = await axios.post(
        `https://api.themoviedb.org/3/account/${user.id}/watchlist?api_key=ca3fedf8135600641335f54c5eb6e536&session_id=${sessionId}`,
        {
          media_type: "movie",
          media_id: movie.id,
          watchlist: false,
        }
      );
      if (response.data.status_code === 13) {
        setWatchlist((prev) => prev.filter((m) => m.id !== movie.id));
      }
    } catch (error) {
      console.error("Error removing from watchlist:", error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        sessionId,
        logout,
        favorites,
        watchlist,
        addToFavorites,
        addToWatchlist,
        removeFromFavorites,
        removeFromWatchlist,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;