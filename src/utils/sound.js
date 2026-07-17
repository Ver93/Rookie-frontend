const audio = new Audio("/gui/sounds/move.mp3");

export function playMoveSound(enabled) {
    if (!enabled) return;

    audio.currentTime = 0;
    audio.play().catch(console.error);
}