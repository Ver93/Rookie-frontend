import { useState, useRef, useCallback } from "react";
import { Chess } from "chess.js";
import { runEngine } from "../utils/engineClient";

import useHighlights from "./useHighlights";

export default function useEngine(depth, playerColor, highlights) {
    const gameRef = useRef(new Chess());
    const game = gameRef.current;

    const [position, setPosition] = useState(game.fen());
    const [log, setLog] = useState([]);
    const [lastMove, setLastMove] = useState(null);
    const [isThinking, setIsThinking] = useState(false);
    const [gameTurn, setGameTurn] = useState("white");
    const [gameStarted, setGameStarted] = useState(false);

    const squareStyles = useHighlights(game, lastMove, {
        highlightLast: true,
        highlightChecks: true
    });

    const updateTurn = () => {
        setGameTurn(game.turn() === "w" ? "white" : "black");
    };

    const logEvent = (san) => {
        setLog(prev => {
            const last = prev[prev.length - 1];

            if (!last || last.black) {
                return [
                    ...prev,
                    {
                        number: prev.length + 1,
                        white: san,
                        black: null
                    }
                ];
            }

            return [
                ...prev.slice(0, -1),
                {
                    ...last,
                    black: san
                }
            ];
        });
    };

    const syncGameState = () => {
        setPosition(game.fen());
        setLastMove(null);
        updateTurn();
    };

    const playEngineMove = useCallback(async () => {
        const bestmove = await runEngine(depth, game);
        if (!bestmove) return;

        const result = game.move({
            from: bestmove.slice(0, 2),
            to: bestmove.slice(2, 4),
            promotion: "q"
        });

        setLastMove({
            from: bestmove.slice(0, 2),
            to: bestmove.slice(2, 4)
        });

        setPosition(game.fen());
        logEvent(result.san);
        updateTurn();
    }, [depth, game]);

    const onPlayerMove = useCallback(async (from, to) => {
        let result;

        try {
            result = game.move({ from, to, promotion: "q" });
        } catch {
            return false;
        }
        
        setGameStarted(true);
        setLastMove({ from, to });
        setPosition(game.fen());
        logEvent(result.san);
        updateTurn();

        setIsThinking(true);
        await playEngineMove();
        setIsThinking(false);

        return true;
    }, [game, playEngineMove]);

    const loadFEN = useCallback(async (fen) => {
        try {
            game.load(fen.trim());
        } catch {
            return false;
        }

        syncGameState();

        if (gameTurn !== playerColor) {
            await playEngineMove();
        }

        return true;
    }, [game, gameTurn, playerColor, playEngineMove]);

    const resetGame = useCallback(async () => {
        game.reset();
        setGameStarted(false);
        setLog([]);
        syncGameState();

        if (playerColor === "black") {
            setGameStarted(true);
            await playEngineMove();
        }
    }, [game, playerColor, playEngineMove]);

    return {
        position,
        squareStyles,
        log,
        gameTurn,
        gameInstance: game,
        lastMove,
        isThinking,
        gameStarted,
        onPlayerMove,
        resetGame,
        loadFEN,
    };
}
