import { Link } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";
import MovieGenres from "./MovieGenres";
import MovieRatingYear from "./MovieRatingYear";

export default function HorizontalMovieList({ title, movies, loading }) {
  if (loading) {
    return <LoadingSpinner message={`Loading ${title.toLowerCase()}...`} />;
  }

  if (!movies || movies.length === 0) {
    return (
      <p className="text-gray-400 text-center py-6 italic">
        No {title.toLowerCase()} found.
      </p>
    );
  }

  return (
    <section className="mb-12">
      <h2 className="text-3xl font-bold mb-6 border-b-2 border-red-600 inline-block pb-2 tracking-wide">
        {title}
      </h2>
      <div
        className="flex space-x-6 overflow-x-auto scrollbar-hide px-2 py-4"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {movies.map((movie) => (
          <Link
            to={`/movie/${movie.id}`}
            key={movie.id}
            className="min-w-[160px] bg-gradient-to-tr from-gray-800 to-gray-900 rounded-xl shadow-lg overflow-hidden
              hover:shadow-2xl transition-transform transform hover:scale-105 duration-300 cursor-pointer flex-shrink-0
              scroll-snap-align-start"
            title={movie.title}
          >
            {movie.poster_path && movie.poster_path.trim() !== "" ? (
              <img
                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-[240px] object-cover rounded-t-xl"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-[240px] flex items-center justify-center bg-gray-700 text-gray-400 font-semibold rounded-t-xl">
                No Image
              </div>
            )}

            <div className="text-center px-3 py-3">
              <h3 className="text-md font-semibold truncate text-gray-100 mb-1">
                {movie.title}
              </h3>
              <MovieRatingYear
                voteAverage={movie.vote_average}
                releaseDate={movie.release_date}
                className="text-gray-400"
              />
              <MovieGenres
                genreIds={movie.genre_ids || []}
                className="text-gray-400 mt-1"
              />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
