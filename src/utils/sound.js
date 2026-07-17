let audioContext;
let moveBuffer;

async function loadSound() {
    audioContext = new AudioContext();

    const response = await fetch("/gui/sounds/move.mp3");
    const data = await response.arrayBuffer();

    moveBuffer = await audioContext.decodeAudioData(data);
}

export function playMoveSound(enabled) {
    if (!enabled || !moveBuffer) return;

    const source = audioContext.createBufferSource();

    source.buffer = moveBuffer;

    source.connect(audioContext.destination);

    source.start(0);
}