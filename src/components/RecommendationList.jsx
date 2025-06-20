import { useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import MovieGenres from "./MovieGenres";
import MovieRatingYear from "./MovieRatingYear";

export default function RecommendationList({
  movies = [],
  loading,
  error,
  loadMore,
  hasMore,
}) {
  const observer = useRef();

  const lastMovieElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMore();
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore, loadMore]
  );

  if (error) return <p>Error: {error}</p>;
  if (movies.length === 0 && !loading)
    return <p>Keep watching to get smart recommendations.</p>;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-8">
      {movies.map((movie, index) => (
        <div
          key={movie._id || movie.id}
          className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
          {...(index === movies.length - 1 ? { ref: lastMovieElementRef } : {})}
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

      {loading && <p>Loading more...</p>}
    </div>
  );
}
