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

                {/* { !isThinking && (
                    <div className={styles.opponentLabel}>Du spelar mot Rookie Engine</div>
                )} */}

                { isThinking && (
                    <div className={styles.thinkingWrapper}>
                        <div className={styles.opponentLabel}>Rookie tänker...</div>
                        <div className={styles.spinner}></div>
                    </div>
                )}
            </div>


            <button className={styles.settingsToggle} onClick={onOpenSettings}>
                <div className={styles.settingsIcon}></div>
            </button>

        </header>
    );
}
