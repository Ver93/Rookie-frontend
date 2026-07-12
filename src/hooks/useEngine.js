import { useState, useEffect } from "react";
import { Chess } from "chess.js";
import { getBestMove } from "../services/engine_api";

export default function useEngine(depth, playerColor, highlights) {
    const [game] = useState(() => new Chess());
    const [position, setPosition] = useState(game.fen());
    const [log, setLog] = useState([]);
    const [squareStyles, setSquareStyles] = useState({});
    const [gameTurn, setGameTurn] = useState(null);
    const [lastMove, setLastMove] = useState(null);

    const { highlightLegal, highlightLast, highlightChecks } = highlights;

    useEffect(() => {
        setSquareStyles({});
    }, [highlightLegal, highlightLast, highlightChecks]);

    function clearHighlights() {
        setSquareStyles({});
    }

    function loadFEN(fen) {
        try {
            game.load(fen.trim());
        } catch {
            return false;
        }

        setPosition(game.fen());
        setSquareStyles({});
        setLastMove(null);

        const turn = game.turn() === "w" ? "white" : "black";
        setGameTurn(turn);

        if (turn !== playerColor) {
            playEngineMove();
            setGameTurn(playerColor);
        }

        return true;
    }


    function updateLastMoveVisuals() {
        if (!highlightLast) return;

        const history = game.history({ verbose: true });
        if (history.length === 0) return;

        const last = history[history.length - 1];

        setSquareStyles(prev => ({
        ...prev,
        [last.from]: { backgroundColor: "rgba(255,255,0,0.35)" },
        [last.to]: { backgroundColor: "rgba(255,255,0,0.35)" }
        }));
    }

    function updateCheckVisuals() {
        if (!highlightChecks) return;
        if (!game.isCheck()) return;

        const kingSquare = findKingSquare(game.turn());
        if (kingSquare) {
        setSquareStyles(prev => ({
            ...prev,
            [kingSquare]: { backgroundColor: "rgba(255,0,0,0.5)" }
        }));
        }
    }

    function logEvent(text) {
        setLog(prev => [...prev, text]);
    }

    function findKingSquare(color) {
        const board = game.board();
        for (let r = 0; r < 8; r++) {
        for (let c = 0; c < 8; c++) {
            const piece = board[r][c];
            if (piece && piece.type === "k" && piece.color === color) {
            return "abcdefgh"[c] + (8 - r);
            }
        }
        }
        return null;
    }

    async function playEngineMove() {
        const fen = game.fen();
        const moves = game.history({ verbose: true }).map(m => {
        return m.from + m.to + (m.promotion || "");
        });

        const bestmove = await getBestMove(fen, moves, depth);
        if (!bestmove) return;

        game.move({
        from: bestmove.slice(0, 2),
        to: bestmove.slice(2, 4),
        promotion: "q"
        });

        setLastMove({
        from: bestmove.slice(0, 2),
        to: bestmove.slice(2, 4)
        });

        setPosition(game.fen());
        setSquareStyles({});
        updateLastMoveVisuals();
        updateCheckVisuals();
        logEvent(bestmove);
    }

    async function onPlayerMove(from, to) {
        try {
        game.move({ from, to, promotion: "q" });
        } catch {
        return false;
        }

        setLastMove({ from, to });
        setPosition(game.fen());
        logEvent(`${from}${to}`);
        setSquareStyles({});
        updateLastMoveVisuals();
        updateCheckVisuals();

        setGameTurn("black");
        await playEngineMove();
        setGameTurn("white");

        return true;
    }

    function resetGame() {
        game.reset();
        setPosition(game.fen());
        setLog([]);
        setSquareStyles({});
        setLastMove(null);
        updateCheckVisuals();
        setGameTurn("white");

        if (playerColor === "black") {
        playEngineMove();
        setGameTurn("white");
        }
    }

    return {
        position,
        squareStyles,
        log,
        onPlayerMove,
        resetGame,
        gameTurn,
        gameInstance: game,
        lastMove,
        clearHighlights,
        loadFEN
    };
}
