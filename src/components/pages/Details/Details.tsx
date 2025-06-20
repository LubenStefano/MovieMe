import { useParams } from 'react-router-dom';
import styles from './Details.module.css';
import { useMovie } from '../../../hooks/useMovie';
import { useShow } from '../../../hooks/useShow';
import { useMovieTrailer } from '../../../hooks/useMovieTrailer';
import { useShowTrailer } from '../../../hooks/useShowTrailer';
import React, { useState } from 'react';

const Details = () => {
    const { id, type } = useParams<{ id: string; type: "movie" | "show" }>();
    const entityId = id ? parseInt(id, 10) : undefined;

    const [playTrailer, setPlayTrailer] = useState(false);

    let entity, trailerKey, trailerLoading, loading, error;

    if (type === "movie") {
        const { movie, loading: movieLoading, error: movieError } = useMovie(entityId);
        const { trailerKey: movieTrailerKey, loading: movieTrailerLoading } = useMovieTrailer(entityId);
        entity = movie;
        trailerKey = movieTrailerKey;
        trailerLoading = movieTrailerLoading;
        loading = movieLoading;
        error = movieError;
    } else if (type === "show") {
        const { show, loading: showLoading, error: showError } = useShow(entityId);
        const { trailerKey: showTrailerKey, loading: showTrailerLoading } = useShowTrailer(entityId);
        entity = show;
        trailerKey = showTrailerKey;
        trailerLoading = showTrailerLoading;
        loading = showLoading;
        error = showError;
    }

    if (loading) {
        return <div className={styles.card}><p>Loading...</p></div>;
    }

    if (error || !entity) {
        return <div className={styles.card}><p>Error: {error || "Not found."}</p></div>;
    }

    return (
        <div className={styles.card}>
            <img className={styles.poster} src={entity.src} alt={entity.title} />

            <div className={styles.details}>
                <div className={styles.header}>
                    <h2 className={styles.title}>{entity.title}</h2>
                    <span className={styles.year}>{entity.year}</span>
                    <div className={styles.rating}>
                        <span className={styles.star}>★</span>
                        <span className={styles.score}>{entity.rating} /10</span>
                    </div>
                </div>

                <p className={styles.description}>
                    {entity.description}
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