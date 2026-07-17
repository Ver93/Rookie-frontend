import { useCallback, useState } from "react";
import { parseTimeControl } from "./useClock";

export default function useGameClock(timeControl = "5+0") {
    const [clockResetKey, setClockResetKey] = useState(0);
    const resetClock = useCallback(() => setClockResetKey(v => v + 1), []);

    const { initial, inc } = parseTimeControl(timeControl);

    return {
        initialTime: initial,
        increment: inc,
        clockResetKey,
        resetClock
    };
}
