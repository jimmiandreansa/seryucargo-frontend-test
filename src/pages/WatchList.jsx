import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Container,
  Grid,
  Typography,
  CircularProgress,
} from "@mui/material";
import MovieCard from "../components/MovieCard";
import { useWatchlist, useWatchlistDispatch } from "../contexts/WatchlistContext";

const Watchlist = () => {
  const API_KEY = "ca3fedf8135600641335f54c5eb6e536";

  const navigate = useNavigate();
  const { watchlist, loading } = useWatchlist();
  const watchlistDispatch = useWatchlistDispatch();
  const sessionId = localStorage.getItem("tmdb_session_id");

  const fetchWatchlist = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/account/{account_id}/watchlist/movies?api_key=${API_KEY}&session_id=${sessionId}`
      );
      watchlistDispatch({
        type: "LOAD_WATCHLIST",
        payload: response.data.results,
      });
    } catch (error) {
      console.error("Error fetching watchlist:", error);
    }
  };

  useEffect(() => {
    if (!sessionId) {
      navigate("/login");
      return;
    }

    fetchWatchlist();
  }, [sessionId, navigate]);

  return (
    <Container>
      {watchlist.length !== 0 && (
        <Box sx={{ marginTop: "2rem", marginBottom: "1rem" }}>
          <Typography variant="subtitle" gutterBottom>
            Your Watchlist
          </Typography>
        </Box>
      )}
      {loading ? (
        <Box
          sx={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}
        >
          <CircularProgress />
        </Box>
      ) : watchlist.length === 0 ? (
        <Box sx={{ textAlign: "center", marginTop: "2rem" }}>
          <Typography variant="title" color={"#fff"}>
            You have no watchlist movies yet.
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={2}>
          {watchlist.map((movie) => (
            <Grid item key={movie.id} xs={6} sm={4} md={3} lg={2}>
              <MovieCard
                movie={movie}
                callback={fetchWatchlist}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default Watchlist;
