import { useCallback, useEffect, useRef, useState } from "react";
import { fetchRecommendations } from "../services/recommendationService";

export function useInfiniteRecommendations(userId, token, limit = 10) {
  const [movies, setMovies] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Refs to hold mutable values without causing rerenders
  const pageRef = useRef(1);
  const loadingRef = useRef(false);
  const totalRef = useRef(0);
  const moviesLengthRef = useRef(0);

  // Keep moviesLengthRef updated when movies change
  useEffect(() => {
    moviesLengthRef.current = movies.length;
  }, [movies]);

  // Sync refs with state
  useEffect(() => {
    loadingRef.current = loading;
  }, [loading]);

  useEffect(() => {
    totalRef.current = total;
  }, [total]);

  const loadMore = useCallback(() => {
    if (loadingRef.current) return;
    if (totalRef.current > 0 && moviesLengthRef.current >= totalRef.current)
      return;

    setLoading(true);
    loadingRef.current = true;

    fetchRecommendations(userId, pageRef.current, limit, token)
      .then(({ movies: newMovies, total: newTotal }) => {
        setMovies((prev) => [...prev, ...newMovies]);
        setTotal(newTotal);

        pageRef.current += 1; // increment page manually

        setLoading(false);
        loadingRef.current = false;
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
        loadingRef.current = false;
      });
  }, [userId, token, limit]);

  useEffect(() => {
    if (!userId || !token) {
      setMovies([]);
      pageRef.current = 1;
      setTotal(0);
      setError(null);
      return;
    }
    // Reset everything when userId or token changes
    setMovies([]);
    pageRef.current = 1;
    setTotal(0);
    setError(null);

    loadMore();
  }, [userId, token, loadMore]);

  return { movies, loading, error, loadMore, hasMore: movies.length < total };
}
