let audioContext;
let moveBuffer;
let loading = false;

export async function loadSound() {
    if (moveBuffer || loading) return;

    loading = true;

    audioContext = new AudioContext();

    const response = await fetch("/gui/sounds/move.mp3");
    const data = await response.arrayBuffer();

    moveBuffer = await audioContext.decodeAudioData(data);

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