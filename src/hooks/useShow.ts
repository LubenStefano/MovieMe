import { useState, useEffect } from "react";
import { fetchShowById } from "../utils/requester";
import type { Show } from "../types";

export function useShow(id?: number) {
  const [show, setShow] = useState<Show | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError(null);
    fetchShowById(id)
      .then(setShow)
      .catch((err) => setError(err.message || "Error fetching show"))
      .finally(() => setLoading(false));
  }, [id]);

  return { show, loading, error };
}
