import { useState, useRef, useCallback } from "react";
import { Chessboard } from "react-chessboard";

export default function ChessBoard({
    position,
    playerColor,
    squareStyles,
    onPlayerMove,
    highlightLegal,
    gameInstance,
    lastMove
}) {
    const boardRef = useRef(null);
    const [localHighlights, setLocalHighlights] = useState({});
    const [selectedSquare, setSelectedSquare] = useState(null);

    const computeLegalHighlights = useCallback((square) => {
        if (!highlightLegal) return {};

        const moves = gameInstance.moves({ square, verbose: true });
        const styles = {};

        moves.forEach(m => {
            styles[m.to] = { backgroundColor: "rgba(0,150,255,0.35)" };
        });

        return styles;
    }, [highlightLegal, gameInstance]);

    const handleSquareClick = useCallback((square) => {
        if (!selectedSquare) {
            const piece = gameInstance.get(square);
            if (!piece) return;

            setSelectedSquare(square);
            setLocalHighlights(computeLegalHighlights(square));
            return;
        }

        const from = selectedSquare;
        const to = square;

        setSelectedSquare(null);
        setLocalHighlights({});
        onPlayerMove(from, to);
    }, [selectedSquare, gameInstance, computeLegalHighlights, onPlayerMove]);

    const handlePieceDragBegin = useCallback((piece, sourceSquare) => {
        setLocalHighlights(computeLegalHighlights(sourceSquare));
    }, [computeLegalHighlights]);

    const handlePieceDrop = useCallback((source, target) => {
        setLocalHighlights({});
        onPlayerMove(source, target);
        return true;
    }, [onPlayerMove]);

    return (
        <div ref={boardRef} style={{ width: "100%", height: "100%" }}>
            <Chessboard
                position={position}
                boardOrientation={playerColor}
                customSquareStyles={{
                    ...squareStyles,
                    ...localHighlights
                }}
                onSquareClick={handleSquareClick}
                onPieceDragBegin={handlePieceDragBegin}
                onPieceDrop={handlePieceDrop}
                arePiecesDraggable={true}
                animationDuration={200}
                lastMove={lastMove ? [lastMove.from, lastMove.to] : undefined}
            />
        </div>
    );
}
