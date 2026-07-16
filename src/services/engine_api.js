const API_URL = "/api/engine";

async function safeFetch(url, options = {}) {
    try {
        const res = await fetch(url, options);
        if (!res.ok) {
            return { error: true, status: res.status };
        }

        const data = await res.json().catch(() => null);
        console.log(data);
        return data ?? { error: true };
    } catch (err) {
        return { error: true, message: err.message };
    }
}


export async function uci() {
    return await safeFetch("/api/engine/uci", { method: "POST" });
}

export async function isready() {
    return await safeFetch("/api/engine/isready", { method: "POST" });
}



export async function setOptions(options) {
    await fetch(`${API_URL}/setoption`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ options }),
    });
}

export async function uciNewGame() {                        
    await fetch(`${API_URL}/ucinewgame`, {
        method: "POST",
    });
}

export async function position(fen, moves) {
    return await safeFetch("/api/engine/position", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fen, moves })
    });
}


export async function go(depth) {
    const data = await safeFetch("/api/engine/go", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ depth })
    });

    if (data.error) return null;
    return data.bestMove ?? null;
}


export async function stop() {
    await fetch(`${API_URL}/stop`, {
        method: "POST",
    });
}
export async function quit() {
    await fetch(`${API_URL}/quit`, {
        method: "POST"
    })
}