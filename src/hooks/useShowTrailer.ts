import { useState, useEffect } from "react";
import { fetchShowTrailerKey } from "../utils/requester";

export function useShowTrailer(id?: number) {
  const [trailerKey, setTrailerKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetchShowTrailerKey(id)
      .then(setTrailerKey)
      .finally(() => setLoading(false));
  }, [id]);

  return { trailerKey, loading };
}
