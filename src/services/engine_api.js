const API_URL = "/api/engine";

export async function getBestMove(fen, moves, depth) {
  const res = await fetch(`${API_URL}/go`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ fen, moves, depth }),
  });

  const data = await res.json();
  return data.bestMove;
}

export async function resetGame() {
  const res = await fetch(`${API_URL}/reset`, {
    method: "POST"
  });

  if (!res.ok) throw new Error("Engine API error");
  return await res.json();
}