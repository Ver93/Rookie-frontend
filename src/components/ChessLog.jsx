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
                <button className={styles.menuButton}>
                    <svg viewBox="0 0 24 24">
                        <rect x="4" y="4" width="2" height="16" />
                        <polygon points="19,4 9,12 19,20" />
                    </svg>
                </button>

                <button className={styles.menuButton}>
                    <svg viewBox="0 0 24 24">
                        <polygon points="16,4 6,12 16,20" />
                    </svg>
                </button>

                <button className={styles.menuButton}>
                    <svg viewBox="0 0 24 24">
                        <polygon points="8,4 18,12 8,20" />
                    </svg>
                </button>

                <button className={styles.menuButton}>
                    <svg viewBox="0 0 24 24">
                        <polygon points="5,4 15,12 5,20" />
                        <rect x="18" y="4" width="2" height="16" />
                    </svg>
                </button>
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