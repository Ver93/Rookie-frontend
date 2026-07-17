const sounds = Array.from({ length: 3 }, () => {
    const audio = new Audio("/gui/sounds/move.mp3");
    audio.preload = "auto";
    return audio;
});

export function loadSound() {
    sounds.forEach(audio => audio.load());
}

let index = 0;

export async function playMoveSound(enabled) {
    if (!enabled) return;

    const audio = sounds[index];
    index = (index + 1) % sounds.length;

    audio.currentTime = 0;

    try {
        await audio.play();
    } catch (err) {
        console.error(err);
    }
}