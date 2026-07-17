import { useCallback } from "react";
import { runEngine } from "../utils/engineClient";

export default function useEngine({ depth }) {
    const getBestMove = useCallback(
        async game => {
            const bestmove = await runEngine(depth, game);
            if (!bestmove) return null;

            return {
                from: bestmove.slice(0, 2),
                to: bestmove.slice(2, 4),
                promotion: "q"
            };
        },
        [depth]
    );

    return { getBestMove };
}
