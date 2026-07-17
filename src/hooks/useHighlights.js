export default function useHighlights(game, lastMove, options = {}) {
    const {
        highlightLast = true,
        highlightChecks = true,
    } = options;

    const styles = {};

    if (highlightLast && lastMove) {
        styles[lastMove.from] = {
            backgroundColor: "rgba(110,168,255,0.35)",
        };

        styles[lastMove.to] = {
            backgroundColor: "rgba(110,168,255,0.55)",
        };
    }

    if (highlightChecks && game.isCheck()) {
        const board = game.board();

        for (let r = 0; r < 8; r++) {
            for (let c = 0; c < 8; c++) {
                const piece = board[r][c];

                if (
                    piece &&
                    piece.type === "k" &&
                    piece.color === game.turn()
                ) {
                    styles["abcdefgh"[c] + (8 - r)] = {
                        backgroundColor: "rgba(255,60,60,0.55)",
                    };
                }
            }
        }
    }

    return styles;
}