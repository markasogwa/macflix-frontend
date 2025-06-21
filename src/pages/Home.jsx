import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import MovieFilter from "../components/MovieFilter";
import {
  NowPlayingMovieList,
  PopularMovieList,
  TopRatedMovieList,
  UpcomingMovieList,
} from "../components/MovieList";
import RecommendationList from "../components/RecommendationList";
import { useAuth } from "../context/useAuth";
import { useInfiniteRecommendations } from "../hooks/useInfiniteRecommendations";

export default function Home() {
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);

  const [nowPlayingLoading, setNowPlayingLoading] = useState(true);
  const [topRatedLoading, setTopRatedLoading] = useState(true);
  const [popularLoading, setPopularLoading] = useState(true);
  const [upcomingLoading, setUpcomingLoading] = useState(true);

  const {
    auth: { user, token },
  } = useAuth();

  const userId = user?.id ?? null;
  const authToken = token ?? null;

  const {
    movies: recommendedMovies,
    loading: recommendedLoading,
    error,
    loadMore,
    hasMore,
  } = useInfiniteRecommendations(userId, authToken);

  // Fetch Now Playing
  useEffect(() => {
    setNowPlayingLoading(true);
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/api/movie/now_playing`)
      .then((res) => setNowPlayingMovies(res.data.results))
      .catch((err) => console.error("Error fetching now playing:", err))
      .finally(() => setNowPlayingLoading(false));
  }, []);

  // Fetch Top Rated
  useEffect(() => {
    setTopRatedLoading(true);
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/api/movie/top_rated`)
      .then((res) => setTopRatedMovies(res.data.results))
      .catch((err) => console.error("Error fetching top rated:", err))
      .finally(() => setTopRatedLoading(false));
  }, []);

  // Fetch Popular
  useEffect(() => {
    setPopularLoading(true);
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/api/movie/popular`)
      .then((res) => setPopularMovies(res.data.results))
      .catch((err) => console.error("Error fetching popular:", err))
      .finally(() => setPopularLoading(false));
  }, []);

  // Fetch Upcoming
  useEffect(() => {
    setUpcomingLoading(true);
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/api/movie/upcoming`)
      .then((res) => setUpcomingMovies(res.data.results))
      .catch((err) => console.error("Error fetching upcoming:", err))
      .finally(() => setUpcomingLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-gray-100 px-6 py-10 sm:py-16">
      <div className="max-w-7xl mx-auto">
        {/* Header & Welcome */}
        {user ? (
          <>
            <h1 className="text-4xl sm:text-5xl font-extrabold mb-8 tracking-wide drop-shadow-lg">
              Welcome, <span className="text-red-500">{user.username}</span>!
            </h1>

            {/* Recommended Movies */}
            {recommendedLoading ? (
              <LoadingSpinner message="Loading personalized recommendations..." />
            ) : (
              <section className="mb-16">
                <h2 className="text-3xl font-bold mb-6 border-b-2 border-red-600 inline-block pb-2 tracking-wide">
                  Smart Recommended Movies for You
                </h2>
                <RecommendationList
                  movies={recommendedMovies}
                  loading={recommendedLoading}
                  error={error}
                  loadMore={loadMore}
                  hasMore={hasMore}
                />
              </section>
            )}
          </>
        ) : (
          <>
            <h1 className="text-4xl sm:text-5xl font-extrabold mb-6 tracking-wide drop-shadow-lg">
              Welcome to <span className="text-red-600">MacFlix</span> Movie App
            </h1>
            <p className="mb-12 text-gray-300 max-w-lg text-lg leading-relaxed">
              Please log in to see personalized recommendations.
              <Link
                to="/login"
                className="ml-2 inline-block text-red-500 font-semibold hover:underline focus:outline-none focus:ring-2 focus:ring-red-500 rounded"
              >
                Login
              </Link>
            </p>
          </>
        )}

        {/* Movie Filter */}
        <div className="mb-12">
          <MovieFilter onFilterChange={() => {}} />
        </div>

        {/* Movie Lists in grid with cards */}
        <section className="space-y-16">
          {/* Now Playing */}
          <div>
            <NowPlayingMovieList
              movies={nowPlayingMovies}
              loading={nowPlayingLoading}
            />
          </div>

          {/* Top Rated */}
          <div>
            <TopRatedMovieList
              movies={topRatedMovies}
              loading={topRatedLoading}
            />
          </div>

          {/* Popular */}
          <div>
            <PopularMovieList movies={popularMovies} loading={popularLoading} />
          </div>

          {/* Upcoming */}
          <div>
            <UpcomingMovieList
              movies={upcomingMovies}
              loading={upcomingLoading}
            />
          </div>
        </section>
      </div>
    </div>
  );
}
