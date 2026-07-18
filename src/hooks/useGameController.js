import { useCallback, useState } from "react";
import useGame from "./useGame";
import useEngine from "./useEngine";
import useMoveHistory from "./useMoveHistory";
import useGameClock from "./useGameClock";

export default function useGameController({ settings, audio }) {
    const game = useGame();
    const engine = useEngine({ depth: settings.depth });
    const history = useMoveHistory();
    const clock = useGameClock();

    const [isThinking, setIsThinking] = useState(false);

    const playMoveSound = useCallback(result => {
        if (game.game.isCheckmate()) audio.playCheckMate();
        else if (game.game.isCheck()) audio.playCheck();
        else if (result.captured) audio.playCapture();
        else audio.playMove();
    }, [audio, game.game]);

    const playEngineMove = useCallback(async () => {
        setIsThinking(true);
        try {
            const move = await engine.getBestMove(game.game);
            if (!move) return;

            const result = game.makeMove(move.from, move.to);
            if (result) {
                history.addMove(result, game.game.fen());
                playMoveSound(result);
            }
        } finally {
            setIsThinking(false);
        }
    }, [engine, game, history, playMoveSound]);

    const onPlayerMove = useCallback(async (from, to) => {
        if (game.isAnalysisMode) game.exitAnalysis();

        const result = game.makeMove(from, to);
        if (!result) return false;

        history.addMove(result, game.game.fen());
        playMoveSound(result);

        await playEngineMove();
        return true;
    }, [game, history, playEngineMove, playMoveSound]);

    const resetGame = useCallback(() => {
        game.resetGame();
        history.clearHistory();
        clock.resetClock();
    }, [game, history, clock]);

    const undoMove = useCallback(() => {
        if (game.isAnalysisMode) game.exitAnalysis();

        const undone = game.undoMove();
        if (!undone) return;

        history.undo();

        if (game.game.history().length === 0) {
            game.resetGame();
            history.clearHistory();
            clock.resetClock();
        }
    }, [game, history, clock]);

    const getFen = useCallback(() => {
        return game.game.fen();
    }, [game.game]);


    const loadFen = useCallback((fen) => {

        const success = game.loadFen(fen);

        if (success) {
            history.clearHistory();
        }

        return success;

    }, [game, history]);

    return {
        gameInstance: game.game,
        position: game.position,
        lastMove: game.lastMove,
        gameTurn: game.gameTurn,
        gameStarted: game.gameStarted,

        isThinking,
        isAnalysisMode: game.isAnalysisMode,

        log: history.log,
        undoCounter: history.undoCounter,

        initialTime: clock.initialTime,
        increment: clock.increment,
        clockResetKey: clock.clockResetKey,
        resetClock: clock.resetClock,

        onPlayerMove,
        resetGame,
        undoMove,

        viewMove: game.viewPosition,
        exitAnalysis: game.exitAnalysis,

        loadFen
    };
}
