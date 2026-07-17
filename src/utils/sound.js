const sounds = Array.from({ length: 3 }, () => {
    const audio = new Audio("/gui/sounds/move.mp3");
    audio.preload = "auto";
    audio.load();
    return audio;
});

let index = 0;

export function playMoveSound(enabled) {
    if (!enabled) return;

    const audio = sounds[index];
    index = (index + 1) % sounds.length;

    audio.currentTime = 0;

    audio.play().catch(err => {
        console.error("Failed to play sound:", err);
    });
}