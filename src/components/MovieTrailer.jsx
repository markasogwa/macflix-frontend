import axios from "axios";
import { useEffect, useState } from "react";

function MovieTrailer({ movieId }) {
  const [trailerKey, setTrailerKey] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchTrailer(id) {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/movie/${id}/trailer`
        );
        setTrailerKey(res.data.key);
      } catch (err) {
        setError(err.response?.data?.message || "Unable to fetch trailer.");
      }
    }

    if (movieId) {
      fetchTrailer(movieId);
    }
  }, [movieId]);

  if (error) return <p>Error: {error}</p>;
  if (!trailerKey) return <p>Loading trailer...</p>;

  return (
    <iframe
      width="560"
      height="315"
      src={`https://www.youtube.com/embed/${trailerKey}`}
      title="Movie Trailer"
      allowFullScreen
    ></iframe>
  );
}

export default MovieTrailer;
