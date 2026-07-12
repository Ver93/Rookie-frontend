import styles from "./Header.module.css";

export default function Header({ onOpenSettings, onOpenGameMenu }) {
    return (
        <header className={styles.appHeader}>
            <div className={styles.headerLeft}>
                <button className={styles.menuToggle}
                onClick={onOpenGameMenu}
                >
                    ☰
                </button>
            </div>

            <div className={styles.headerCenter}>
                {/* Rookie GUI */}
            </div>

            <div className={styles.headerRight}>
                <button 
                    className={styles.settingsToggle}
                    onClick={onOpenSettings}
                >
                    ⚙️
                </button>
            </div>
        </header>
    );
}
