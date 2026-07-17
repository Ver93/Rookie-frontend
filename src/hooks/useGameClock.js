import { useCallback, useState } from "react";
import { parseTimeControl } from "./useClock";

export default function useGameClock(timeControl = "5+0") {
    const [clockResetKey, setClockResetKey] = useState(0);
    const { initial, inc } = parseTimeControl(timeControl);

    const resetClock = useCallback(
        () => setClockResetKey(k => k + 1),
        []
    );

    return {
        initialTime: initial,
        increment: inc,
        clockResetKey,
        resetClock
    };
}
