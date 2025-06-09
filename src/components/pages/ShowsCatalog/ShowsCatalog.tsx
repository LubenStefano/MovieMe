import styles from "./ShowsCatalog.module.css";
import { useState, useEffect } from "react";
import Catalog from '../../shared/PosterCard/Catalog.tsx';
import { fetchPopularShows } from '../../../utils/requester.ts';
import type { Show } from "../../../types/index.ts";


export default function ShowsCatalog() {
    const [shows, setShows] = useState<Show[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        setLoading(true);
        setError(null);
        fetchPopularShows(20, currentPage)
            .then(({ shows, totalPages }) => {
                setShows(shows);
                setTotalPages(totalPages);
            })
            .catch((err) => setError(err.message || "Error fetching shows"))
            .finally(() => setLoading(false));
    }, [currentPage]);

    const refetch = () => {
        setCurrentPage(1);
        setLoading(true);
        setError(null);
        fetchPopularShows(20, 1)
            .then(({ shows, totalPages }) => {
                setShows(shows);
                setTotalPages(totalPages);
            })
            .catch((err) => setError(err.message || "Error fetching shows"))
            .finally(() => setLoading(false));
    };

    if (loading) {
        return (
            <main className={styles["main-content"]}>
                <p className={styles.loadingMessage}>Зареждане на сериали...</p>
            </main>
        );
    }

    if (error) {
        return (
            <main className={styles["main-content"]}>
                <p className={styles.errorMessage}>
                    Възникна грешка при зареждането на сериали: {error}
                </p>
                <button onClick={refetch} className={styles.retryButton}>
                    Опитай отново
                </button>
            </main>
        );
    }

    if (shows.length === 0) {
        return (
            <main className={styles["main-content"]}>
                <p className={styles.noResultsMessage}>Няма намерени сериали.</p>
                <button onClick={refetch} className={styles.retryButton}>
                    Презареди
                </button>
            </main>
        );
    }

    return (
        <main className={styles["main-content"]}>
            <Catalog
                items={shows}
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />
        </main>
    );
}