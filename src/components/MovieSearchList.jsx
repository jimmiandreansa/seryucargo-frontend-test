/* eslint-disable react/prop-types */
import { Grid } from "@mui/material";
import MovieCard from "./MovieCard";

const MovieSearchList = ({ movies }) => {
  return (
    <Grid container spacing={2}>
      {movies.map((movie) => (
        <Grid
          item
          key={movie.id}
          xs={6}
          sm={4}
          md={3}
          lg={2}
          sx={{ marginY: "0.5rem" }}
        >
          <MovieCard movie={movie} />
        </Grid>
      ))}
    </Grid>
  );
};

export default MovieSearchList;
