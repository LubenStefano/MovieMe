// src/hooks/useMoviesAndShows.ts
import { useState, useEffect, useCallback } from 'react';
import type { Movie } from '../types/index.ts'; // Adjust path if your types are elsewhere
import { fetchPopularMovies } from '../utils/requester.ts'; // Adjust path
import type { UseMoviesResult } from '../types/index.ts'; // Adjust path if your types are elsewhere

export const useMovies = (movieCount: number = 20): UseMoviesResult => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null); // Clear any previous errors

    try {
      const [fetchedMovies] = await Promise.all([
        fetchPopularMovies(movieCount),

      ]);
      setMovies(fetchedMovies.movies);
    } catch (err: any) {
      console.error("Failed to fetch movies and shows:", err);
      setError(err.message || "An unexpected error occurred while fetching data.");
    } finally {
      setLoading(false);
    }
  }, [movieCount]); 

  useEffect(() => {
    fetchData();
  }, [fetchData]); 


  const refetch = () => {
    fetchData();
  };

  return { movies, loading, error, refetch };
};
