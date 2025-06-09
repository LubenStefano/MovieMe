import styles from "./ShowsCatalog.module.css";
import { useState, useEffect } from "react";
import Catalog from '../../shared/PosterCard/Catalog.tsx';
import { fetchPopularShows } from '../../../utils/requester.ts';
import type { Show } from "../../../types/index.ts";
import { useLocation, useNavigate } from "react-router-dom";

export default function ShowsCatalog() {
    const location = useLocation();
    const navigate = useNavigate();
    const query = new URLSearchParams(location.search);
    const queryPage = Number(query.get("page")) || 1;
    const scrollToId = query.get("scrollToId");
    const [currentPage, setCurrentPage] = useState(queryPage);
    const [shows, setShows] = useState<Show[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        setCurrentPage(queryPage);
    }, [queryPage]);

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
        // Update the URL with the current page
        if (currentPage !== queryPage) {
            navigate(`?page=${currentPage}`, { replace: true });
        }
    }, [currentPage]);

    useEffect(() => {
        if (scrollToId) {
            const el = document.getElementById(`show-card-${scrollToId}`);
            if (el) {
                setTimeout(() => {
                    el.scrollIntoView({ behavior: "smooth", block: "center" });
                }, 100);
            }
        }
    }, [scrollToId, shows]);

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
                type="show"
            />
        </main>
    );
}