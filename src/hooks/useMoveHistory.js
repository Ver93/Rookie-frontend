import { useCallback, useState } from "react";

export default function useMoveHistory() {
    const [log, setLog] = useState([]);
    const [undoCounter, setUndoCounter] = useState(0);

    const addMove = useCallback((move, fen) => {
        setLog(prev => {
            const last = prev[prev.length - 1];

            if (!last || last.black) {
                return [
                    ...prev,
                    {
                        number: prev.length + 1,
                        white: move.san,
                        whiteFen: fen,
                        black: null,
                        blackFen: null,
                    },
                ];
            }

            return [
                ...prev.slice(0, -1),
                {
                    ...last,
                    black: move.san,
                    blackFen: fen,
                },
            ];
        });
    }, []);

    const undo = useCallback(() => {
        setLog(prev => {
            const copy = [...prev];

            if (!copy.length) {
                return copy;
            }

            const last = copy[copy.length - 1];

            if (last.black) {
                return [
                    ...copy.slice(0, -1),
                    {
                        ...last,
                        black: null,
                        blackFen: null,
                    },
                ];
            }

            copy.pop();
            return copy;
        });

        setUndoCounter(v => v + 1);
    }, []);

    const clearHistory = useCallback(() => {
        setLog([]);
        setUndoCounter(0);
    }, []);

    const getMoveAt = useCallback(
        fen => log.find(m => m.whiteFen === fen || m.blackFen === fen) ?? null,
        [log]
    );

    return {
        log,
        undoCounter,
        addMove,
        undo,
        clearHistory,
        getMoveAt,
    };
}