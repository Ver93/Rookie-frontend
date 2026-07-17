let audioContext;
let moveBuffer;
let loading = false;

export async function loadSound() {
    if (moveBuffer || loading) return;

    loading = true;

    console.time("sound load");

    audioContext ??= new AudioContext();

    const response = await fetch("/gui/sounds/move.mp3");

    console.log("status:", response.status);
    console.log("size:", response.headers.get("content-length"));

    const data = await response.arrayBuffer();

    console.timeLog("sound load", "download done");

    moveBuffer = await audioContext.decodeAudioData(data);

    console.timeEnd("sound load");

    loading = false;
}

export async function playMoveSound(enabled) {
    if (!enabled) return;

    if (!moveBuffer) {
        await loadSound();
    }

    if (audioContext.state === "suspended") {
        await audioContext.resume();
    }

    const source = audioContext.createBufferSource();

    source.buffer = moveBuffer;

    source.connect(audioContext.destination);

    source.start(0);
}