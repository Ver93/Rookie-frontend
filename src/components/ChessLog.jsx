import styles from "./ChessLog.module.css";

export default function ChessLog({ moves = [], currentIndex, onSelectMove }) {
    const pairs = [];
    for (let i = 0; i < moves.length; i += 2) {
        pairs.push({
            white: moves[i],
            black: moves[i + 1] || "",
            whiteIndex: i,
            blackIndex: i + 1
        });
    }

    return (
        <div className={styles.logContainer}>
            {pairs.map((pair, index) => {
                const isWhiteActive = currentIndex === pair.whiteIndex;
                const isBlackActive = currentIndex === pair.blackIndex;

                return (
                    <div key={index} className={styles.moveRow}>
                        <div className={styles.moveNumber}>{index + 1}.</div>

                        <div
                            className={`${styles.move} ${isWhiteActive ? styles.active : ""}`}
                            onClick={() => onSelectMove(pair.whiteIndex)}
                        >
                            {pair.white}
                        </div>

                        <div
                            className={`${styles.move} ${styles.black} ${isBlackActive ? styles.active : ""}`}
                            onClick={() => onSelectMove(pair.blackIndex)}
                        >
                            {pair.black}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
