import axios from "axios";
import { Heart, PlayCircle, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Modal from "react-modal";
import { Link, useParams } from "react-router-dom";
import MovieCredits from "../components/MovieCredits";
import MovieRecommendations from "../components/MovieRecommendations";
import MovieReviews from "../components/MovieReviews";
import MovieTrailer from "../components/MovieTrailer";
import { useAuth } from "../context/useAuth";

Modal.setAppElement("#root"); // Ensure this matches your app root ID

export default function MovieDetails() {
  const { auth } = useAuth();
  const { user, token } = auth;
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

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

          {/* Icon Buttons with Labels */}
          <div className="flex gap-8 mt-6 text-cyan-300 text-lg">
            <button
              onClick={saveFavorite}
              className="flex items-center gap-2 hover:text-red-500 transition"
              aria-label="Add to Favorites"
            >
              <Heart className="w-6 h-6" />
              <span className="text-base">Favorite</span>
            </button>

            <button
              onClick={saveToWatchlist}
              className="flex items-center gap-2 hover:text-green-500 transition"
              aria-label="Add to Watchlist"
            >
              <Plus className="w-6 h-6" />
              <span className="text-base">Watchlist</span>
            </button>

            <button
              onClick={() => setModalIsOpen(true)}
              className="flex items-center gap-2 hover:text-yellow-400 transition"
              aria-label="Watch Trailer"
            >
              <PlayCircle className="w-6 h-6" />
              <span className="text-base">Watch Trailer</span>
            </button>
          </div>

          {/* Show login prompt button if user is not logged in */}
          {!user && (
            <div className="mt-4">
              <Link to={"/login"}>
                <button className="bg-red-600 hover:bg-cyan-700 text-white py-2 px-4 rounded font-semibold">
                  Login to view your favorite and watchlist
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Modal for Trailer */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Trailer Modal"
        className="bg-black p-4 rounded-lg max-w-3xl mx-auto mt-20 outline-none"
        overlayClassName="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-start z-50"
      >
        <div className="flex justify-end mb-2">
          <button
            onClick={() => setModalIsOpen(false)}
            className="text-white text-sm bg-red-600 hover:bg-red-700 px-3 py-1 rounded"
          >
            Close
          </button>
        </div>
        <MovieTrailer movieId={movie.id} />
      </Modal>

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
