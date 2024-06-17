import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import Watchlist from "./pages/WatchList";
import Login from "./pages/Login";
import Callback from "./pages/Callback";
import Layout from "./layouts/Layout";
import Favorites from "./pages/Favorites";
import UserProvider from "./contexts/UserContext";
import { WatchlistProvider } from "./contexts/WatchlistContext";
import { FavoriteProvider } from "./contexts/FavoriteContext";

const App = () => (
  <UserProvider>
    <WatchlistProvider>
      <FavoriteProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="/movie/:id" element={<MovieDetails />} />
              <Route path="/watchlist" element={<Watchlist />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/login" element={<Login />} />
              <Route path="/callback" element={<Callback />} />
            </Route>
          </Routes>
        </Router>
      </FavoriteProvider>
    </WatchlistProvider>
  </UserProvider>
);

export default App;
