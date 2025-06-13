import styles from "./MovieCatalog.module.css";
import { useState, useEffect } from "react";
import Catalog from '../../shared/PosterCard/Catalog.tsx';
import { fetchPopularMovies } from '../../../utils/requester.ts';
import type { Movie } from "../../../types/index.ts";
import { useLocation, useNavigate } from "react-router-dom";
import SearchDropdown from '../../shared/SearchDropdown/SearchDropdown';
import { useMovieSearch } from '../../../hooks/useMovieSearch';
import Loader from "../../shared/Loader/Loader";
import { useLoader } from "../../../hooks/useLoader";

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
    const [search, setSearch] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);
    const { results: searchResults } = useMovieSearch(search, "movie");
    const showLoader = useLoader();

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

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        setShowDropdown(!!e.target.value);
    };
    const handleSelect = (id: number) => {
        navigate(`/details/movie/${id}`);
        setShowDropdown(false);
        setSearch("");
    };
    const handleBlur = () => {
        setTimeout(() => setShowDropdown(false), 100);
    };

    if (loading) {
        if (!showLoader) return (
            <main className={styles["main-content"]}>
                <Loader />
            </main>
        );
        return (
            <main className={styles["main-content"]}>
                <Loader />
            </main>
        );
    }

    if (error) {
        return (
            <main className={styles["main-content"]}>
                <p className={styles.errorMessage}>
                    An error occurred while loading movies: {error}
                </p>
                <button onClick={refetch} className={styles.retryButton}>
                    Try again
                </button>
            </main>
        );
    }

    if (movies.length === 0) {
        return (
            <main className={styles["main-content"]}>
                <p className={styles.noResultsMessage}>No movies found.</p>
                <button onClick={refetch} className={styles.retryButton}>
                    Reload
                </button>
            </main>
        );
    }

    return (
        <main className={styles["main-content"]}>
            <div style={{ position: "relative", marginBottom: 24, display: "flex", gap: 8 }}>
                <input
                    type="text"
                    value={search}
                    onChange={handleSearchChange}
                    placeholder="Search for a movie..."
                    className={styles.searchInput}
                    onBlur={handleBlur}
                    onFocus={() => search.endsWith(" ") && setShowDropdown(true)}
                />
                <SearchDropdown
                    results={searchResults.map(({ id, src, title }) => ({ id, src, title }))}
                    onSelect={handleSelect}
                    visible={showDropdown}
                    onBlur={handleBlur}
                />
            </div>
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