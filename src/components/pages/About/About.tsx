import styles from "./About.module.css";
import Loader from "../../shared/Loader/Loader";
import { useLoader } from "../../../hooks/useLoader";

export default function About() {
    const showLoader = useLoader();
    if (!showLoader) return <Loader />;
    return (
        <main className={styles.mainContent}>
            <h1 className={styles.title}>About MovieMe</h1>
            <section className={styles.infoSection}>
                <p>
                    <b>MovieMe</b> is your go-to app for discovering popular movies and TV shows, watching trailers, and exploring detailed information about your favorite titles. Built with React, TypeScript, and Vite, MovieMe offers a modern, fast, and visually engaging experience. Enjoy features like search, ratings, and a beautiful catalog of cinema items!
                </p>
            </section>
            <section className={styles.cinemaItemsSection}>
                <h2 className={styles.cinemaItemsTitle}>Our Cinema Items</h2>
                <div className={styles.cinemaItemsGrid}>
                    TODO
                </div>
            </section>
        </main>
    );
}
