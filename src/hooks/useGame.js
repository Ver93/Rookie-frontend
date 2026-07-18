import { useCallback, useRef, useState } from "react";
import { Chess } from "chess.js";

export default function useGame() {
    const game = useRef(new Chess()).current;

    const [position, setPosition] = useState(game.fen());
    const [lastMove, setLastMove] = useState(null);

    const [analysisPosition, setAnalysisPosition] = useState(null);
    const [analysisLastMove, setAnalysisLastMove] = useState(null);

    const [gameTurn, setGameTurn] = useState("white");
    const [gameStarted, setGameStarted] = useState(false);
    const [isAnalysisMode, setIsAnalysisMode] = useState(false);

    const syncGame = useCallback(() => {
        setPosition(game.fen());
        setGameTurn(game.turn() === "w" ? "white" : "black");
    }, [game]);

    const exitAnalysis = useCallback(() => {
        setAnalysisPosition(null);
        setAnalysisLastMove(null);
        setIsAnalysisMode(false);
    }, []);

    const viewPosition = useCallback((fen, move = null) => {
        if (fen === game.fen()) return exitAnalysis();
        setAnalysisPosition(fen);
        setAnalysisLastMove(move);
        setIsAnalysisMode(true);
    }, [game, exitAnalysis]);

    const makeMove = useCallback((from, to) => {
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
    }, [game, syncGame, exitAnalysis]);

    const resetGame = useCallback(() => {
        game.reset();
        exitAnalysis();
        setLastMove(null);
        setGameStarted(false);
        syncGame();
    }, [game, syncGame, exitAnalysis]);

    const undoMove = useCallback(() => {
        const result = game.undo();
        if (!result) return false;

        if (game.history().length === 0) {
            setLastMove(null);
            setGameStarted(false);
        }

        syncGame();
        return true;
    }, [game, syncGame]);

    const loadFen = useCallback((fen) => {
        try {
            game.load(fen);

            exitAnalysis();

            setLastMove(null);

            setGameStarted(true);

            syncGame();

            return true;

        } catch {
            return false;
        }
    }, [game, syncGame, exitAnalysis]);

    return {
        game,
        position: analysisPosition ?? position,
        lastMove: analysisLastMove ?? lastMove,
        gameTurn,
        gameStarted,
        isAnalysisMode,
        makeMove,
        resetGame,
        undoMove,
        viewPosition,
        exitAnalysis,
        loadFen
    };
}
