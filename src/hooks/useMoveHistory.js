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
                        whiteFrom: move.from,
                        whiteTo: move.to,
                        black: null,
                        blackFen: null,
                        blackFrom: null,
                        blackTo: null
                    }
                ];
            }

            return [
                ...prev.slice(0, -1),
                {
                    ...last,
                    black: move.san,
                    blackFen: fen,
                    blackFrom: move.from,
                    blackTo: move.to
                }
            ];
        });
    }, []);

    const undo = useCallback(() => {
        setLog(prev => {
            const copy = [...prev];
            if (!copy.length) return copy;

            const last = copy[copy.length - 1];

            if (last.black) {
                return [
                    ...copy.slice(0, -1),
                    {
                        ...last,
                        black: null,
                        blackFen: null,
                        blackFrom: null,
                        blackTo: null
                    }
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

    const getMoveAt = useCallback(fen => {
        const m = log.find(x => x.whiteFen === fen || x.blackFen === fen);
        if (!m) return null;

        return m.whiteFen === fen
            ? { from: m.whiteFrom, to: m.whiteTo }
            : { from: m.blackFrom, to: m.blackTo };
    }, [log]);

    return {
        log,
        undoCounter,
        addMove,
        undo,
        clearHistory,
        getMoveAt
    };
}
