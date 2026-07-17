import { memo, useState, useCallback, useMemo } from "react";
import { Chessboard } from "react-chessboard";

function ChessBoard({
    position,
    playerColor,
    squareStyles,
    onPlayerMove,
    highlightLegal,
    gameInstance,
    lastMove,
}) {
    const [localHighlights, setLocalHighlights] = useState({});
    const [selectedSquare, setSelectedSquare] = useState(null);

    const computeLegalHighlights = useCallback((square) => {
        if (!highlightLegal) return {};
        const styles = {};
        const moves = gameInstance.moves({
            square,
            verbose: true
        });
        for (const move of moves) {
            styles[move.to] = {
                backgroundColor: "rgba(76,175,80,0.5)"
            };
        }
        return styles;
    }, [highlightLegal, gameInstance]);

    const clearSelection = useCallback(() => {
        setSelectedSquare(null);
        setLocalHighlights({});
    }, []);

    const handleSquareClick = useCallback((square) => {
        if (!selectedSquare) {
            const piece = gameInstance.get(square);
            if (!piece) return;
            setSelectedSquare(square);
            setLocalHighlights(computeLegalHighlights(square));
            return;
        }
        onPlayerMove(selectedSquare, square);
        clearSelection();
    }, [selectedSquare, gameInstance, computeLegalHighlights, onPlayerMove, clearSelection]);

    const handlePieceDragBegin = useCallback((piece, square) => {
        setLocalHighlights(computeLegalHighlights(square));
    }, [computeLegalHighlights]);

    const handlePieceDrop = useCallback((from, to) => {
        onPlayerMove(from, to);
        clearSelection();
        return true;
    }, [onPlayerMove, clearSelection]);

    const customSquareStyles = useMemo(() => ({
        ...localHighlights,
        ...squareStyles
    }), [localHighlights, squareStyles]);

    const lastMoveSquares = useMemo(() => {
        if (!lastMove) return undefined;
        return [
            lastMove.from,
            lastMove.to
        ];
    }, [lastMove]);

    return (
        <div style={{ width:"100%", height:"100%" }}>
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
    );
}

export default memo(ChessBoard);