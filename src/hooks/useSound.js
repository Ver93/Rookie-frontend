import { useCallback } from "react";
import { playMoveSound, initAudio } from "../utils/sound";

export default function useSound(enabled) {

    const playMove = useCallback(async () => {

        if (!enabled) {
            return;
        }
        
        await playMoveSound(true);
    }, [enabled]);


    const enableAudio = useCallback(async () => {
        await initAudio();
    }, []);


    return {
        playMove,
        enableAudio
    };
}