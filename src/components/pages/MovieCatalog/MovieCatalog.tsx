import styles from "./MovieCatalog.module.css";
import { useState, useEffect } from "react";
import Catalog from '../../shared/PosterCard/Catalog.tsx';
import { fetchPopularMovies } from '../../../utils/requester.ts';
import type { Movie } from "../../../types/index.ts";
import { useLocation, useNavigate } from "react-router-dom";

export default function MovieCatalog() {
    const location = useLocation();
    const navigate = useNavigate();
    const query = new URLSearchParams(location.search);
    const queryPage = Number(query.get("page")) || 1;
    const scrollToId = query.get("scrollToId");
    const [currentPage, setCurrentPage] = useState(queryPage);
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        setCurrentPage(queryPage);
    }, [queryPage]);

    useEffect(() => {
        setLoading(true);
        setError(null);
        fetchPopularMovies(20, currentPage)
            .then(({ movies, totalPages }) => {
                setMovies(movies);
                setTotalPages(totalPages);
            })
            .catch((err) => setError(err.message || "Error fetching movies"))
            .finally(() => setLoading(false));
        // Update the URL with the current page
        if (currentPage !== queryPage) {
            navigate(`?page=${currentPage}`, { replace: true });
        }
    }, [currentPage]);

    useEffect(() => {
        if (scrollToId) {
            const el = document.getElementById(`movie-card-${scrollToId}`);
            if (el) {
                setTimeout(() => {
                    el.scrollIntoView({ behavior: "smooth", block: "center" });
                }, 100);
            }
        }
    }, [scrollToId, movies]);

    const refetch = () => {
        setCurrentPage(1);
        setLoading(true);
        setError(null);
        fetchPopularMovies(20, 1)
            .then(({ movies, totalPages }) => {
                setMovies(movies);
                setTotalPages(totalPages);
            })
            .catch((err) => setError(err.message || "Error fetching movies"))
            .finally(() => setLoading(false));
    };

    if (loading) {
        return (
            <main className={styles["main-content"]}>
                <p className={styles.loadingMessage}>Зареждане на филми...</p>
            </main>
        );
    }

    if (error) {
        return (
            <main className={styles["main-content"]}>
                <p className={styles.errorMessage}>
                    Възникна грешка при зареждането на филми: {error}
                </p>
                <button onClick={refetch} className={styles.retryButton}>
                    Опитай отново
                </button>
            </main>
        );
    }

    if (movies.length === 0) {
        return (
            <main className={styles["main-content"]}>
                <p className={styles.noResultsMessage}>Няма намерени филми.</p>
                <button onClick={refetch} className={styles.retryButton}>
                    Презареди
                </button>
            </main>
        );
    }

    return (
        <main className={styles["main-content"]}>
            <Catalog
                items={movies}
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                type="movie"
            />
        </main>
    );
}