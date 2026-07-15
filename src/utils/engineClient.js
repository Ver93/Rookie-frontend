
import { uci, isready, go, position } from "../services/engine_api";

export async function runEngine(depth, game) {
    const uciResp = await uci();
    if (uciResp.error || uciResp.body !== "uciok") return null;

    const readyResp = await isready();
    if (readyResp.error || readyResp.body !== "isready") return null;

    const fen = game.fen();
    const moves = game.history({ verbose: true }).map(m => m.from + m.to + (m.promotion || ""));

    const posResp = await position(fen, moves);
    if (posResp?.error) return null;

    const bestmove = await go(depth);
    return bestmove ?? null;
}
