let ctx = null;
let buffers = {};

const sounds = {
    move: "/gui/sounds/move.mp3",
    capture: "/gui/sounds/capture.mp3",
    check: "/gui/sounds/check.mp3",
    checkmate: "/gui/sounds/checkmate.mp3",
};


export async function initAudio() {

    if (ctx) return;

    ctx = new (
        window.AudioContext ||
        window.webkitAudioContext
    )();


    for (const [name, url] of Object.entries(sounds)) {

        const response = await fetch(url);

        const arrayBuffer = await response.arrayBuffer();

        buffers[name] =
            await ctx.decodeAudioData(arrayBuffer);
    }
}


export async function playSound(name) {

    if (!ctx || !buffers[name]) {
        return;
    }

    if (ctx.state === "suspended") {
        await ctx.resume();
    }


    const source = ctx.createBufferSource();

    source.buffer = buffers[name];

    source.connect(ctx.destination);

    source.start();
}