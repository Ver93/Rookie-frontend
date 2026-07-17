let audioContext;
let moveBuffer;
let loadingPromise = null;

const AudioCtx = window.AudioContext || window.webkitAudioContext;

export async function unlockAudio() {
    audioContext ??= new AudioCtx();

    if (audioContext.state === "suspended") {
        await audioContext.resume();

        // Silent buffer to wake up Safari
        const buffer = audioContext.createBuffer(1, 1, 22050);
        const source = audioContext.createBufferSource();

        source.buffer = buffer;
        source.connect(audioContext.destination);
        source.start();
    }
}

export async function loadSound() {
    if (moveBuffer) return;

    if (!loadingPromise) {
        loadingPromise = (async () => {
            audioContext ??= new AudioCtx();

            console.time("sound load");

            const response = await fetch("/gui/sounds/move.mp3");

            if (!response.ok) {
                throw new Error(`Failed to load sound (${response.status})`);
            }

            console.log("status:", response.status);
            console.log("size:", response.headers.get("content-length"));

            const data = await response.arrayBuffer();

            console.timeLog("sound load", "download done");

            moveBuffer = await audioContext.decodeAudioData(data);

            console.timeEnd("sound load");
        })();
    }

    await loadingPromise;
}

export async function playMoveSound(enabled) {
    if (!enabled) return;

    await unlockAudio();

    if (!moveBuffer) {
        await loadSound();
    }

    const source = audioContext.createBufferSource();

    source.buffer = moveBuffer;
    source.connect(audioContext.destination);

    source.start();
}