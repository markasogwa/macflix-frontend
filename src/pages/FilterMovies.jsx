import axios from "axios";
import { useCallback, useEffect, useState } from "react";

import GenresSelect from "../components/GenresSelect";
import LoadingSpinner from "../components/LoadingSpinner";
import MovieCard from "../components/MovieCard";
import MovieGenres from "../components/MovieGenres";
import MovieRatingYear from "../components/MovieRatingYear";
import YearsSelect from "../components/YearsSelect";

export default function FilterMovies() {
  const [filters, setFilters] = useState({
    genre: "",
    year: "",
    minRating: "",
    sortBy: "",
  });

  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Load popular movies initially
  const loadPopularMovies = useCallback(async (page = 1, append = false) => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/movie/popular`,
        { params: { page } }
      );
      const results = Array.isArray(res.data.results) ? res.data.results : [];

      if (append) {
        setMovies((prev) => [...prev, ...results]);
      } else {
        setMovies(results);
      }

      setPage(page);
      setTotalPages(res.data.total_pages || 1);
    } catch {
      setError("Failed to load popular movies");
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch filtered movies
  const fetchFilteredMovies = useCallback(
    async (newPage = 1, append = false) => {
      setLoading(true);
      setError("");

      try {
        const params = { page: newPage };

        if (filters.genre) params.genre = filters.genre;
        if (filters.year) params.year = filters.year;
        if (filters.minRating && !isNaN(filters.minRating))
          params.minRating = filters.minRating;
        if (filters.sortBy) params.sortBy = filters.sortBy;

        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/movie/filter`,
          { params }
        );
        const results = Array.isArray(res.data.results) ? res.data.results : [];

        if (append) {
          setMovies((prev) => [...prev, ...results]);
        } else {
          setMovies(results);
        }

        setPage(newPage);
        setTotalPages(res.data.total_pages || 1);
      } catch {
        setError("Failed to fetch filtered movies");
      } finally {
        setLoading(false);
      }
    },
    [filters]
  );

  // On mount load popular movies
  useEffect(() => {
    loadPopularMovies();
  }, [loadPopularMovies]);

  // When filters change, fetch filtered movies or popular movies if no filters
  useEffect(() => {
    const hasFilters =
      filters.genre !== "" ||
      filters.year !== "" ||
      filters.minRating !== "" ||
      filters.sortBy !== "";

    if (hasFilters) {
      fetchFilteredMovies(1);
    } else {
      loadPopularMovies();
    }
  }, [filters, fetchFilteredMovies, loadPopularMovies]);

  const handleFilterChange = (key, value) => {
    setFilters((f) => ({ ...f, [key]: value }));
    setPage(1);
  };

  const loadMore = () => {
    if (page < totalPages) {
      const hasFilters =
        filters.genre !== "" ||
        filters.year !== "" ||
        filters.minRating !== "" ||
        filters.sortBy !== "";

      if (hasFilters) {
        fetchFilteredMovies(page + 1, true);
      } else {
        loadPopularMovies(page + 1, true);
      }
    }
  };

  const handleReset = () => {
    setFilters({
      genre: "",
      year: "",
      minRating: "",
      sortBy: "",
    });
    setMovies([]);
    setError("");
    loadPopularMovies();
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">
          🎞️ Filter Movies
        </h1>

        {/* Filter Form */}
        <form
          onSubmit={(e) => e.preventDefault()}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 bg-gray-800 p-6 rounded-xl shadow-lg mb-10"
        >
          <GenresSelect
            value={filters.genre}
            onChange={(e) => handleFilterChange("genre", e.target.value)}
          />

          <YearsSelect
            value={filters.year}
            onChange={(e) => handleFilterChange("year", e.target.value)}
          />
          <div className="flex flex-col">
            <input
              type="number"
              min="0"
              max="10"
              step="0.1"
              placeholder="Min Rating"
              value={filters.minRating}
              onChange={(e) => handleFilterChange("minRating", e.target.value)}
              className="bg-gray-700 border border-gray-600 rounded px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          <div className="flex flex-col">
            <select
              value={filters.sortBy}
              onChange={(e) => handleFilterChange("sortBy", e.target.value)}
              className="bg-gray-700 border border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              <option value="">Sort By</option>
              <option value="popularity.desc">Popularity Desc</option>
              <option value="popularity.asc">Popularity Asc</option>
              <option value="release_date.desc">Release Date Desc</option>
              <option value="release_date.asc">Release Date Asc</option>
              <option value="vote_average.desc">Rating Desc</option>
              <option value="vote_average.asc">Rating Asc</option>
            </select>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleReset}
              disabled={loading}
              className="border border-red-600 text-cyan-400 hover:bg-gray-700 py-2 px-4 rounded transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Reset
            </button>
          </div>
        </form>
      </div>

      {/* Movie Grid */}
      <div
        className="
    grid
    grid-cols-1
    sm:grid-cols-2
    md:grid-cols-3
    xl:grid-cols-5
    gap-6
    mx-auto
    px-6
  "
      >
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="
        bg-gray-800
        rounded-xl
        p-4
        shadow
        flex
        flex-col
        hover:scale-[1.03]
        transition-transform
        duration-300
        ease-in-out
      "
          >
            <MovieCard movie={movie} />
            <MovieRatingYear
              voteAverage={movie.vote_average}
              releaseDate={movie.release_date}
            />
            <MovieGenres genreIds={movie.genre_ids || []} />
          </div>
        ))}
      </div>

      {/* Loading/Error/Empty states */}
      {loading && <LoadingSpinner />}

      {error && (
        <div className="text-red-500 text-center font-semibold my-4">
          {error}
        </div>
      )}

      {!loading && !error && movies.length === 0 && (
        <div className="text-gray-400 text-center my-4">No movies found.</div>
      )}

      {/* Movie Grid */}
      <div
        className="
          grid
          grid-cols-1      /* 1 col on mobile */
          sm:grid-cols-2   /* 2 cols on small screens */
          md:grid-cols-3   /* 3 cols on medium screens */
          xl:grid-cols-5   /* 5 cols on extra-large */
          gap-6
        "
      >
        {movies.map((movie) => (
          <div
            key={movie.id}
            className=" bg-gray-800
                rounded-xl
                p-4
                shadow
                flex
                flex-col
                hover:scale-[1.03]
                transition-transform
                duration-300
                ease-in-out"
          >
            <MovieCard movie={movie} />
            <MovieRatingYear
              voteAverage={movie.vote_average}
              releaseDate={movie.release_date}
            />
            <MovieGenres genreIds={movie.genre_ids || []} />
          </div>
        ))}
      </div>

      {/* Load More Button */}
      {page < totalPages && !loading && (
        <div className="text-center mt-10">
          <button
            onClick={loadMore}
            className="bg-red-600 cursor-pointer hover:bg-cyan-700 text-white font-semibold px-6 py-2 rounded-lg transition"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}
