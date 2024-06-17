/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import { useContext } from "react";
import {
  IoHeartOutline,
  IoHeart,
  IoBookmarkOutline,
  IoBookmark,
} from "react-icons/io5";
import { UserContext } from "../contexts/UserContext";

const MovieCard = ({ movie, callback }) => {
  const {
    user,
    favorites,
    watchlist,
    addToWatchlist,
    addToFavorites,
    removeFromFavorites,
    removeFromWatchlist,
  } = useContext(UserContext);

  const isFavorite = favorites.some((fav) => fav.id === movie.id);
  const isInWatchlist = watchlist.some((watch) => watch.id === movie.id);

  const handleFavoriteClick = async () => {
    if (user) {
      if (isFavorite) {
        await removeFromFavorites(movie);
        await callback();
      } else {
        addToFavorites(movie);
        await callback()
      }
    } else {
      // Navigate to login or show a message
    }
  };

  const handleWatchlistClick = async () => {
    if (user) {
      if (isInWatchlist) {
        await removeFromWatchlist(movie);
        await callback();
      } else {
        await addToWatchlist(movie);
        await callback()
      }
    } else {
      // Navigate to login or show a message
    }
  };

  return (
    <Card
      sx={{
        minWidth: 180,
        margin: "0 8px",
        borderRadius: 2,
        background: "#050E12",
        position: "relative",
        "&:hover .hoverButtons": {
          opacity: 1,
        },
      }}
    >
      <Link
        to={`/movie/${movie.id}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <CardMedia
          component="img"
          height="300"
          image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
        <CardContent>
          <Typography variant="h6" component="div" noWrap color={"#ABABAB"}>
            {movie.title}
          </Typography>
          <Typography variant="body2" color={"#ABABAB"}>
            {movie.release_date?.split("-")[0]}
          </Typography>
        </CardContent>
      </Link>
      <Box
        className="hoverButtons"
        sx={{
          position: "absolute",
          display: "flex",
          alignItems: "center",
          gap: 1,
          bottom: 100,
          right: 10,
          flexDirection: "row",
          opacity: 0,
          transition: "opacity 0.3s",
        }}
      >
        <IconButton onClick={handleWatchlistClick} sx={{ padding: "0" }}>
          {isInWatchlist ? (
            <IoBookmark color="white" size={22} />
          ) : (
            <IoBookmarkOutline color="white" size={22} />
          )}
        </IconButton>
        <IconButton onClick={handleFavoriteClick} sx={{ padding: "0" }}>
          {isFavorite ? (
            <IoHeart color="white" size={24} />
          ) : (
            <IoHeartOutline color="white" size={24} />
          )}
        </IconButton>
      </Box>
    </Card>
  );
};

export default MovieCard;
