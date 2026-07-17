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

    const playEngineMove = useCallback(async () => {
        setIsThinking(true);
        try {
            const move = await engine.getBestMove(game.game);
            if (!move) return;

            const result = game.makeMove(move.from, move.to);
            if (result) history.addMove(result, game.game.fen());
        } finally {
            setIsThinking(false);
        }
    }, [engine, game, history]);

    const onPlayerMove = useCallback(async (from, to) => {
        if (game.isAnalysisMode) game.exitAnalysis();

        const result = game.makeMove(from, to);
        if (!result) return false;

        history.addMove(result, game.game.fen());
        audio.playMove();

        await playEngineMove();
        return true;
    }, [game, history, audio, playEngineMove]);

    const resetGame = useCallback(() => {
        game.resetGame();
        history.clearHistory();
        clock.resetClock();
    }, [game, history, clock]);

    const undoMove = useCallback(() => {
        if (game.isAnalysisMode) game.exitAnalysis();

        const undone = game.undoMove();
        if (undone) history.undo();
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
        exitAnalysis: game.exitAnalysis
    };
}
