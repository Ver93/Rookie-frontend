import styles from "./Header.module.css";

export default function Header({ onOpenSettings, onOpenGameMenu }) {
    return (
        <header className={styles.appHeader}>

        <div className={styles.headerLeft}>
            <a href="https://vrot.dev/" className={styles.headerButton}>
                <svg className={styles.icon} viewBox="0 0 24 24">
                    <path
                        d="M15 6l-6 6 6 6"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </a>
        </div>

            {/* Mitten: Titel */}
            <div className={styles.headerCenter}>
                Rookie GUI
            </div>

            {/* Höger: Hamburgarmeny */}
            <div className={styles.headerRight}>
                <button className={styles.headerButton} onClick={onOpenSettings}>
                    <svg className={styles.icon} viewBox="0 0 24 24">
                        <path d="M3 6h18v2H3z" fill="white" />
                        <path d="M3 11h18v2H3z" fill="white" />
                        <path d="M3 16h18v2H3z" fill="white" />
                    </svg>
                </button>
            </div>

        </header>
    );
}
