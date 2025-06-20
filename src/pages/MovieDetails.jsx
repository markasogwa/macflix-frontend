import axios from "axios";
import { Heart, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import MovieCredits from "../components/MovieCredits";
import MovieRecommendations from "../components/MovieRecommendations";
import MovieReviews from "../components/MovieReviews";

export default function MovieDetails({ user, token }) {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/movie/${id}`
        );
        setMovie(res.data);
      } catch (err) {
        console.error("Error fetching movie details:", err);
        setError("Failed to load movie details");
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
  }, [id]);

  const saveFavorite = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/favorite`,
        {
          movieId: movie.id.toString(),
          title: movie.title,
          posterPath: movie.poster_path,
          overview: movie.overview,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Saved to favorites!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to save movie.");
    }
  };

  const saveToWatchlist = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/watchlist`,
        {
          movieId: movie.id.toString(),
          title: movie.title,
          posterPath: movie.poster_path,
          overview: movie.overview,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Added to watchlist!");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to add to watchlist."
      );
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
        <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent border-solid rounded-full animate-spin"></div>
        <p className="mt-4 text-lg font-medium text-cyan-400">
          Loading Movie Details...
        </p>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950 text-red-500">
        <p className="text-xl">{error}</p>
      </div>
    );

  return (
    <div className="bg-gray-950 text-white min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Movie poster */}
        <div className="flex justify-center md:justify-start">
          <img
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : "https://via.placeholder.com/500x750?text=No+Image"
            }
            alt={movie.title}
            className="rounded-xl shadow-lg w-full max-w-[500px]"
          />
        </div>

        {/* Movie details */}
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-cyan-300 mb-3">
            {movie.title}
          </h1>

          <div className="text-sm text-gray-400 mb-3 space-x-4">
            <span>
              <strong className="text-white">Release:</strong>{" "}
              {movie.release_date}
            </span>
            <span>
              <strong className="text-white">Rating:</strong>{" "}
              <span className="bg-green-600 text-white px-2 py-0.5 rounded-full text-xs font-semibold">
                {movie.vote_average} / 10
              </span>
            </span>
          </div>

          {/* Genres */}
          <div className="flex flex-wrap gap-2 mb-6">
            {movie.genres?.length ? (
              movie.genres.map((genre) => (
                <span
                  key={genre.id}
                  className="bg-gray-800 text-cyan-200 text-xs px-3 py-1 rounded-full font-medium"
                >
                  {genre.name}
                </span>
              ))
            ) : (
              <span className="text-red-400 italic">Unknown Genre</span>
            )}
          </div>

          {/* Overview */}
          <p className="text-gray-300 leading-relaxed mb-6">{movie.overview}</p>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={saveFavorite}
              className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg shadow transition"
            >
              <Heart className="h-4 w-4" /> Save to Favorites
            </button>

            <button
              onClick={saveToWatchlist}
              className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg shadow transition"
            >
              <Plus className="h-4 w-4" /> Add to Watchlist
            </button>
          </div>
        </div>
      </div>

      {/* Reviews */}
      <div className="mt-12">
        <MovieReviews movieId={id} user={user} token={token} />
      </div>

      {/* Credits and Recommendations */}
      <div className="mt-12">
        <MovieCredits id={id} />
        <MovieRecommendations id={id} />
      </div>
    </div>
  );
}
