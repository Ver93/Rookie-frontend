import styles from "./Header.module.css";

export default function Header({ onOpenSettings, onOpenGameMenu, isThinking}) {
    return (
        <header className={styles.appHeader}>
            <div className={styles.headerLeft}>
                <button className={styles.menuToggle} onClick={onOpenGameMenu}>
                    <div className={styles.menuIcon}></div>
                </button>
            </div>

            <div className={styles.headerCenter}>
                Rookie GUI
            </div>


            <button className={styles.settingsToggle} onClick={onOpenSettings}>
                <div className={styles.settingsIcon}></div>
            </button>

        </header>
    );
}
