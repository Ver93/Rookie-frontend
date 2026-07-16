
import { uci, isready, go, position } from "../services/engine_api";

export async function runEngine(depth, game) {
    const uciResp = await uci();

    console.log(uciResp);

    if (!uciResp || uciResp.ans !== "uciok") {
        return null;
    }


    const readyResp = await isready();

    console.log(readyResp);

    if (!readyResp || readyResp.ans !== "readyok") {
        return null;
    }


    const fen = game.fen();

    const moves = game.history({ verbose: true })
        .map(m => m.from + m.to + (m.promotion || ""));


    console.log("position");

    const posResp = await position(fen, moves);

    if (!posResp || posResp.error) {
        return null;
    }


    const bestmove = await go(depth);

    return bestmove ?? null;
}