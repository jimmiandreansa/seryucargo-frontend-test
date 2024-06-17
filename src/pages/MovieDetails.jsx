import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import { IoHeartOutline } from "react-icons/io5";
import { IoBookmarkOutline } from "react-icons/io5";
import MovieRecommendation from "../components/MovieRecommendation";
import axios from "axios";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const apiKey = "ca3fedf8135600641335f54c5eb6e536";
      try {
        const movieResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`
        );
        setMovie(movieResponse.data);
      } catch (error) {
        console.error(
          "Failed to fetch movie details or recommendations",
          error
        );
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (!movie) return <Typography>Loading...</Typography>;

  return (
    <>
      <Box sx={{ position: "relative", color: "#fff" }}>
        <CardMedia
          component="img"
          alt={movie.title}
          height="400"
          image={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          title={movie.title}
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 1,
            opacity: 0.7,
          }}
        />
        <Container
          sx={{
            p: 3,
            position: "relative",
            zIndex: 1,
            height: 400,
            display: "flex",
            alignItems: "center",
          }}
        >
          <Card
            sx={{
              display: "flex",
              backgroundColor: "transparent",
              boxShadow: "none",
              gap: 1
            }}
          >
            <CardMedia
              component="img"
              sx={{ width: 200, borderRadius: "8px" }}
              image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography variant="movieTitle">{movie.title}</Typography>
                <Typography
                  variant="movieTitle"
                  sx={{ fontWeight: 400, marginLeft: 1 }}
                >
                  ({new Date(movie.release_date).getFullYear()})
                </Typography>
              </Box>
              <Typography sx={{ color: "#FFF", fontSize: "0.8rem" }}>
                {movie.release_date} •{" "}
                {movie.genres.map((genre) => genre.name).join(", ")} •{" "}
                {movie.runtime} min
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  marginY: 1,
                }}
              >
                <Link to={"/"}>
                  <IoBookmarkOutline color="white" size={22} />
                </Link>
                <Link to={"/"}>
                  <IoHeartOutline color="white" size={24} />
                </Link>
              </Box>
              <Typography
                sx={{
                  color: "#FFF",
                  fontStyle: "italic",
                  fontSize: "0.8rem",
                  marginBottom: 1,
                }}
              >
                {movie.tagline}
              </Typography>
              <Typography sx={{ color: "#FFF", fontWeight: "medium" }}>
                Overview
              </Typography>
              <Typography variant="movieDesc" paragraph>
                {movie.overview}
              </Typography>
            </CardContent>
          </Card>
        </Container>
      </Box>
      <MovieRecommendation />
    </>
  );
};

export default MovieDetails;
