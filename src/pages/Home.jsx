import { useContext, useEffect, useState } from "react";
import axios from "axios";
import MovieList from "../components/MovieList";
import { UserContext } from "../contexts/UserContext";

const Home = () => {
  const API_KEY = "ca3fedf8135600641335f54c5eb6e536";
  const [nowPlaying, setNowPlaying] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [loadingNowPlaying, setLoadingNowPlaying] = useState(true);
  const [loadingTopRated, setLoadingTopRated] = useState(true);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const nowPlayingResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}`
        );
        setNowPlaying(nowPlayingResponse.data.results);
        setLoadingNowPlaying(false);

        const topRatedResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`
        );
        setTopRated(topRatedResponse.data.results);
        setLoadingTopRated(false);
      } catch (error) {
        console.error("Error fetching movies:", error);
        setLoadingNowPlaying(false);
        setLoadingTopRated(false);
      }
    };

    fetchMovies();
  }, []);

  const addToWatchlist = async (movie) => {
    if (user) {
      await axios.post(
        `https://api.themoviedb.org/4/list/${user.watchlistId}/items`,
        {
          items: [{ media_type: "movie", media_id: movie.id }],
        },
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
    }
  };

  const addToFavorites = async (movie) => {
    if (user) {
      await axios.post(
        `https://api.themoviedb.org/4/account/${user.accountId}/favorite`,
        {
          media_type: "movie",
          media_id: movie.id,
          favorite: true,
        },
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
    }
  };

  return (
    <>
      <MovieList
        nowPlaying={nowPlaying}
        loadingNowPlaying={loadingNowPlaying}
        topRated={topRated}
        loadingTopRated={loadingTopRated}
        addToWatchlist={addToWatchlist}
        addToFavorites={addToFavorites}
      />
    </>
  );
};

export default Home;
