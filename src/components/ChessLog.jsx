import { useEffect, useRef } from "react";
import styles from "./ChessLog.module.css";

export default function ChessLog({ moves = [], lastMove }) {

    const moveListRef = useRef(null);


    useEffect(() => {
        const container = moveListRef.current;

        if (container) {
            container.scrollTo({
                top: container.scrollHeight,
                behavior: "smooth"
            });
        }
    }, [moves]);


    return (
        <div className={styles.logContainer}>

            <div className={styles.logMenu}>
                <button className={styles.menuButton}>⏮</button>
                <button className={styles.menuButton}>◀</button>
                <button className={styles.menuButton}>▶</button>
                <button className={styles.menuButton}>⏭</button>
            </div>


            <div
                className={styles.moveList}
                ref={moveListRef}
            >

                {moves.map((move, index) => {

                    const isLastRow = index === moves.length - 1;

                    const whiteActive = isLastRow && !move.black;
                    const blackActive = isLastRow && move.black;


                    return (
                        <div
                            className={styles.moveRow}
                            key={move.number}
                        >

                            <div className={styles.moveNumber}>
                                {move.number}.
                            </div>


                            <button
                                className={`${styles.move} ${
                                    whiteActive
                                        ? styles.active
                                        : ""
                                }`}
                            >
                                {move.white}
                            </button>


                            <button
                                className={`${styles.move} ${
                                    blackActive
                                        ? styles.active
                                        : ""
                                }`}
                            >
                                {move.black}
                            </button>

                        </div>
                    );
                })}

            </div>

        </div>
    );
}