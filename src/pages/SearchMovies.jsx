import axios from "axios";
import { useCallback, useEffect, useState } from "react";

import GenresSelect from "../components/GenresSelect";
import LoadingSpinner from "../components/LoadingSpinner";
import MovieCard from "../components/MovieCard";
import MovieGenres from "../components/MovieGenres";
import MovieRatingYear from "../components/MovieRatingYear";
import YearsSelect from "../components/YearsSelect";

export default function SearchMovies() {
  const [filters, setFilters] = useState({
    title: "",
    genre: "",
    year: "",
  });

  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchMovies = useCallback(
    async (newPage = 1, append = false) => {
      setLoading(true);
      setError("");

      try {
        const params = {};

        if (filters.title.trim()) params.title = filters.title.trim();
        if (filters.genre) params.genre = filters.genre;
        if (filters.year) params.year = filters.year;

        params.page = newPage;

        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/movie/search`,
          { params }
        );
        const results = Array.isArray(res.data?.results)
          ? res.data.results
          : [];

        if (append) {
          setMovies((prev) => [...prev, ...results]);
        } else {
          setMovies(results);
        }

        setPage(newPage);
        setTotalPages(res.data.total_pages || 1);
      } catch {
        setError("Failed to fetch movies");
      } finally {
        setLoading(false);
      }
    },
    [filters.title, filters.genre, filters.year]
  );

  const loadPopularMovies = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/movie/popular`
      );
      setMovies(Array.isArray(res.data.results) ? res.data.results : []);
      setTotalPages(res.data.total_pages || 1);
    } catch {
      setError("Failed to load popular movies");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPopularMovies();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchMovies(1);
  };

  const handleReset = () => {
    setFilters({ title: "", year: "", genre: "" });
    setMovies([]);
    setError("");
    loadPopularMovies();
  };

  const loadMore = () => {
    if (page < totalPages) {
      fetchMovies(page + 1, true);
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">
          🎬 Discover Movies
        </h1>

        {/* Search Form */}
        <form
          onSubmit={handleSearch}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 bg-gray-800 p-6 rounded-xl shadow-lg mb-10"
        >
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-gray-300">
              Title
            </label>
            <input
              type="text"
              value={filters.title}
              onChange={(e) =>
                setFilters((f) => ({ ...f, title: e.target.value }))
              }
              placeholder="Enter movie title"
              className="bg-gray-700 border border-gray-600 rounded px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          <GenresSelect
            value={filters.genre}
            onChange={(e) =>
              setFilters((f) => ({ ...f, genre: e.target.value }))
            }
          />

          <YearsSelect
            value={filters.year}
            onChange={(e) =>
              setFilters((f) => ({ ...f, year: e.target.value }))
            }
          />

          <div className="flex gap-2 mt-6 sm:mt-0">
            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-cyan-700 text-white font-medium py-2 px-4 rounded transition"
            >
              Search
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="w-full border border-red-600 text-cyan-400 hover:bg-gray-700 py-2 px-4 rounded transition"
            >
              Reset
            </button>
          </div>
        </form>
      </div>

      {/* Status/Error/Empty states */}
      {loading && <LoadingSpinner />}

      {error && (
        <div className="text-red-500 text-center font-semibold my-4">
          {error}
        </div>
      )}

      {!loading &&
        !error &&
        (!Array.isArray(movies) || movies.length === 0) && (
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
        {Array.isArray(movies) &&
          movies.length > 0 &&
          movies.map((movie) => (
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

      {/* Load More Button */}
      {page < totalPages && !loading && (
        <div className="text-center mt-10">
          <button
            onClick={loadMore}
            className="bg-cyan-600 hover:bg-cyan-700 text-white font-semibold px-6 py-2 rounded-lg transition"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}
