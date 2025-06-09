import { useParams } from 'react-router-dom';
import styles from './Details.module.css';
import { useMovie } from '../../../hooks/useMovie';
import { useMovieTrailer } from '../../../hooks/useMovieTrailer';
import React, { useState } from 'react';

const Details = () => {
    const { id } = useParams<{ id: string }>();
    const movieId = id ? parseInt(id, 10) : undefined;
    const { movie, loading, error } = useMovie(movieId);
    const { trailerKey, loading: trailerLoading } = useMovieTrailer(movieId);
    const [playTrailer, setPlayTrailer] = useState(false);

    if (loading) {
        return <div className={styles.card}><p>Loading...</p></div>;
    }

    if (error || !movie) {
        return <div className={styles.card}><p>Error: {error || "Movie not found."}</p></div>;
    }

    return (
        <div className={styles.card}>
            <img className={styles.poster} src={movie.src} alt={movie.title} />

            <div className={styles.details}>
                <div className={styles.header}>
                    <h2 className={styles.title}>{movie.title}</h2>
                    <span className={styles.year}>{movie.year}</span>
                    <div className={styles.rating}>
                        <span className={styles.star}>★</span>
                        <span className={styles.score}>{movie.rating} /10</span>
                    </div>
                </div>

                <p className={styles.description}>
                    {movie.description}
                </p>

                <div className={styles.trailerContainer}>
                    {!playTrailer && trailerKey && !trailerLoading && (
                        <div
                            style={{ width: "100%", height: "100%", position: "relative", cursor: "pointer" }}
                            onClick={() => setPlayTrailer(true)}
                        >
                            <img
                                className={styles.trailerThumbnail}
                                src={`https://img.youtube.com/vi/${trailerKey}/hqdefault.jpg`}
                                alt="Trailer"
                                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                            />
                            <div className={styles.playButton}>▶</div>
                        </div>
                    )}
                    {playTrailer && trailerKey && (
                        <iframe
                            width="100%"
                            height="100%"
                            src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
                            title="Trailer"
                            allow="autoplay; encrypted-media"
                            allowFullScreen
                            style={{ border: "none", borderRadius: "4px" }}
                        />
                    )}
                    {!trailerKey && !trailerLoading && (
                        <div className={styles.trailerThumbnail} style={{ display: "flex", alignItems: "center", justifyContent: "center", background: "#111", color: "#fff" }}>
                            No trailer available
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Details;