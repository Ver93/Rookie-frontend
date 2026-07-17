import styles from "./ChessTurn.module.css";

export default function ChessTurn({ turn, playerColor, isPlayer, isThinking }) {
    const isTurn = turn === playerColor;

    let text, statusClass;

    if (isThinking) {
        text = "Thinking..";
        statusClass = styles.thinking;
    } else if (isTurn && isPlayer) {
        text = "Your turn";
        statusClass = styles.playerTurn;
    } else if (isTurn && !isPlayer) {
        text = "Rookie";
        statusClass = styles.enemyTurn;
    } else {
        text = "Waiting...";
        statusClass = styles.waiting;
    }

    return (
        <div className={`${styles.chessTurn} ${statusClass}`}>
            {isThinking ? (
                <div className={styles.thinkingWrapper}>
                    <div className={styles.spinner}></div>
                    <span>
                        {text}
                        <span className={styles.dots}></span>
                    </span>
                </div>
            ) : (
                <>
                    <span
                        className={`${styles.dot} ${
                            statusClass === styles.waiting ? styles.waitingDot : ""
                        }`}
                    ></span>
                    <span>{text}</span>
                </>
            )}
        </div>
    );
}
