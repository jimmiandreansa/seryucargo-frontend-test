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
import { useFavorite, useFavoriteDispatch } from "../contexts/FavoriteContext";

const Favorites = () => {
  const API_KEY = import.meta.env.VITE_API_KEY;

  const navigate = useNavigate();
  const { favorite, loading } = useFavorite();
  const favoriteDispatch = useFavoriteDispatch();
  const sessionId = localStorage.getItem("tmdb_session_id");

  const fetchFavorites = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/account/{account_id}/favorite/movies?api_key=${API_KEY}&session_id=${sessionId}`
      );
      favoriteDispatch({
        type: "LOAD_FAVORITE",
        payload: response.data.results,
      });
    } catch (error) {
      console.error("Error fetching favorites:", error);
    }
  };

  useEffect(() => {
    if (!sessionId) {
      navigate("/login");
      return;
    }

    fetchFavorites();

    const interval = setInterval(() => {
      fetchFavorites();
    }, 120000);

    return () => clearInterval(interval);
  }, [sessionId, navigate]);

  return (
    <Container sx={{ paddingBottom: "2rem" }}>
      {favorite.length !== 0 && (
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
            Your Favorite Movies
          </Typography>
        </Box>
      )}
      {loading ? (
        <Box
          sx={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}
        >
          <CircularProgress />
        </Box>
      ) : favorite.length === 0 ? (
        <Box sx={{ textAlign: "center", marginTop: "2rem" }}>
          <Typography variant="title" color={"#fff"}>
            You have no favorite movies yet.
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={2}>
          {favorite.map((movie) => (
            <Grid
              key={movie.id}
              item
              xs={6}
              sm={4}
              md={3}
              lg={2}
              sx={{ marginY: "0.5rem" }}
            >
              <MovieCard movie={movie} callback={fetchFavorites} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default Favorites;
