import { useState, useEffect, useCallback } from "react";
import { Chess } from "chess.js";
import {uci, isready, go, _position,  } from "../services/engine_api";

export default function useEngine(depth, playerColor, highlights) {
  const [game] = useState(() => new Chess());
  const [position, setPosition] = useState(game.fen());
  const [log, setLog] = useState([]);
  const [squareStyles, setSquareStyles] = useState({});
  const [gameTurn, setGameTurn] = useState(null);
  const [lastMove, setLastMove] = useState(null);
  const [isThinking, setIsThinking] = useState(false);

  const { highlightLast, highlightChecks } = highlights;

  const findKingSquare = useCallback((color) => {
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
  }, [game]);

  useEffect(() => {
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

    
    setSquareStyles(styles);
  }, [highlightLast, highlightChecks, lastMove, game, findKingSquare, playerColor]);

  const logEvent = useCallback((text) => {
    setLog(prev => [...prev, text]);
  }, []);

  const clearHighlights = useCallback(() => {
    setSquareStyles({});
  }, []);
  
  const checkUCI = useCallback(async () => {
    const anwser = await uci();
    return anwser.body === "uciok";
  }, []);

  const isEngineReady = useCallback(async () => {
    const anwser = await isready();
    return anwser.body === "isready";
  }, []);

  const setEnginePosition = useCallback(async () => {
    const fen = game.fen();
    const moves = game.history({ verbose: true }).map(m => {
      return m.from + m.to + (m.promotion || "");
    }, []);

    await _position(fen, moves);
  }, [game]);

  const getEngineMove = useCallback(async () => {
    const anwser = await go(depth);
    return anwser;
  }, [depth]);

  const playEngineMove = useCallback(async () => {

    if(!checkUCI() || !isEngineReady()) return;

    setEnginePosition();

    const bestmove = getEngineMove();
    if (!bestmove) return;

    game.move({
      from: bestmove.slice(0, 2),
      to: bestmove.slice(2, 4),
      promotion: "q"
    });

    const moveObj = {
      from: bestmove.slice(0, 2),
      to: bestmove.slice(2, 4)
    };

    setLastMove(moveObj);
    setPosition(game.fen());
    logEvent(bestmove);

    setGameTurn(game.turn() === "w" ? "white" : "black");
  }, game, [logEvent, checkUCI, isEngineReady, setEnginePosition, getEngineMove]);

  useEffect(() => {
    if(playerColor !== "white"){
        playEngineMove();
        setGameTurn(playerColor);
    }
  }, [playEngineMove, playerColor] );

  const loadFEN = useCallback((fen) => {
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
      setTimeout(() => {
        playEngineMove();
        setGameTurn(playerColor);
      }, 0);
    }

    return true;
  }, [game, playerColor, playEngineMove]);

  const onPlayerMove = useCallback(async (from, to) => {
    try {
      game.move({ from, to, promotion: "q" });
    } catch {
      return false;
    }

    const moveObj = { from, to };
    setLastMove(moveObj);
    setPosition(game.fen());
    logEvent(`${from}${to}`);
    setGameTurn("black");

    setTimeout(async () => {
      setIsThinking(true);
      await playEngineMove();
      setIsThinking(false);
    }, 0);

    return true;
  }, [game, logEvent, playEngineMove]);

  const resetGame = useCallback(() => {
    game.reset();
    setPosition(game.fen());
    setLog([]);
    setSquareStyles({});
    setLastMove(null);

    const turn = "white";
    setGameTurn(turn);

    if (playerColor === "black") {
      setTimeout(async () => {
        await playEngineMove();
        setGameTurn("white");
      }, 0);
    }
  }, [game, playerColor, playEngineMove]);

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
    loadFEN,
    isThinking
  };
}
