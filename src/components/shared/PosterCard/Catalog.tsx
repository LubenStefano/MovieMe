import { Link } from 'react-router-dom';
import PageController from '../PageController/PageController';
import styles from './Catalog.module.css';
import React from 'react';

interface CatalogItem {
  src: string;
  title: string;
  year: string;
  description: string;
  rating: number;
  id: number;
}

interface CatalogProps {
  items: CatalogItem[];
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
}

export default function Catalog({ items, currentPage, totalPages, onPageChange }: CatalogProps) {
  return (
    <>
      {totalPages && totalPages > 1 && onPageChange && currentPage && (
        <PageController
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      )}
      <div className={styles["container"]}>
        {items.map(({ src, title, year, description, rating, id}, idx) => (
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
              <Link to={`/details/${id}`} className={styles["see-more-btn"]}>SEE MORE </Link>
            </div>
          </div>
        ))}
      </div>
      {totalPages && totalPages > 1 && onPageChange && currentPage && (
        <PageController
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      )}
    </>
  );
}