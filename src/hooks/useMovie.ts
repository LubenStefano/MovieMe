import { useState, useEffect } from "react";
import { fetchMovieById } from "../utils/requester";
import type { Movie } from "../types";

export function useMovie(id?: number) {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError(null);
    fetchMovieById(id)
      .then(setMovie)
      .catch((err) => setError(err.message || "Error fetching movie"))
      .finally(() => setLoading(false));
  }, [id]);

  return { movie, loading, error };
}
