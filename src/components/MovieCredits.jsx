import axios from "axios";
import { useEffect, useState } from "react";

const MovieCredits = ({ id }) => {
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCredits = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/movie/${id}/credits`
        );
        if (res.data && res.data.cast) {
          setCast(res.data.cast || []);
        }
      } catch (error) {
        console.error("Failed to load credits", error);
        setError("Could not load cast information");
      } finally {
        setLoading(false);
      }
    };
    fetchCredits();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-[200px] flex flex-col items-center justify-center bg-gray-900 text-white">
        <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent border-solid rounded-full animate-spin"></div>
        <p className="mt-4 text-lg font-medium text-cyan-400">
          Loading cast information...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[200px] flex items-center justify-center bg-gray-900 text-red-500">
        <p className="text-xl">{error}</p>
      </div>
    );
  }

  if (!cast.length) {
    return (
      <div className="min-h-[200px] flex items-center justify-center bg-gray-900 text-white">
        <p className="text-xl text-gray-400 mt-8 italic">
          No cast information available
        </p>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold text-white mb-4">Top Cast</h2>
      <div
        className="flex space-x-6 overflow-x-auto overflow-y-hidden scrollbar-thin scrollbar-thumb-cyan-600 scrollbar-track-gray-800 px-2"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {cast.slice(0, 10).map((actor) => (
          <div
            key={actor.id}
            className="min-w-[140px] bg-gray-800 rounded-lg shadow-md p-3 text-center text-white flex-shrink-0 hover:scale-105 transition-transform duration-300"
            style={{ height: "280px" }}
          >
            {actor.profile_path && actor.profile_path.trim() !== "" ? (
              <img
                src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
                alt={actor.name}
                className="w-full h-48 object-cover rounded-md mb-2"
              />
            ) : (
              <div className="w-full h-48 flex items-center justify-center bg-gray-700 text-gray-300 rounded-md mb-2">
                No Image
              </div>
            )}

            <h4 className="text-sm font-bold truncate">{actor.name}</h4>
            <p className="text-xs text-gray-400 truncate">
              as {actor.character}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieCredits;
