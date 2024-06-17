/* eslint-disable react/prop-types */
import {
  Box,
  Typography,
  Container,
  Grid,
  CircularProgress,
} from "@mui/material";
import MovieCard from "./MovieCard";

const MovieList = ({
  nowPlaying,
  loadingNowPlaying,
  topRated,
  loadingTopRated,
  addToWatchlist,
  addToFavorites,
}) => (
  <Container>
    <Box sx={{ marginTop: "2rem" }}>
      <Typography variant="subtitle" gutterBottom>
        Now Playing
      </Typography>
    </Box>
    {loadingNowPlaying ? (
      <Box
        sx={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}
      >
        <CircularProgress />
      </Box>
    ) : (
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
        {nowPlaying.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </Box>
    )}
    <Box sx={{ marginTop: "2rem", marginBottom: "1rem" }}>
      <Typography variant="subtitle" gutterBottom>
        Top Rated
      </Typography>
    </Box>
    {loadingTopRated ? (
      <Box
        sx={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}
      >
        <CircularProgress />
      </Box>
    ) : (
      <Grid container>
        {topRated.map((movie) => (
          <Grid
            key={movie.id}
            xs={6}
            sm={4}
            md={3}
            lg={2}
            sx={{ marginY: "0.5rem" }}
          >
            <MovieCard
              movie={movie}
              addToWatchlist={addToWatchlist}
              addToFavorites={addToFavorites}
            />
          </Grid>
        ))}
      </Grid>
    )}
  </Container>
);

export default MovieList;
