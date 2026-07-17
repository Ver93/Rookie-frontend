import styles from "./Header.module.css";

import ResetButton from "./buttons/ResetButton";

export default function Header({ onOpenSettings, onOpenGameMenu, engine }) {
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
                <ResetButton
                    onReset={engine.resetGame}
                />

                
            </div>

        </header>
    );
}
