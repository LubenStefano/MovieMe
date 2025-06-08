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

export const useMoviesAndShows = (movieCount: number = 20, showCount: number = 20): UseMoviesAndShowsResult => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [shows, setShows] = useState<Show[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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
  }, [movieCount, showCount]); 

  useEffect(() => {
    fetchData();
  }, [fetchData]); 


  const refetch = () => {
    fetchData();
  };

  return { movies, shows, loading, error, refetch };
};
