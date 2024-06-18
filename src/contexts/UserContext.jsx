/* eslint-disable react/prop-types */
import { createContext, useEffect, useReducer } from "react";
import axios from "axios";

export const UserContext = createContext();

const API_KEY = import.meta.env.VITE_API_KEY;

const initialState = {
  user: null,
  sessionId: localStorage.getItem("tmdb_session_id"),
  favorites: [],
  watchlist: [],
};

const userReducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload };
    case "SET_SESSION_ID":
      return { ...state, sessionId: action.payload };
    case "SET_FAVORITES":
      return { ...state, favorites: action.payload };
    case "SET_WATCHLIST":
      return { ...state, watchlist: action.payload };
    case "ADD_TO_FAVORITES":
      return { ...state, favorites: [...state.favorites, action.payload] };
    case "REMOVE_FROM_FAVORITES":
      return {
        ...state,
        favorites: state.favorites.filter((m) => m.id !== action.payload),
      };
    case "ADD_TO_WATCHLIST":
      return { ...state, watchlist: [...state.watchlist, action.payload] };
    case "REMOVE_FROM_WATCHLIST":
      return {
        ...state,
        watchlist: state.watchlist.filter((m) => m.id !== action.payload),
      };
    case "LOGOUT":
      return initialState;
    default:
      return state;
  }
};

const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  useEffect(() => {
    if (state.sessionId) {
      const fetchUserData = async () => {
        try {
          const response = await axios.get(
            `https://api.themoviedb.org/3/account?api_key=${API_KEY}&session_id=${state.sessionId}`
          );
          dispatch({ type: "SET_USER", payload: response.data });

          const favResponse = await axios.get(
            `https://api.themoviedb.org/3/account/${response.data.id}/favorite/movies?api_key=${API_KEY}&session_id=${state.sessionId}`
          );
          dispatch({
            type: "SET_FAVORITES",
            payload: favResponse.data.results,
          });

          const watchResponse = await axios.get(
            `https://api.themoviedb.org/3/account/${response.data.id}/watchlist/movies?api_key=${API_KEY}&session_id=${state.sessionId}`
          );
          dispatch({
            type: "SET_WATCHLIST",
            payload: watchResponse.data.results,
          });
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };

      fetchUserData();
    }
  }, [state.sessionId]);

  const logout = () => {
    localStorage.removeItem("tmdb_session_id");
    dispatch({ type: "LOGOUT" });
  };

  const addToFavorites = async (movie) => {
    try {
      const response = await axios.post(
        `https://api.themoviedb.org/3/account/${state.user.id}/favorite?api_key=${API_KEY}&session_id=${state.sessionId}`,
        {
          media_type: "movie",
          media_id: movie.id,
          favorite: true,
        }
      );
      if (response.data.status_code === 1 || response.data.status_code === 12) {
        dispatch({ type: "ADD_TO_FAVORITES", payload: movie });
      }
    } catch (error) {
      console.error("Error adding to favorites:", error);
    }
  };

  const addToWatchlist = async (movie) => {
    try {
      const response = await axios.post(
        `https://api.themoviedb.org/3/account/${state.user.id}/watchlist?api_key=${API_KEY}&session_id=${state.sessionId}`,
        {
          media_type: "movie",
          media_id: movie.id,
          watchlist: true,
        }
      );
      if (response.data.status_code === 1 || response.data.status_code === 12) {
        dispatch({ type: "ADD_TO_WATCHLIST", payload: movie });
      }
    } catch (error) {
      console.error("Error adding to watchlist:", error);
    }
  };

  const removeFromFavorites = async (movie) => {
    try {
      const response = await axios.post(
        `https://api.themoviedb.org/3/account/${state.user.id}/favorite?api_key=${API_KEY}&session_id=${state.sessionId}`,
        {
          media_type: "movie",
          media_id: movie.id,
          favorite: false,
        }
      );
      if (response.data.status_code === 13) {
        dispatch({ type: "REMOVE_FROM_FAVORITES", payload: movie.id });
      }
    } catch (error) {
      console.error("Error removing from favorites:", error);
    }
  };

  const removeFromWatchlist = async (movie) => {
    try {
      const response = await axios.post(
        `https://api.themoviedb.org/3/account/${state.user.id}/watchlist?api_key=${API_KEY}&session_id=${state.sessionId}`,
        {
          media_type: "movie",
          media_id: movie.id,
          watchlist: false,
        }
      );
      if (response.data.status_code === 13) {
        dispatch({ type: "REMOVE_FROM_WATCHLIST", payload: movie.id });
      }
    } catch (error) {
      console.error("Error removing from watchlist:", error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        user: state.user,
        sessionId: state.sessionId,
        logout,
        favorites: state.favorites,
        watchlist: state.watchlist,
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
