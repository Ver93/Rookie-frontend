import { useCallback, useRef, useState } from "react";
import { Chess } from "chess.js";

export default function useGame() {
    const game = useRef(new Chess()).current;

    const [position, setPosition] = useState(game.fen());
    const [lastMove, setLastMove] = useState(null);
    const [gameTurn, setGameTurn] = useState("white");
    const [gameStarted, setGameStarted] = useState(false);

    const [analysisPosition, setAnalysisPosition] = useState(null);
    const [isAnalysisMode, setIsAnalysisMode] = useState(false);

    const syncGame = useCallback(() => {
        setPosition(game.fen());
        setGameTurn(game.turn() === "w" ? "white" : "black");
    }, [game]);

    const exitAnalysis = useCallback(() => {
        setAnalysisPosition(null);
        setIsAnalysisMode(false);
    }, []);

    const viewPosition = useCallback((fen) => {
        if (fen === game.fen()) {
            setAnalysisPosition(null);
            setIsAnalysisMode(false);
            return;
        }

        setAnalysisPosition(fen);
        setIsAnalysisMode(true);
    }, [game]);

    const makeMove = useCallback(
        (from, to) => {
            exitAnalysis();

            let result;
            try {
                result = game.move({ from, to, promotion: "q" });
            } catch {
                return false;
            }
            if (!result) return false;

            setLastMove({ from: result.from, to: result.to });
            setGameStarted(true);
            syncGame();
            return result;
        },
        [game, syncGame, exitAnalysis]
    );

    const resetGame = useCallback(() => {
        game.reset();
        exitAnalysis();
        setLastMove(null);
        setGameStarted(false);
        syncGame();
    }, [game, syncGame, exitAnalysis]);

    const undoMove = useCallback(() => {
        exitAnalysis();
        const result = game.undo();
        if (!result) return false;
        syncGame();
        return true;
    }, [game, syncGame, exitAnalysis]);

    return {
        game,
        position: analysisPosition ?? position,
        lastMove,
        gameTurn,
        gameStarted,
        isAnalysisMode,
        makeMove,
        resetGame,
        undoMove,
        viewPosition,
        exitAnalysis
    };
}
