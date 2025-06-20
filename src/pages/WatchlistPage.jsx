import axios from "axios";
import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";

function Watchlist({ token }) {
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [removing, setRemoving] = useState(null);

  useEffect(() => {
    async function fetchWatchlist() {
      try {
        const res = await axios.get("/api/watchlist", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setWatchlist(res.data);
      } catch (err) {
        console.error("Error fetching watchlist:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchWatchlist();
  }, [token]);

  const handleRemove = async (id) => {
    setRemoving(id);
    try {
      await axios.delete(`/api/watchlist/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setWatchlist((prev) => prev.filter((item) => item._id !== id));
      toast.success("Removed from watchlist");
    } catch (err) {
      console.error("Failed to remove movie:", err);
      toast.error("Failed to remove movie");
    } finally {
      setRemoving(null);
    }
  };

  if (loading) {
    return <LoadingSpinner message="Loading my watchlist..." />;
  }

  return (
    <div className="p-4 sm:p-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">🎬 My Watchlist</h2>

      {watchlist.length === 0 ? (
        <div className="text-center">
          <p className="text-gray-600 mb-4">No movies in my watchlist yet.</p>
          <Link
            to="/"
            className="inline-block bg-red-600 hover:bg-red-700 text-white font-medium px-6 py-3 rounded-lg transition"
          >
            Explore Movies
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {watchlist.map((movie) => (
            <div
              key={movie._id}
              className="relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-all"
            >
              <Link to={`/movie/${movie.movieId}`} className="block">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.posterPath}`}
                  alt={movie.title}
                  className="rounded-t-2xl w-full object-cover"
                />
              </Link>
              <div className="p-4">
                <h4 className="font-bold text-lg truncate">{movie.title}</h4>
                <p className="text-sm text-gray-500 mt-1 line-clamp-3">
                  {movie.overview}
                </p>
                <button
                  onClick={() => handleRemove(movie._id)}
                  className={`mt-4 flex items-center justify-center w-full px-4 py-2 rounded-lg bg-red-100 hover:bg-red-200 text-red-600 font-medium transition ${
                    removing === movie._id
                      ? "opacity-50 pointer-events-none"
                      : ""
                  }`}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  {removing === movie._id ? "Removing..." : "Remove"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Watchlist;
