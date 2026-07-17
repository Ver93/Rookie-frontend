import { useCallback, useState } from "react";
import {
    initAudio,
    playSound
} from "../utils/sound";


export default function useGameAudio() {

    const [enabled, setEnabled] = useState(true);

    const enableAudio = useCallback(async () => {
        await initAudio();
    }, []);

    const toggleSound = useCallback(() => {
        setEnabled(value => !value);
    }, []);

    const play = useCallback(async (sound) => {
        if (!enabled) return;

        await playSound(sound);
    }, [enabled]);


    const playMove = useCallback(() => {
        return play("move");
    }, [play]);


    const playCapture = useCallback(() => {
        return play("capture");
    }, [play]);


    const playCheck = useCallback(() => {
        return play("check");
    }, [play]);


    const playCheckMate = useCallback(() => {
        return play("checkmate");
    }, [play]);


    return {
        soundEnabled: enabled,
        toggleSound,
        enableAudio,

        playMove,
        playCapture,
        playCheck,
        playCheckMate,
    };
}