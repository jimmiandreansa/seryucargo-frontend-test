// src/services/tmdbApi.js
import axios from "axios";

const API_KEY = "ca3fedf8135600641335f54c5eb6e536";
const BASE_URL = "https://api.themoviedb.org/3";

export const getWatchlist = async (sessionId) => {
  const response = await axios.get(
    `${BASE_URL}/account/{account_id}/watchlist/movies`,
    {
      params: {
        api_key: API_KEY,
        session_id: sessionId,
      },
    }
  );
  return response.data.results;
};

export const getFavorites = async (sessionId) => {
  const response = await axios.get(
    `${BASE_URL}/account/{account_id}/favorite/movies`,
    {
      params: {
        api_key: API_KEY,
        session_id: sessionId,
      },
    }
  );
  return response.data.results;
};

// Functions untuk menambah dan menghapus dari watchlist dan favorites akan ditambahkan di sini
