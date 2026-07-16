import styles from "./GameMenuPanel.module.css";

export default function GameMenuPanel({onClose}) {
    return (
        <div className={styles.panel}>
            <button className={styles.closeButton} onClick={onClose}>
                ✕
            </button>
        </div>
    );
}
