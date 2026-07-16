const moveSound = new Audio(
    "https://images.chesscomfiles.com/chess-themes/sounds/_MP3_/default/move-self.mp3"
);

moveSound.volume = 0.5;


export function playMoveSound(enabled) {

    if (!enabled)
        return;


    moveSound.currentTime = 0;


    moveSound.play()
        .catch(error => {
            console.log("Sound blocked:", error);
        });

}