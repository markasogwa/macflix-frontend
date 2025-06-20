import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UseGenres from "../hooks/useGenres";

const MovieRecommendations = ({ id }) => {
  const [recs, setRecs] = useState([]);
  const { genres } = UseGenres();

  useEffect(() => {
    const fetchRecs = async () => {
      try {
        const res = await axios(`${import.meta.env.VITE_BASE_URL}/api/movie/${id}/recommendations`);
        setRecs(res.data || []);
      } catch (error) {
        console.error("Error fetching recommendations:", error);
      }
    };

    fetchRecs();
  }, [id]);

  // Map genre IDs to names
  const genreMap = genres.reduce((acc, genre) => {
    acc[genre.id] = genre.name;
    return acc;
  }, {});

  const getGenreNames = (ids) => {
    if (!ids || !ids.length || !Object.keys(genreMap).length)
      return "Unknown Genre";
    return ids
      .map((id) => genreMap[id])
      .filter(Boolean)
      .join(", ");
  };

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-semibold text-white mb-6">
        You May Also Like ❤
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {recs.slice(0, 10).map((movie) => (
          <div
            key={movie.id}
            className="bg-gray-800 rounded-lg shadow-md p-4 text-center text-white hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer"
          >
            <Link to={`/movie/${movie.id}`} className="block">
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                    : "https://via.placeholder.com/300x450?text=No+Image"
                }
                alt={movie.title}
                className="w-full h-[420px] object-cover rounded-md mb-3"
                loading="lazy"
              />
              <h4 className="text-base font-semibold truncate">
                {movie.title}
              </h4>
            </Link>

            <div className="flex items-center justify-center text-sm mt-2 mb-3 space-x-3">
              <span className="bg-green-600 text-white px-3 py-1 rounded-full text-xs font-medium select-none">
                👍 {movie.vote_average}
              </span>
              <span className="text-gray-500 select-none">|</span>
              <span className="text-gray-400 select-none">
                {movie.release_date
                  ? new Date(movie.release_date).getFullYear()
                  : "N/A"}
              </span>
            </div>

            <div className="flex flex-wrap justify-center gap-2">
              {getGenreNames(movie.genre_ids)
                .split(", ")
                .map((genre, index) => (
                  <span
                    key={index}
                    className="bg-gray-700 text-cyan-300 text-xs px-3 py-1 rounded-full font-medium select-none"
                  >
                    {genre}
                  </span>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieRecommendations;
