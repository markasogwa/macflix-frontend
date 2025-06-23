import HorizontalMovieList from "./HorizontalMovieList";

export function PopularMovieList({ movies, loading }) {
  return (
    <HorizontalMovieList
      title="Popular Movies"
      movies={movies}
      loading={loading}
    />
  );
}

export function NowPlayingMovieList({ movies, loading }) {
  return (
    <HorizontalMovieList
      title="Movies Playing Now"
      movies={movies}
      loading={loading}
    />
  );
}

export function TopRatedMovieList({ movies, loading }) {
  return (
    <HorizontalMovieList
      title="Top Rated Movies"
      movies={movies}
      loading={loading}
    />
  );
}

export function UpcomingMovieList({ movies, loading }) {
  return (
    <HorizontalMovieList
      title="Upcoming Movies"
      movies={movies}
      loading={loading}
    />
  );
}
