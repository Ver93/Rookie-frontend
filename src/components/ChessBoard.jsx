import { useState, useCallback, useMemo, useEffect } from "react";
import { Chessboard } from "react-chessboard";
import styles from "./ChessBoard.module.css";

function ChessBoard({
    position,
    playerColor,
    squareStyles,
    onPlayerMove,
    highlightLegal,
    highlightLast,
    gameInstance,
    lastMove,
}) {
    const [localHighlights, setLocalHighlights] = useState({});
    const [selectedSquare, setSelectedSquare] = useState(null);

    const computeLegalHighlights = useCallback(square => {
        if (!highlightLegal) return {};
        const out = {};
        for (const m of gameInstance.moves({ square, verbose: true })) {
            out[m.to] = {
                backgroundColor: m.captured
                    ? "rgba(255,165,0,0.65)"
                    : "rgba(76,175,80,0.5)"
            };
        }
        return out;
    }, [highlightLegal, gameInstance]);

    useEffect(() => {
        if (!highlightLegal) setLocalHighlights({});
        else if (selectedSquare) setLocalHighlights(computeLegalHighlights(selectedSquare));
    }, [highlightLegal, selectedSquare, computeLegalHighlights]);

    const clearSelection = useCallback(() => {
        setSelectedSquare(null);
        setLocalHighlights({});
    }, []);

    const handleSquareClick = useCallback(async square => {
        const piece = gameInstance.get(square);

        if (!selectedSquare) {
            if (!piece) return;
            setSelectedSquare(square);
            setLocalHighlights(computeLegalHighlights(square));
            return;
        }

        if (selectedSquare === square) {
            clearSelection();
            return;
        }

        const moves = gameInstance.moves({ square: selectedSquare, verbose: true });
        const legal = moves.find(m => m.to === square);

        if (legal) {
            const moved = await onPlayerMove(selectedSquare, square);
            if (moved) clearSelection();
            return;
        }

        if (piece) {
            setSelectedSquare(square);
            setLocalHighlights(computeLegalHighlights(square));
        }
    }, [selectedSquare, gameInstance, computeLegalHighlights, onPlayerMove, clearSelection]);

    const handlePieceDragBegin = useCallback((_, square) => {
        setSelectedSquare(square);
        setLocalHighlights(computeLegalHighlights(square));
    }, [computeLegalHighlights]);

    const handlePieceDrop = useCallback(async (from, to) => {
        const moved = await onPlayerMove(from, to);
        if (moved) clearSelection();
        return moved;
    }, [onPlayerMove, clearSelection]);

    const customSquareStyles = useMemo(() => ({
        ...squareStyles,
        ...localHighlights
    }), [squareStyles, localHighlights]);

    const lastMoveSquares = useMemo(() =>
        highlightLast && lastMove ? [lastMove.from, lastMove.to] : undefined,
        [highlightLast, lastMove]
    );

    return (
        <div className={styles.chessboardWrapper}>
            <div className={styles.chessboardContainer}>
                <div style={{ width: "100%", height: "100%" }}>
                    <Chessboard
                        position={position}
                        boardOrientation={playerColor}
                        customSquareStyles={customSquareStyles}
                        onSquareClick={handleSquareClick}
                        onPieceDragBegin={handlePieceDragBegin}
                        onPieceDrop={handlePieceDrop}
                        arePiecesDraggable={true}
                        animationDuration={100}
                        lastMove={lastMoveSquares}
                    />
                </div>
            </div>
        </div>
    );
}

export default ChessBoard;
