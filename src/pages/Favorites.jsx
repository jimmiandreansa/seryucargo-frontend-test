import { useEffect, useState } from "react";
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

const Favorites = () => {
  const API_KEY = "ca3fedf8135600641335f54c5eb6e536";

  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const sessionId = localStorage.getItem("tmdb_session_id");

  const fetchFavorites = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/account/{account_id}/favorite/movies?api_key=${API_KEY}&session_id=${sessionId}`
      );
      setFavorites(response.data.results);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching favorites:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!sessionId) {
      navigate("/login");
      return;
    }

    fetchFavorites();
  }, [sessionId, navigate]);

  return (
    <Container>
      {favorites.length !== 0 && (
        <Box sx={{ marginTop: "2rem", marginBottom: "1rem" }}>
          <Typography variant="subtitle" gutterBottom>
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
      ) : favorites.length === 0 ? (
        <Box sx={{ textAlign: "center", marginTop: "2rem" }}>
          <Typography variant="title" color={"#fff"}>
            You have no favorite movies yet.
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={2}>
          {favorites.map((movie) => (
            <Grid
              key={movie.id}
              item
              xs={6}
              sm={4}
              md={3}
              lg={2}
              sx={{ marginY: "0.5rem" }}
            >
              <MovieCard movie={movie} callback={fetchFavorites()} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default Favorites;
