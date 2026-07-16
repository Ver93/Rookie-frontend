let moveSound = null;
let unlocked = false;


function getMoveSound() {

    if (!moveSound) {
        moveSound = new Audio("/gui/sounds/move.mp3");
        moveSound.volume = 1.0;

        moveSound.addEventListener("canplaythrough", () => {
            console.log("Sound loaded");
        });

        moveSound.addEventListener("error", (e) => {
            console.log("Sound error", e);
        });
    }

    return moveSound;
}

export function unlockSound() {
    // const sound = getMoveSound();

    // sound.play()
    //     .then(() => {
    //         sound.pause();
    //         sound.currentTime = 0;
    //         unlocked = true;
    //     })
    //     .catch(() => {});
}

export function playMoveSound(enabled) {

    if (!enabled)
        return;

    const sound = getMoveSound();

    sound.currentTime = 0;

    sound.play()
        .then(() => {
            console.log("Sound playing");
        })
        .catch(err => {
            console.log("Sound blocked:", err);
        });
}