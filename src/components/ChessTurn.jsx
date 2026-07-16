import styles from "./ChessTurn.module.css";

export default function ChessTurn({ turn, playerColor, isPlayer, isThinking }) {

    const isTurn = turn === playerColor;

    let text = "";

    if (isThinking) {
        text = "Rookie is thinking...";
    } 
    else if (isTurn && isPlayer) {
        text = "Your turn";
    } 
    else if (isTurn && !isPlayer) {
        text = "Rookie's turn";
    }


    return (
        <div className={styles.chessTurn}>
            {text}
        </div>
    );
}