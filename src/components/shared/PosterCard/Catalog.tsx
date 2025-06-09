import styles from './Catalog.module.css';
import PageController from '../PageController/PageController';
import React, { useState, useEffect } from 'react';
import { fetchPopularMovies } from '../../../utils/requester.ts';

export default function Catalog() {
  const itemsPerPage = 20;
  const [currentPage, setCurrentPage] = useState(1);
  type Movie = {
    src: string;
    title: string;
    year: string | number;
    description: string;
    rating: number;
  };
  const [movies, setMovies] = useState<Movie[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchPopularMovies(itemsPerPage, currentPage)
      .then(({ movies, totalPages }) => {
        setMovies(movies);
        setTotalPages(totalPages);
      })
      .catch((err) => {
        setError(err.message || 'Error fetching movies');
      })
      .finally(() => setLoading(false));
  }, [currentPage]);

  if (loading) return <div className={styles.container}>Loading...</div>;
  if (error) return <div className={styles.container}>Error: {error}</div>;

  return (
    <>
      <div className={styles["container"]}>
        {movies.map(({ src, title, year, description, rating }, idx) => (
          <div
            className={styles["poster-card"]}
            key={idx}
            style={{ "--fadein-delay": `${idx * 80}ms` } as React.CSSProperties}
          >
            <img
              src={src}
              alt={title}
              className={styles["poster-image"]}
            />
            <div className={styles["info-overlay"]}>
              <h3 className={styles["movie-title"]}>{title}</h3>
              <p className={styles["movie-year"]}>{year}</p>
              <p className={styles["movie-description"]}>
                {description.length > 100
                  ? description.slice(0, 100) + "..."
                  : description}
              </p>
              <div className={styles["rating"]}>
                <span className={styles["star-icon"]}>★</span> {rating} / 10
              </div>
              <a href="#" className={styles["see-more-btn"]}>SEE MORE</a>
            </div>
          </div>
        ))}
      </div>
      {totalPages > 1 && (
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
          <PageController
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </>
  );
}