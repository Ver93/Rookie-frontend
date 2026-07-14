import styles from "./GameOverOverlay.module.css";

export default function GameOverOverlay({ result, winner, onReset }) {
    const getTitle = () => {
        switch (result) {
            case "stalemate":
                return "Stalemate";
            case "draw":
                return "Remis";
            default:
                return "Checkmate";
        }
    };

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <h2>{getTitle()}</h2>
                {winner && <p>{winner} Won!</p>}
                <button className={styles.button} onClick={onReset}>
                    Try Again?
                </button>
            </div>
        </div>
    );
}
