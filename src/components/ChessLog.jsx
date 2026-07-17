import { useEffect, useRef, useState } from "react";
import styles from "./ChessLog.module.css";

export default function ChessLog({ moves = [], onSelectMove, undoCounter }) {
    const moveListRef = useRef(null);
    const [selectedMove, setSelectedMove] = useState(null);

    const Icon = ({ d }) => (
        <svg viewBox="0 0 24px"><path d={d} /></svg>
    );

    const icons = {
        first: "M6 5h2v14H6zM18 6l-8 6 8 6V6z",
        prev: "M11 6L3 12l8 6V6zm1 6l8 6V6l-8 6z",
        next: "M13 6l8 6-8 6V6zM4 6l8 6-8 6V6z",
        last: "M16 5h2v14h-2zM6 6l8 6-8 6V6z"
    };

    useEffect(() => {
        moveListRef.current?.scrollTo({
            top: moveListRef.current.scrollHeight,
            behavior: "smooth"
        });

        if (moves.length) {
            const last = moves[moves.length - 1];
            setSelectedMove({
                number: last.number,
                color: last.black ? "black" : "white"
            });
        } else {
            setSelectedMove(null);
        }
    }, [moves, undoCounter]);

    const selectIndex = (index, color) => {
        if (index < 0 || index >= moves.length) return;

        const move = moves[index];
        const fen = color === "white" ? move.whiteFen : move.blackFen;
        if (!fen) return;

        const lastMove = color === "white"
            ? { from: move.whiteFrom, to: move.whiteTo }
            : { from: move.blackFrom, to: move.blackTo };

        setSelectedMove({ number: move.number, color });
        onSelectMove?.(fen, lastMove);
    };

    const getCurrentIndex = () =>
        selectedMove
            ? moves.findIndex(m => m.number === selectedMove.number)
            : moves.length - 1;

    return (
        <div className={styles.logContainer}>
            <div className={styles.logMenu}>
                <button
                    className={styles.menuButton}
                    onClick={() => moves.length && selectIndex(0, "white")}
                >
                    <Icon d={icons.first} />
                </button>

                <button
                    className={styles.menuButton}
                    onClick={() => {
                        const i = getCurrentIndex();
                        if (i < 0) return;

                        if (selectedMove?.color === "black")
                            return selectIndex(i, "white");

                        if (i > 0) {
                            const prev = moves[i - 1];
                            selectIndex(i - 1, prev.black ? "black" : "white");
                        }
                    }}
                >
                    <Icon d={icons.prev} />
                </button>

                <button
                    className={styles.menuButton}
                    onClick={() => {
                        const i = getCurrentIndex();
                        if (i < 0) return;

                        const current = moves[i];
                        if (selectedMove?.color === "white" && current.black)
                            return selectIndex(i, "black");

                        if (i + 1 < moves.length)
                            selectIndex(i + 1, "white");
                    }}
                >
                    <Icon d={icons.next} />
                </button>

                <button
                    className={styles.menuButton}
                    onClick={() => {
                        if (!moves.length) return;
                        const last = moves[moves.length - 1];
                        selectIndex(moves.length - 1, last.black ? "black" : "white");
                    }}
                >
                    <Icon d={icons.last} />
                </button>
            </div>

            <div className={styles.moveList} ref={moveListRef}>
                {moves.map(move => {
                    const whiteActive =
                        selectedMove?.number === move.number &&
                        selectedMove?.color === "white";

                    const blackActive =
                        selectedMove?.number === move.number &&
                        selectedMove?.color === "black";

                    return (
                        <div className={styles.moveRow} key={move.number}>
                            <div className={styles.moveNumber}>{move.number}.</div>

                            <button
                                className={`${styles.move} ${whiteActive ? styles.active : ""}`}
                                onClick={() => {
                                    setSelectedMove({ number: move.number, color: "white" });
                                    onSelectMove?.(move.whiteFen, {
                                        from: move.whiteFrom,
                                        to: move.whiteTo
                                    });
                                }}
                            >
                                {move.white}
                            </button>

                            {move.black && (
                                <button
                                    className={`${styles.move} ${blackActive ? styles.active : ""}`}
                                    onClick={() => {
                                        setSelectedMove({ number: move.number, color: "black" });
                                        onSelectMove?.(move.blackFen, {
                                            from: move.blackFrom,
                                            to: move.blackTo
                                        });
                                    }}
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
