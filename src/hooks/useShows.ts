import { useState, useEffect, useCallback } from 'react';
import type { Show } from '../types/index.ts'; // Adjust path if your types are elsewhere
import { fetchPopularShows } from '../utils/requester.ts'; // Adjust path
import type { UseShowsResult } from '../types/index.ts'; // Adjust path if your types are elsewhere

export const useShows = (showCount: number = 20): UseShowsResult => {
    const [shows, setShows] = useState<Show[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null); // Clear any previous errors

        try {
            const fetchedShows = await fetchPopularShows(showCount);
            setShows(fetchedShows);
        } catch (err: any) {
            console.error("Failed to fetch shows:", err);
            setError(err.message || "An unexpected error occurred while fetching data.");
        } finally {
            setLoading(false);
        }
    }, [showCount]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const refetch = () => {
        fetchData();
    };

    return { shows, loading, error, refetch };
};
