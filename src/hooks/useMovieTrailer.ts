import { useState, useEffect } from "react";
import { fetchMovieTrailerKey } from "../utils/requester";

export function useMovieTrailer(id?: number) {
  const [trailerKey, setTrailerKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetchMovieTrailerKey(id)
      .then(setTrailerKey)
      .finally(() => setLoading(false));
  }, [id]);

  return { trailerKey, loading };
}
