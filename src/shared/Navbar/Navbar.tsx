import styles from './Navbar.module.css';

export default function Navbar() {
    return (
        <header className={styles["main-header"]}>
            <div className={styles["header-container"]}>
                <a href="#" className={styles.logo}>
                    movie<span>me</span>
                </a>
                <nav className={styles["main-nav"]}>
                    <ul>
                        <li>
                            <a href="#">MOVIES</a>
                        </li>
                        <li>
                            <a href="#">SHOWS</a>
                        </li>
                        <li>
                            <a href="#">ABOUT</a>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}
