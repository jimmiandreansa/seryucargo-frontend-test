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
import {
  useWatchlist,
  useWatchlistDispatch,
} from "../contexts/WatchlistContext";

const Watchlist = () => {
  const API_KEY = import.meta.env.VITE_API_KEY;

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

    const interval = setInterval(() => {
      fetchWatchlist();
    }, 120000);

    return () => clearInterval(interval);
  }, [sessionId, navigate]);

  return (
    <Container sx={{ paddingBottom: "2rem" }}>
      {watchlist.length !== 0 && (
        <Box
          sx={{
            marginTop: "2rem",
            marginBottom: "1rem",
            textAlign: { xs: "center", md: "left" },
          }}
        >
          <Typography
            variant="subtitle"
            gutterBottom
            sx={{
              color: "secondary.main",
              fontSize: { xs: "1.5rem", md: "2rem" },
              fontWeight: { xs: "normal", md: 600 },
            }}
          >
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
              <MovieCard movie={movie} callback={fetchWatchlist} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default Watchlist;
