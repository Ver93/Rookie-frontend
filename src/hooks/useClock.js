import { useState, useEffect } from "react";

export function parseTimeControl(tc) {
    if (!tc || typeof tc !== "string") return { initial: 300, inc: 0 };
    const [minStr, incStr = "0"] = tc.split("+");
    return { initial: Number(minStr) * 60, inc: Number(incStr) };
}

export function useClock(initialTime, active, increment, resetSignal) {
    const [time, setTime] = useState(initialTime);

    useEffect(() => setTime(initialTime), [resetSignal, initialTime]);

    useEffect(() => {
        if (!active) return;
        const interval = setInterval(() => {
            setTime(t => (t <= 0 ? 0 : t - 1));
        }, 1000);
        return () => clearInterval(interval);
    }, [active]);

    return [time, setTime];
}
