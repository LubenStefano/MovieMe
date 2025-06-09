import styles from "./MovieCatalog.module.css";
import { useMovies } from '../../../hooks/useMovies.ts'; // Adjust path as needed
import Catalog from '../../shared/PosterCard/Catalog.tsx';

export default function MovieCatalog() {
    // Use the hook to fetch a certain number of movies.
    // For example, fetching 20 popular movies and 0 shows (since this is for movies)
    const { movies, loading, error, refetch } = useMovies(20);

    if (loading) {
        return (
            <main className={styles["main-content"]}>
                <p className={styles.loadingMessage}>Зареждане на филми...</p>
                {/* You can add a more complex loading spinner here if desired */}
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
        <Catalog arr={movies} />
        </main>
    );
}