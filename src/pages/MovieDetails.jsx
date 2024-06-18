/* eslint-disable react/prop-types */
import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  Card,
  CardMedia,
  CardContent,
  IconButton,
} from "@mui/material";
import { Rating } from "@mui/lab";
import {
  IoHeartOutline,
  IoHeart,
  IoBookmarkOutline,
  IoBookmark,
} from "react-icons/io5";
import MovieRecommendation from "../components/MovieRecommendation";
import axios from "axios";
import { UserContext } from "../contexts/UserContext";
import UserScore from "../components/UserScore";

const MovieDetails = () => {
  const { id } = useParams();
  const API_KEY = import.meta.env.VITE_API_KEY;
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [rating, setRating] = useState(null);
  const [userScore, setUserScore] = useState(null);
  const {
    sessionId,
    favorites,
    watchlist,
    addToWatchlist,
    addToFavorites,
    removeFromFavorites,
    removeFromWatchlist,
  } = useContext(UserContext);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const movieResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
        );
        setMovie(movieResponse.data);
        setUserScore(movieResponse.data.vote_average * 10);

        if (sessionId) {
          const ratingResponse = await axios.get(
            `https://api.themoviedb.org/3/movie/${id}/account_states?api_key=${API_KEY}&session_id=${sessionId}`
          );
          setRating(ratingResponse.data.rated?.value / 2 || null);
        }
      } catch (error) {
        console.error(
          "Failed to fetch movie details or recommendations",
          error
        );
      }
    };

    fetchMovieDetails();
  }, [id, sessionId]);

  if (!movie) return <Typography>Loading...</Typography>;

  const isFavorite = favorites.some((fav) => fav.id === movie.id);
  const isInWatchlist = watchlist.some((watch) => watch.id === movie.id);

  const handleFavoriteClick = async () => {
    if (sessionId) {
      if (isFavorite) {
        await removeFromFavorites(movie);
      } else {
        await addToFavorites(movie);
      }
    } else {
      navigate("/login");
    }
  };

  const handleWatchlistClick = async () => {
    if (sessionId) {
      if (isInWatchlist) {
        await removeFromWatchlist(movie);
      } else {
        await addToWatchlist(movie);
      }
    } else {
      navigate("/login");
    }
  };

  const handleRatingChange = async (event, newValue) => {
    setRating(newValue);
    if (sessionId) {
      try {
        await axios.post(
          `https://api.themoviedb.org/3/movie/${id}/rating?api_key=${API_KEY}&session_id=${sessionId}`,
          {
            value: newValue * 2,
          }
        );
      } catch (error) {
        console.error("Failed to rate movie", error);
      }
    } else {
      console.error("User not logged in or session ID is missing");
      navigate("/login");
    }
  };

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
            height: { sx: "100vh", md: 400 },
            display: "flex",
            alignItems: "center",
          }}
        >
          <Card
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              backgroundColor: "transparent",
              boxShadow: "none",
              gap: 1,
            }}
          >
            <CardMedia
              component="img"
              sx={{
                width: { xs: 160, sm: 200, md: 200 },
                borderRadius: "8px",
                alignSelf: { xs: "center", md: "flex-start" },
              }}
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
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  alignItems: "center",
                  justifyContent: { xs: "center", md: "flex-start" },
                }}
              >
                <Typography
                  sx={{
                    color: "#FFF",
                    fontWeight: { xs: 600, md: 700 },
                    fontSize: { xs: "1.5rem", md: "2rem" },
                    textAlign: { xs: "center", md: "left" },
                  }}
                >
                  {movie.title}
                </Typography>
                <Typography
                  sx={{
                    color: "#FFF",
                    fontWeight: 400,
                    fontSize: { xs: "1.5rem", md: "2rem" },
                    marginLeft: 1,
                  }}
                >
                  ({new Date(movie.release_date).getFullYear()})
                </Typography>
              </Box>
              <Typography
                sx={{
                  color: "#FFF",
                  fontSize: "0.8rem",
                  display: "flex",
                  textAlign: { xs: "center", md: "left" },
                  justifyContent: { xs: "center", md: "flex-start" },
                }}
              >
                {movie.release_date} •{" "}
                {movie.genres.map((genre) => genre.name).join(", ")} •{" "}
                {movie.runtime} min
              </Typography>
              <Box
                display={"flex"}
                gap={6}
                alignItems={"center"}
                sx={{ justifyContent: { xs: "center", md: "flex-start" } }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: 2,
                    marginBottom: 1,
                  }}
                >
                  <UserScore score={userScore} />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    marginTop: 1,
                  }}
                >
                  <IconButton
                    onClick={handleWatchlistClick}
                    sx={{ padding: "0" }}
                  >
                    {isInWatchlist ? (
                      <IoBookmark color="white" size={22} />
                    ) : (
                      <IoBookmarkOutline color="white" size={22} />
                    )}
                  </IconButton>
                  <IconButton
                    onClick={handleFavoriteClick}
                    sx={{ padding: "0" }}
                  >
                    {isFavorite ? (
                      <IoHeart color="white" size={24} />
                    ) : (
                      <IoHeartOutline color="white" size={24} />
                    )}
                  </IconButton>
                </Box>
              </Box>
              <Typography
                sx={{
                  color: "#FFF",
                  display: "flex",
                  justifyContent: { xs: "center", md: "flex-start" },
                  fontStyle: "italic",
                  fontSize: "0.8rem",
                  marginBottom: 1,
                }}
              >
                {movie.tagline}
              </Typography>
              <Typography
                sx={{
                  color: "#FFF",
                  fontWeight: "medium",
                  display: "flex",
                  justifyContent: { xs: "center", md: "flex-start" },
                }}
              >
                Overview
              </Typography>
              <Typography
                variant="movieDesc"
                sx={{
                  display: "flex",
                  justifyContent: { xs: "center", md: "flex-start" },
                  textAlign: { xs: "center", md: "left" },
                }}
              >
                {movie.overview}
              </Typography>
              <Typography
                sx={{
                  color: "#FFF",
                  fontWeight: "medium",
                  marginTop: 1,
                  display: "flex",
                  justifyContent: { xs: "center", md: "flex-start" },
                }}
              >
                Your rating:
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: { xs: "center", md: "flex-start" },
                }}
              >
                <Rating
                  value={rating || 0}
                  precision={0.5}
                  onChange={handleRatingChange}
                  sx={{
                    color: "#FFC107",
                    "& .MuiRating-iconEmpty": {
                      color: "#FFF",
                    },
                  }}
                />
              </Box>
            </CardContent>
          </Card>
        </Container>
      </Box>
      <MovieRecommendation />
    </>
  );
};

export default MovieDetails;
