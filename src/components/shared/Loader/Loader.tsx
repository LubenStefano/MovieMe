import styles from "./Loader.module.css";
import { motion } from "framer-motion";
import SinglePopcornImg from "./../../../assets/SinglePopcorn.png";

export default function Loader() {
  return (
    <div className={styles.loaderContainer}>
      <motion.div
        className={styles.popcorn}
        animate={{ y: [0, -18, 0], rotate: [0, 10, -10, 0] }}
        transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
      >
        <img src={SinglePopcornImg} className={styles.popcornImg} />
      </motion.div>
      <div className={styles.dots}>
        <span className={styles.dot} />
        <span className={styles.dot} />
        <span className={styles.dot} />
      </div>
      <div className={styles.loaderText}>Loading Movie Magic...</div>
    </div>
  );
}
