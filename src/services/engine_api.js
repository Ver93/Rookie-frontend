const API_URL = "/api/engine";

export async function uci(){
    const res = await fetch(`${API_URL}/uci`, {
    method: "POST"
  });

  const data = await res.json();
  return data;
}

export async function isready(){
    const res = await fetch(`${API_URL}/isready`, {
    method: "POST"
  });

  const data = await res.json();
  return data;
}

export async function setOptions(options){
    await fetch(`${API_URL}/setoption`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ options }),
  });
}

export async function uciNewGame(){
    await fetch(`${API_URL}/ucinewgame`, {
    method: "POST",
  });
}

export async function position(fen, moves){
  await fetch(`${API_URL}/position`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ fen, moves }),
  });
}

export async function go(depth) {
  const res = await fetch(`${API_URL}/go`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ depth }),
  });

  const data = await res.json();
  return data.bestMove;
}

export async function stop(){
  await fetch(`${API_URL}/stop`, {
    method: "POST",
  });
}
export async function quit(){
  await fetch(`${API_URL}/quit`, {
    method: "POST"
  })
}