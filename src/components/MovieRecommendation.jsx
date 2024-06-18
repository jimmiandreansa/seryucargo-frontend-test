/* eslint-disable no-undef */
import { Box, Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import MovieCard from "./MovieCard";

const MovieRecommendation = () => {
  const { id } = useParams();
  const [recommendations, setRecommendations] = useState([]);
  const API_KEY = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const recommendationsResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${API_KEY}&language=en-US`
        );
        setRecommendations(recommendationsResponse.data.results);
      } catch (error) {
        console.error(
          "Failed to fetch movie details or recommendations",
          error
        );
      }
    };

    fetchMovieDetails();
  }, [id]);

  return (
    <Container sx={{ pb: 4 }}>
      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          textAlign: { xs: "center", md: "left" },
        }}
      >
        <Typography
          variant="h5"
          sx={{ mt: 6, mb: 2, fontWeight: { xs: "normal", md: "bold" } }}
          color={"#FFF"}
        >
          Recommendations
        </Typography>
        <Box
          sx={{
            display: "flex",
            overflowX: "auto",
            whiteSpace: "nowrap",
            padding: "16px 0",
            "&::-webkit-scrollbar": {
              height: "8px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#D9D9D9",
              borderRadius: "4px",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              backgroundColor: "#555",
            },
          }}
        >
          {recommendations.map((recommendation) => (
            <MovieCard key={recommendation.id} movie={recommendation} />
          ))}
        </Box>
      </Box>
    </Container>
  );
};

export default MovieRecommendation;
