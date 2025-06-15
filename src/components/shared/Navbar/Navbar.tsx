import styles from './Navbar.module.css';
import { Link } from 'react-router-dom';
import { usePageContext } from '../../../context/PageContext';

export default function Navbar() {
    const { isMain } = usePageContext();
    return (
        <header className={isMain ? styles["main-header"] : styles["pages-header"]}>
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
