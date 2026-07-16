import { useEffect, useRef, useState } from "react";
import styles from "./ChessLog.module.css";

export default function ChessLog({ moves = [], onSelectMove }) {

    const moveListRef = useRef(null);
    const [selectedMove, setSelectedMove] = useState(null);

    useEffect(() => {
        const container = moveListRef.current;

        if (container) {
            container.scrollTo({
                top: container.scrollHeight,
                behavior: "smooth"
            });
        }

        if (moves.length > 0) {
            const last = moves[moves.length - 1];

            setSelectedMove({
                number: last.number,
                color: last.black ? "black" : "white"
            });
        }

    }, [moves]);


    const selectIndex = (index, color) => {

        if (index < 0 || index >= moves.length)
            return;

        const move = moves[index];

        const fen =
            color === "white"
                ? move.whiteFen
                : move.blackFen;

        if (!fen)
            return;

        setSelectedMove({
            number: move.number,
            color
        });

        onSelectMove?.(fen);
    };


    const selectMove = (move, color, fen) => {

        setSelectedMove({
            number: move.number,
            color
        });

        if (fen)
            onSelectMove?.(fen);
    };


    const getCurrentIndex = () => {

        if (!selectedMove)
            return moves.length - 1;

        return moves.findIndex(
            move => move.number === selectedMove.number
        );
    };


    return (
        <div className={styles.logContainer}>

            <div className={styles.logMenu}>

                <button
                    className={styles.menuButton}
                    onClick={() => {
                        if (moves.length)
                            selectIndex(0, "white");
                    }}
                >
                    ⏮
                </button>


                <button
                    className={styles.menuButton}
                    onClick={() => {

                        const index = getCurrentIndex();

                        if (index < 0)
                            return;

                        const current = moves[index];


                        if (
                            selectedMove?.color === "black"
                        ) {
                            selectIndex(index, "white");
                            return;
                        }


                        if (index > 0) {

                            const prev = moves[index - 1];

                            selectIndex(
                                index - 1,
                                prev.black
                                    ? "black"
                                    : "white"
                            );
                        }

                    }}
                >
                    ◀
                </button>


                <button
                    className={styles.menuButton}
                    onClick={() => {

                        const index = getCurrentIndex();

                        if (index < 0)
                            return;


                        const current = moves[index];


                        if (
                            selectedMove?.color === "white" &&
                            current.black
                        ) {
                            selectIndex(index,"black");
                            return;
                        }


                        if (index + 1 < moves.length) {
                            selectIndex(
                                index + 1,
                                "white"
                            );
                        }

                    }}
                >
                    ▶
                </button>


                <button
                    className={styles.menuButton}
                    onClick={() => {

                        if (!moves.length)
                            return;

                        const last =
                            moves[moves.length - 1];

                        selectIndex(
                            moves.length - 1,
                            last.black
                                ? "black"
                                : "white"
                        );

                    }}
                >
                    ⏭
                </button>

            </div>


            <div
                className={styles.moveList}
                ref={moveListRef}
            >

                {moves.map(move => {

                    const whiteActive =
                        selectedMove?.number === move.number &&
                        selectedMove?.color === "white";

                    const blackActive =
                        selectedMove?.number === move.number &&
                        selectedMove?.color === "black";


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
                                onClick={() =>
                                    selectMove(
                                        move,
                                        "white",
                                        move.whiteFen
                                    )
                                }
                            >
                                {move.white}
                            </button>


                    {move.black && (
                        <button
                            className={`${styles.move} ${
                                blackActive
                                    ? styles.active
                                    : ""
                            }`}
                            onClick={() =>
                                selectMove(
                                    move,
                                    "black",
                                    move.blackFen
                                )
                            }
                        >
                            {move.black}
                        </button>
                    )}

                        </div>
                    );

                })}

            </div>

        </div>
    );
}