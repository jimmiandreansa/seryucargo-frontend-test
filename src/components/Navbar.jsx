import { useContext, useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
} from "@mui/material";
import { Link, Link as RouterLink, useLocation } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { IoLogOut } from "react-icons/io5";

const Navbar = () => {
  const { user, logout } = useContext(UserContext);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: scrolled
          ? "rgba(25, 118, 210, 0.7)" // Biru dengan transparansi saat di-scroll
          : "rgba(25, 118, 210, 1)", // Warna biru solid
        transition: "background-color 0.3s ease",
      }}
    >
      <Toolbar>
        <Container
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            variant="title"
            component={RouterLink}
            to="/"
            style={{
              textDecoration: "none",
              color: "white",
              letterSpacing: "1rem",
            }}
          >
            CINEMA
          </Typography>
          <Box display={"flex"} alignItems={"center"} gap={2}>
            <Button
              color="inherit"
              component={RouterLink}
              to="/favorites"
              style={{
                color: "white",
                textTransform: "none",
                fontWeight: "normal",
                backgroundColor: isActive("/favorites")
                  ? "rgba(0, 0, 0, 0.2)"
                  : "transparent",
              }}
            >
              Favorites
            </Button>
            <Button
              color="inherit"
              component={RouterLink}
              to="/watchlist"
              style={{
                color: "white",
                textTransform: "none",
                fontWeight: "normal",
                backgroundColor: isActive("/watchlist")
                  ? "rgba(0, 0, 0, 0.2)"
                  : "transparent",
              }}
            >
              Watchlist
            </Button>
            {user ? (
              <Link
                onClick={logout}
                style={{
                  color: "white",
                  paddingTop: "0.3rem",
                  marginLeft: "1rem",
                }}
              >
                <IoLogOut size={20} />
              </Link>
            ) : null}
          </Box>
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
