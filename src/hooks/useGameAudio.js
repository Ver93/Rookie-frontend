import { useCallback, useState } from "react";
import { initAudio, playMoveSound } from "../utils/sound";


export default function useGameAudio() {

    const [enabled, setEnabled] = useState(true);

    const enableAudio = useCallback(async () => {
        await initAudio();
    }, []);

    const toggleSound = useCallback(() => {
        setEnabled(value => !value);
    }, []);

    const playMove = useCallback(async () => {
        if (!enabled) {
            return;
        }

        await playMoveSound();
    }, [enabled]);

    return {
        soundEnabled: enabled,
        toggleSound,
        enableAudio,
        playMove,
    };
}