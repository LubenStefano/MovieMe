import styles from './Navbar.module.css';
import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <header className={styles["main-header"]}>
            <div className={styles["header-container"]}>
                <Link to="/" className={styles.logo}>
                    movie<span>me</span>
                </Link>
                <nav className={styles["main-nav"]}>
                    <ul>
                        <li>
                            <Link to="/movies">MOVIES</Link>
                        </li>
                        <li>
                            <Link to="/shows">SHOWS</Link>
                        </li>
                        <li>
                            <Link to="/about">ABOUT</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}
