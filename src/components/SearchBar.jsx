import { useState, useEffect } from "react";
import axios from "axios";
import { InputBase, Container, List, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { IoSearchOutline } from "react-icons/io5";
import MovieSearchList from "./MovieSearchList";

const Search = styled("div")(() => ({
  position: "relative",
  borderRadius: "2rem",
  backgroundColor: "#0EA5E9",
  width: "100%",
  maxWidth: "600px",
  margin: "0 auto",
  height: "3rem",
  display: "flex",
  alignItems: "center", 
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#FFFFFF",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "#FFFFFF",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1.5, 1, 1.5, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    height: "100%",
    boxSizing: "border-box",
    display: "flex",
    alignItems: "center",
  },
}));

function SearchBar() {
  const API_KEY = import.meta.env.VITE_API_KEY;

  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (searchTerm) {
      const fetchMovies = async () => {
        try {
          const response = await axios.get(
            `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchTerm}`
          );
          setMovies(response.data.results);
        } catch (error) {
          console.error("Error fetching movies:", error);
        }
      };

      fetchMovies();
    } else {
      setMovies([]);
    }
  }, [searchTerm]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    if (event.target.value === "") {
      setMovies([]);
    }
  };

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "2rem",
        }}
      >
        <Search>
          <SearchIconWrapper>
            <IoSearchOutline />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search movie here..."
            inputProps={{ "aria-label": "search" }}
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </Search>
      </Box>
      <List sx={{ marginTop: "1rem" }}>
        <MovieSearchList movies={movies} />
      </List>
    </Container>
  );
}

export default SearchBar;
