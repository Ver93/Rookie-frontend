import styles from "./Header.module.css";
import ResetButton from "./buttons/ResetButton";
import ResetIcon from "./icons/ResetIcon";

export default function Header({ onReset }) {
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

            <div className={styles.headerCenter}>Rookie GUI</div>

            <div className={styles.headerRight}>
                <ResetButton 
                    onReset={onReset} 
                    icon={<ResetIcon className="theme-icon"/>}
                    />
            </div>
        </header>
    );
}
