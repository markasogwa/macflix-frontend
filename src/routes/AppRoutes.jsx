import NavBar from "@/components/NavBar";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { PrivateRoute } from "../components/PrivateRoute";
import { useAuth } from "../context/useAuth";
import Favorites from "../pages/FavoritesMovie";
import Home from "../pages/Home";
import Login from "../pages/Login";
import MovieDetails from "../pages/MovieDetails";
import NotFound from "../pages/NotFound";
import Profile from "../pages/profile";
import Register from "../pages/Register";
import SearchMovies from "../pages/SearchMovies";
import WatchlistPage from "../pages/WatchlistPage";

export default function AppRoutes({ user, token }) {
  const { loading } = useAuth();

  if (loading) {
    return <div className="text-center mt-10"></div>;
  }
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/search" element={<SearchMovies />} />
        <Route path="*" element={<NotFound />} />

        <Route
          path="/watchlist"
          element={
            <PrivateRoute>
              <WatchlistPage user={user} token={token} />
            </PrivateRoute>
          }
        />

        <Route
          path="/favorite"
          element={
            <PrivateRoute>
              <Favorites user={user} token={token} />
            </PrivateRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="/movie/:id"
          element={<MovieDetails user={user} token={token} />}
        />
      </Routes>
    </Router>
  );
}
