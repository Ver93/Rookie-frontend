
import { useMemo } from "react";

export default function useHighlights(game, lastMove, { highlightLast, highlightChecks }) {
    const findKingSquare = (color) => {
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
    };

    return useMemo(() => {
        const styles = {};

        if (highlightLast && lastMove) {
            styles[lastMove.from] = { backgroundColor: "rgba(255,255,0,0.35)" };
            styles[lastMove.to] = { backgroundColor: "rgba(255,255,0,0.35)" };
        }

        if (highlightChecks && game.isCheck()) {
            const kingSquare = findKingSquare(game.turn());
            if (kingSquare) {
                styles[kingSquare] = { backgroundColor: "rgba(255,0,0,0.5)" };
            }
        }

        return styles;
    }, [game, lastMove, highlightLast, highlightChecks]);
}
