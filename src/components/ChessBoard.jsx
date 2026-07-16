import { useState, useCallback } from "react";
import { Chessboard } from "react-chessboard";
import { unlockSound } from "../utils/sound";

export default function ChessBoard({
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

        moves.forEach(move => {
            styles[move.to] = {
                backgroundColor: "rgba(76,175,80,0.5)"
            };
        });

        return styles;
    }, [highlightLegal, gameInstance]);


    const handleSquareClick = useCallback((square) => {

        unlockSound();

        if (!selectedSquare) {
            const piece = gameInstance.get(square);

            if (!piece) return;

            setSelectedSquare(square);
            setLocalHighlights(
                computeLegalHighlights(square)
            );

            return;
        }

        onPlayerMove(selectedSquare, square);
        setSelectedSquare(null);
        setLocalHighlights({});

    }, [
        selectedSquare,
        gameInstance,
        computeLegalHighlights,
        onPlayerMove
    ]);


    const handlePieceDragBegin = useCallback((piece, square) => {
        unlockSound();
        setLocalHighlights(
            computeLegalHighlights(square)
        );
    }, [computeLegalHighlights, unlockSound]);


    const handlePieceDrop = useCallback((from, to) => {

        unlockSound();

        setLocalHighlights({});

        onPlayerMove(from, to);

        return true;

    }, [onPlayerMove]);


    return (
        <div style={{ width: "100%", height: "100%" }}>
            <Chessboard
                position={position}
                boardOrientation={playerColor}

                customSquareStyles={{
                    ...localHighlights,
                    ...squareStyles
                }}

                onSquareClick={handleSquareClick}
                onPieceDragBegin={handlePieceDragBegin}
                onPieceDrop={handlePieceDrop}

                arePiecesDraggable={true}
                animationDuration={200}

                lastMove={
                    lastMove
                        ? [
                            lastMove.from,
                            lastMove.to
                        ]
                        : undefined
                }
            />
        </div>
    );
}