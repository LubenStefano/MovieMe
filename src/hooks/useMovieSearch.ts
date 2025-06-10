import { useState, useEffect } from "react";
import { searchMovies, searchShows } from "../utils/requester";
import type { Movie, Show } from "../types/index";

export function useMovieSearch(query: string, type: "movie" | "show") {
  const [results, setResults] = useState<Movie[] | Show[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    setLoading(true);
    setError(null);
    const fetch = async () => {
      try {
        const res = type === "movie" ? await searchMovies(query) : await searchShows(query);
        setResults(res);
      } catch (err: any) {
        setError(err.message || "Error searching");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [query, type]);

  return { results, loading, error };
}
