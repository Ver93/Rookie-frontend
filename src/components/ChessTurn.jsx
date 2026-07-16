import styles from "./ChessTurn.module.css";

export default function ChessTurn({ turn, playerColor, isPlayer, isThinking }) {

    const isTurn = turn === playerColor;

    let text = "";
    let statusClass = "";
    let showDots = false;


    if (isThinking) {
        text = "Rookie is thinking";
        statusClass = styles.thinking;
    } 
    else if (isTurn && isPlayer) {
        text = "Your turn";
        statusClass = styles.playerTurn;
    } 
    else if (isTurn && !isPlayer) {
        text = "Rookie's turn";
        statusClass = styles.enemyTurn;
    }
    else if (!isTurn && !isPlayer) {
        text = "Waiting";
        statusClass = styles.waiting;
        showDots = true;
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
                    <span className={styles.dot}></span>

                    <span>
                        {text}

                        {showDots && (
                            <span className={styles.dots}></span>
                        )}

                    </span>
                </>
            )}

        </div>
    );
}