// src/hooks/useMoviesAndShows.ts
import { useState, useEffect, useCallback } from 'react';
import type { Movie, Show } from '../types/index.ts'; // Adjust path if your types are elsewhere
import { fetchPopularMovies, fetchPopularShows } from '../utils/requester'; // Adjust path

interface UseMoviesAndShowsResult {
  movies: Movie[];
  shows: Show[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

/**
 * A custom React Hook to fetch and manage popular movie and TV show data from TMDB.
 *
 * @param {number} movieCount - The number of popular movies to fetch.
 * @param {number} showCount - The number of popular TV shows to fetch.
 * @returns {UseMoviesAndShowsResult} An object containing movies, shows, loading state, error, and a refetch function.
 */
export const useMoviesAndShows = (movieCount: number = 20, showCount: number = 20): UseMoviesAndShowsResult => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [shows, setShows] = useState<Show[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // useCallback to memoize the fetcher function, preventing unnecessary re-creation
  // This is crucial if `fetchData` were passed down to child components
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null); // Clear any previous errors

    try {
      const [fetchedMovies, fetchedShows] = await Promise.all([
        fetchPopularMovies(movieCount),
        fetchPopularShows(showCount),
      ]);
      setMovies(fetchedMovies);
      setShows(fetchedShows);
    } catch (err: any) {
      console.error("Failed to fetch movies and shows:", err);
      setError(err.message || "An unexpected error occurred while fetching data.");
    } finally {
      setLoading(false);
    }
  }, [movieCount, showCount]); // Dependencies for useCallback: refetch if counts change

  // useEffect to trigger the initial fetch when the component mounts
  // or when movieCount/showCount change
  useEffect(() => {
    fetchData();
  }, [fetchData]); // Dependency array includes fetchData itself because it's memoized

  // Expose a refetch function
  const refetch = () => {
    fetchData();
  };

  return { movies, shows, loading, error, refetch };
};
