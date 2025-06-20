import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import MovieFilter from "../components/MovieFilter";
import MovieGenres from "../components/MovieGenres";
import MovieRatingYear from "../components/MovieRatingYear";
import RecommendationList from "../components/RecommendationList";
import { useAuth } from "../context/useAuth";
import { useInfiniteRecommendations } from "../hooks/useInfiniteRecommendations";

export default function Home() {
  const [popularMovies, setPopularMovies] = useState([]);
  const [filterMovies, setFilterMovies] = useState([]);
  const [popularLoading, setPopularLoading] = useState(true);
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

  useEffect(() => {
    setPopularLoading(true);
    axios
      .get("api/movie/popular")
      .then((res) => {
        setPopularMovies(res.data.results);
        setFilterMovies(res.data.results);
      })
      .catch((err) => {
        console.error("Error fetching movies:", err);
      })
      .finally(() => {
        setPopularLoading(false);
      });
  }, []);

  const handleFilterChange = ({ minRating, releaseYear, sortBy }) => {
    let updated = [...popularMovies];

    if (minRating) {
      updated = updated.filter(
        (movie) => movie.vote_average >= parseFloat(minRating)
      );
    }

    if (releaseYear) {
      const yearNum = parseInt(releaseYear);
      updated = updated.filter((movie) => {
        if (!movie.release_date) return false;
        const movieYear = new Date(movie.release_date).getFullYear();
        return !isNaN(movieYear) && movieYear >= yearNum;
      });
    }

    if (sortBy) {
      updated.sort((a, b) => {
        if (sortBy === "popularity") return b.popularity - a.popularity;
        if (sortBy === "rating") return b.vote_average - a.vote_average;
        if (sortBy === "release")
          return new Date(b.release_date) - new Date(a.release_date);
        return 0;
      });
    }

    setFilterMovies(updated);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 px-6 py-10">
      <div className="max-w-7xl mx-auto">
        {user ? (
          <>
            <h1 className="text-3xl font-semibold mb-8">
              Welcome, {user.username}!
            </h1>

            {/* Recommended Movies */}
            {recommendedLoading ? (
              <LoadingSpinner message="Loading personalized recommendations..." />
            ) : (
              <section className="mb-12">
                <h2 className="text-2xl font-bold mb-4">
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
            <h1 className="text-3xl font-bold mb-6">
              Welcome to MacFlix Movie App
            </h1>
            <p className="mb-8 text-gray-700">
              Please log in to see personalized recommendations{" "}
              <Link
                to="/login"
                className="text-red-600 font-semibold hover:underline ml-2"
              >
                Login
              </Link>
            </p>
          </>
        )}

        {/* Movie Filter - visible to all users */}
        <div className="mb-8">
          <MovieFilter onFilterChange={handleFilterChange} />
        </div>

        {/* Movie Grid */}
        <section className="mt-4">
          <h2 className="text-2xl font-bold mb-4">
            {user ? "Popular Movies" : "Browse Movies"}
          </h2>

          {popularLoading ? (
            <LoadingSpinner message="Loading movies..." />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-8">
              {filterMovies.map((movie) => (
                <div
                  key={movie.id}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                >
                  <Link to={`/movie/${movie.id}`} className="block">
                    <img
                      src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                      alt={movie.title}
                      className="w-full h-[320px] object-cover"
                      loading="lazy"
                    />
                    <div className="text-center">
                      <h2 className="text-lg font-semibold mb-1 truncate px-2 pt-2">
                        {movie.title}
                      </h2>
                    </div>

                    <MovieRatingYear
                      voteAverage={movie.vote_average}
                      releaseDate={movie.release_date}
                    />
                    <MovieGenres genreIds={movie.genre_ids || []} />
                  </Link>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
