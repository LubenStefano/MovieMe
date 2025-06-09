import styles from "./ShowsCatalog.module.css";
import { useShows } from '../../../hooks/useShows.ts';
import Catalog from '../../shared/PosterCard/Catalog.tsx';

export default function ShowsCatalog() {
    const { shows, loading, error, refetch } = useShows(20);

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
            <Catalog />
        </main>
    );
}