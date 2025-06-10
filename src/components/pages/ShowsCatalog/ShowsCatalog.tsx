import styles from "./ShowsCatalog.module.css";
import { useState, useEffect } from "react";
import Catalog from '../../shared/PosterCard/Catalog.tsx';
import { fetchPopularShows } from '../../../utils/requester.ts';
import type { Show } from "../../../types/index.ts";
import { useLocation, useNavigate } from "react-router-dom";
import SearchDropdown from '../../shared/SearchDropdown/SearchDropdown';
import { useMovieSearch } from '../../../hooks/useMovieSearch';

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
    const [search, setSearch] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);
    const { results: searchResults } = useMovieSearch(search, "show");

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

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        setShowDropdown(!!e.target.value);
    };
    const handleSelect = (id: number) => {
        navigate(`/details/show/${id}`);
        setShowDropdown(false);
        setSearch("");
    };
    const handleBlur = () => {
        setTimeout(() => setShowDropdown(false), 100);
    };

    if (loading) {
        return (
            <main className={styles["main-content"]}>
                <p className={styles.loadingMessage}>Loading shows...</p>
            </main>
        );
    }

    if (error) {
        return (
            <main className={styles["main-content"]}>
                <p className={styles.errorMessage}>
                    An error occurred while loading shows: {error}
                </p>
                <button onClick={refetch} className={styles.retryButton}>
                    Try again
                </button>
            </main>
        );
    }

    if (shows.length === 0) {
        return (
            <main className={styles["main-content"]}>
                <p className={styles.noResultsMessage}>No shows found.</p>
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
                    placeholder="Search for a show..."
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
                items={shows}
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                type="show"
            />
        </main>
    );
}