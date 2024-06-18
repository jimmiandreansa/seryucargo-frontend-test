import { useContext, useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Hidden,
} from "@mui/material";
import { Link as RouterLink, useLocation } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { UserContext } from "../contexts/UserContext";
import { IoLogOut } from "react-icons/io5";

const Navbar = () => {
  const { user, logout } = useContext(UserContext);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);

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

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          backgroundColor: scrolled ? "rgba(25, 118, 210, 0.7)" : "#0EA5E9",
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
            <Hidden smDown>
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
                {user && (
                  <RouterLink
                    onClick={logout}
                    style={{
                      color: "white",
                      paddingTop: "0.3rem",
                      marginLeft: "1rem",
                    }}
                  >
                    <IoLogOut size={20} />
                  </RouterLink>
                )}
              </Box>
            </Hidden>
            <Hidden smUp>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={toggleDrawer(true)}
                sx={{ color: "white", marginLeft: "auto" }}
              >
                <MenuIcon />
              </IconButton>
            </Hidden>
          </Container>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: {
            backgroundColor: "black",
            color: "white",
          },
        }}
      >
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            <ListItem button component={RouterLink} to="/favorites">
              <ListItemText primary="Favorites" />
            </ListItem>
            <ListItem button component={RouterLink} to="/watchlist">
              <ListItemText primary="Watchlist" />
            </ListItem>
            {user && (
              <ListItem button onClick={logout}>
                <ListItemText primary="Logout" />
                <IoLogOut size={20} />
              </ListItem>
            )}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;
