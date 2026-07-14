import styles from "./GameOverOverlay.module.css";

export default function GameOverOverlay({ winner, onReset }) {
    return (
        <div className={styles.overlay}>
                <h2>Schackmatt</h2>
        </div>
    );
}
