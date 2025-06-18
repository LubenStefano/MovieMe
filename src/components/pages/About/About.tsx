import styles from "./About.module.css";
import Loader from "../../shared/Loader/Loader";
import { useLoader } from "../../../hooks/useLoader";
import { MouseParallax } from "react-just-parallax";
import CinemaItem from "../../shared/CinemaItem/CinemaItem";

export default function About() {
  const showLoader = useLoader();
  if (!showLoader) return <Loader />;
  return (
    <>
      <main className={styles.mainContent}>
        <h1 className={styles.title}>About MovieMe</h1>
        <section className={styles.infoSection}>
          <p>
            <b>MovieMe</b> is your modern movie and TV show discovery app, built
            with React, TypeScript, and Vite for a fast and beautiful
            experience. Enjoy smooth animations, creative loaders, and a playful
            cinema-inspired design.
            <br />
            <br />
            <b>Powered by TMDB:</b> All movie and show data is fetched live from{" "}
            <a
              href="https://www.themoviedb.org/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              The Movie Database (TMDB)
            </a>
            , ensuring you always get the latest info, posters, and trailers.
            <br />
            <br />
            <b>Features:</b> Search, browse, and explore trending movies and
            shows, view trailers, and enjoy a fun, interactive UI with parallax
            cinema items and custom loaders.
            <br />
            <br />
            <span className={styles.credits}>
              This product uses the TMDB API but is not endorsed or certified by
              TMDB.
            </span>
          </p>
        </section>
      </main>
      <MouseParallax
        isAbsolutelyPositioned={true}
        strength={0.02}
        lerpEase={0.06}
      >
        <CinemaItem
          id="popcorn1"
          top={8}
          width={13}
          type="popcorn"
          left={10}
          rotate={-60}
          zIndex={1000}
        />
      </MouseParallax>
      <MouseParallax
        isAbsolutelyPositioned={true}
        strength={0.04}
        lerpEase={0.02}
      >
        <CinemaItem
          id="popcorn1"
          top={24}
          width={8}
          type="popcorn"
          left={15}
          rotate={180}
          zIndex={1000}
        />
      </MouseParallax>
      <MouseParallax
        isAbsolutelyPositioned={true}
        strength={0.02}
        lerpEase={0.08}
      >
        <CinemaItem
          id="popcorn1"
          top={8}
          width={8}
          type="popcorn"
          left={18}
          rotate={90}
          zIndex={1000}
        />
      </MouseParallax>
      <MouseParallax
        isAbsolutelyPositioned={true}
        strength={0.03}
        lerpEase={0.01}
      >
        <CinemaItem
          id="popcorn1"
          top={60}
          width={12}
          type="popcorn"
          right={15}
          rotate={60}
          zIndex={1000}
        />
      </MouseParallax>

      <MouseParallax
        isAbsolutelyPositioned={true}
        strength={0.02}
        lerpEase={0.05}
      >
        <CinemaItem
          id="soda1"
          top={59}
          type="soda"
          left={13}
          width={12}
          zIndex={1002}
          rotate={-45}
        />
      </MouseParallax>

      <MouseParallax
        isAbsolutelyPositioned={true}
        strength={0.05}
        lerpEase={0.09}
      >
        <CinemaItem
          id="ticket2"
          top={75}
          left={20}
          width={10}
          zIndex={1001}
          rotate={2}
          type="ticket"
        />
      </MouseParallax>
    </>
  );
}
