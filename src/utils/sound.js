// utils/sound.js

let ctx = null;
let buffer = null;


export async function initAudio() {

    if (ctx && buffer) {
        return;
    }


    ctx = new (
        window.AudioContext ||
        window.webkitAudioContext
    )();


    const res = await fetch("/gui/sounds/move.mp3");


    const arrayBuffer = await res.arrayBuffer();

    buffer = await ctx.decodeAudioData(arrayBuffer);

}



export async function playMoveSound() {

    if (!ctx || !buffer) {
        return;
    }


    if (ctx.state === "suspended") {
        await ctx.resume();
    }


    const source = ctx.createBufferSource();

    source.buffer = buffer;

    source.connect(ctx.destination);

    source.start();

}