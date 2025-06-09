import styles from "./MoviesCatalog.module.css";
import React, { useEffect, useState } from "react";
import Catalog from "../../shared/PosterCard/Catalog";
import { fetchPopularMovies } from "../../../utils/requester";
import type { Movie } from "../../../types";

export default function MoviesCatalog() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

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
  }, [currentPage]);

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
      </main>
    );
  }

  if (movies.length === 0) {
    return (
      <main className={styles["main-content"]}>
        <p className={styles.noResultsMessage}>Няма намерени филми.</p>
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
      />
    </main>
  );
}
