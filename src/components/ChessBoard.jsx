import { useState, useEffect, useRef } from "react";
import { Chessboard } from "react-chessboard";

export default function ChessBoard({
  position,
  playerColor,
  squareStyles,
  onPlayerMove,
  highlightLegal,
  gameInstance,
  lastMove
}) {
  const boardRef = useRef(null);
  const [boardSize, setBoardSize] = useState(400);
  const [localStyles, setLocalStyles] = useState({});
  const [selectedSquare, setSelectedSquare] = useState(null);

  useEffect(() => {
    const observer = new ResizeObserver(entries => {
      const { width, height } = entries[0].contentRect;
      const size = Math.min(width, height);
      setBoardSize(size);
    });

    if (boardRef.current) observer.observe(boardRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!highlightLegal) {
      setLocalStyles({});
    }
  }, [highlightLegal]);

  function handleSquareClick(square) {
    if (!selectedSquare) {
      const piece = gameInstance.get(square);
      if (piece) {
        setSelectedSquare(square);

        if (highlightLegal) {
          const moves = gameInstance.moves({ square, verbose: true });
          const styles = {};
          moves.forEach(m => {
            styles[m.to] = { backgroundColor: "rgba(0,150,255,0.35)" };
          });
          setLocalStyles(styles);
        }
      }
      return;
    }

    const from = selectedSquare;
    const to = square;

    setSelectedSquare(null);
    setLocalStyles({});
    onPlayerMove(from, to);
  }

  function handlePieceDragBegin(piece, sourceSquare) {
    if (!highlightLegal) return;

    const moves = gameInstance.moves({ square: sourceSquare, verbose: true });
    const styles = {};
    moves.forEach(m => {
      styles[m.to] = { backgroundColor: "rgba(0,150,255,0.35)" };
    });

    setLocalStyles(styles);
  }

  function handlePieceDrop(source, target) {
    setLocalStyles({});
    onPlayerMove(source, target);
    return true;
  }

  return (
    <div ref={boardRef} style={{ width: "100%", height: "100%" }}>
      <Chessboard
        position={position}
        boardOrientation={playerColor}
        customSquareStyles={{ ...squareStyles, ...localStyles }}
        onSquareClick={handleSquareClick}
        onPieceDragBegin={handlePieceDragBegin}
        onPieceDrop={handlePieceDrop}
        boardWidth={boardSize}
        arePiecesDraggable={true}
        animationDuration={200}
        lastMove={lastMove}
      />
    </div>
  );
}
