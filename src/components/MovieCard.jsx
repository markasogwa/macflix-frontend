import { Link } from "react-router-dom";

export default function MovieCard({ movie }) {
  return (
    <div className="bg-white rounded shadow p-3 flex flex-col">
      {movie.poster_path && movie.poster_path.trim() !== "" ? (
        <Link to={`/movie/${movie.id}`} className="block mt-2">
          <img
            src={`https://image.tmdb.org/t/p/w185${movie.poster_path}`}
            alt={movie.name}
            className="w-full object-contain rounded-md mb-2"
          />
        </Link>
      ) : (
        <div className="w-full h-52 flex items-center justify-center bg-gray-700 text-gray-300 rounded-md mb-">
          No Image
        </div>
      )}

      <h3 className="font-semibold text-lg text-gray-900">{movie.title}</h3>
      <p className="text-gray-600 text-sm">
        {movie.release_date
          ? new Date(movie.release_date).getFullYear()
          : "N/A"}
      </p>
    </div>
  );
}
