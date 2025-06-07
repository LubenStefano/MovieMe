import styles from './Catalog.module.css';
import type { CatalogProps } from '../../../types/index.ts';

export default function Catalog({ arr }: CatalogProps) {
  return (
    <div className={styles["container"]}>
      {arr.map(({ src, title, year, description, rating }, idx) => (
        <div className={styles["poster-card"]} key={idx}>
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
  );
}
